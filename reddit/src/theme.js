import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        reddit: {
          100: "#FF5700",
          400: "#1A1A1B", 
          200: "#343438",
          500: "#0f0f10",
          dark: "#282C34",
          secondary: "#202329"
        },
      }      
});

export default theme;
