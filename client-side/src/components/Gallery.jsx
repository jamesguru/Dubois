import React from 'react';
import styled from 'styled-components';

import {ArrowForward, ArrowForwardIos} from '@material-ui/icons';
import {Link} from 'react-router-dom';



const Container = styled.div`

display:flex;

align-items:center;

justify-content:space-between;


background-color: #222;


height: 100vh;

padding:10px;




background: linear-gradient(

    to left,

    rgba(0,0,0,0) 0%,

    rgba(0,0,0,1) 100%


    ),
     url('https://cdn.britannica.com/35/222035-050-C68AD682/makeup-cosmetics.jpg') 

     
     no-repeat top center;
 background-size: cover !important;
  -webkit-background-size: cover !important;
 text-align: center;
 overflow: hidden;

 background-position: center;
background-size: cover;
background-repeat: repeat;
background-attachment: fixed;



 @media screen and (max-width: 900px){

    
    display:flex;

    flex-direction:column;

    align-items:center;
    justify-content:center;

    
        
    
    
        
    }



`

const Left = styled.div`

align-items:center;

flex:1;

justify-content:center;

margin: 50px;



`

const Title = styled.h1`

color:#AAA;





@media screen and (max-width: 900px){

    
    color:white;
        
    
    
        
    }




`



const Button=styled.button`


margin-top:30px;

padding:15px;

border:none;

font-size:23px;

background-color: #FF7BA9;

color:white;

font-weight:900;


font-family: 'Cormorant Upright';

cursor:pointer;

display:flex;

align-items:center;

justify-content:space-between;


@media screen and (max-width: 600px){

    
    font-size:14px;
    
        
    }

`

const Right = styled.div`

display:flex;

flex:2;

align-items:center;

justify-content:center;





`

const Video = styled.video`

height:50%;

width:60%;

margin-right:100px;

z-index: 1;

cursor:pointer;


border-radius:10px;


@media screen and (max-width: 600px){

    
    height: 300px;

    margin:10px;

    width:90%;

    
    
    
        
    }

`



const Gallery = () => {
    return (
        <Container>


            <Left>
                <Title>Find out what is in gallery.</Title>

                <Button><Link to="/gallery" style={{color:'inherit',textDecoration:'none'}}>Go to gallery</Link><ArrowForward /></Button>
            </Left>

            <Right>

            <Video src="https://firebasestorage.googleapis.com/v0/b/shop-web-6eba5.appspot.com/o/untitled.mp4?alt=media&token=2b4652e0-7349-40f7-a474-dcc5a5cd2d1f"

            loop
            muted

            controls
            />

            </Right>
            
        </Container>
    )
}

export default Gallery
