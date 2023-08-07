import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = ({title}) => {

    const location = useLocation();

    console(location);
    return (
        <div>

            successfull
            
        </div>
    )
}

export default Success;
