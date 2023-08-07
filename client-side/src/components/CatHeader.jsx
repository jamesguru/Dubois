import React from "react";

import styled from "styled-components";

import { ArrowForward } from "@material-ui/icons";

import { Link } from "react-router-dom";

const Container = styled.div`
  margin: 30px 30px;

  background-color: #0c0c0c;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 3px;
  color: #dcca87;

  width: 30%;

  @media screen and (max-width: 900px) {
    width: 80%;
  }
`;

const Title = styled.span`
  display: flex;

  align-items: center;

  justify-content: start;

  font-size: 18px;

  margin-left: 35px;

  font-weight: 900;

  @media screen and (max-width: 900px) {
    margin-left: 10px;

    font-size: 12px;
  }
`;

const Navigate = styled.div`
  display: flex;

  align-items: center;

  cursor: pointer;
`;

const Text = styled.span`
  font-weight: bold;

  margin: 10px;
`;

const CatHeader = ({ title, category }) => {
  return (
    <Container>
      <Title>{title}</Title>

      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/products/${category.toLowerCase()}`}
      >
        <Navigate>
          <Text>Explore</Text>

          <ArrowForward />
        </Navigate>
      </Link>
    </Container>
  );
};

export default CatHeader;
