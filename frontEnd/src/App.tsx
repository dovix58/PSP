import React, {useState} from 'react'
import {Box, Button} from "@mui/material"
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
        <Box>
            {products.map((product) => (
                <Box key={product.id}>
                    <h2>{product.name}</h2>
                    <p>Price: {product.price} cents</p>
                    <p>Created: {product.created}</p>
                </Box>
            ))}
        </Box>
      <Button onClick={handleGetProducts}>Get products</Button>
    </>
  )
}

export default App
