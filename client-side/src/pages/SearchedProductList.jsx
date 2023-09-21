import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Products from "../components/Products";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import Brands from "../components/Brands";
import NavCategory from "../components/NavCategory";

const Container = styled.div``;

const Title = styled.h3`
  margin: 10px;

  background-color: #ff7ba9;

  width: 15%;

  color: white;

  text-align: center;
`;

const FilterContainer = styled.div`
  display: flex;

  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;

  ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })}

  @media screen and (max-width: 600px) {
    margin: 0px 20px;

    display: flex;

    flex-direction: column;
  }
`;

const FilterText = styled.span`
  font-size: 20px;

  font-weight: 900;

  margin-right: 20px;

  ${mobile({ marginRight: "0px" })}

  @media screen and (max-width: 600px) {
    margin-right: 0px;

    font-size: 13px;
  }
`;
const Select = styled.select`
  padding: 10px;

  margin-right: 20px;

  ${mobile({ margin: "10px 0px" })}

  @media screen and (max-width: 600px) {
    margin: 10px 0px;

    padding: 5px;
  }
`;

const Option = styled.option`
  font-size: 16px;
  font-weight: 900;
`;
const SearchProductList = () => {
  const location = useLocation();
  const shop = "";
  const query = location.pathname.split("/")[2];

  const cat = "";

  const [filters, setFilters] = React.useState({});

  const [sort, setSort] = React.useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;

    setFilters({
      ...filters,

      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <NavCategory />

      <Title>{query.toUpperCase()}</Title>

      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>

          <Select name="concern" onChange={handleFilters}>
            <Option disabled selected>
              Concern
            </Option>

            <Option>Dry Skin</Option>
            <Option>Pigmentation</Option>
            <Option>Oil Control</Option>
            <Option>Anti Acne</Option>
            <Option>Sunburn</Option>
            <Option>Skin Brightening</Option>
            <Option>Tan Removal</Option>
            <Option>Night Routine</Option>
            <Option>UV Protection</Option>
            <Option>Damaged Hair</Option>
            <Option>Frizzy Hair</Option>
            <Option>Stretch Marks</Option>
            <Option>Color Protection</Option>
            <Option>Dry Hair</Option>
            <Option>Soothing</Option>
            <Option>Dandruff</Option>
            <Option>Greying</Option>
            <Option>Hairfall</Option>
            <Option>Hair Color</Option>
            <Option>Well Being</Option>
            <Option>Acne</Option>
            <Option>HairGrowth </Option>
          </Select>

          <Select name="brand" onChange={handleFilters}>
            <Option disabled selected>
              Popular Brands
            </Option>

            <Option>Garnier</Option>
            <Option>Kylie</Option>
            <Option>Kiss Beauty</Option>
            <Option>Dr Rashel</Option>
            <Option>Luron</Option>
            <Option>Nivea</Option>
            <Option>Heaven Dove</Option>
            <Option>Disaar</Option>
            <Option>Johnsons Baby</Option>
            <Option>Rexona</Option>
            <Option>Kylie</Option>
          </Select>

          <Select name="skintype" onChange={handleFilters}>
            <Option selected disabled>
              Skin type
            </Option>

            <Option>All</Option>
            <Option>Oily</Option>
            <Option>Dry</Option>
            <Option>Sensitive</Option>
            <Option>Normal</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>

          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price(asc)</Option>
            <Option value="desc">Price(desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>

      <Products query={query} shop={shop} cat={cat} filters={filters} sort={sort} />

      <Newsletter />

      <Footer />
    </Container>
  );
};

export default SearchProductList;
