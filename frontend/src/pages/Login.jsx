import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { login as loginService } from "../utils/LoginAxios"; // Renombramos la importación
import { AuthContext } from "../memoria/AuthContext";

function Login() {
    const [form, setForm] = useState({
        usuario: "",
        contrasena: ""
    });
    const [errores, setErrores] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login: contextLogin } = useContext(AuthContext); // Renombramos para evitar conflicto
    const navigate = useNavigate();

    // Maneja solo los cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (errores[name]) {
            setErrores(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // 1. Preparar las credenciales para enviar al backend
            const credenciales = {
                usuario: form.usuario,
                password: form.contrasena // El backend espera "password" no "contrasena"
            };
            
            // 2. Llamar al servicio de login (API)
            const response = await loginService(credenciales);
            
            // 3. Verificar que recibimos el token
            if (!response.data?.token) {
                throw new Error('No se recibió token en la respuesta');
            }
            
            // 4. Actualizar el estado de autenticación (contexto)
            contextLogin(response.data.token);
            
            // 5. Redirigir al usuario
            navigate('/informacion');
            
        } catch (error) {
            console.error("Error en login:", error);
            setErrores({ 
                general: error.response?.data?.message || 
                        error.message || 
                        "Credenciales incorrectas"
            });
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