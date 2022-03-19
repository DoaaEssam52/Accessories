import React ,{useState,useEffect}from 'react'
import { Link,useHistory } from "react-router-dom"


function ProductCard(props) {
  const Product=props.Product;
  
  return (<>
    <div  className='product-item' >
        <Link to={`/ProductDetails/${Product.id}`}>
            <div className='product-item-header'>
                <img src={Product.image} className='product-item-image'>
                </img>
                
                <button className='product-item-review'  >
                        Quick review
                </button>
            
            </div>
        </Link>
        <span className='product-item-name'>{Product.title}</span>
        <span className='product-item-price'>
            {Product.price} EGP
        </span>
    </div>
 
    </>
  )
}

export default ProductCard