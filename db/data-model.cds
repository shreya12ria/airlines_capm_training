namespace my.airlines;
using { cuid, managed, temporal, Country, Currency } from '@sap/cds/common';


context AspectsDemo {
	
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


// context ServiceDemo {
// 	entity Passengers {
// 		key PNR 	: Integer;
// 			name	: PName;
// 			age		: Integer;
// 			contact : PContact;
// 			DOB		: Date;
// 			// flight1,2,3 are to-one associations 
// 			flight1	: Association to Flights;
// 			flight2	: Association to Flights { flightModel };
// 			flight3	: Association[1] to Flights { DOJ, flightName };
// 			flight4	: Association to many Flights on flight4.passenger4 = $self;
// 	};
	
// 	entity Flights {
// 		key flightModel		: Integer;
// 			DOJ				: Date;
// 			flightName		: String(50);
// 			src				: String(50);
// 			dest			: String(50);
// 			price			: Integer;
// 			timing			: FTiming;
// 			totalSeats		: Integer;
// 			seatsAvailable	: Integer;
// 			passenger1		: Association to many Passengers on passenger1.flight1 = $self;
// 			passenger2		: Association to many Passengers on passenger2.flight2 = $self;
// 			passenger3		: Association to many Passengers on passenger3.flight3 = $self;
// 			passenger4		: Association to Passengers;
// 	};
// };







context ViewsDemo{

	entity Managers {
		key MID		: Integer;
			mName	: String(50);
			mDept	: String(10);
	};
	
	entity  Employees{
		key EID		: Integer;
			eName	: String(50);
			eDept	: String(10);
	};
	
	entity InnerJoinView AS SELECT FROM Managers M INNER JOIN Employees E ON M.MID = E.EID {
		key E.EID,
			M.mName,
			M.mDept
	};
	
	entity LeftOuterJoinView AS SELECT FROM Employees E LEFT OUTER JOIN Managers M ON E.EID = M.MID {
		key EID,
			eName,
			eDept,
			mName,
			mDept
	};
	

	entity PassengersView AS SELECT FROM ServiceDemo.Passengers	{
		key PNR,
			name.firstName as FirstName,
			name.lastName as LastName,
	};
	
	
	entity ViewWithInputParam(PNR : Integer) AS SELECT FROM ServiceDemo.Passengers P {
		key PNR,
			name,
			age,
			contact
	} WHERE P.PNR = :PNR;

};





entity Engineers {
	key ID			: Integer;
		name		: PName;
		project_ID	: Integer;  //> Foreign key
		project		: Association to Projects on project.ID = project_ID;
};

entity Projects {
	key ID		: Integer;
		title	: String(10);
		desrc	: String(50);
};



context UnmanagedAssociations{
    entity Employee {
        key id : Integer;
        officeId : Integer;
        // <...>
    };
    entity Room {
        key id : Integer;
        inhabitants : Association[*] to Employee on inhabitants.officeId = id;
        // <...>
    };

    entity Thing {
        key id : Integer;
        parentId : Integer;
        parent : Association[1] to Thing on parent.id = parentId;
        children : Association[*] to Thing on children.parentId = id;
        // <...>
    };
};


	entity Flight {
		key	flightName		: String(50);
		key	DOJ				: Date;
			src				: String(50);
			dest			: String(50);
			price			: Integer;
			startTime		: Time;
			endTime			: Time;
			duration		: Integer;
			totalSeats		: Integer;
			seatsAvailable	: Integer;
	};
	
	entity Passenger {
		key PNR 		: Integer;
			flightname	: String(50);
			DOJ			: Date;
			firstName	: String(100);
			lastName	: String(100);
			age			: Integer;
			phone		: String(10);
			email		: String(100);
	};


context ServiceDemo {
	entity Passengers {
		key PNR 	: Integer;
			name	: PName;
			age		: Integer;
			contact : PContact;
			DOB		: Date;
		
	};
	
	entity Flights {
		key flightModel		: Integer;
			DOJ				: Date;
			flightName		: String(50);
			src				: String(50);
			dest			: String(50);
			price			: Integer;
			timing			: FTiming;
			totalSeats		: Integer;
			seatsAvailable	: Integer;
			
	};
};





