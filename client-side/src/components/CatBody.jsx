import { React, useEffect, useState } from "react";
import styled from "styled-components";

import Product from "./Product";
import { publicRequest } from "../requestMethods";
import Loader from "react-spinners/BounceLoader";
import axios from "axios";
import { categories } from "../data";

const Wrapper = styled.div`
  display: flex;

  flex-direction: column;

  justify-content: space-between;

  margin: 0px 20px;
`;

const Container = styled.div`
  display: flex;

  padding: 10px;

  flex-wrap: wrap;

  margin: 30px;

  @media screen and (max-width: 600px) {
    margin: 10px;
  }
`;

const CatBody = ({ cat }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(
          `/products?category=${cat.toLowerCase()}&page=1&limit=10`
        );

        setProducts(res.data);
      } catch (error) {
        console.log("something went wrong");
      }
    };

    getProducts();
  }, []);

  return (
    <Wrapper>
      <Container>
        {cat &&
          products?.map((item, index) => <Product item={item} key={index} />)}
        ;
      </Container>
    </Wrapper>
  );
};

export default CatBody;
