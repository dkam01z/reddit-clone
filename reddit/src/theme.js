import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    reddit: {
      100: "#FF5700",
      200: "#343438",
      400: "#1A1A1B",
      500: "#0f0f10",
      dark: "#282C34",
      secondary: "#202329"
    },
  },
  breakpoints: {
    sm: "30em", // 480px
    md: "48em", // 768px
    lg: "62em", // 992px
    xl: "74em", // 1192px
    "2xl": "80em", // 1280px
  },
});

export default theme;
