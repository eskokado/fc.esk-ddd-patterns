import Customer from "../entity/customer";
import RepositoryInterface from "../../../@shared/repository/repository-interface";
import CustomerInterface from "../entity/customer.interface";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<CustomerInterface> {}