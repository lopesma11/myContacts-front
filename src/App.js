import React from "react";
import GlobalStyles from "./assets/styles/global";
import { ThemeProvider } from "styled-components";
import defaultTheme from "./assets/styles/themes/default";

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles />
            <h1>My Contacts</h1>
        </ThemeProvider>
    );
}

export default App;
