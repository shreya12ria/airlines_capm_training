namespace my.airlines;
using { Country } from '@sap/cds/common';

entity Employees {
  key ID		: Integer not null;
	name		: String;
	jobTitle	: String;
	country		: Country;
  
};
	
abstract entity Foo {
	key ID	: Integer;
};


type PName {
	firstName	: String(100);
	lastName	: String(100);
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



