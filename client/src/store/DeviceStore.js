import { makeAutoObservable } from "mobx";

export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._basket = []
        this._page = 1
        this._totalCount = 0
        this._limit = 10
        this._search = ''
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }
    setBasket(basket) {
        this._basket = basket
    }
    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand= brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setSearch(search) {
        this._search = search
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
    get basket() {
        return this._basket
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    get search() {
        return this._search
    }
}