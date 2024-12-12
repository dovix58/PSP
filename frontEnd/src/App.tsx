import React, {useState} from 'react'
import {Button} from "@mui/material"
import './App.css'
import {getAllProducts} from "./api/productAPI.ts";
import {Product} from "./api/entityInterfaces.ts";

function App() {
    const [products, setProducts] = useState<Product[]>([])

    const handleGetProducts = () => {
        getAllProducts().then((data) => setProducts(data));
    }

  return (
    <>
        <div>
            {products.map((product) => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>Price: {product.price} cents</p>
                    <p>Created: {product.created}</p>
                </div>
            ))}
        </div>
      <Button onClick={handleGetProducts}>Get products</Button>
    </>
  )
}

export default App
