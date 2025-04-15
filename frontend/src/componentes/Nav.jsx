import Links from "./compartidos/Links";

function Nav() {
    return ( 
        <>
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center">

                <h1 className="text-2xl font-bold">Notas App</h1>
                <nav>
                    <span className="text-2xl px-1.5 py-1 relative hover:bg-gray-200/40 rounded cursor-pointer">☰</span>
                </nav>

                <div className="w-3xs ml-4 flex flex-col text-center absolute right-0 top-16 bg-gray-800/75 text-white py-4 rounded shadow-lg">

                    <Links to="/registro" texto='Crear cuenta' />
                    <Links to="/login" texto='Iniciar sesión' />
                    <Links to="/" texto='Notas' />
                    <Links to="/" texto='Crear Nota' />
                    <Links to="/informacion" texto='Información' />

                </div>
            </header>
        </>
     );
}

export default Nav;