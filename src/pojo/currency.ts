// @ts-ignore
import Dinero from "dinero.js";

export class Currency {

  private amount : number;
  private location : String;

  // This object should REALLY be smart enough to take in any string 
  // OR number and make it work

  constructor(amount : number | string, location? : String) {

    if (typeof(amount) === 'string') {
      this.amount = Number(amount);
    } else {
      this.amount = amount;
    }

    if (!location) {
      this.location = 'USD';
    } else {
      this.location = location;
    }
  }

  public getAmount() {
    return this.amount;
  }

  add(currency : Currency) {
    const resultDinero = this._toDinero(this).add(this._toDinero(currency));
    return new Currency(resultDinero.toUnit(), resultDinero.getCurrency());
  }

  _toDinero(currency : Currency) {
    return Dinero({
      amount : currency.amount * 100,
      currency: currency.location,
    });
  }

  toString() {
    const asDinero = this._toDinero(this);
    return asDinero.toFormat('$0,0.00');
  }

  static fromString(string : string) {

    const noDollarSign = string.replace('$', '');
    const noCommas = noDollarSign.replace(',', '');
    const number = Number(noCommas);

    return new Currency(number, 'USD');
  }

  copy() {
    return new Currency(this.amount, this.location);
  }

  equals(currency : Currency) {
    const areAmountsEqual = () => {
      let areAmountsEqual = false;
      if (isNaN(this.amount) && isNaN(currency.amount)) {
        areAmountsEqual = true;
      } else {
        areAmountsEqual = this.amount === currency.amount;
      }
      return areAmountsEqual;
    }

    const locationEqual = this.location === this.location;

    return areAmountsEqual() && locationEqual;
  }
}
