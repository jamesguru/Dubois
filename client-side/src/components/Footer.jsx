import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  Room,
  Facebook,
  Instagram,
  Twitter,
  Pinterest,
  Phone,
  MailOutline,
  YouTube,
} from "@material-ui/icons";
import { mobile } from "../responsive";

const Wrapper = styled.div`
  display: flex;

  flex-direction: column;

  align-items: center;

  background-color: #0c0c0c;

  height: auto;
  color: #aaa;

  @media screen and (max-width: 1100px) {
    display: flex;

    flex-direction: column;

    height: auto;

    align-items: center;

    justify-content: center;
  }
`;

const Container = styled.div`
  background-color: #0c0c0c;

  align-items: center;
  height: auto;

  padding: 30px;

  display: flex;

  @media screen and (max-width: 1100px) {
    display: flex;

    flex-direction: column;

    height: auto;
  }

  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;

  display: flex;

  flex-direction: column;

  padding: 20px;
`;

const Logo = styled.img`
  width: 200px;

  height: 200px;

  object-fit: cover;

  @media screen and (max-width: 1100px) {
    width: 100px;

    height: 100px;
  }
`;

const Desc = styled.p`
  margin: 20px 0px;

  font-size: 20px;

  color: #aaa;

  font-weight: bold;
  @media screen and (max-width: 1100px) {
    font-size: 15px;
  }
`;

const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;

  height: 40px;

  border-radius: 50%;

  color: white;

  background-color: #${(props) => props.color};

  display: flex;

  align-items: center;

  justify-content: center;

  margin: 20px;

  margin-bottom: 50px;

  cursor: pointer;

  @media screen and (max-width: 1100px) {
    width: 30px;

    height: 30px;

    border-radius: 50%;

    display: flex;

    align-items: center;

    justify-content: center;
  }
`;

const Center = styled.div`
  flex: 1;

  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.span`
  margin-bottom: 50px;

  color: #aaa;
  margin-bottom: 30px;
  font-weight: 900;
  font-size: 25px;
`;

const List = styled.ul`
  margin-top: 20px;

  padding: 0px;

  list-style: none;

  display: flex;

  flex-wrap: wrap;

  color: #aaa;
`;

const ListItem = styled.li`
  width: 50%;

  margin-bottom: 10px;

  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  font-weight: bold;

  color: #aaa;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;

  display: flex;

  align-items: center;

  color: "#AAA";
`;

const Button = styled.button`
  padding: 15px;

  font-size: 18px;

  font-weight: 900;

  background-color: #0c0c0c;
  color: #dcca87;

  border: none;

  cursor: pointer;

  transition: all 1.5s ease;

  &:hover {
    transform: scale(1.02);

    color: white;

    border: none;

    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    font-size: 12px;

    padding: 5px;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <Left>
          <Logo src="/img/dubois.png" alt="" />

          <Desc style={{ color: "#DCCA87" }}>
            "The best part of beauty is that which no picture can express."
          </Desc>
          <Desc style={{ fontSize: "16px" }}>
            Dubois beauty deals in selling and educating individuals on skin
            care products while selling them in wholesale and retail. We also
            deals with gifts and you can get special message with the gift.
            Order gift for your loved ones and get them written special message
            for them. We deliver our products across the country and outside
            country. You get free consolutation with us concerning beauty
            products.
          </Desc>

          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>

            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>

            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>

            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>

            <SocialIcon color="E60023">
              <YouTube />
            </SocialIcon>
          </SocialContainer>
        </Left>

        <Center>
          <Title>Useful links</Title>

          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wish Listing</ListItem>
            <ListItem>Terms</ListItem>
          </List>
         
        </Center>
        <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/seller`}
          >
            <Button>SELLER LOGIN</Button>
          </Link>
        <Right>
          <Title>Contact us.</Title>

          <ContactItem style={{ marginTop: "20px" }}>
            <Room style={{ marginRight: "10px" }} />
            PO BOX 198-50056 NAIROBI, KENYA
          </ContactItem>
          <ContactItem>
            <Phone style={{ marginRight: "10px" }} />
            +254727632051
          </ContactItem>
          <ContactItem>
            <MailOutline style={{ marginRight: "10px" }} />
            duboisbeautyke@gmail.com
          </ContactItem>
        </Right>
      </Container>

      <span
        style={{
          marginBottom: "60px",
          width: "100%",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Developed by Bantu Tech &copy; 2023
      </span>
    </Wrapper>
  );
};

export default Footer;
