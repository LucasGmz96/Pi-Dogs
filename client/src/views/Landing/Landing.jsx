import React from "react";      
import {Link} from "react-router-dom"
import styled from "./Landing.module.css"





const Landing = ()=>{
    return (
        <div className={styled.contenedor}>
            
            <div className={styled.div}>
                    
                <h1 >
                Welcome to the Landing Page
                </h1>
                <Link to="/Home" className={styled.link}>Go!</Link>
            </div>
            
        </div>
    )
}
export default Landing;