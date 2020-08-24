const cds = require('@sap/cds')
const validator = require('validator');

let func=async ()=>{
	let srv = await cds.connect.to ('admin')
	const { Flight_admin } = srv.entities
	let result= await srv.run (SELECT.from(Flight_admin))
	console.log(result)
	// console.log(srv.entities)
}
func()

module.exports = cds.service.impl(srv => {


	// console.log(srv)
  srv.before ('CREATE', 'Passenger_details', async (req)=>{
   	const Flight=srv.entities.Flight_search
	//console.debug(Flight)
	//console.debug(req.data);

	if(!validator.isEmail(req.data.email)){
		req.error(409,'invalid email')	
	}
	let fName=req.data.flightname;
	let DOJ=req.data.DOJ;	
	var list=await cds.run( SELECT.from(Flight).where('flightName=',fName).and('DOJ=',DOJ))
	
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
  
  srv.after('CREATE', 'Passenger_details',(Passenger_details,req)=>{
  	    const Flight=srv.entities.Flight_search
  	   	let fName=req.data.flightname;
		let DOJ=req.data.DOJ;
  	    cds.run(UPDATE (Flight).set('seatsAvailable-=',1).where('flightName=',fName) .and('DOJ=',DOJ))
  })
  
  	 srv.after ('READ', 'Flight_search', each => {
	 	let limit=(each.totalSeats)/2;
	 	// console.log(each)
	 	each.seatsAvailable< limit && _price(each)
	 	//console.debug('this is first .after handler')
	 	var timeStart = new Date("01/01/2007 " + each.startTime).getHours();
		var timeEnd = new Date("01/01/2007 " + each.endTime).getHours();
		// console.log(timeStart)
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
   	const Flight=srv.entities.Flight_search
   	const Passenger=srv.entities.Passenger_details
	//console.debug(Flight)
	//console.debug(req.data);
	var pnr=req.data.PNR
	var list
	list=await cds.run( SELECT.from(Passenger).where('PNR=',pnr))
	let flightName=list[0].flightname;
	let firstName=list[0].firstName;
	let DOJ=list[0].DOJ;
	// console.log(flightName+'		'+DOJ)
	// console.log(list)
    cds.run(UPDATE (Flight).set('seatsAvailable+=',1).where('flightName=',flightName) .and('DOJ=',DOJ))
    
    req.on('succeeded', () => {
    srv.emit('cancelled', { flightName, pnr , firstName, DOJ })
    console.log('Cancelled event was emitted when '+firstName+' cancelled ticket bearing PNR number '+pnr)
    })

  })

})

