import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';

const Products = () => {
    
    const [products,setProducts] =useState([]);
   


    const [cart, setCart] = useState([]);
    
    

    

    useEffect(()=>{
        const url = `products.json`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setProducts(data.products);
           
        })
    },[]);

  

 

    const handleAddToCart = (selectedProduct) =>{
        
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if(!exists){
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else{
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        
        setCart(newCart);
        
    }

    return (
    <div>
         <div className="products-container col-span-4 grid grid-cols-3 gap-[45px] my-[100px] mx-[50px]">
                {
                    products.map(product=><Product 
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container col-span-1 bg-[#ff99004d]">
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to="/orders">
                        <button>Review Order</button>
                    </Link>
                </Cart>
            </div>
    </div>
    );
};

export default Products;