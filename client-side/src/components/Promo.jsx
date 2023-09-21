import React from "react";
import styled from "styled-components";
import Typewriter from "typewriter-effect";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  position: sticky;

  background: linear-gradient(
      rgba(0, 0, 0, 0.3) 0%,

      rgba(0, 0, 0, 1) 100%
    ),
    url("https://cdn.britannica.com/35/222035-050-C68AD682/makeup-cosmetics.jpg");

  height: auto;

  display: flex;

  align-items: center;

  padding: 30px;
  background-position: center;
  background-size: cover;
  background-repeat: repeat;
  background-attachment: fixed;

  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;

    align-items: center;

    justify-content: center;
  }
`;

const Left = styled.div`
  flex: 1;
`;

const Image = styled.img`
  height: 50%;

  width: 60%;

  cursor: pointer;

  transition: all 1s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media screen and (max-width: 900px) {
    display: flex;
    align-items: center;

    justify-content: center;

    height: 50%;

    width: 70%;
  }
`;

const Right = styled.div`
  flex: 1;

  display: flex;

  flex-direction: column;

  align-items: center;
`;

const Title = styled.span`
  font-size: 30px;
  color: white;
  font-weight: 900;
  margin: 20px 
  
  @media screen and (max-width: 1500px) {
    font-size: 20px;
  }
`;

const Desc = styled.span`
  color: white;

  font-size: 19px;
`;

const Promo = () => {
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    const getPromo = async () => {
      try {
        const res = await publicRequest.get("/promotion");

        setPromo(res.data);
      } catch (error) {
        console.log("something wrong happened");
      }
    };

    getPromo();
  }, []);

 

  return (
    <Container>
      {promo.length ? (
        promo.map((single_promo) => (
          <>
            <Left>
              <Image src={single_promo.image} alt="" />
            </Left>

            <Right>
              <Title>
                <Typewriter
                  options={{
                    strings: single_promo.title,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Title>

              <Desc>{single_promo.desc}</Desc>
            </Right>
          </>
        ))
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default Promo;
