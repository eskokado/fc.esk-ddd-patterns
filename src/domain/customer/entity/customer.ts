import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";
import CustomerInterface from "./customer.interface";

export default class Customer extends Entity implements CustomerInterface{
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get Address(): Address {
    return this._address;
  }

  changeAddress(address: Address) {
    this._address = address;
    this.validateAddress();
  }  

  isActive(): boolean {
      return this._active;
  }

  checkErrors() {
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate() {
    CustomerValidatorFactory.create().validate(this);
  }

  validateAddress() {
    if (this._address.notificationAddress.hasErrors()) {
      this._address.notificationAddress.getErrors().map((error) => {
        this.notification.addError(error);
      });
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {         
    if (this._address === undefined) {
      this.notification.addError({
        message: "Address is mandatory to activate a customer",
        context: "customer"
      });
    }
    
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  set Address(address: Address) {
      this._address = address;
  }

  addRewardPoints(points: number) {
      this._rewardPoints += points;
  }
}
