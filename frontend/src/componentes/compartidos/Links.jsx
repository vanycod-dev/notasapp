import { Link } from "react-router";
function Links({to, texto, onClick }) {
    return ( 
        <>
            <Link to={to} onClick={onClick} className="hover:bg-gray-400 py-1.5">{texto}</Link >
        </>
     );
}

export default Links;