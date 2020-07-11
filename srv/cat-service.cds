using { my.airlines } from '../db/data-model';
// using { my.airlines.UnmanagedAssociations as unmanagedassociation } from '../db/data-model';

service CQL {
  entity PostfixProjections @readonly as projection on airlines.Engineers {ID, name.firstName};
  entity SmartSelector @readonly as projection on airlines.Engineers { *, project.title as project };
  entity PEselect @readonly as select ID, name, project.title from airlines.Engineers;
  entity PEwhere @readonly as select from airlines.Engineers where project.title = 'Exide';
  entity ExcludeClause @readonly as select from airlines.Engineers excluding { project };
}; 

service UnmanagedAssociations {
	entity Room @readonly as projection on airlines.UnmanagedAssociations.Room;
	entity Employee @readonly as projection on airlines.UnmanagedAssociations.Employee;
	entity Thing @readonly as projection on airlines.UnmanagedAssociations.Thing;
};

service ManagedAssociations {
	entity Passengers @readonly as projection on airlines.ManagedAssociations.Passengers;
	entity Flights @readonly as projection on airlines.ManagedAssociations.Flights;
	
};


service postFixProjection {
	entity Passengers1 @readonly as select from airlines.ManagedAssociations.Passengers { PNR, name, age };  
};

service smartSelector {
	entity Flights1 @readonly as select from airlines.ManagedAssociations.Flights { *, passenger4.PNR as PNR }; 
};


service inWhereClause {
	entity Flights4 @readonly as select from airlines.ManagedAssociations.Flights where passenger4.PNR = 5834;
};

service excludeClause {
	entity Passengers4 @readonly as select from airlines.ManagedAssociations.Passengers {*} excluding { flight1 };	
};

service ViewsDemo {
	entity PassengersView @readonly as projection on airlines.ViewsDemo.PassengersView;
	entity InnerJoinView @readonly as projection on airlines.ViewsDemo.InnerJoinView;
	entity LeftOuterJoinView @readonly as projection on airlines.ViewsDemo.LeftOuterJoinView;
	entity ViewWithInputParam(PNR : Integer) as select from airlines.ViewsDemo.ViewWithInputParam(PNR : :PNR) {*};
};



