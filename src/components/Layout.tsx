import * as React from 'react';
import { ToastContainer} from 'react-toastify';


export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>   
            {props.children} 
            <ToastContainer/>
    </React.Fragment>
);
