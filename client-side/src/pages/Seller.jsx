import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../redux/apiCalls";
import "react-toastify/dist/ReactToastify.css";
import { Close } from "@material-ui/icons";
import { Redirect, Link } from "react-router-dom";
const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  align-items: center;
  margin: 10% 35%;
  @media screen and (max-width: 900px) {
    
    margin: 20% 2%;
    width: 80%;
    font-weight: 700;
  }
`;

const Input = styled.input`
  margin: 25px;
  padding: 10px;
  font-weight: bold;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 10px;
  font-weight: 900;
  font-size: 25px;
  background-color: #0c0c0c;
  color: #dcca87;
  cursor: pointer;
`;
const Heading = styled.h3`
  font-weight: 900;
  font-size: 30px;
`;

const Seller = () => {
  const [username, setUsername] = React.useState("");

  const [password, setPassword] = React.useState("");

  const { isFetching, error, currentUser } = useSelector((state) => state.user);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();


  const handleLogin = (e) => {
    e.preventDefault();

    login(dispatch, { username, password });

    if (error) {
      toast.error("Contact admin if you have not been registered", {
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
      <Wrapper>
        <Heading>Dubois Beauty</Heading>

        <Input placeholder="Shop name" type="text" onChange={(e) => setUsername(e.target.value)}/>
        <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />

        <Button onClick={handleLogin} disabled={isFetching}>Login</Button>
        {user.currentUser && user.currentUser.seller? <Redirect to="/menu" /> : ""}
      </Wrapper>
    </Container>
  );
};

export default Seller;
