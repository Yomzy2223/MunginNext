import React, { useState, useEffect } from "react";
import cocoa from "../../assets/cocoa.png";
import logo from "../../assets/images/logo-white-bg.png";
import { loginUser } from "../../services/auth.service";
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
import Image from "next/image";
import Link from "next/link";
import { Oval } from "react-loading-icons";

const LoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const [formValues, setformValues] = useState(initialValues);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setformValues({ ...formValues, [name]: value });
  };
  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Message, setMessage] = useState("");
  const [Successful, setSuccessful] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setformErrors(validate(formValues));
    setisSubmit(true);
    // setLoading(true);
    setIsLoading(true);
    setSuccessful(false);
    setMessage("");
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      let response = await loginUser(formValues);
      console.log(response);
      if (response === true) navigate("/");
      setIsLoading(false);
      // AuthService.login(formValues.email, formValues.password).then(
      //   () => {
      //     // <Link to={'/'}></Link>;
      //     <Navigate to={"/"} replace={true} />;
      //     // window.location.reload()
      //     setSuccessful(true);
      //     console.log(formValues);
      //   },
      //   (error) => {
      //     setMessage(error);
      //     const resMessage =
      //       (error.response &&
      //         error.response.data &&
      //         error.response.data.message) ||
      //       console.log(error.response);
      //     error.message || error.toString();
      //     setLoading(false);
      //     setMessage(resMessage);
      //     console.log(error.response);
      //   }
      // );
      // console.log(formValues);
    } else {
      setIsLoading(false);
      // setLoading(false);
    }
    console.log(Loading, "loading");
  };

  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // if (!values.email) {
    //   errors.email = "input your email!!";
    // } else if (!regex.test(values.email)) {
    //   errors.email = "please input a valid email!";
    // }
    // if (!values.password) {
    //   errors.password = "password is required!!";
    // } else if (values.password.length < 4) {
    //   errors.password = "password must be greater than 4";
    // } else if (values.password.length > 10) {
    //   errors.password = "password must be less than 10";
    // }

    return errors;
  };
  // console.log(formErrors)

  return (
    <Container className="flex ">
      <LeftContainer>
        <Image src={cocoa} alt="cocoa" />
      </LeftContainer>

      <RightContainer>
        <HomeLink href={"/"}>
          <Image src={logo} width={150} alt="Mungin" />
        </HomeLink>

        {/* form container */}
        <Form onSubmit={handleSubmit}>
          <Title>Welcome Back</Title>
          <Body>
            <div>
              <FieldLabel className="mb-2">Phone Number</FieldLabel>
              <FieldInput
                type="number"
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            <Bottom>
              <SubmitButton>
                {isLoading ? (
                  <Oval stroke="#ffffff" fill="white" width={24} height={24} />
                ) : (
                  "Login"
                )}
              </SubmitButton>
              <Link href="/register">
                <BottomLinkText>
                  Don't have an account? <span>Register</span>
                </BottomLinkText>
              </Link>
            </Bottom>
          </Body>
        </Form>
      </RightContainer>
    </Container>
  );
};

export default LoginComponent;
