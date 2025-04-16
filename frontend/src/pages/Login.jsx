import { useState } from "react";
import { validarLogin } from "../utils/Validador";

function Login() {
    const [form, setForm] = useState({
        usuario: "",
        contrasena: ""
    });
    const [errores, setErrores] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpiar error al editar
        if (errores[name]) {
            setErrores(prev => {
                const newErrores = {...prev};
                delete newErrores[name];
                return newErrores;
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const erroresValidacion = validarLogin(form);
        
        if (Object.keys(erroresValidacion).length > 0) {
            setErrores(erroresValidacion);
            setIsSubmitting(false);
            return;
        }
        
        try {
            // Aquí iría la llamada a tu API de login
            console.log("Credenciales válidas, iniciando sesión:", form);
            // await api.iniciarSesion(form);
            
            // Reset después del éxito
            setForm({
                usuario: "",
                contrasena: ""
            });
            setErrores({});
            
            // Redirigir al dashboard o página principal
            // navigate('/dashboard');
            
        } catch (error) {
            console.error("Error en el login:", error);
            setErrores({ general: "Credenciales incorrectas" });
        } finally {
            setIsSubmitting(false);
        }
    }

    return ( 
        <div className="max-w-md mx-auto mt-8 p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>

            {errores.general && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {errores.general}
                </div>
            )}

            <form 
                className="bg-white p-6 rounded-lg shadow-md"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="mb-4">
                    <label htmlFor="usuario" className="block text-gray-700 mb-2">
                        Usuario:
                    </label>
                    <input 
                        type="text" 
                        id="usuario"
                        name="usuario"
                        className={`w-full p-2 border rounded ${
                            errores.usuario ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Usuario o email"
                        value={form.usuario}
                        onChange={handleChange}
                    />
                    {errores.usuario && (
                        <p className="text-red-500 text-sm mt-1">{errores.usuario}</p>
                    )}
                </div>

                <div className="mb-6">
                    <label htmlFor="contrasena" className="block text-gray-700 mb-2">
                        Contraseña:
                    </label>
                    <input 
                        type="password" 
                        id="contrasena"
                        name="contrasena"
                        className={`w-full p-2 border rounded ${
                            errores.contrasena ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Tu contraseña"
                        value={form.contrasena}
                        onChange={handleChange}
                    />
                    {errores.contrasena && (
                        <p className="text-red-500 text-sm mt-1">{errores.contrasena}</p>
                    )}
                </div>

                <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 disabled:opacity-50"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>

                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>
                        ¿No tienes una cuenta?{' '}
                        <a 
                            href="/registro" 
                            className="text-blue-600 hover:underline"
                        >
                            Crear cuenta
                        </a>
                    </p>
                    <a 
                        href="/recuperar-contrasena" 
                        className="text-blue-600 hover:underline mt-2 inline-block"
                    >
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
            </form>
        </div>
    );
}

export default Login;