import { ThemeProvider } from "styled-components";
import Footer from "./components/Footer";
import TextBox from "./components/TextBox";
import { GlobalStyle } from "./styles/global";
import { useTheme } from "./context/ThemeContext";


function App() {

  const theme = useTheme();
  
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyle/>
        <div className="canvas">
          navbar
           <TextBox/>
           <Footer/>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
