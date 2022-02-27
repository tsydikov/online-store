import {$authHost, $host} from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post("api/type", type);
    return data;
};
export const deleteType = async (id) => {
    const {data} = await $authHost.delete("api/type/" + id);
    return data;
};
export const fetchTypes = async () => {
    const {data} = await $host.get("api/type");
    return data;
};
export const updateType = async (id, newName) => {
    const {data} = await $authHost.patch(`api/type/${id}`,{newName});
    return data;
};