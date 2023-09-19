import React, { useEffect } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Remove, Add } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useLocation, Prompt } from "react-router-dom";
import { publicRequest } from "../requestMethods";

import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import { Select } from "@material-ui/core";
import axios from "axios";
import Brands from "../components/Brands";
import Gallery from "../components/Gallery";
import { showAverage } from "../rating";

import RelatedProduct from "../components/RelatedProduct";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import StarRating from "react-star-ratings";
import NavCategory from "../components/NavCategory";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;

  padding: 50px;

  @media screen and (max-width: 900px) {
    display: flex;

    flex-direction: column;

    align-items: center;

    margin: 10px;

    justify-content: center;
  }
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;

  height: 70vh;

  object-fit: contain;

  ${mobile({ height: "40vh" })}

  @media screen and (max-width: 900px) {
    height: 40vh;
  }
`;

const InfoContainer = styled.div`
  flex: 1;

  padding: 0px 50px;
  ${mobile({ padding: "10px" })}

  @media screen and (max-width: 900px) {
    padding: "10px";
    margin:0px;
  }
`;

const Title = styled.h2`
  font-weight: 600;

  font-family: "Roboto";

  margin: 20px;

  @media screen and (max-width: 1200px) {
    margin-left: 40px;
  }
`;

const Desc = styled.p`
  margin: 20px 20px;
  font-weight: 800;

  @media screen and (max-width: 1200px) {
    margin-left: 0px;
  }
  @media screen and (max-width: 600px) {
    margin:0px;
  }
`;

const Discount = styled.span`
  color: #d1411e;

  position: absolute;

  top: 0;

  right: 0;
`;

const Price = styled.span`
  font-weight: 900;

  font-size: 25px;

  margin: 20px;

  @media screen and (max-width: 1200px) {
    font-size: 20px;

    margin-left: 40px;
  }
`;

const FilterContainer = styled.div`
  width: 50%;

  margin: 20px 0px;

  display: flex;

  justify-content: space-between;

  ${mobile({ width: "100%" })}

  @media screen and (max-width: 900px) {
    width: "100%";
  }

  @media screen and (max-width: 600px) {
    width: 90%;

    margin: 50px 10px;

    display: flex;

    justify-content: space-between;
  }
`;

const Filter = styled.div`
  display: flex;

  align-items: center;

  @media screen and (max-width: 600px) {
    margin: 20px;
  }
`;

const FilterTitle = styled.span`
  font-size: 15px;

  font-weight: 900;
`;

const FilterColor = styled.div`
  width: 30px;

  height: 30px;

  border-radius: 50%;

  background-color: ${(props) => props.color};

  margin: 0px 5px;

  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;

  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;

  width: 50%;

  align-items: center;

  justify-content: space-between;

  ${mobile({ width: "100%" })};

  @media screen and (max-width: 600px) {
    display: flex;

    justify-content: center;

    align-items: center;

    width: 90%;
  }
`;

const AmountController = styled.div`
  display: flex;

  align-items: center;

  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;

  height: 30px;

  border-radius: 10px;

  display: flex;

  align-items: center;

  justify-content: center;

  margin: 0px 5px;

  @media screen and (max-width: 600px) {
    margin: 10px;
  }
`;

const DescVideo = styled.video`
  margin-top: 100px;

  margin-left: 30px;

  height: 400px;

  width: 600px;

  @media screen and (max-width: 600px) {
    margin-top: 50px;
    display: flex;

    justify-content: center;

    align-items: center;

    height: 350px;

    width: 350px;
  }
`;

const Button = styled.button`
  padding: 5px;

  font-size: 20px;

  font-weight: 900;
  font-family: "Roboto";

  border: none;

  color: white;

  background-color: #ff7ba9;

  cursor: pointer;

  font-weight: 500;

  transition: all 1s ease;

  @media screen and (max-width: 600px) {
    font-size: 17px;

    margin-left: 30px;
  }
`;

const Comment = styled.div`
  display: flex;

  align-items: center;

  width: 100%;

  justify-content: center;

  flex-direction: column;

  font-size: 18px;
`;

const Wholesale = styled.div`
  color: #dcca87;

  background-color: #0c0c0c;

  font-weight: 900;

  font-size: 18px;

  margin: 20px;
  font-family: "Roboto";
  padding: 10px;

  @media screen and (max-width: 600px) {
    font-size: 12px;

    font-weight: 900;
  }
`;

const WholesaleText = styled.span`
  display: block;
  font-size:15px;
  margin:20px;
  animation: progress 0.5s ease alternate infinite;
`;

const Rating = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  @media screen and (max-width: 600px) {
    font-size: 12px;

    margin: 30px;

    text-align: center;
  }
`;

const DIV = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
`;

const Input = styled.input`
  margin: 10px 0px;
  padding: 10px;
`;

const Hightlight = styled.div`
border:2px solid #aaa;
width:70%;
font-weight:900;
whiteSpace: "pre-wrap"
padding:20px;
@media screen and (max-width: 600px) {
  width:100%;
}

`
const HightlightSpan = styled.div`
font-weight:bold;
padding:30px;
@media screen and (max-width: 600px) {
  width:100%;
}
`
const WhatInBox = styled.div`
border:2px solid #aaa;
width:70%;
font-weight:900;
whiteSpace: "pre-wrap"
padding:20px;
@media screen and (max-width: 600px) {
  width:100%;
}

`

const Head= styled.span`
font-weight:900;
font-size:25px;
font-family:"Roboto",
display:block;
padding:20px;
text-decoration:underline;
`

const Product = () => {
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const [product, setproduct] = React.useState({});
  const [relatedProducts, setRelatedProducts] = React.useState([]);

  const [comments, setComments] = React.useState([]);

  const [quantity, setQuantity] = React.useState(1);

  const [concern, setConcern] = React.useState("");

  const [skintype, setSkinType] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [add, setAdd] = React.useState(false);

  let price;

  const dispatch = useDispatch();

  const handleQuantity = (action) => {
    if (action === "dec") {
      setQuantity(quantity == 0 ? 0 : quantity - 1);
    }

    if (action === "inc") {
      setQuantity(quantity + 1);
    }
  };

  React.useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);

        setproduct(res.data);
      } catch (error) {}
    };

    getProduct();
  }, [id]);

  useEffect(() => {
    const getComment = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4444/api/comments/find/" + id
        );

        setComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getComment();
  }, [id]);

  const handleClick = () => {
    dispatch(addProduct({ ...product, concern, skintype, quantity, price }));

    toast.success("Product has been added to basket successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setDisabled(true);
  };

  const handlePrice = (
    originalPrice,
    discountedPrice,
    wholePrice,
    minimumQuantity,
    quantity
  ) => {
    if (quantity > minimumQuantity && discountedPrice) {
      discountedPrice = wholePrice;

      price = discountedPrice;

      return price;
    } else if (quantity > minimumQuantity && originalPrice) {
      originalPrice = wholePrice;

      price = originalPrice;

      return price;
    } else if (discountedPrice) {
      price = discountedPrice;

      return price;
    } else {
      price = originalPrice;

      return price;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setAdd(false);
  };

  const handleCustomer = (e) => {
    e.preventDefault();
    setAdd(true);
  };

  const VideoIframe = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `;

  const Vid = styled.div`
  margin: 40px 20px;
  `

  return (
    <Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Announcement />
      <Navbar />
      <NavCategory />

      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
          <Hightlight style={{ whiteSpace: "pre-wrap" }}>
            <Head>Hightlights</Head>
            <HightlightSpan style={{ whiteSpace: "pre-wrap" }}>
              Two in 1 Cake Powder in one packScented attractive 
              smellEvens out skin tone Rich in green teaNatural matte 
              finish, Silky smooth texture Affordable 3 shades 1,2,3;Shade 
              1 for light skin tones; Shade 2 for medium skin tones; Shade 3
              for dark skin tones
            </ HightlightSpan>
          </Hightlight>
          <WhatInBox>
          <Head>What's in Box</Head>
          <HightlightSpan >green tea 2-way powder</HightlightSpan> 

          </WhatInBox>
        </ImgContainer>

        <InfoContainer>
          <Title>{product.title}</Title>

          <Desc>{product.desc}</Desc>

          <Desc style={{ color: "green", fontSize: "20px", fontWeight: "700" }}>
            {product.inStock ? "in stock" : "not instock"}
          </Desc>

          {product && product?.ratings && product?.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <span
              style={{ display: "block", margin: "auto", fontWeight: "bold" }}
            ></span>
          )}

          <Price>
            {" "}
            ksh{" "}
            {handlePrice(
              product.originalPrice,
              product.discountedPrice,
              product.wholesalePrice,
              product.wholesaleMinimumQuantity,
              quantity
            )}
          </Price>

          <AddContainer>
            <AmountController>
              <Remove
                onClick={() => handleQuantity("dec")}
                style={{
                  backgroundColor: "#FF7BA9",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              />

              <Amount>{quantity}</Amount>
              <Add
                onClick={() => handleQuantity("inc")}
                style={{
                  backgroundColor: "#FF7BA9",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              />
            </AmountController>
            <Button onClick={handleClick} disabled={disabled}>
              add to Basket
            </Button>
          </AddContainer>

          {product.wholesalePrice &&
            product.wholesaleMinimumQuantity &&
            product.wholesaleSeller && (
              <Wholesale>
                <WholesaleText> Wholesale</WholesaleText>

                <WholesaleText>
                  From {product.wholesaleMinimumQuantity} pieces for {product.wholesalePrice}
                </WholesaleText>

                <WholesaleText>
                  {" "}
                  Wholeseller: {product.wholesaleSeller}
                </WholesaleText>

                <WholesaleText>
                  Telephone: 0727632051
                </WholesaleText>
              </Wholesale>
            )}

          
          {product.video && 
          
          <Vid>
          <iframe
            width="560" 
            height="315" 
            src={product.video}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; 
              autoplay; 
              clipboard-write; 
              encrypted-media; 
              gyroscope; 
              picture-in-picture; 
              web-share"
            allowfullscreen
          ></iframe>
          </Vid>
          }

         

          {add && (
            <DIV>
              <Input type="text" placeholder="Enter your name" />
              <Input type="text" placeholder="Enter email" />
              <Input type="text" placeholder="Enter phone number" />
              <Button onClick={handleSubmit}>Submit</Button>
            </DIV>
          )}
          <Button onClick={handleCustomer}>Become Customer</Button>
        </InfoContainer>
      </Wrapper>

      <Comment>
        <Title style={{ marginTop: "30px" }}>Reviews</Title>

        {product.ratings?.length ? (
          product.ratings?.slice(0, 4).map((rating, index) => (
            <Rating>
              <StarRating
                key={index}
                starDimension="20px"
                starRatedColor="#d1411e"
                starSpacing="2px"
                editing={false}
                rating={rating.star}
              />

              <Desc key={index}>
                <strong>{rating.name}</strong>: {rating.comment}
              </Desc>
            </Rating>
          ))
        ) : (
          <span>No ratings</span>
        )}
      </Comment>

      <Brands />

      <Newsletter />

      <Footer />
    </Container>
  );
};

export default Product;
