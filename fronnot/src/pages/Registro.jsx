import { useState } from "react";
import { useNavigate } from "react-router";
import { sendRegistrationData } from "../utils/Registro";

function Registro() {
    // Estado para almacenar los datos del formulario
    // y para manejar errores
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confipassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const DOMINIOS_VALIDOS = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];

    // Función para manejar el cambio de los inputs
    // Aquí se pueden agregar las validaciones necesarias
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'email' ? value.trim() : value
        }));
    };

    // Función para manejar el envío del formulario
    // Aquí se pueden agregar las validaciones necesarias
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validaciones
        if (Object.values(formData).some(campo => campo === '')) {
            setError('Todos los campos son requeridos');
            return;
        }

        if (formData.password !== formData.confipassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        if (!DOMINIOS_VALIDOS.includes(formData.email.split('@')[1])) {
            setError('Dominio de correo no válido: debe ser uno de los siguientes: ' + DOMINIOS_VALIDOS.join(', '));
            return;
        }
        setError(''); // Limpiar el error si todo es correcto


        // Envío de datos
        console.log('Datos de registro:', {
            nombre: formData.username,
            correo: formData.email,
            contraseña: formData.password
        });
        sendRegistrationData(formData);

        alert(`¡Gracias por registrarte, ${formData.username}!`);
        setFormData({
            username: '',
            email: '',
            password: '',
            confipassword: ''
        });
        navigate('/login');
    };

    return ( 
        <div className="max-w-2xl bg-gray-200 mx-auto my-2.5 p-2 border rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold text-center">Registro</h2>

            {/* // Mensaje de error */}
            {error && (
                <div className="my-2 p-2 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Usuario ejemplo: usuario123"
                    className="w-full my-2 p-2 border rounded-md focus:outline-none"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                
                <input
                    type="email"
                    name="email"
                    placeholder="Correo ejemplo: ejemplo@gmail.com"
                    className="w-full my-2 p-2 border rounded-md focus:outline-none"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="w-full my-2 p-2 border rounded-md focus:outline-none"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                />
                
                <input
                    type="password"
                    name="confipassword"
                    placeholder="Confirmar contraseña"
                    className="w-full my-2 p-2 border rounded-md focus:outline-none"
                    value={formData.confipassword}
                    onChange={handleChange}
                    required
                />

                <button
                    type="submit"
                    className="w-full p-2 rounded-md outline-2 outline-purple-500/75 hover:outline-purple-500/75 hover:bg-purple-500/75 hover:text-white transition duration-700 ease-in-out cursor-pointer font-bold"
                >
                    Registrar
                </button>
            </form>
        </div>
    );
}

export default Registro;