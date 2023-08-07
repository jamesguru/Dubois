import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Close } from "@material-ui/icons";

const Container = styled.div`
  width: 100%;

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
  width: 500px;

  background-color: white;

  border-radius: 5px;

  padding: 30px;

  display: flex;

  flex-direction: column;
  position: relative;

  align-items: center;

  justify-content: center;

  @media screen and (max-width: 600px) {
    width: 300px;
  }
`;

const Title = styled.span`
  font-weight: 700;

  font-size: 18px;

  display: block;

  color: #d1411e;

  margin-bottom: 20px;

  text-align: center;
`;

const Head = styled.h2`




}


`;

const Item = styled.div`
  display: flex;

  flex-direction: column;

  width: 100%;

  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Name = styled.input`
  height: 40px;
`;

const Button = styled.button`
  background-color: #ff7ba9;

  border: none;

  color: white;

  width: 70%;

  padding: 10px;

  font-weight: 700;

  margin-top: 20px;

  font-size: 20px;

  cursor: pointer;
`;

const Select = styled.select`
  padding: "20px";

  width: 20%;
`;

const Option = styled.option`
  font-size: 16px;

  font-weight: bold;
`;

const ModalLogin = ({ setOpen }) => {
  return (
    <Container>
      <Wrapper>
        <Title style={{ color: "black" }}>You are not authenticated</Title>
        <Title style={{ color: "black" }}>Login to proceed</Title>

        <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>
          <Title style={{ textDecoration: "underline" }}>
            Login to proceed
          </Title>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default ModalLogin;
