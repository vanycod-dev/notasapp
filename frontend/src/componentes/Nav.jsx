// src/components/Nav.js
import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../memoria/AuthContext";

function Nav() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Cerrar el menú al hacer clic fuera de él
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                if (!event.target.closest('nav span')) {
                    setMenuOpen(false);
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        window.location.href = '/login';
    };

    return ( 
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center relative">
            <h1 className="text-2xl font-bold">Notas App</h1>
            <nav>
                <span 
                    onClick={toggleMenu}
                    className="text-2xl px-1.5 py-1 relative hover:bg-gray-200/40 rounded cursor-pointer"
                >
                    ☰
                </span>
            </nav>

            {/* Menú desplegable */}
            {menuOpen && (
                <div 
                    ref={menuRef}
                    className="w-48 ml-4 flex flex-col text-center absolute right-0 top-16 bg-gray-800/95 text-white py-4 rounded shadow-lg z-50"
                >
                    {isAuthenticated ? (
                        <>
                            <NavLink to="/" text="Notas" onClick={handleLinkClick} />
                            <NavLink to="/nota" text="Crear Nota" onClick={handleLinkClick} />
                            <NavLink to="/informacion" text="Información" onClick={handleLinkClick} />
                            <button 
                                onClick={handleLogout}
                                className="px-4 py-2 hover:bg-gray-700/50 text-white text-center w-full"
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/registro" text="Crear cuenta" onClick={handleLinkClick} />
                            <NavLink to="/login" text="Iniciar sesión" onClick={handleLinkClick} />
                            <NavLink to="/" text="Notas" onClick={handleLinkClick} />
                            <NavLink to="/nota" text="Crear Nota" onClick={handleLinkClick} />
                            <NavLink to="/informacion" text="Información" onClick={handleLinkClick} />
                        </>
                    )}
                </div>
            )}
        </header>
    );
}

// Componente NavLink mejorado
function NavLink({ to, text, onClick }) {
    return (
        <Link 
            to={to} 
            onClick={onClick}
            className="px-4 py-2 hover:bg-gray-700/50 text-white"
        >
            {text}
        </Link>
    );
}

export default Nav;