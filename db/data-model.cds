namespace my.airlines;


entity Employees {
  key ID : Integer;
	name : String;
  jobTitle : String;
};

abstract entity Foo {
	key ID	: Integer;
};


entity Students {
	key name	: PName;
		contact : PContact;
};

type PName {
	firstName	: String(100);
	lastName	: String(100);
};

type PContact {
	phone	: String(10);
	email	: String(100);
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



