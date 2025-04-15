function Login() {
    return ( 
        <>
            <div className="w-4xl mt-5 mx-auto flex flex-col items-center">
                <h2 className="text-3xl mt-2 font-bold mb-4">Login</h2>
                <form className="w-3/4 flex flex-col items-center bg-gray-200 p-4 rounded shadow-lg shadow-gray-500/55">

                    <label className="text-lg">Nombre:</label>
                    <input type="text" className="border border-gray-800/75 p-2 mb-4 rounded w-full focus:outline-0 focus:border-gray-900" placeholder="Nombre" />
                    <label className="text-lg">Contraseña:</label>
                    <input type="password" className="border border-gray-800/75 p-2 mb-4 rounded w-full focus:outline-0 focus:border-gray-900" placeholder="Contraseña" />
                    
                    <button className="bg-gray-800 text-white p-2 rounded w-full hover:bg-gray-900 transition duration-200">Iniciar sesión</button>
                    <p className="text-sm mt-4">¿No tienes una cuenta? <span className="text-blue-500 hover:underline">Crear cuenta</span></p>
                </form>
            </div>
        </>
     );
}

export default Login;