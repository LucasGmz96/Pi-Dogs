import React from 'react'
import { Link } from 'react-router-dom'
import styled from './Paginado.module.css'


export default function Paginado({items, dogsAll, paginado}) {

    const numPag = []
    
    for(let i = 0; i < Math.ceil(dogsAll/items); i++) {
        numPag.push(i + 1)
        
    }

  return (
    <div>
        <ul className={styled.ulPag}>
            {
                numPag && numPag.map(e => 
                    <li key={e} className={styled.liPag}>
                        <Link onClick={()=>paginado(e)} className={styled.linkPag}>{e}</Link>
                    </li>
                )
            }
        </ul>


    </div>
  )
}