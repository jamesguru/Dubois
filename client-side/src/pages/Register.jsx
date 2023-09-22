import styled from "styled-components";

import React from "react";

import { mobile } from "../responsive";
import axios from "axios";
import { Redirect, Link, useHistory } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import NavCategory from "../components/NavCategory";

import { Close } from "@material-ui/icons";

const Container = styled.div`
  width: 100vw;

  height: 100vh;

  position: absolute;

  top: 0;

  left: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  background-color: rgba(0, 0, 0, 0.6);

  z-index: 999;

  @media screen and (max-width: 600px) {
    width: 100%;

    height: 100vh;
  }
`;

const Wrapper = styled.div`
  width: 40%;

  padding: 20px;

  background-color: white;

  border: 2px solid grey;

  border-radius: 10px;

  @media screen and (max-width: 900px) {
    width: 75%;

    padding: 20px;
  }
`;

const Image = styled.img`
  object-fit: cover;

  width: 100%;

  height: 150px;

  margin: 10px;

  @media screen and (max-width: 900px) {
    height: 100px;
  }
`;

const Title = styled.h1`
  font-size: 24px;

  font-weight: 700;
`;

const Form = styled.form`
  display: flex;

  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;

  min-width: 40%;

  font-size: 18px;

  font-weight: 900;

  margin: 20px 10px 0px 0px;

  padding: 10px;

  @media screen and (max-width: 900px) {
    padding: 5px;
    font-size: 10px;
  }
`;

const Agreement = styled.span`
  font-size: 12px;

  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;

  border: none;

  padding: 15px 20px;

  background-color: #0c0c0c;

  color: #dcca87;

  font-weight: 900;

  cursor: pointer;

  @media screen and (max-width: 900px) {
    padding: 8px 10px;

    width: 100%;
    font-weight: 700;
  }
`;
const LinkClose = styled.div``;

const Error = styled.span`
  color: red;

  font-weight: 900;

  display: block;
`;

const Login = styled.span`
  font-weight: 900;

  text-decoration: underline;

  font-size: 15px;
`;

const Register = () => {
  const [username, setUsername] = React.useState("");

  const [password, setPassword] = React.useState("");

  const [failure, setFailure] = React.useState(false);

  const [confirmedPassword, setConfirmedPassword] = React.useState("");

  const [email, setEmail] = React.useState("");

  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (password === confirmedPassword) {
        const user = { username: username, password: password, email: email };
            console.log(user)
        setFailure(false);

        user && (await publicRequest.post("/auth/register", user));

        history.push("/login");
      } else {
        setFailure(true);
      }
    } catch (error) {
      setFailure(true);
    }
  };

  return (
    <>
      <Announcement />

      <Navbar />

      <NavCategory />
      <Container>
        <Wrapper>
          <LinkClose>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <Close
                style={{
                  color: "#DCCA87",
                  backgroundColor: "#0C0C0C",
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  marginTop: "-40px",
                }}
              />
            </Link>
          </LinkClose>

          <Title>CREATE AN ACCOUNT</Title>

          <Image src="/img/Marketing.png" alt="" />

          <Form>
            <Input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="confirm password"
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />

            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>

            <Button onClick={handleClick}>CREATE AN ACCOUNT</Button>
          </Form>

          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Login>You already have an account.</Login>
          </Link>

          {failure &&
            !username &&
            !email &&
            !password &&
            !confirmedPassword && (
              <Error>
                Make sure you have filled in the form and passwords match
              </Error>
            )}
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
