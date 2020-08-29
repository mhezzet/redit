import React from "react";
import { Box } from "@chakra-ui/core";

type WrapperProps = {
  variant?: "small" | "regular";
};

const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {
  return (
    <Box
      mt={8}
      maxW={variant === "regular" ? "800px" : "400px"}
      mx="auto"
      w="100%"
    >
      {children}
    </Box>
  );
};
export default Wrapper;
