/*eslint no-console: 0*/
"use strict";

var http = require("http");
var port = process.env.PORT || 3000;
var express = require("express");
var xsenv = require("@sap/xsenv");
var bodyParser = require('body-parser');
const HDBConn = require("@sap/hdbext");

var hanaOptions = xsenv.getServices({
	hana: {
		tag: "hana"
	}
});

const app = express();
app.use(
	HDBConn.middleware(hanaOptions.hana)
);
app.use(bodyParser.json());


app.get('/read', (req, res) => {
	
	let destination=req.query.dest;
	let source=req.query.source;
	let doj=req.query.doj;
	console.log(destination);
	console.log(source);
	console.log(doj);
	var connection=req.db;
	let query="select * from MY_AIRLINES_FLIGHT where src="+source+"and dest="+destination+"and doj="+doj+"";
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

var insert= function(conn,req){
	let pnr=Math.floor(Math.random() * 1000);
	let flightname=req.flightname;
	let age=req.age;
	let doj=req.doj;
	let fname=req.fname,lname=req.lname,phone=req.phone,email=req.email;
	let query="INSERT INTO MY_AIRLINES_PASSENGER VALUES('"+pnr+"','"+flightname+"','"+doj+"','"+fname+"','"+lname+"','"+age+"','"+phone+"','"+email+"')";
	conn.exec(query, (err1, results) => {
		if (!err1) {
			console.log(results);
			return(results);
		} else {
			console.log(err1 );
		}
	});
	return pnr;
}

var update=function(conn,data,x){
	let flightname=data.flightname;
	let doj=data.doj;
	console.log(data)
	let query="update MY_AIRLINES_FLIGHT set seatsavailable=seatsavailable+"+x+" where flightname='"+flightname+"' and doj='"+doj+"'";
	conn.exec(query, (err1, results) => {
		if (!err1) {
			console.log(results);
			return (results);
		} else {
			console.log(err1 );
		}
	});
}
var delete1=function(conn,data){
	let pnr=data.pnr;
		let query="delete from MY_AIRLINES_PASSENGER where pnr='"+pnr+"'";
	conn.exec(query, (err1, results) => {
		if (!err1) {
			console.log(results);
			return results;
		} else {
			console.log(err1 );
		}
	});
}

app.post('/book', (req, res) => {
	var connection= req.db;
	var data=req.body;
	
	let pnr=insert(connection,data)
	
	update(connection,data,-1);
	console.log("complete");
	res.send('your pnr='+pnr)
});

app.post('/cancel', (req, res) => {
	let connection= req.db;
	let data=req.body;
	
	let r=delete1(connection,data);
	
	update(connection,data,1);

});

app.listen(port, function () {
	console.log('myapp is using Node.js version: ' + process.version); 
	console.log('myapp listening on port ' + port);
});