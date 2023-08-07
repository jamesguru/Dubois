import React from 'react';
import styled from 'styled-components';
import {Search} from '@material-ui/icons';
import {useEffect,useState} from 'react';
import axios from 'axios';

import {format} from 'timeago.js';

import Loader from '../components/Loader';
import { publicRequest } from '../requestMethods';




const Container = styled.div`


height:auto;

background: linear-gradient(

    to right,

   

    rgba(0,0,0,0) 0%,

    rgba(0,0,0,1) 100%


    ),url('https://cdn.britannica.com/35/222035-050-C68AD682/makeup-cosmetics.jpg');

    margin:0px;

    padding:0px;


    @media screen and (max-width: 1200px){

    
        display:flex;

        flex-direction:column;

        align-items:center;
        justify-content:center;

        margin:auto;
            
        
        
            
        }

`

const Input = styled.input`

border:none;

padding:10px;

margin-left:40px;

border-radius:10px;

background-color:white;

width:50%;


@media screen and (max-width: 1200px){

    
border:none;

padding:10px;

margin-left:40px;

border-radius:10px;

background-color:white;

width:100%;

    


    
}

`




const Button =styled.button`

background-color: #FF7BA9;

border:none;



padding:17px;
border-radius:10px;

margin-left:5px;


@media screen and (max-width: 1200px){

    
background-color: #FF7BA9;

border:none;



padding:10px;
border-radius:10px;
    


    
}

`

const Wrapper = styled.div`

margin-left: 50px;

display:flex;

align-items:center;

margin-bottom:30px;

margin-top:30px;





@media screen and (max-width: 1200px){

    
    display:flex;

    flex-direction:column;

    align-items:center;

    justify-content:center;

    margin: 20px;

    


    
}

`


const Left = styled.div`


flex:1;


`

const Video = styled.video`

height:50%;

width: 70%;

@media screen and (max-width: 1200px){

    height:400px;
   
    width:100%;

    
    

    


    
}



`




const Right = styled.div`

display:flex;

flex:1;

flex-direction:column;

margin-left: 100px;


@media screen and (max-width: 1200px){

    
    width: 100%;

    


    
}

`

const Title = styled.span`

font-size: 25px;

color: white;

font-weight:900;

font-family:"Cormorant Upright";

@media screen and (max-width: 600px){

    
   
    
    font-size: 14px;

    
}

`

const Desc = styled.span`

width:50%;
margin-top:10px;

font-weight:900;

color: white;


font-size:16px;

@media screen and (max-width: 1200px){

    

    width:80%;

    

    


    
}

@media screen and (max-width: 1200px){

    

    font-size:12px;

    

    


    
}


`

const Time = styled.span`

color: #FF7BA9;

font-weight:900;

`







const Gallery = () => {

    const [search, setSearch] = useState('');

    const [query, setQuery] =useState(false);

    const [gallery, setGallery] = useState([]);


    useEffect(()=>{


        const getGallery = async() =>{


            try {


                

               


                    const res = await publicRequest.get(query? `/gallery?search=${search}` : "/gallery/");

                    setGallery(res.data);

                
            } catch (error) {


                    console.log('something went wrong');
                
            }

        }



        getGallery();

    },[search,query])




    const handleSearch = () =>{

        if(search){

            setQuery(true);
        }
    }

    return (
        <Container>


            <Title style={{display:'flex', alignItems:'center',justifyContent:'center', padding:'50px', fontSize:'30px', fontWeight:'900'}}>Gallery</Title>



            <div style={{display:'flex', width:'60%'}}>


                <Input placeholder="search" onChange={(e) => setSearch(e.target.value)}/>

                <Button onClick={() => handleSearch()}><Search style={{color:'white', cursor: 'pointer'}}/></Button>


            </div>

            
            {gallery.length ?  gallery.map((item) => (


                        <Wrapper>


                        <Left>


                            <Video src={item.video}

                            loop
                            controls
                            />


                        </Left>

                        <Right>

                            <Title>{item.title}</Title>

                             <Desc>{item.desc}</Desc>

                            <Time>{format(item.createdAt)}</Time>


                        </Right>



                        </Wrapper>



            )) : <Loader />}


            
            


            
            
        </Container>
    )
}

export default Gallery
