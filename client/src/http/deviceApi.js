import {$authHost, $host} from "./index";
// import jwt_decode from 'jwt-decode'

export const createDevice = async (device) => {
    const {data} = await $authHost.post("api/device", device);
    return data;
};
export const fetchDevices = async (typeId, brandId, page = 1, limit = 10, search = '') => {
    const {data} = await $host.get("api/device", {
        params: {
            typeId,
            brandId,
            page,
            limit,
            search,
        },
    });
    return data;
};
export const fetchOneDevice = async (id) => {
    const {data} = await $host.get("api/device/id/" + id);
    return data;
};

export const fetchOneDeviceByName = async (name) => {
    const {data} = await $authHost.get(`api/device/name/`,{
        params: {name:name}
    });
    return data;
};

export const updateDevice = async (id, device) => {
    const {data} = await $authHost.patch(`api/device/${id}`, device);
    return data;
};

export const updateDeviceRating = async (id, rating) => {
    const {data} = await $authHost.patch(`api/device/rating/${id}`, {rating:rating});
    return data;
};

export const deleteDevice = async (id) => {
    const {data} = await $authHost.delete("api/device/" + id);
    return data;
};