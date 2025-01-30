import { createTheme } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: "#FF5733",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#47008F",
    },
    openTitle: "#3f4771",
    protectedTitle: pink["400"],
    type: "light",
  },
});

export default theme;
