using { my.airlines } from '../db/data-model';
// using { my.airlines.UnmanagedAssociations as unmanagedassociation } from '../db/data-model';

service Airlines {
  entity Passengers @readonly as projection on airlines.Passengers;
  entity Flights @readonly as projection on airlines.Flights;
  entity Engineers @readonly as projection on airlines.Engineers;
  entity Projects @readonly as projection on airlines.Projects;
};

service UnmanagedAssociations {
	entity Room @readonly as projection on airlines.UnmanagedAssociations.Room;
	entity Employee @readonly as projection on airlines.UnmanagedAssociations.Employee;
	entity Thing @readonly as projection on airlines.UnmanagedAssociations.Thing;
};