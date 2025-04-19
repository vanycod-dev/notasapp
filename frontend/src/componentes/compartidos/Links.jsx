import { Link } from "react-router";
function Links({ to, texto, onClick, asButton = false }) {
    return asButton ? (
        <button onClick={onClick} className="hover:bg-gray-400 py-1.5 w-full text-white">
            {texto}
        </button>
    ) : (
        <Link to={to} onClick={onClick} className="hover:bg-gray-400 py-1.5 block">
            {texto}
        </Link>
    );
}

export default Links;