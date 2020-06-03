namespace my.airlines;
using { cuid, managed, temporal, Country, Currency } from '@sap/cds/common';


aspect Entertainment {
	released { at : Timestamp; _by : String(100); };
	genre : String(50) ;
};

entity Movies : Entertainment {
	key movieName	: String(50);
};

entity Tasks : cuid, managed, temporal {
		taskName : String(10);
		descr	 : String(100);
};

entity FoodItem : temporal {
	key foodItem	: String(100);
		cost		: Integer;
};

entity Transactions : managed {
	key transactionID		: UUID;
		transactionamount	: Integer;
};


	
abstract entity Foo {
	key ID	: Integer;
};


type PName {
	firstName	: String(100);
	lastName	: String(100);
};

entity Employees : cuid {
	name		: String;
	jobTitle	: String;
	country		: Country;
	currency	: Currency;
  
};

type PContact {
	phone	: String(10) default '123456789';
	email	: String(100) default 'XYZ@in.bosch.com';
};


entity Students {
	key name	: PName;
		contact : PContact;
		ID		: Integer default 0;
};

type FTiming {
	startTime	: Time;
	endTime		: Time;
	duration	: Integer;
}; 



entity Passengers {
	key PNR 	: UUID;
		name	: PName;
		age		: Integer;
		contact : PContact;
		DOB		: Date;
		flight	: Association to Flights;
};



entity Flights {
	key flightModel		: UUID;
		DOJ				: Date;
		flightName		: String(50);
		src				: String(50);
		dest			: String(50);
		price			: Integer;
		timing			: FTiming;
		totalSeats		: Integer;
		seatsAvailable	: Integer;
		passengers		: Association to many Passengers on passengers.flight = $self;
};



