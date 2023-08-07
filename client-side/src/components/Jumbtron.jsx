import React from 'react';

import Typewriter from 'typewriter-effect';

import styled from 'styled-components';


const Container = styled.div`


font-size: 20px;


width:auto;
display:flex;

align-items:center;

justify-content:center;

font-weight: bolder;

font-family:"Cormorant Upright";


height:auto;


@media screen and (max-width: 600px){

    

    


    display:none;

    
}




`






const Jumbtron = ({text}) => {
    return (


        <Container>

            <Typewriter options={{
                        strings: ['Call 0727632051 for','Help', 'Consolutation and', 'Placing orders'],
                        autoStart: true,
                        loop: true,
                    }}/>


        </Container>
        
    )
}

export default Jumbtron
