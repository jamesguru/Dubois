import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Close } from "@material-ui/icons";
import { Redirect, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import NavCategory from "../components/NavCategory";
import Announcement from "../components/Announcement";

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
  width: 35%;
  border-radius: 10px;
  padding: 20px;

  background-color: white;

  border: 2px solid grey;

  @media screen and (max-width: 900px) {
    width: 75%;

    padding: 20px;
  }
`;

const Error = styled.span`
  color: red;
`;

const Image = styled.img`
  object-fit: cover;

  width: 100%;

  height: 150px;

  margin: 10px;

  @media screen and (max-width: 900px) {
    height: 100px;
  }
`;

const Title = styled.h1`
  font-size: 24px;

  font-weight: 900;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;

  min-width: 40%;

  font-size: 16px;

  font-weight: 700;

  margin: 10px 0;

  padding: 10px;

  border: 1px solid black;

  @media screen and (max-width: 900px) {
    width: 75%;

    padding: 5px;
  }
`;
const Button = styled.button`
  width: 40%;

  border: none;

  padding: 15px 20px;

  background-color: #0c0c0c;

  color: #dcca87;

  cursor: pointer;

  font-weight: 800;

  font-size: 20px;

  transition: all 1s ease;

  &: disabled {
    color: green;

    cursor: not-allowed;
  }

  &:hover {
    transform: scale(1.1);

    font-size: 20px;
  }

  @media screen and (max-width: 900px) {
    padding: 5px 10px;
  }
`;

const LinkTo = styled.a`
  margin: 5px 0px;

  color: #0c0c0c;
  font-size: 15px;
  font-weight: bold;

  text-decoration: underline;

  cursor: pointer;
`;

const LinkClose = styled.div``;

const Login = () => {
  const [username, setUsername] = React.useState("");

  const [password, setPassword] = React.useState("");

  const { isFetching, error, currentUser } = useSelector((state) => state.user);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    login(dispatch, { username, password });

    if (error) {
      toast.error("Make sure you have registered", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      toast.error("username or password is incorrect", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("Login successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  console.log(user);

  return (
    <>
      <Announcement />

      <Navbar />

      <NavCategory />

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

        <Wrapper>
          <LinkClose>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <Close
                style={{
                  color: "#DCCA87",
                  backgroundColor: "#0C0C0C",
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  margin: "-40px",
                }}
              />
            </Link>
          </LinkClose>

          <Title>LOGIN</Title>

          <Image src="/img/Marketing.png" alt="" />

          <Form>
            <Input
              placeholder="usermane"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={handleLogin} disabled={isFetching}>
              Login
            </Button>

            {user.currentUser ? <Redirect to="/" /> : ""}

            <LinkTo>DO NOT REMEMBER PASSWORD?</LinkTo>

            <LinkTo>
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                to="/register"
              >
                CREATE ACCOUNT
              </Link>
            </LinkTo>
          </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
