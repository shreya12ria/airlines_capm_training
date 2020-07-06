"use strict";
var express = require('express');
var router = express.Router();

router.get('/read', (req, res) => {
	
	let destination=req.query.dest;
	let source=req.query.source;
	let doj=req.query.doj;

	var connection=req.db;
	let query="select * from MY_AIRLINES_FLIGHT where src='"+source+"'and dest='"+destination+"'and doj='"+doj+"'";
	connection.exec(query, (err1, results) => {
		if (!err1) {
			console.log(results);
			res.send(results);
		} else {
			console.log(err1 );
			res.send(err1);
		}
	});
});

router.post('/insert', (req, res) => {
	let connection=req.db;
	let flightName=req.body.flightName;
	let DOJ=req.body.DOJ;
	let src=req.body.src,dest=req.body.dest;
	let startTime=req.body.startTime,endTime=req.body.endTime;
	let duration=req.body.duration;
	let price=req.body.price;
	let totalSeats=req.body.totalSeats,seatsAvailable=req.body.seatsAvailable;
	let query="insert into MY_AIRLINES_FLIGHT values('"+flightName+"','"+DOJ+"','"+src+"','"+dest+"','"+price+"','"+startTime+"','"+endTime+"',"+duration+","+totalSeats+","+seatsAvailable+")"; 
	
	console.log(query);
	connection.exec(query, (err1, results) => {
		if (!err1) {
			res.send('record inserted');
		} else {
		console.log(err1);
		res.send('insertion failed');
	}
	});
});
module.exports = router;