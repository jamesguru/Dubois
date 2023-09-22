import styled from "styled-components";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import Jumbtron from "./Jumbtron";
import { publicRequest } from "../requestMethods";

const Container = styled.div`
  height: auto;
  background-color: #ff7ba9;
  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 25px;

  font-weight: 900;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

const Heading = styled.div`
font-size:20px;
width: 80%;

padding: 5px;

text-align:center;

@media screen and (max-width: 600px){

    font-size:10px;
    font-weight:500;

    
}
animation: inProgress 0.4s ease infinite alternate;
@keyframes inProgress{

    from{


        opacity: 0;

        transform: scale(1);

    }


    to{

        opacity:1;

        transform: scale(1.1);

    }

`;

const Jumbo = styled.div`
  width: 50%;

  font-size: 20px;

  font-weight: bold;
`;

const Announcement = () => {
  const [annoucement, setAnnoucement] = React.useState([]);

  useEffect(() => {
    const getAnnoucement = async () => {
      try {
        const res = await publicRequest.get("/annoucement");

        setAnnoucement(res.data);
      } catch (error) {
        console.log("something went wrong");
      }
    };

    getAnnoucement();
  }, []);
  return (
    <Container>
      {annoucement.map((singleAnnoucement, index) => (
        <Heading key={index}>{singleAnnoucement.title}</Heading>
      ))}

      <Jumbo>
        <Jumbtron />
      </Jumbo>
    </Container>
  );
};

export default Announcement;
