using { my.airlines as my} from '../db/data-model';


service booking  {

	@readonly entity Flight  as projection on my.Flight;
	entity Passenger as projection on my.Passenger;
	entity Cancel_booking as projection on my.Passenger;
};

