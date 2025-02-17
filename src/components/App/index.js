import React from "react";
import GlobalStyles from "../../assets/styles/global";
import { ThemeProvider } from "styled-components";
import defaultTheme from "../../assets/styles/themes/default";
import { Container } from "./styles";
import Header from "../Header";

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles />
            <Container>
                <Header />
            </Container>
        </ThemeProvider>
    );
}

export default App;
