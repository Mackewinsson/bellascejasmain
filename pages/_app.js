import { createGlobalStyle, ThemeProvider } from "styled-components";
import Layout from "../components/common/Layout";
import { AuthContextProvider } from "../context/authContext";

const GlobalStyle = createGlobalStyle`
  html,body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
    overflow-x: hidden;
    width: 100%;
    min-height: 100vh;
    scroll-behavior: smooth;
  }

  a {
    display: flex;
    height: 100%;
    align-items: center;
    text-decoration: none;
    font-weight: bold;
    color: #2997ff;

    a::hover {
      font-size: 1.1em;
      text-decoration: underline;
    }
  }

`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}
