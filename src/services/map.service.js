import axios from "axios";
import { toast } from "react-hot-toast";

// const client = axios.create({
//   baseURL: "https://crop-profiles.herokuapp.com/api/v1",
// });
const client = axios.create({
  baseURL: "https://ec2-18-188-173-94.us-east-2.compute.amazonaws.com/api/v1",
});

export const getCrops = async () => {
  try {
    let response = await client.get("/crop/returns");
    return response.data;
  } catch (e) {
    if (e?.message?.toString() === "Network Error") toast.error("Network error");
    else toast.error(e?.response?.data);
    console.log(e);
    return e?.response?.data;
  }
};

export const getCropDetails = async (id) => {
  try {
    let response = await client.get(`/crop/lazy?id=${id}`);
    return response.data;
  } catch (e) {
    if (e?.message?.toString() === "Network Error") toast.error("Network error");
    else toast.error(e?.response?.data);
    console.log(e);
    return e?.response?.data;
  }
};

export const analyzeCrop = async (searchParams) => {
  try {
    // console.log(`/crop/yield/check${searchParams}`);
    let response = await client.put(`/crop/yield/check${searchParams}`);
    return response.data;
  } catch (e) {
    if (e.message.toString() === "Network Error") toast.error("Network error");
    else toast.error(e.response.data);
    console.log(e);
    return e.response.data;
  }
};

export const getMapInfo = async (state) => {
  try {
    let response = await client.get(`/geo/spatial/state?state=${state}`);
    // console.log(JSON.parse(response.data));
    return response.data;
  } catch (e) {
    if (e.message.toString() === "Network Error") toast.error("Network error");
    // else toast.error(e.response.data);
    return e;
  }
};

export const getMapAirportInfo = async () => {
  try {
    let response = await client.get(`/geo/airport`);
    let data = response.data;
    const airportStates = JSON.parse(localStorage.getItem("airportsStates"));
    data = data.filter((el) =>
      airportStates.find(
        (each) => each?.toLowerCase() === el.properties.state.slice(0, 2)?.toLowerCase()
      )
    );
    return data;
  } catch (e) {
    if (e.message.toString() === "Network Error") toast.error("Network error");
    // else toast.error(e.response.data);
    return e;
  }
};

export const getMapSeaportInfo = async () => {
  try {
    let response = await client.get(`/geo/seaport`);
    let data = response.data;
    const airportStates = JSON.parse(localStorage.getItem("seaportsStates"));
    data = data.filter((el) =>
      airportStates.find(
        (each) => each?.toLowerCase() === el.properties.state.slice(0, 2)?.toLowerCase()
      )
    );
    return data;
  } catch (e) {
    if (e.message.toString() === "Network Error") toast.error("Network error");
    // else toast.error(e.response.data);
    return e;
  }
};

export const getMarketInfo = async (state) => {
  try {
    let response = await client.get(`/geo/market/state?state=${state}`);
    return response.data;
  } catch (e) {
    if (e.message.toString() === "Network Error") toast.error("Network error");
    // else toast.error(e.response.data);
    return e;
  }
};

export const getRailTracks = async () => {
  try {
    let response = await client.get(`/geo/rail/tracks`);
    return response.data;
  } catch (e) {
    if (e.message.toString() === "Network Error") toast.error("Network error");
    return e;
  }
};

export const getWeatherInfo = async (state) => {
  try {
    let response = await client.get(`/geo/current?state=${state}`);
    return response.data;
  } catch (e) {
    if (e.message.toString() === "Network Error") toast.error("Network error");
    return e;
  }
};

export const getFactoryInfo = async (state) => {
  try {
    let response = await client.get(`/geo/factory/state?state=${state}`);
    return response.data;
  } catch (e) {
    if (e.message.toString() === "Network Error") toast.error("Network error");
    // else toast.error(e.response.data);
    return e;
  }
};

export const getElectricityInfo = async (state) => {
  try {
    let response = await client.get(`/geo/electric/state?state=${state}`);
    return response.data;
  } catch (e) {
    if (e.message.toString() === "Network Error") toast.error("Network error");
    // else toast.error(e.response.data);
    return e;
  }
};

export const getPowerInfo = async () => {
  try {
    let response = await client.get(`/geo/power`);
    return response.data;
  } catch (e) {
    if (e.message.toString() === "Network Error") toast.error("Network error");
    return e;
  }
};
