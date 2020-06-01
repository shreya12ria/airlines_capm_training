// using { my.bookshop, sap.common } from '../db/data-model';

// service CatalogService {
//   entity Books @readonly as projection on bookshop.Books;
//   entity Authors @readonly as projection on bookshop.Authors;
//   entity Orders @insertonly as projection on bookshop.Orders;
// }

using { my.airlines } from '../db/data-model';

service Airlines {
  entity Passengers @readonly as projection on airlines.Passengers;
  entity Flights @readonly as projection on airlines.Flights;
  
}