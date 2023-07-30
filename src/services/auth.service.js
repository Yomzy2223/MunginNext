import axios from "axios";
import { toast } from "react-hot-toast";
const API_URL = "https://crop-profiles.herokuapp.com/api/v1/auth/";
const APP_URL = process.env.NODE_ENV === "production" ? "" : "localhost:3000";

const client = axios.create({
  baseURL: "https://crop-profiles.herokuapp.com/api/v1",
});

class AuthService {
  login = (email, password) => {
    return axios.post(API_URL + `login`, {
      email,
      password,
    });
    // .then((response) => {
    //   console.log(response);
    //   if (response.data) {
    //     localStorage.setItem("user", JSON.stringify(response.data));
    //   }
    //   return response.data;
    // });
  };

  logout = () => {
    localStorage.removeItem("user");
  };
  register = (
    email,
    password,
    fullName,
    farmer,
    numberOfFarm,
    farmName,
    location,
    animalName,
    animalsize,
    cropName,
    cropsize,
    produceName,
    othersize
  ) => {
    return axios.post(API_URL + "register", {
      email,
      password,
      fullName,
      farmer,
      numberOfFarm,
      farmName,
      location,
      animalName,
      animalsize,
      cropName,
      cropsize,
      produceName,
      othersize,
    });
  };

  getCurrentUser = () => {
    JSON.parse(localStorage.getItem("user"));
  };
}

export const loginUser = async (formData) => {
  let requiredData = {
    phoneNumber: formData.phoneNumber,
    // password: formData.password,
  };
  try {
    let response = await client.post("/auth/login", requiredData);
    toast.success("Login successful");
    console.log(response);
    return true;
  } catch (e) {
    if (e.message.toString() === "Network Error") toast.error(e.message);
    else toast.error(e.response.data ? e.response.data.error : "Error");
    return false;
  }
};

export const registerUser = async (formData) => {
  console.log(formData);
  let requiredData = {
    fullName: formData.fullName,
    // password: formData.password,
    email: formData.email,
    isFarmer: formData.farmer.toString(),
    numberOfFarm: formData.numberOfFarm,
    farmName: formData.farmName,
    location: formData.location,
    type: formData.farmType,
    animalName: formData.animalName,
    phoneNumber: formData.phoneNumber,
    averageFarmYield: formData.averageFarmYield,
    farmSize: formData.farmSize,
  };
  console.log(requiredData);
  try {
    let response = await client.post("/auth/farm/register", requiredData);
    console.log(response);
    if (response?.data?.phoneNumber) toast.success("Registration successful");
    return true;
  } catch (e) {
    if (e?.message?.toString() === "Network Error") toast.error(e.message);
    else toast.error(e?.response?.data);
    console.log(e);
    return false;
  }
};

export const getCrops = async () => {
  try {
    let response = await client.get("/crop/returns");
    return response.data;
  } catch (e) {
    if (e?.message?.toString() === "Network Error")
      toast.error("Network error");
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
    if (e?.message?.toString() === "Network Error")
      toast.error("Network error");
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
        (each) =>
          each?.toLowerCase() === el.properties.state.slice(0, 2)?.toLowerCase()
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
        (each) =>
          each?.toLowerCase() === el.properties.state.slice(0, 2)?.toLowerCase()
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
