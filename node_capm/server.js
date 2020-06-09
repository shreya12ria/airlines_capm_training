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
	let query="select * from MY_AIRLINES_FLIGHTS where src="+source+"and dest="+destination+"and doj="+doj+"";
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

var insert= function(conn,data){
	let pnr=Math.floor(Math.random() * 1000);
	let model=data.flightModel;
	let age=data.age;
	let dob=data.dob;
	let fname=data.fname,lname=data.lname,phone=data.phone,email=data.email;
	let query="INSERT INTO MY_AIRLINES_PASSENGERS VALUES('"+pnr+"','"+model+"',"+age+",'"+dob+"','"+fname+"','"+lname+"','"+phone+"','"+email+"',' ')";
	conn.exec(query, (err1, results) => {
		if (!err1) {
			console.log(results);
			return(results);
		} else {
			console.log(err1 );
		}
	});
}

var update=function(conn,data,x){
	let model=data.flightModel;
	let doj=data.doj;
	console.log(data)
	let query="update MY_AIRLINES_FLIGHTS set seatsavailable=seatsavailable+"+x+" where flightmodel='"+model+"' and doj='"+doj+"'";
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
		let query="delete from MY_AIRLINES_PASSENGERS where pnr='"+pnr+"'";
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
	let connection= req.db;
	let data=req.body;
	
	if(insert(connection,data)==1){
	
	update(connection,data,-1);
	console.log("complete");}
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