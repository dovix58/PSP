import { GifBox } from '@mui/icons-material';
import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Stack, Button, ListItem } from "@mui/material";
import {
  getCategories,
} from "./api/productAPI.ts";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function CreateCategory(){

    const [name, setName] = useState("");
    const [categories, setCategories] = useState ([]);

    useEffect(() => {
        getCategories().then((a) => setCategories(a));
        
      }, []);
      
        const data = {name: name}

        const CreateCategory = async (e:any) =>{
        try {
            const response = await fetch("/api/v1/categories", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
      
            if (response.ok) {
              const responseData = await response.json();
              console.log("Category created successfully:", responseData);
            
            } else {
              console.error("Failed to create category:", response.statusText);
            }
          } catch (error) {
            console.error("Error during POST request:", error);
          }

    }
    const handleDeleteCategory = async (categoryId) => {
    try {
      // Send a DELETE request to your backend API
      const response = await fetch(
        `/api/v1/categories/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

    
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.error('Error deleting category:', error);
  
    }
  };

    return (
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          margin: "8px 0",
          maxHeight: 400,
          width: "auto",
          overflowY: "auto",
        }}
      >
        <form onSubmit={CreateCategory}>
          <Stack direction={"column"}>
            <Stack direction={"row"} spacing={2}>
              <TextField
                onChange={(e) => setName(e.target.value)}
                id="1"
                label="Category name"
                variant="standard"
              />
              <Button type="submit" variant="outlined" color="success">
                Create
              </Button>
            </Stack>
            {categories.map((category) => (
              <ListItem
                href="#simple-list"
                key={category.id}
                value={category.id}
              >
                {category.name}{" "}
                <Button onClick={() => handleDeleteCategory(category.id)}>
                  <RemoveCircleIcon color='success'/>
                </Button>
              </ListItem>
            ))}
          </Stack>
        </form>
      </Box>
    );
}