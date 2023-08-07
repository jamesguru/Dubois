
import styled from 'styled-components';

import React,{useEffect} from 'react';


import Product from './Product';








const Wrapper = styled.div`


display:flex;

flex-direction:column;

justify-content:space-between;

margin-top: 200px;

`



const Container = styled.div`


display: flex;

padding: 20px;


flex-wrap: wrap;

margin: 10px;



`


const Title = styled.h2`


display:flex;

align-items: center;

justify-content: center;

margin-bottom:100px;

font-weight:900;




`

const RelatedProduct = ({products}) => {



    


    






    return (


        <Wrapper>


                <Title>Related Products</Title>


        <Container>




                 {products?.map((item,index) => (<Product item={item} key={index}/>))  }  

       



        </Container>



       


       


    </Wrapper>
        
    )
}

export default RelatedProduct
