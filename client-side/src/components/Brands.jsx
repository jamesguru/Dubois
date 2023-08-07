import React from 'react'
import styled from 'styled-components';
import {brands} from '../data';
import {Link} from 'react-router-dom';


const Container = styled.div`

display:flex;



margin:20px;

justify-content:space-between;

align-items:center;
flex-wrap:wrap;



`

const Wrapper = styled.div`


display:flex;

margin:10px;

flex-direction:column;



align-items:center;

justify-content:center;

`

const Image = styled.img`

margin-bottom:10px;

height:150px;

width:150px;

border-radius:50%;



cursor:pointer;


@media screen and (max-width: 900px){

    height:70px;

    width:70px;

    
   

    
} 

`

const Title = styled.h2`

font-weight:900;

font-family:'Cormorant Upright';

display:flex;

align-items:center;

justify-content:center;

@media screen and (max-width: 900px){

    
    font-weight:500;

   

    
} 



`



const Brands = () => {
    return (
        <>
            <Title>Popular Brands</Title>

            <Container>

                    
                {brands.map((brand) =>
                
                
                <Link to={`/products/${brand.cat}`} style={{color:'inherit',textDecoration:'none'}}>
                
                <Wrapper>

                    <Image src={brand.img} alt=""/>

                    <Title>{brand.title}</Title>
                </Wrapper>
                
                
                </Link>
                
                
                
                
                )}
            

            

            </Container>
                    
        
        
</>
    )
}

export default Brands;
