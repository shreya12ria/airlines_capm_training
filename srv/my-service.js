const cds = require('@sap/cds')
const validator = require('validator');

module.exports = cds.service.impl(srv => {


  srv.before ('CREATE', 'Passenger', async (req)=>{
   	const Flight=srv.entities.Flight
	//console.debug(Flight)
	//console.debug(req.data);

	let fName=req.data.flightname;
	let DOJ=req.data.DOJ;
	if(!validator.isEmail(req.data.email)){
		req.error(409,'invalid email')	
	}
	
	var list
	list=await cds.run( SELECT.from(Flight).where('flightName=',fName).and('DOJ=',DOJ))
	
	console.log(list.length)
	if(list.length<1){
		req.error(409,'flight not available')
	}
	if(list[0].seatsAvailable<1){
		req.error(409,'seats are not available')		
	}
	req.data.PNR=Math.floor(Math.random() * 10000)

    // cds.transaction(req) .run(UPDATE (Flight).set('seatsAvailable-=',1).where('flightName=',fName) .and('DOJ=',DOJ))
    //console.debug(a)
  })
  
  srv.after('CREATE', 'Passenger',(Passenger,req)=>{
  	    const Flight=srv.entities.Flight
  	   	let fName=req.data.flightname;
		let DOJ=req.data.DOJ;
  	    cds.transaction(req) .run(UPDATE (Flight).set('seatsAvailable-=',1).where('flightName=',fName) .and('DOJ=',DOJ))
  })
  
  	 srv.after ('READ', 'Flight', each => {
	 	let limit=(each.totalSeats)/2;
	 	each.seatsAvailable< limit && _price(each)
	 	//console.debug('this is first .after handler')
	 	var timeStart = new Date("01/01/2007 " + each.startTime).getHours();
		var timeEnd = new Date("01/01/2007 " + each.endTime).getHours();
	 	let diff=(timeEnd-timeStart);
	 	// console.debug(diff)
	 	each.duration=diff
	 })
	 
	 function _price (each) {
		each.price += (each.price)/2;
	}
  
   srv.before ('*', (req) => { 
   console.debug(req.data);
   console.debug ('>>>', req.method, req.target.name) 
   	})
   	
   	
   	srv.before('DELETE','Cancel_booking',async (req)=>{
   		//console.log(req.data)
   		if(typeof(req.data.PNR)!='number'){
   			req.error(409,'enter valid PNR')	
   		}
   	})
   
   srv.after('DELETE','Cancel_booking', async (Cancel_booking,req)=>{
   	const Flight=srv.entities.Flight
   	const Passenger=srv.entities.Passenger
	//console.debug(Flight)
	//console.debug(req.data);
	var pnr=req.data.PNR
	var list
	list=await cds.run( SELECT.from(Passenger).where('PNR=',pnr))
	let fName=list[0].flightname;
	let DOJ=list[0].DOJ;
	console.log(fName+'		'+DOJ)
    cds.run(UPDATE (Flight).set('seatsAvailable+=',1).where('flightName=',fName) .and('DOJ=',DOJ))
    // console.log(e)

  })

})



// async function reduce(req){
// 	//console.debug(Flight)
// 	console.debug(req.data);
//   	cds.transaction(req) .run(()=>INSERT.into (Flight)
// 	 .columns ('FLIGHTNAME', 'DOJ', 'src', 'dest','price','startTime','endTime','duration','totalSeats','seatsAvailable')
// 	 .values ( '201', '2020-12-12', '101', '12',2000,'12:12:12','13:13:13',5,199,99))
//   }



// srv.before ('CREATE', 'Orders', _reduce)

// async function _reduce (req) {
//   const { Items: Passengers } = req.data

//   return cds.transaction(req) .run (()=> Passengers.map (item =>
//     UPDATE (Flights)
//       .set ('seatsAvailable -=', item.seats)
//       .where ('flightModel =', item.flightModel) .and ('seatsAvailable >=', item.seats)
//   )).then (all => all.forEach ((affectedRows,i) => {
//     if (affectedRows === 0) {
//       req.error (409, `${Passengers[i].seats} seats not available #${Passengers[i].flightModel}`)
//     }
//   }))}

//}

