import Address from "../../entity/address";
import EventInterface from "../@shared/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;
  idCustomer: string;
  nameCustomer: string;
  addressCustomer: Address;


  
  constructor(eventData: any, idCustomer: string, nameCustomer: string, addressCustomer: Address) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
    this.idCustomer = idCustomer;
    this.nameCustomer = nameCustomer;
    this.addressCustomer = addressCustomer;
  }
}