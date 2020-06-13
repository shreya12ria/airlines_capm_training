using { my.airlines as my} from '../db/data-model';


service booking  {

	entity Flight  as projection on my.Flight;
	entity passenger as projection on my.Passenger;
};

