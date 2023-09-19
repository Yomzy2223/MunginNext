import axios from "axios";
import { toast } from "react-hot-toast";

const client = axios.create({
  baseURL: "https://crop-profiles.herokuapp.com/api/v1",
});

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

export const registerFarmer = async (formData) => {
  let farms = [];
  Array.from({ length: parseInt(formData?.farmsNumber) }, () => "").map(
    (el, i) =>
      (farms[i] = {
        nameOfFarm: `Farm ${i + 1}`,
        location: `Location ${i + 1}`,
        farmSize: formData["farmSize" + i],
        farmType: formData["farmType" + i],
        crops: formData["cropNames" + i] || [],
        animals: formData["animalNames" + i] || ["das"],
      })
  );

  let requiredData = {
    fullName: formData?.fullname,
    email: formData?.email,
    phoneNumber: formData?.phone,
    password: formData?.password,
    confirmPassword: formData?.password,
    gender: formData?.gender?.toUpperCase(),
    occupation: "FARMER",
    country: "Nigeria",
    phoneNumber_2: formData?.phone2 || "09890",
    numberOfFarms: formData?.farmsNumber,
    farms,
  };
  console.log(requiredData);
  try {
    let response = await client.post("/auth/farm/register", requiredData);
    console.log(response);
    if (response?.data?.phoneNumber) toast.success("Registration successful");
    return true;
  } catch (e) {
    if (e?.message?.toString() === "Network Error") toast.error(e.message);
    else toast.error("Error occured");
    // else toast.error(e?.response?.data);
    console.log(e);
    return false;
  }
};

export const registerInstitution = async (formData) => {
  let requiredData = {
    fullName: formData?.fullname,
    email: formData?.email,
    gender: formData?.gender,
    password: formData?.password,
    confirmPassword: formData?.password,
    phoneNumber: formData?.phone,
    country: "Nigeria",
    institutionName: formData?.institutionName,
    institutionPlace: formData?.location,
    areaOfInterest: formData?.areaOfInterest,
  };
  console.log(requiredData);
  try {
    let response = await client.post("/auth/institution/register", requiredData);
    console.log(response);
    if (response?.data?.phoneNumber) toast.success("Registration successful");
    return true;
  } catch (e) {
    if (e?.message?.toString() === "Network Error") toast.error(e.message);
    else toast.error("Error occured");
    // else toast.error(e?.response?.data);
    console.log(e);
    return false;
  }
};

export const registerInvestor = async (formData) => {
  let requiredData = {
    fullName: formData?.fullname,
    password: formData?.password,
    email: formData?.email,
    phoneNumber: formData?.phone,
    gender: formData?.gender,
    phoneNumber_2: "null",
    country: "Nigeria",
    companyName: formData?.companyName,
    companyWebsite: formData?.companyWebsite,
    areaOfInterest: formData?.areaOfInterest,
  };
  console.log(requiredData);
  try {
    let response = await client.post("/auth/investors/register", requiredData);
    console.log(response);
    if (response?.data?.phoneNumber) toast.success("Registration successful");
    return true;
  } catch (e) {
    if (e?.message?.toString() === "Network Error") toast.error(e.message);
    else toast.error("Error occured");
    // else toast.error(e?.response?.data);
    console.log(e);
    return false;
  }
};

export const registerServiceProvider = async (formData) => {
  let requiredData = {
    fullName: formData?.fullname,
    password: formData?.password,
    email: formData?.email,
    phoneNumber: formData?.phone,
    gender: formData?.gender,
    country: "Nigeria",
    companyName: formData?.companyName,
    serviceOffering: formData?.serviceOffering,
  };
  console.log(requiredData);
  try {
    let response = await client.post("/auth/provider/register", requiredData);
    console.log(response);
    if (response?.data?.phoneNumber) toast.success("Registration successful");
    return true;
  } catch (e) {
    if (e?.message?.toString() === "Network Error") toast.error(e.message);
    else toast.error("Error occured");
    // else toast.error(e?.response?.data);
    console.log(e);
    return false;
  }
};

export const registerIndividual = async (formData) => {
  let requiredData = {
    fullName: formData?.fullname,
    password: formData?.password,
    email: formData?.email,
    phoneNumber: formData?.phone,
    gender: formData?.gender,
    phoneNumber_2: "null",
    country: "Nigeria",
  };
  console.log(requiredData);
  try {
    let response = await client.post("/auth/individual/register", requiredData);
    console.log(response);
    if (response?.data?.phoneNumber) toast.success("Registration successful");
    return true;
  } catch (e) {
    if (e?.message?.toString() === "Network Error") toast.error(e.message);
    else toast.error("Error occured");
    // else toast.error(e?.response?.data);
    console.log(e);
    return false;
  }
};
