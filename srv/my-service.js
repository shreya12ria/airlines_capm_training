const cds = require('@sap/cds')
const validator = require('validator');

module.exports = cds.service.impl(srv => {

	//cds.Service class
	//|-> properties
	console.log(`Service Name :- ${srv.name}`)
	console.log('About to print service model')
	console.log(srv.model )
	console.log('About to print service entities\n**************************************')
	console.log(srv.entities('my.airlines'))
	
	// -> implementations - implemented as a sibling my-service.js file placed next to cds source my-service.cds. Can also be implemented using @impl annotation.
	//Inside the .js file implemented using cds.service.impl function
	
	// -> event handlers already implemented. srv.before() and srv.after() implemented.
	// Constructing queries with cds.ql already implemented. SELECT and UPDATE cds.ql to be shown as part of demo.
	
  srv.before ('CREATE', 'Passenger_details', async (req)=>{
   	const Flight=srv.entities.Flight_search
	//console.debug(Flight)
	//console.debug(req.data);

	if(!validator.isEmail(req.data.email)){
		req.error(409,'invalid email')	
	}
	let fName = req.data.flightname;
	let DOJ = req.data.DOJ;	
	var list = await cds.run( SELECT.from(Flight).where('flightName=',fName).and('DOJ=',DOJ))
	
	console.log(list.length)
	if(list.length<1){
		req.error(409,'flight not available')
	}
	if(list[0].seatsAvailable<1){
		req.error(409,'seats are not available')		
	}
	req.data.PNR = Math.floor(Math.random() * 10000)

    // cds.transaction(req) .run(UPDATE (Flight).set('seatsAvailable-=',1).where('flightName=',fName) .and('DOJ=',DOJ))
    //console.debug(a)
  })
  
  srv.after('CREATE', 'Passenger_details',(Passenger_details,req)=>{
  	    const Flight = srv.entities.Flight_search
  	   	let fName = req.data.flightname;
		let DOJ = req.data.DOJ;
  	    cds.transaction(req) .run(UPDATE (Flight).set('seatsAvailable-=',1).where('flightName=',fName) .and('DOJ=',DOJ))
  })
  
  	 srv.after ('READ', 'Flight_search', each => {
	 	let limit = (each.totalSeats)/2;
	 	// console.log(each)
	 	each.seatsAvailable< limit && _price(each)
	 	//console.debug('this is first .after handler')
	 	var timeStart = new Date("01/01/2007 " + each.startTime).getHours();
		var timeEnd = new Date("01/01/2007 " + each.endTime).getHours();
		// console.log(timeStart)
	 	let diff = (timeEnd-timeStart);
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
   	const Flight = srv.entities.Flight_search
   	const Passenger = srv.entities.Passenger_details
	var PNR = req.data.PNR
	console.log(`PNR is ${PNR}`)
	//variant of srv.run(), passing native query as a string with an additional, optional args array or object
	let booking = await cds.run('SELECT * from my_airlines_passenger where PNR = ?',[PNR])
	const {FIRSTNAME, FLIGHTNAME, DOJ } = booking[0]
	console.log(booking[0])
	console.log(FLIGHTNAME + '		' + DOJ)
    const rowsAffected = await cds.run(UPDATE (Flight).set('seatsAvailable+=',1).where('flightName=',FLIGHTNAME) .and('DOJ=',DOJ))
    console.log(`No of rows affected :- ${rowsAffected}`)
    //emit an even to Indigo saying that a passenger has cancelled ticket.
    //( Note: req.on.succeeded ensures we only do that if there's no error )
    req.on('succeeded', () => {
      srv.emit('cancelled', { FLIGHTNAME, PNR, FIRSTNAME, DOJ })
      console.log(`Cancelled event was emitted when ${FIRSTNAME} cancelled ticket bearing PNR number ${PNR}.`)
    })
  })

})

