import { Link } from "react-router";

function Links({to, text}) {
    return ( 
        <>
            <Link to={to} className="py-1 hover:bg-gray-500/50">{text}</Link>
        </>
     );
}

export default Links;