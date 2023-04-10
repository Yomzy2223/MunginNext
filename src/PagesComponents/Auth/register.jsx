import React from "react";
import cocoa from "../../assets/cocoa.png";
import logo from "../../assets/images/logo-white-bg.png";
import { useState, useEffect } from "react";
import { registerUser } from "../../services/auth.service";
import { toast } from "react-hot-toast";
import { Oval } from "react-loading-icons";
import Link from "next/link";
import Image from "next/image";
import {
  Body,
  Bottom,
  BottomLinkText,
  Container,
  FieldInput,
  FieldLabel,
  Form,
  HomeLink,
  LeftContainer,
  RightContainer,
  SubmitButton,
  Title,
} from "./styled";

const RegisterComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    fullName: "",
    password: "",
    email: "",
    farmer: Boolean,
    numberOfFarm: "",
    farmName: "",
    location: "",
    animalName: "",
    farmSize: "",
    cropName: "",
    cropsize: "",
    produceName: "",
    othersize: "",
    phoneNumber: "",
    averageFarmYield: "",
  };
  const [farmer, setfarmer] = useState(true);
  const [formValues, setformValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformValues({ ...formValues, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setSuccessful(false);
    let response = await registerUser(formValues);
    setIsLoading(false);
    console.log(response);
    if (response) {
      toast.success("Account created successfully");
      navigate("/");
    }
  };

  // form validation
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fullName) {
      errors.fullName = "name is required!";
    }
    if (farmer == null) {
      errors.farmer = "cannot be blank!";
    }

    return errors;
  };

  // test farmer
  console.log(farmer);

  return (
    // parent container
    <Container>
      {/* left container */}
      <LeftContainer>
        <Image src={cocoa} alt="cocoa" />
      </LeftContainer>

      {/* right container */}
      <RightContainer>
        <HomeLink href={"/"}>
          <Image className="mt-6" src={logo} width={150} alt="Mungin" />
        </HomeLink>
        <Form onSubmit={handleSubmit} className="">
          <Title>Register with us</Title>
          <Body>
            {/* name container */}
            <div>
              <FieldLabel>Full Name</FieldLabel>
              <FieldInput
                type="text"
                value={formValues.fullName}
                name="fullName"
                onChange={handleChange}
                placeholder="hotel jerry"
              />
            </div>
            <div>
              <FieldLabel>Phone Number</FieldLabel>
              <FieldInput
                type="number"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            {/* number of farms */}
            <div>
              <FieldLabel>Number of farm(s)</FieldLabel>
              <FieldInput
                type="number"
                name="numberOfFarm"
                value={formValues.numberOfFarm}
                onChange={handleChange}
                placeholder="2"
              />
            </div>
            {/* farm names */}
            <div>
              <FieldLabel>Farm(s) Names</FieldLabel>
              <FieldInput
                type="text"
                name="farmName"
                value={formValues.farmName}
                onChange={handleChange}
                placeholder="Mungin farms, Zulu farms, Audu farms..."
              />
            </div>
            {/* Average crop yield */}
            <div>
              <FieldLabel>Average Farm Yield</FieldLabel>
              <FieldInput
                type="text"
                name="averageFarmYield"
                value={formValues.averageFarmYield}
                onChange={handleChange}
                placeholder="2 tons"
              />
            </div>

            {/* location */}
            <div>
              <FieldLabel>Location(s)</FieldLabel>
              <FieldInput
                type="text"
                name="location"
                value={formValues.location}
                onChange={handleChange}
                placeholder="Lagos"
              />
            </div>
            {/* drop down menu */}
            <div>
              <FieldLabel>Farm Type(s)</FieldLabel>
              <FieldInput
                type="text"
                name="farmType"
                onChange={handleChange}
                placeholder="Animal, Crop..."
              />
            </div>

            {/* Name(s) */}
            <div>
              <FieldLabel>Name(s)</FieldLabel>
              <FieldInput
                type="text"
                name="animalName"
                onChange={handleChange}
                placeholder="Goat, Maize, Cow..."
              />
            </div>
            {/* Size */}
            <div>
              <FieldLabel>Size</FieldLabel>
              <FieldInput
                type="text"
                name="farmSize"
                onChange={handleChange}
                placeholder="2 hectares"
              />
            </div>

            {/* Name(s) */}
            <div>
              <FieldLabel>Name(s)</FieldLabel>
              <FieldInput
                type="text"
                name="cropName"
                onChange={handleChange}
                placeholder="Maize, Yam, Cassava..."
              />
            </div>
            {/* Size */}
            <div>
              <FieldLabel>Size</FieldLabel>
              <FieldInput
                type="text"
                name="cropsize"
                onChange={handleChange}
                placeholder="2sqkm"
              />
            </div>

            <Bottom>
              {/* button container */}
              <SubmitButton disabled={isLoading}>
                {isLoading ? (
                  <Oval stroke="#ffffff" fill="white" width={24} height={24} />
                ) : (
                  "Register"
                )}
              </SubmitButton>
              <Link href={"/login"}>
                <BottomLinkText>
                  Already have an account?{" "}
                  <span className="text-[#333333]">Login</span>
                </BottomLinkText>
              </Link>
            </Bottom>
          </Body>
        </Form>
      </RightContainer>
    </Container>
  );
};

export default RegisterComponent;
