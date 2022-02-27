import { makeAutoObservable } from "mobx";

export default class AlertStore {
  constructor() {
    this._alert = false
    makeAutoObservable(this)
  }

  setAlert(bool) {
    this._alert = bool
  }

  get alert() {
    return this._alert
  }

}