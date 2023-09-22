import React from "react";
import styled from "styled-components";
import { Search, ShoppingBasket, Menu, Person } from "@material-ui/icons";

import {
  DropdownButton,
  Dropdown,
  SplitButton,
  ButtonGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Badge from "@material-ui/core/Badge";

import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/userRedux";

const Container = styled.div`

height: 100px;


}


@media screen and (max-width: 600px){

    
    height:80px;

    margin-bottom:20px;
 
    
}

position:relative;

`;

const Wrapper = styled.div`
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;

  align-items: center;

  @media screen and (max-width: 600px) {
    padding: 10px 0px;
  }
`;
const Left = styled.div`
  flex: 1;

  display: flex;

  align-items: center;

  @media screen and (max-width: 900px) {
    flex: 0.1;
  }
`;

const Language = styled.span`
  font-size: 18px;

  cursor: pointer;

  margin-right: 20px;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  display: flex;

  align-items: center;

  position: relative;

  transition: all 1s ease;

  @media screen and (max-width: 1200px) {
    width: 170px;

    flex: 2;
    border-radius: 10%;
  }
`;

const Input = styled.input`
  padding: 10px;

  border-radius: 10px;

  font-weight: 900;

  width: 500px;
  margin: 3px;
  flex: 5;

  @media screen and (max-width: 1200px) {
    padding: 3px;

    width: 170px;
    font-weight: 200;
    border-radius: 10px;
  }
`;

const Center = styled.div`
  flex: 3;

  text-align: center;

  display: flex;

  align-items: center;

  justify-content: center;

  @media screen and (max-width: 900px) {
    flex: 1;
  }
`;

const Logo = styled.img`
  width: 200px;

  height: 80px;

  margin-bottom: 20px;

  object-fit: cover;

  border-radius: 4px;

  transition: all 1s ease;

  cursor: pointer;

  @media screen and (max-width: 900px) {
    width: 100px;

    height: 70px;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const Right = styled.div`
  flex: 1;

  display: flex;

  align-items: center;

  justify-content: space-between;

  @media screen and (max-width: 600px) {
    flex: 1;

    justify-content: flex-start;
  }

  @media screen and (min-width: 600px) {
    flex: 1;

    justify-content: center;
  }
`;

const MenuItem = styled.div`
  font-size: 14px;

  cursor: pointer;

  margin-left: 20px;

  @media screen and (max-width: 900px) {
    margin-left: 10px;

    font-size: 15px;
  }
`;
const MenuItemText = styled.span`
  margin-right: 15px;

  font-weight: 900;
  transition: all 0.5s ease;

  cursor: pointer;

  &:hover {
    border-bottom: 2px solid teal;
  }

  @media screen and (max-width: 900px) {
    margin-right: 15px;

    font-size: 9px;
  }
`;

const Auth = styled.div`
  backround-color: purple;

  opacity: 1;

  @media screen and (max-width: 900px) {
    display: flex;

    position: relative;
  }
`;

const Profile = styled.div`
  cursor: pointer;

  position: relative;

  @media screen and (max-width: 1200px) {
    position: absolute;

    top: 0;

    right: 0;

    font-size: 10px;
  }
`;

const Button = styled.div`
  background-color: black;

  padding: 8.5px;

  border-radius: 50%;
  cursor: pointer;
  margin-left: -53.5px;
  position: absolute;

  right: 1;

  top: 0;

  transition: all 1s ease;

  &:hover {
    transform: scale(1.05);
    background-color: #444;
  }

  @media screen and (max-width: 900px) {
    padding: 10px;

    right: 0;

    top: 0;
  }

  @media screen and (max-width: 600px) {
    padding: 2px;

    right: 0;

    top: 0;
  }
`;
const Padding = styled.div`
  margin: 5px;
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const [search, setSearch] = React.useState("");

  console.log(user?._id);

  const Logout = (e) => {
    e.preventDefault();
    dispatch(logOut());

    toast.success("You have logout successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo src="/img/dubois.png" alt="" />
          </Link>
        </Left>
        <Center>
          <Language>EN</Language>

          <SearchContainer>
            <Input
              placeholder="Search brands, products, wholesellers and categories"
              onChange={(e) => setSearch(e.target.value)}
            />

            <Link
              to={search ? `/search/${search}` : ""}
              style={{
                textDecoration: "none",
                color: "inherit",
                marginRight: "",
              }}
            >
              <Button>
                <Search
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    color: "#CBB26A",
                  }}
                />
              </Button>
            </Link>
          </SearchContainer>
        </Center>
        <Right>
          <Link to="/cart" style={{ color: "inherit", textDecoration: "none" }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingBasket style={{ color: "#222" }} />
              </Badge>
            </MenuItem>
          </Link>

          <Link
            to="/login"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <Profile>
              <MenuItemText
                style={{
                  marginLeft: "15px",
                  backgroundColor: "#222",
                  color: "#CBB26A",
                  padding: "5px",
                  fontSize: "16px",
                  fontWeight: "900",
                }}
              >
                {user?.username ? `Hi  ${user?.username}` : "Login/Register"}
              </MenuItemText>
            </Profile>
          </Link>

          <Person />

          <Padding />

          <Dropdown
            style={{ margin: "-7px", color: "red" }}
            size="sm"
            as={ButtonGroup}
          >
            <Dropdown.Toggle
              split
              variant="secondary"
              id="dropdown-split-basic"
            />

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-3">
                <Link
                  to={`/orders/${user?._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItemText>My orders</MenuItemText>
                </Link>
              </Dropdown.Item>

              <Dropdown.Item href="#/action-3">
                <Link
                  to={`/orders/${user?._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItemText>Help</MenuItemText>
                </Link>
              </Dropdown.Item>

              <Dropdown.Item href="#/action-2">
                {user && <MenuItemText onClick={Logout}>Logout</MenuItemText>}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Right>
      </Wrapper>

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
    </Container>
  );
};

export default Navbar;
