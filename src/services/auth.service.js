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
      toast.error("Please check your internet connection");
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
      toast.error("Please check your internet connection");
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
    if (e.message.toString() === "Network Error")
      toast.error("Please check your internet connection");
    else toast.error(e.response.data);
    console.log(e);
    return e.response.data;
  }
};

export const getMapInfo = async (state) => {
  try {
    let response = await client.get(
      `https://crop-profiles.herokuapp.com/api/v1/geo/spatial/state?state=${state}`
    );
    // console.log(JSON.parse(response.data));
    return response.data;
  } catch (e) {
    if (e.message.toString() === "Network Error")
      toast.error("Please check your internet connection");
    // else toast.error(e.response.data);
    return e;
  }
};

// export const getMapInfo = async (pageNumber) => {
//   try {
//     let response = await client.get(
//       `/geo/spatial/load?pageNumber=${pageNumber}&pageSize=1000`
//     );
//     // console.log(JSON.parse(response.data));
//     return response.data;
//   } catch (e) {
//     if (e.message.toString() === "Network Error")
//       toast.error("Please check your internet connection");
//     // else toast.error(e.response.data);
//     return e;
//   }
// };

export default new AuthService();
