import { createGlobalStyle, ThemeProvider } from "styled-components";
import Layout from "../components/common/Layout";

const GlobalStyle = createGlobalStyle`
  html,body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }

  body{
    min-height: 100%;
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
