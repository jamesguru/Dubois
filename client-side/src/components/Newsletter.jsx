import styled from 'styled-components';
import { Send } from '@material-ui/icons';

import {mobile} from '../responsive';


const Container = styled.div`

height: 100vh;

background-color: #fcf5f5;

display: flex;

align-items: center;

justify-content: center;

flex-direction: column;



`;

const Title = styled.h1`



margin-bottom: 20px;


@media screen and (max-width: 600px){

    
    
    font-size: 40px; 

 
    
}

`

const Description= styled.div`

font-size: 24px;
font-weight: 300;

margin-bottom: 20px;






@media screen and (max-width: 900px){

    
    text-align:center;

    

 
    
}


`

const InputContainer=styled.div`

width : 50%;

height:40px;

background-color: white;

display: flex;

justify-content: space-between;

border: 1px solid lightgray;

@media screen and (max-width: 900px){

    
    

    width:50%;

    

 
    
}



`

const Input = styled.input`

border: none;

flex: 8;

padding-left: 20px;

@media screen and (max-width: 600px){

    
    flex:8;

    padding-left: 10px;
 

 
    
}

`

const Button = styled.button`
flex: 1;

border: none;

background-color: #222;

color: white;


@media screen and (max-width: 600px){

    
    

    

 
    
}


`

const Newsletter = () => {
    return (
        <Container>

            <Title>

                Newsletter

            </Title>

            <Description>

                Get timely updates from your favourite products.

            </Description>

            <InputContainer>

                <Input placeholder="Enter your email"/>
                <Button>
                    <Send />
                </Button>
            </InputContainer>


            
        </Container>
    )
}

export default Newsletter;
