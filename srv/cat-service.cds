using { my.airlines } from '../db/data-model';
// using { my.airlines.UnmanagedAssociations as unmanagedassociation } from '../db/data-model';

service CQL {
  entity PostfixProjections @readonly as projection on airlines.Engineers {ID, name.firstName};
  entity SmartSelector @readonly as select from airlines.Engineers { *, project.title as project };
  entity Engineers @readonly as select from airlines.Engineers { * };
  entity Projects @readonly as select from airlines.Projects { *, engineers : redirected to Engineers };
  entity PEselect @readonly as select ID, name, project.title from airlines.Engineers;
  entity PEwhere @readonly as select from airlines.Engineers where project.title = 'Exide';
  entity ExcludeClause @readonly as select from airlines.Engineers excluding { project };
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
	entity ViewWithInputParam(@required PNR : Integer) as select from airlines.ViewsDemo.ViewWithInputParam(PNR : :PNR) {*};
};



