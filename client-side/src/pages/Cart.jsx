import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import {
  Add,
  Remove,
  Close,
  Delete,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import React, { useEffect,useRef} from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeProduct } from "../redux/cartRedux";
import { userRequest } from "../requestMethods";
import Modal from "../components/Modal";

import ModalLogin from "../components/ModalLogin";
import NavCategory from "../components/NavCategory";

const KEY = process.env.REACT_APP_STORE;

const Container = styled.div`
  font-weight: 600;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })};
`;

const Title = styled.h1`
  font-weight: 500;

  text-align: center;
`;

const Top = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 30px;

  @media screen and (max-width: 1100px) {
    display: flex;

    align-items: center;

    justify-content: space-between;
  }
`;

const TopButton = styled.div`
 
 padding: 10px;

 font-weight: 600;

 cursor pointer;

 border: ${(props) => (props.type === "filled" ? "none" : "3px solid #FF7BA9")};

 background-color: ${(props) =>
   props.type === "filled" ? "black" : "transparent"};

 color: ${(props) => props.type === "filled" && "white"};



 @media screen and (max-width: 1100px){

    
   
    width: 100px;

    padding:5px;

    font-weight: 600;

    font-size: 12px;

    text-align:center;
 
    
}



 
 
 `;

const TopTexts = styled.div`
  ${mobile({ display: "none" })};

  @media screen and (max-width: 1100px) {
    margin: 20px;
  }
`;

const TopText = styled.span`
  text-decoration: underline;

  cursor: pointer;

  margin: 0px 10px;

  @media screen and (max-width: 1100px) {
    width: 200px;
  }
`;

const Bottom = styled.div`
  display: flex;

  align-items: space-between;

  ${mobile({ flexDirection: "column" })};

  @media screen and (max-width: 1100px) {
    flex-direction: column;
  }
`;

const Info = styled.div`
  flex: 3;
  @media screen and (max-width: 1100px) {
    margin-top: 20px;
  }
`;

const Product = styled.div`
  display: flex;

  align-items: space-between;

  margin-bottom: 20px;
  ${mobile({ flexDirection: "column" })};
`;

const ProductDetail = styled.div`
  flex: 2;

  display: flex;
`;

const Image = styled.img`
  width: 400px;

  height: 400px;

  transition: all 1s ease;
  object-fit: contain;

  margin: 10px;

  @media screen and (max-width: 1100px) {
    width: 200px;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const Details = styled.div`
  padding: 20px;

  display: flex;

  flex-direction: column;

  justify-content: space-around;

  @media screen and (max-width: 1100px) {
    width: 150px;

    padding: 10px;

    font-size: 12px;
  }
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;

  height: 2px;
`;

const ProductName = styled.span``;

const ProductID = styled.span``;

const ProductColor = styled.div`
  width: 30px;

  height: 30px;

  border-radius: 50%;

  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span`
  @media screen and (max-width: 1100px) {
    font-size: 12px;
  }
`;

const PriceDetail = styled.div`
  flex: 1;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  @media screen and (max-width: 1100px) {
    flex-direction: column;

    font-size: 12px;
  }
`;

const ProductAmountContainer = styled.div`
  display: flex;

  align-items: center;

  margin-bottom: 20px;

  ${mobile({ margin: "5px 15px" })};

  @media screen and (max-width: 1100px) {
    margin: 5px;

    font-size: 17px;
  }
`;

const ProductAmount = styled.div`
  font-size: 24px;

  margin: 5px;
`;
const ProductPrice = styled.div`
  font-size: 30px;

  margin: 5px;

  ${mobile({ marginBottom: "column" })};
`;

const Summary = styled.div`
  flex: 1;

  border: 0.5px solid lightgray;

  border-radius: 10px;

  padding: 20px;

  height: 50vh;

  @media screen and (max-width: 1100px) {
    margin: 20px;
  }
`;

const SummaryTitle = styled.h1`
  font-weight: 300;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;

  justify-content: space-between;

  font-weight: ${(props) => props.type === "total" && "500"};

  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;

const SummaryPrice = styled.span``;

const cartNoProducts = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  margin: auto;
`;

const TitleNoProducts = styled.h2`
  font-weight: 900;

  margin-top: 60px;
`;

const Button = styled.button`
  width: 100%;

  padding: 10px;

  background-color: #222;

  border: none;

  color: white;

  font-weight: 900;

  cursor: pointer;

  transition: all 1s ease;

  &:hover {
    transform: scale(1.1);

    width: 100%;
  }
`;

const Cart = () => {
  const [open, setOpen] = React.useState(false);

  const [login, setLogin] = React.useState(false);

  const cart = useSelector((state) => state.cart);
  const topRef = useRef(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
 
  const [stripeToken, setStripeToken] = React.useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };
  const scrollToTop = () => {
    topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,

          amount: cart.total * 100,
        });

        history.push("/success", { data: res.data });
      } catch (error) {}
    };

    stripeToken && makeRequest();
  }, [stripeToken, history, cart.total]);

  const handleDelete = (index) => {
    dispatch(removeProduct());

    toast.warning("You have emptied your cart.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleModal =(e) =>{
   
    e.preventDefault();
    
    setOpen(true)
  }

 

  return (
    <Container>
      <Announcement />

      <Navbar />
      <NavCategory />

      <Wrapper>
        <Top>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>

          <TopTexts></TopTexts>

          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>

        <Bottom>
          <Info>
            {cart.products.length ? (
              cart.products.map((product, index) => (
                <Product key={index}>
                  <ProductDetail>
                    <Image src={product.img} />

                    <Details>
                      <ProductName>
                        <b>Product:</b>
                        {product.title}
                      </ProductName>

                      <ProductID>
                        <b>ID:</b>
                        {product._id}
                      </ProductID>

                      <ProductColor color={product.color} />

                      <ProductSize>
                        <b> Size: </b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>

                  <PriceDetail>
                    <ProductAmountContainer style={{ fontSize: "12px" }}>
                      <Add style={{ fontSize: "17px" }} />

                      <ProductAmount style={{ fontSize: "17px" }}>
                        {product.quantity}
                      </ProductAmount>

                      <Remove style={{ fontSize: "17px" }} />
                    </ProductAmountContainer>

                    <ProductPrice style={{ fontSize: "17px" }}>
                      ksh {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  margin: "auto",
                }}
              >
                <TitleNoProducts>No products in your basket.</TitleNoProducts>

                <ShoppingCartOutlined style={{ fontSize: "100px" }} />
              </div>
            )}
            <Hr />
          </Info>

          {cart?.products.length ? (
            <Delete
              onClick={handleDelete}
              style={{
                fontSize: "40px",
                cursor: "pointer",
                color: "white",
                backgroundColor: "red",
                padding: "7px",
                height: "35px",
                width: "35px",
                borderRadius: "50%",
                margin: "10px",
              }}
            />
          ) : (
            ""
          )}

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>

            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryPrice>{cart.total}</SummaryPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>
                Estimated Shipping(Nairobi(ksh 100) , outside Nairobi(ksh 300))
              </SummaryItemText>
              <SummaryPrice> ksh 300</SummaryPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryPrice>ksh 100</SummaryPrice>
            </SummaryItem>

            <SummaryItem type="total">
              <SummaryItemText> Total </SummaryItemText>
              <SummaryPrice>{cart.total}</SummaryPrice>
            </SummaryItem>

            <Button onClick={handleModal}>ORDER NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>

      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {user.currentUser ? "" : <ModalLogin setOpen={setOpen} />}

      {open && cart.total > 0 ? (
        <Modal
          
          setOpen={setOpen}
          total={cart.total}
          products={cart.products}
          email={cart.email}
        />
      ) : (
        ""
      )}
    </Container>
  );
};

export default Cart;
