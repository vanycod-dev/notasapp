import { Outlet } from "react-router";
import Nav from "../componentes/Nav";

function Layout() {
    return ( 
        <>
            <Nav />
            <main>
                <Outlet></Outlet>
            </main>
        </>
     );
}

export default Layout;