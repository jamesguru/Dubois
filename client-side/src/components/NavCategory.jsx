import React from "react";

import styled from "styled-components";

import { NavCat } from "../data";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 70px;

  cursor: pointer;

  margin-top: 5px;

  background-color: #0c0c0c;

  @media screen and (max-width: 1100px) {
    margin: 0px;

    height: 60px;

    padding: 0px 10px;
  }
`;

const Wrapper = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  cursor: pointer;
`;

const Cat = styled.span`
  display: flex;

  align-items: center;

  justify-content: center;

  padding: 15px;
  font-size: 16px;

  margin-right: 20px;

  color: #dcca87;

  font-weight: 900;

  cursor: pointer;

  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.1);

    border-bottom: 2px solid #dcca87;
  }

  @media screen and (max-width: 600px) {
    margin-right: 2px;
    font-size: 10px;
    
  }
 
`;

const NavCategory = () => {
  return (
    <Container>
      <Wrapper>
        <Link
          to="/products/all"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          <Cat>All products</Cat>
        </Link>

        {NavCat.map((cat) => (
          <Link
            to={`/products/${cat.cat}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Cat>{cat.title}</Cat>
          </Link>
        ))}
      </Wrapper>
    </Container>
  );
};

export default NavCategory;
