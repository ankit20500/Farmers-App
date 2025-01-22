import MainFooter from "../component/Home/Footer/MainFooter";
import Navbar from "../component/Home/Navbar/Navbar";

function Layout({children}){
    return(
        <>
            <Navbar/>
            <main>{children}</main>
            <MainFooter/>
        </>
    )
}

export default Layout;