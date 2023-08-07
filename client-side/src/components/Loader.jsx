import React from 'react';
import FadeLoader from "react-spinners/BounceLoader";

import styled from 'styled-components';


const Container = styled.div`

display:flex;

align-items:center;

justify-content:center;



height:70vh;

width:100%;


`





const Loader = () => {
    return (
        <Container>

                <FadeLoader color={"#FF7BA9"} loading={true} css='' size={100} />
            
        </Container>
    )
}

export default Loader
