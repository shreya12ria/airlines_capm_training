using { my.airlines as my} from '../db/data-model';


service booking @(impl:'service.js') {
	@readonly entity Flight_search  as projection on my.Flight ;
	@insertonly entity Passenger_details as projection on my.Passenger;
	entity Cancel_booking as projection on my.Passenger;
};

service admin  {
	 entity Flight_admin  as projection on my.Flight;
	 entity Passenger_admin as projection on my.Passenger;
};