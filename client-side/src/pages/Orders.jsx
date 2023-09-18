import React from "react";
import styled from "styled-components";

import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import ModalLogin from "../components/ModalLogin";

import { format, render, register } from "timeago.js";

import { useEffect } from "react";

import axios from "axios";
import ModalReview from "../components/ReviewModal";
import product from "../components/Product";
import Loader from "../components/Loader";
import NavCategory from "../components/NavCategory";
import { publicRequest } from "../requestMethods";
import { Redirect } from "react-router-dom";

const Container = styled.div``;

const Wrapper = styled.div`
  margin: 5px;

  display: flex;

  justify-content: flex-start;

  align-items: center;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    justify-content: center;
  }

  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    justify-content: center;
  }
`;

const Product = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  margin: 2px;
`;

const Left = styled.div``;

const Image = styled.img`
  height: 100px;

  width: 100px;

  object-fit: contain;
`;

const Right = styled.div``;

const Title = styled.h2`
  margin: 5px;

  font-size: 25px;

  font-weight: 900;

  color: #ff7ba9;

  @media screen and (max-width: 600px) {
    font-size: 15px;
  }
`;
const ProductQuantity = styled.span`
  font-size: 18px;

  font-weight: 900;

  margin: 10px;
`;

const OrderId = styled.span`
  font-weight: 900;
`;

const Amount = styled.span`
  font-weight: 900;

  border: none;

  padding: 10px;

  font-size: 20px;
`;

const Time = styled.span`
  display: flex;

  flex-direction: column;

  margin: 5px;

  font-weight: 900;
`;

const Button = styled.button`
  background-color: #ff7ba9;

  color: white;

  font-weight: 900;

  border: none;

  padding: 10px;

  margin: 10px;

  height: 40px;

  cursor: pointer;

  font-size: 16px;

  transition: all 1s ease;
`;

const Processing = styled.span`
  background-color: #d1411e;

  color: white;

  border: none;

  padding: 10px;

  font-size: 18px;

  margin: 10px;

  font-weight: 900;

  animation: onProgress 0.6s ease infinite alternate;

  @keyframes onProgress {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
`;

const Orders = () => {
  const [orders, setOrders] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [productId, setProductId] = React.useState("");

  const [orderId, setOrderId] = React.useState("");
  const [orderStatus, setOrderStatus] = React.useState(1);

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    setLoading(true);

    const getOrders = async () => {
      try {
        const res = await publicRequest.get(`/orders/find/${user._id}`);

        setOrders(res.data);
      } catch (error) {
     
      }
    };

    getOrders();

    setLoading(false);
  }, [user]);

  const handleStatus = (status) => {
    if (status === 0) {
      return <Processing>Pending</Processing>;
    } else if (status === 1) {
      return <Processing>confirmed</Processing>;
    } else if (status === 2) {
      return <h3 style={{ color: "#d1411e", fontWeight: "900" }}>Delivered</h3>;
    } else {
      return (
        <h5 style={{ color: "#d1411e" }}>
          Thank you for reviewing this product
        </h5>
      );
    }
  };

  const handleModal = (name, id, orderId, orderStatus) => {
    setName(name);

    setProductId(id);

    setOrderId(orderId);

    setOrderStatus(orderStatus);

    setOpen(true);
  };

  return (
    <Container>
      <Announcement />

      <Navbar />
      <NavCategory />

      <Title
        style={{
          color: "white",
          backgroundColor: "#FF7BA9",
          width: "20%",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        My Orders
      </Title>

      {orders.length ? (
        orders.map((order) => (
          <>
            <Wrapper>
              <OrderId>Order ID : {order._id}</OrderId>

              <ProductQuantity>
                Quantity:{order.products.length}
              </ProductQuantity>

              <Amount> Total: ksh {order.total}</Amount>

              <Product>
                {order?.products.map((product) => (
                  <>
                    <Left></Left>

                    <Right>
                      <Image src={product.img} alt="" />

                      <Title>{product.title}</Title>

                      <OrderId> Product ID : {product._id}</OrderId>

                      <Time>{format(order.createdAt)}</Time>

                      {order.status === 2 && (
                        <Button
                          onClick={() =>
                            handleModal(
                              order.name,
                              product._id,
                              order._id,
                              order.status
                            )
                          }
                        >
                          Review product
                        </Button>
                      )}
                    </Right>
                  </>
                ))}
              </Product>

              {handleStatus(order.status)}
            </Wrapper>

            <hr
              style={{
                width: "70%",
                margin: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </>
        ))
      ) : (
        <Loader />
      )}

      <Footer />

      {loading && <Loader />}

      {user ? "" : <Redirect to="/login" />}

      {open && (
        <ModalReview
          name={name}
          id={productId}
          orderId={orderId}
          orderStatus={orderStatus}
          setOpen={setOpen}
        />
      )}
    </Container>
  );
};

export default Orders;
