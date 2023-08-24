import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';




const Products = () => {
    


    const [products,setProducts] =useState([]);
    const [count,setCount]= useState(0);


    const [cart, setCart] = useState([]);
    
    const[page,setPage] =useState(0);
    const[size,setSize] = useState(10);

    const pages =Math.ceil(count/size);

    useEffect(()=>{
        const url = `https://ecommerce-w98m.onrender.com/products?page=${page}&size=${size}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setProducts(data.products);
            setCount(data.count);
        })
    },[page,size]);

    const clearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }

    useEffect( () =>{
        const storedCart = getStoredCart();
        const savedCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product => product._id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (selectedProduct) =>{
        console.log(selectedProduct);
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
        addToDb(selectedProduct._id);
    }

    return (
        <div className='shop-container grid grid-cols-5'>
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
            <div className="pagination">
                <p>Selected page:{page}</p>
                {
                    [...Array(pages).keys()].map(number=>
                        <button 
                        key={number}
                        className={page===number && 'selected'}
                        onClick={()=>setPage(number)}
                        >{number}</button>
                        )
                }
                <select onChange={event =>setSize(event.target.value)}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                </select>
                
            </div>
        </div>
    );
};

export default Products;