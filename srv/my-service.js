module.exports = (srv)=>{
	const {Flights} = cds.entities
	 //srv.after ('READ','Flights', (each)=>{
	 ////	each.seatsAvailable < each.totalSeats/2 &&each.price += 199;
  //})

	srv.on('*',(req)=>{
		console.debug('---',req.method,req.target.name)
	})
	
	 srv.after ('READ', 'Flights', each => {
	 	let limit=(each.totalSeats)/2;
	 	each.seatsAvailable< limit && _price(each,200)
	 	
	 })
	 
	 
	 function _price (each,inc) {
		each.price += inc;
		console.debug('---')
}

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

}

