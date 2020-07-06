using { my.airlines } from '../db/data-model';
// using { my.airlines.UnmanagedAssociations as unmanagedassociation } from '../db/data-model';

service Airlines {
  entity Engineers @readonly as projection on airlines.Engineers;
  entity Projects @readonly as projection on airlines.Projects;
};

service UnmanagedAssociations {
	entity Room @readonly as projection on airlines.UnmanagedAssociations.Room;
	entity Employee @readonly as projection on airlines.UnmanagedAssociations.Employee;
	entity Thing @readonly as projection on airlines.UnmanagedAssociations.Thing;
};

// service ManagedAssociations {
// 	entity Passengers @readonly as projection on airlines.ManagedAssociations.Passengers;
// 	entity Flights @readonly as projection on airlines.ManagedAssociations.Flights;
	
// };


service postFixProjection {
	entity Passengers1 @readonly as select from airlines.ServiceDemo.Passengers { PNR, name, age };  
};

service smartSelector {
	entity Flights1 @readonly as select from airlines.ServiceDemo.Flights { flightModel, DOJ AS DATE_OF_JOURNEY}; 
};


service inWhereClause {
	entity Flights4 @readonly as select from airlines.ServiceDemo.Flights where flightModel = 707;
};

service excludeClause {
	entity Passengers4 @readonly as select from airlines.ServiceDemo.Passengers {*} excluding { contact };	
};

service ViewsDemo {
	entity PassengersView @readonly as projection on airlines.ViewsDemo.PassengersView;
	entity InnerJoinView @readonly as projection on airlines.ViewsDemo.InnerJoinView;
	entity LeftOuterJoinView @readonly as projection on airlines.ViewsDemo.LeftOuterJoinView;
	entity ViewWithInputParam(PNR : Integer) as select from airlines.ViewsDemo.ViewWithInputParam(PNR : :PNR) {*};
};



