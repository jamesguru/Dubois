import React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

import { Close } from "@material-ui/icons";

import StarRating from "react-star-ratings";

import { toast, ToastContainer } from "react-toastify";

import { useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  width: 100%;

  height: 100%;

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
  position: relative;
  display: flex;

  flex-direction: column;

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

const Item = styled.div`
  display: flex;

  flex-direction: column;

  width: 100%;

  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 40px;

  width: 70%;

  margin: 10px;

  font-size: 15px;

  font-weight: 700;
`;

const Name = styled.input`
  height: 40px;
`;

const Button = styled.button`
  background-color: #ff7ba9;

  border: none;

  color: white;

  width: 50%;

  padding: 10px;

  font-weight: 700;

  margin-top: 15px;

  font-size: 20px;

  cursor: pointer;
`;

const ModalReview = ({ name, id, orderId, status, setOpen }) => {
  const [comment, setComment] = React.useState("");

  const [rating, setRating] = React.useState(0);

  const user = useSelector((state) => state.user.currentUser);

  const handlePostComment = async () => {
    const singleRating = {
      star: rating,
      name: name,
      postedBy: user._id,
      comment: comment,
    };

    (await rating) &&
      name &&
      comment &&
      publicRequest.put(`/products/ratings/${id}`, singleRating);

    await publicRequest.put(`/orders/${orderId}`, { status: 4 });

    toast.success("Thank You for reviewing the product!!");
    setOpen(false);
  };

  return (
    <Container>
      <Wrapper>
        <Close
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            top: "-12",
            right: "-12",
            color: "white",
            backgroundColor: "#d1411e",
            height: "35px",
            width: "35px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        />

        <Title style={{ color: "black" }}>Review Product</Title>

        <h3 style={{ marginBottom: "20px" }}>
          {" "}
          Hi <strong> {name}</strong> help other customer's by reviewing this
          product.
        </h3>

        <StarRating
          name={name}
          numberOfStars={5}
          rating={rating}
          isSelectable={true}
          starRatedColor={"#FF7BA9"}
          changeRating={(newRating) => {
            setRating(newRating);
          }}
        />

        <Input
          placeholder="say something"
          onChange={(e) => setComment(e.target.value)}
        />

        <span>{status}</span>

        <Button onClick={handlePostComment}>Post Review</Button>

        <ToastContainer />
      </Wrapper>
    </Container>
  );
};

export default ModalReview;
