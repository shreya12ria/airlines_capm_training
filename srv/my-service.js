// const cds = require('@sap/cds')
// module.exports = (srv)=>{
	// const cds = require('@sap/cds')
	//  const {Flight} = cds.entities

	// srv.on('*',(req)=>{
	// 	console.debug('---',req.method,req.target.name)
	// 	console.debug('this is first .on handler')
	// })
	
	// srv.on('READ','Flight',(req)=>{
	// 	console.debug('---',req.method,req.target.name)
	// 	console.debug('this is second .on handler')
	// })
	
	//  srv.after ('READ', 'Flight', each => {
	//  	let limit=(each.totalSeats)/2;
	//  	each.seatsAvailable< limit && _price(each,200)
	//  	console.debug('this is first .after handler')
	//  })
	 
	//  	 function _price (each,inc) {
	// 	each.price += inc;
	// 	console.debug('---')
	// }
	
	//  srv.after ('READ', 'Flight', each => {
	//  	// console.debug(each.endTime+'  '+each.startTime)
	//  	console.debug('this is second .after handler')
	//  	var timeStart = new Date("01/01/2007 " + each.startTime).getHours();
	// 	var timeEnd = new Date("01/01/2007 " + each.endTime).getHours();
	//  	let diff=(timeEnd-timeStart);
	//  	// console.debug(diff)
	//  	each.duration=diff
	//  })



const cds = require('@sap/cds')
//const { Flight } = cds.entities

/** Service implementation for CatalogService */
module.exports = cds.service.impl(srv => {

  srv.after ('READ', 'Flight', each => console.debug('ok'))
  srv.before ('CREATE', 'passenger', (req)=>{
   	const Flight=srv.entities.Flight
	console.debug(Flight)
	console.debug(req.data);
	req.data.PNR=Math.floor(Math.random() * 10000)
	let fName=req.data.flightname;
	let DOJ=req.data.DOJ;
     cds.transaction(req) .run(()=>UPDATE (Flight).set('seatsAvailable-=',1).where('flightName=',fName) .and('DOJ=',DOJ))
  })
   //srv.before ('*', (req) => { console.debug(req.data);
   //console.debug ('>>>', req.method, req.target.name) })

})



// async function reduce(req){
// 	//console.debug(Flight)
// 	console.debug(req.data);
//   	cds.transaction(req) .run(()=>INSERT.into (Flight)
// 	 .columns ('FLIGHTNAME', 'DOJ', 'src', 'dest','price','startTime','endTime','duration','totalSeats','seatsAvailable')
// 	 .values ( '201', '2020-12-12', '101', '12',2000,'12:12:12','13:13:13',5,199,99))
//   }








	 
	 //srv.before('*',(req)=>{
	 //	 const { Flight}  = srv.entities                    
	 //	 //console.debug(srv.entities.Flight)
	 //	 console.debug(Flight)
	 //	//const a= cds.connect()
	 ////	const db = srv.transaction(req)
	 	
	 //	// srv.run( INSERT.into (Flight)
	 //	// .columns ('flightName', 'DOJ', 'src', 'dest','price','startTime','endTime','duration','totalSeats','seatsAvailable')
	 //	// .values ( '201', '2020-12-12', '101', '12',2000,'12:12:12','13:13:13',5,199,99))
	 //srv.run(DELETE.from(Flight))
	 	
	 	
	 //	 //db.run (SELECT.from('Flight'))
	 //	 //console.debug(data)
	 //	 //console.debug('added to db')
	 //})


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

