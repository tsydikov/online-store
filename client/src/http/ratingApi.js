import {$authHost} from "./index";

export const createRate = async (rate, userId, deviceId) => {
  const {data} = await $authHost.post("api/rating", {rate, userId, deviceId});
  return data;
};

export const getRatingByDeviceId = async (id) => {
  const {data} = await $authHost.get("api/rating/device/" + id);
  return data
}

export const getRatingByDeviceIdAndUserId = async (deviceId, userId) => {
  const {data} = await $authHost.get("api/rating/du", {
    params: {
      deviceId:deviceId,
      userId:userId,
    }
  });
  return data
}

