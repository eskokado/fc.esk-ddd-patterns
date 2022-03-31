import EventHandlerInterface from "../../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class SendConsoleLogWhenAddressOfCustomerIsChangedHanler 
  implements EventHandlerInterface<CustomerAddressChangedEvent>{
  handle(event: CustomerAddressChangedEvent): void {
    console.log(`Endereço do cliente: ${event.idCustomer}, ${event.nameCustomer} alterado para: ${event.addressCustomer}`);
  }
}