import {$authHost} from "./index";

export const putDeviceToBasket = async (basketDevice) => {
    const {data} = await $authHost.post("api/basket/", basketDevice);
    return data;
};
export const deleteDeviceFromBasket = async (deviceId,basketId) => {
    const {data} = await $authHost.delete(`api/basket/${deviceId}&${basketId}`);
    return data;
};
export const fetchBasket = async () => {
    const {data} = await $authHost.get("api/basket");
    return data;
};