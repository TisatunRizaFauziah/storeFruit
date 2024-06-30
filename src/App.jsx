import Footer from "./component/Footer";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";

export default function App()
{
    return(
        <>
        <Header/>
        <Outlet/>
        <Footer/>
       </>
    )
       
}