import React from "react";
import { Box } from "@mui/material";

export default function BeautyPage() {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      Hello!
    </Box>
  );
}
