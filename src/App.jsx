import { useState, useEffect, useMemo } from "react";

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import {
  green,
  teal,
  red,
  //  blue,
  //  grey,
  //  pink,
} from "@mui/material/colors";

import ThemeWrapper from "./ThemeWrapper";

// import Counter from "./Counter";
// import Dropdown from "./Dropdown";
// import ColorPicker from "./ColorPicker";
// import ToDoList from "./ToDoList";
import FormWithoutFormik from "./RegistrationForm";

// const ColorPickerOptions = [
//   {
//     label: "red",
//     color: red["600"],
//     hoverColor: red["400"],
//     activeColor: red["900"],
//     activeColorBorder: red["300"],
//   },
//   {
//     label: "green",
//     color: green["600"],
//     hoverColor: green["400"],
//     activeColor: green["900"],
//     activeColorBorder: green["300"],
//   },
//   {
//     label: "blue",
//     color: blue["600"],
//     hoverColor: blue["400"],
//     activeColor: blue["900"],
//     activeColorBorder: blue["300"],
//   },
//   {
//     label: "grey",
//     color: grey["600"],
//     hoverColor: grey["400"],
//     activeColor: grey["900"],
//     activeColorBorder: grey["300"],
//   },
//   {
//     label: "pink",
//     color: pink["600"],
//     hoverColor: pink["400"],
//     activeColor: pink["900"],
//     activeColorBorder: pink["300"],
//   },
//   {
//     label: "teal",
//     color: teal["600"],
//     hoverColor: teal["400"],
//     activeColor: teal["900"],
//     activeColorBorder: teal["300"],
//   },
// ];

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          tealgrean: {
            main: green["A700"],
            contrastText: "#fff",
          },
          softred: {
            main: red[400],
            contrastText: "#fff",
          },
        }
      : {
          tealgrean: {
            main: teal[800],
            contrastText: "#fff",
          },
          softred: {
            main: red[600],
            contrastText: "#fff",
          },
        }),
  },
});

function App() {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prevMode) => {
      localStorage.setItem(
        "vvColorMode",
        JSON.stringify(prevMode === "light" ? "dark" : "light")
      );
      return prevMode === "light" ? "dark" : "light";
    });
  };

  let theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  theme = responsiveFontSizes(theme);

  useEffect(() => {
    localStorage.getItem("vvColorMode") &&
      setMode(JSON.parse(localStorage.getItem("vvColorMode")));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ThemeWrapper mode={mode} modeHandler={toggleColorMode}>
        {/* <Counter initialValue={0}/> */}
        {/* <Dropdown /> */}
        {/* <ColorPicker colorOptions={ColorPickerOptions} /> */}
        {/* <ToDoList /> */}
        
        <FormWithoutFormik />
      </ThemeWrapper>
    </ThemeProvider>
  );
}

export default App;
