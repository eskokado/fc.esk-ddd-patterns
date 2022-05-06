import EventInterface from "../../@shared/event/event.interface";
import Address from "../value-object/address";


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