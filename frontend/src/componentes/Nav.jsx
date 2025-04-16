import { useState, useRef, useEffect } from "react";
import Links from "./compartidos/Links";

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null); // Referencia para el menú desplegable

    // Cerrar el menú al hacer clic fuera de él
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                // Verificar si el clic no fue en el ícono del menú
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

    // Alternar el menú al hacer clic en el ícono
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Cerrar el menú al hacer clic en un enlace
    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    return ( 
        <>
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

                {/* Menú desplegable (condicional) */}
                {menuOpen && (
                    <div 
                        ref={menuRef}
                        className="w-3xs ml-4 flex flex-col text-center absolute right-0 top-16 bg-gray-800/75 text-white py-4 rounded shadow-lg z-50"
                    >
                        <Links to="/registro" texto='Crear cuenta' onClick={handleLinkClick} />
                        <Links to="/login" texto='Iniciar sesión' onClick={handleLinkClick} />
                        <Links to="/" texto='Notas' onClick={handleLinkClick} />
                        <Links to="/nota" texto='Crear Nota' onClick={handleLinkClick} />
                        <Links to="/informacion" texto='Información' onClick={handleLinkClick} />
                    </div>
                )}
            </header>
        </>
    );
}

export default Nav;