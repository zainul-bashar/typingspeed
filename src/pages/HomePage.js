import React from "react";
import Footer from "../components/Footer";
import TextBox from "../components/TextBox";
import Header from "../components/Header";

const HomePage = () => {
    return(
        <div>
        <div className="canvas">
          <Header/>
           <TextBox/>
           <Footer/>
        </div>
        </div>
    )
}
export default HomePage;