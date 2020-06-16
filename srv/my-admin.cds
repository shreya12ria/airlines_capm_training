using { my.airlines as air} from '../db/data-model';


service admin  {
	 entity Flight_admin  as projection on air.Flight;
	 entity Passenger_admin as projection on air.Passenger;
};