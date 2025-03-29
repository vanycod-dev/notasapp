import { useState } from "react";
import { useNavigate } from "react-router";

const DOMINIOS_VALIDOS = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];

function Login() {
    // Estado para almacenar los datos del formulario
    // y para manejar errores
    const [formData, setFormData] = useState({
        correo: '',
        contraseña: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // sequenceDiagram
    // Usuario->>Input: Escribe "  ana@gmail.com  "
    // Input->>handleChange: Dispara evento (e)
    // handleChange->>setFormData: Actualiza estado
    // setFormData->>Estado: {correo: "ana@gmail.com", contraseña: ""}

    // Función para manejar el cambio de los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'correo' ? value.trim() : value
        }));
    };

    // Función para manejar el envío del formulario
    // Aquí se pueden agregar las validaciones necesarias
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validaciones
        if (!formData.correo || !formData.contraseña) {
            setError('Todos los campos son requeridos');
            return;
        }

        const dominio = formData.correo.split('@')[1];
        if (!DOMINIOS_VALIDOS.includes(dominio)) {
            setError('Dominio de correo no válido');
            return;
        }

        if (formData.contraseña.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        // Si pasa las validaciones
        console.log('Datos enviados:', formData);
        navigate('/info');
    };

    return ( 
        <div className="max-w-2xl bg-gray-200 mx-auto my-2.5 p-2 border rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
            
            {/* Mostrar error si existe */}
            {error && (
                <div className="my-2 p-2 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="correo"
                    className="w-full my-2 p-2 border rounded-md focus:outline-none"
                    placeholder="Email" 
                    value={formData.correo}
                    onChange={handleChange}
                    required 
                />
                
                <input 
                    type="password" 
                    name="contraseña"
                    className="w-full my-2 p-2 border rounded-md focus:outline-none"
                    placeholder="Contraseña" 
                    value={formData.contraseña}
                    onChange={handleChange}
                    required 
                    minLength={6}
                />

                <button 
                    type="submit"
                    className="w-full p-2 rounded-md outline-2 outline-purple-500/75 hover:outline-purple-500/75 hover:bg-purple-500/75 hover:text-white transition duration-700 ease-in-out cursor-pointer font-bold"
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}

export default Login;