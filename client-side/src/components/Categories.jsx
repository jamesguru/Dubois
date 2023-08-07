import styled from "styled-components";
import { React, useEffect, useState } from "react";

import { publicRequest } from "../requestMethods";

import CatHeader from "./CatHeader";
import CatBody from "./CatBody";

const Container = styled.div`
  background-color: #AAAAA;
`;

const CategoryItem = styled.div`
  display: flex;

  flex-direction: column;
`;

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await publicRequest.get("/category/");

        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  console.log(categories);

  return (
    <Container>
      {categories.length &&
        categories.map((cat) => (
          <>
            <CategoryItem>
              <CatHeader title={cat.title} category={cat.category} />
              <CatBody cat={cat.category} />
            </CategoryItem>
          </>
        ))}
    </Container>
  );
};

export default Categories;
