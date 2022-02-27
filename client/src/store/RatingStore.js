import { makeAutoObservable } from "mobx";

export default class RatingStore {
    constructor() {
        this._ratings = [{id:1},{id:2},{id:3},{id:4},{id:5}]
        this._selectedRating = {}
        makeAutoObservable(this)
    }

    setRatings(ratings) {
        this._ratings = ratings
    }

    setSelectedRating(rating) {
        this._selectedRating = rating
    }

    get ratings() {
        return this._ratings
    }
    get selectedRating() {
        return this._selectedRating
    }
}