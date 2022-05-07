import Notification from "../../@shared/notification/notification";

export default class Address {

    _street: string = "";
    _number: number = 0;
    _zip: string = "";
    _city: string = "";
    
    protected _notificationAddress: Notification;

    constructor(street: string, number: number, zip: string, city: string) {

        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;

        this._notificationAddress = new Notification();

        this.validate();
    }

    get notificationAddress(): Notification {
        return this._notificationAddress;
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get zip(): string {
        return this._zip;
    }

    get city(): string {
        return this._city;
    }

    validate() {
        if (this._street.length === 0) {
            this._notificationAddress.addError({
                message: "Street is required",
                context: "address"
            });
        }
        if (this._number === 0) {
            this._notificationAddress.addError({
                message: "Number is required",
                context: "address"
            });
        }
        if (this._zip.length === 0) {
            this._notificationAddress.addError({
                message: "Zip is required",
                context: "address"
            });
        }
        if (this._city.length === 0) {
            this._notificationAddress.addError({
                message: "City is required",
                context: "address"
            });
        }
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
    }
}