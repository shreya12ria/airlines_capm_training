"use strict";
var express = require('express');
var router = express.Router();



router.get('/read', (req, res) => {
	
	let destination=req.query.dest;
	let source=req.query.source;
	let doj=req.query.doj;
	// console.log(destination);
	// console.log(source);
	// console.log(doj);
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



var update=function(conn,data,x){
	let flightname=data.flightname;
	let doj=data.DOJ;
	console.log(data);
	let query="update MY_AIRLINES_FLIGHT set seatsavailable=seatsavailable+"+x+" where flightname='"+flightname+"' and doj='"+doj+"'";
	console.log(query);
	conn.exec(query, (err1, results) => {
		if (!err1) {
		//	console.log(results);
			return (results);
		} else {
			console.log(err1 );
		}
	});
}


router.post('/book', (req, res) => {
	var connection= req.db;

	let pnr=Math.floor(Math.random() * 10000);
	let flightname=req.body.flightname;
	let age=req.body.age;
	let doj=req.body.DOJ;
	let fname=req.body.firstName,lname=req.body.lastName,phone=req.body.phone,email=req.body.email;
	
	let select="select * from MY_AIRLINES_FLIGHT where flightName='"+flightname+"'and DOJ='"+doj+"'";
	console.log(select);
	connection.exec(select, (err1, results) => {
		console.log(results[0].SEATSAVAILABLE);
		if (!err1) {
			if(results[0].SEATSAVAILABLE>0){
					let query="INSERT INTO MY_AIRLINES_PASSENGER VALUES('"+pnr+"','"+flightname+"','"+doj+"','"+fname+"','"+lname+"','"+age+"','"+phone+"','"+email+"')";
					console.log(query);
					connection.exec(query, (err1, results) => {
						if (!err1) {
							update(req.db,req.body,-1);	
								res.send('your pnr='+pnr);
						} else {
							console.log(err1 );
						}
					});
			}else{
				res.send('seats not available');
			}
		} else {
			console.log(err1 );
			res.send(err1);
		}
	});

	console.log("complete");

});

router.post('/cancel', (req, res) => {
	let connection= req.db;
	let pnr=req.body.PNR;
	
	let select="select * from MY_AIRLINES_PASSENGER where pnr="+pnr+";";
	connection.exec(select, (err1, results) => {
		if (!err1) {
			let data={
				"flightname":results[0].FLIGHTNAME,
				"DOJ":results[0].DOJ
				};
			let query="delete from MY_AIRLINES_PASSENGER where pnr="+pnr+";";
			console.log(query);
			connection.exec(query, (err1, results) => {
				if (!err1 && results>0) {
					update(connection,data,1);
					res.send(pnr+' cancled');
				} else {
					console.log(err1 );
					res.send(err1);
				}
			});
		} else {
			console.log(err1 );
		}
	});

	
});


module.exports = router;