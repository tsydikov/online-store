import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';
import RatingStore from "./store/RatingStore";
import AlertStore from "./store/AlertStore";

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
    rating: new RatingStore(),
    alert: new AlertStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
