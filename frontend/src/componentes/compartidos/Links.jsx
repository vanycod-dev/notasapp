import { Link } from "react-router";
function Links({to, texto}) {
    return ( 
        <>
            <Link to={to} className="hover:bg-gray-400 py-1.5">{texto}</Link >
        </>
     );
}

export default Links;