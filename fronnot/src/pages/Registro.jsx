import { useState } from "react";
import { useNavigate } from "react-router";

function Registro() {
    // Estado para almacenar los datos del formulario
    // y para manejar errores
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        contraseña: '',
        confirmarContraseña: ''
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
            [name]: name === 'correo' ? value.trim() : value
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

        if (formData.contraseña !== formData.confirmarContraseña) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (formData.contraseña.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        if (!DOMINIOS_VALIDOS.includes(formData.correo.split('@')[1])) {
            setError('Dominio de correo no válido: debe ser uno de los siguientes: ' + DOMINIOS_VALIDOS.join(', '));
            return;
        }
        setError(''); // Limpiar el error si todo es correcto


        // Envío de datos
        console.log('Datos de registro:', {
            nombre: formData.nombre,
            correo: formData.correo,
            contraseña: formData.contraseña
        });

        alert(`¡Gracias por registrarte, ${formData.nombre}!`);
        setFormData({
            nombre: '',
            correo: '',
            contraseña: '',
            confirmarContraseña: ''
        });
        navigate('/info');
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
                    name="nombre"
                    placeholder="Usuario ejemplo: usuario123"
                    className="w-full my-2 p-2 border rounded-md focus:outline-none"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
                
                <input
                    type="email"
                    name="correo"
                    placeholder="Correo ejemplo: ejemplo@gmail.com"
                    className="w-full my-2 p-2 border rounded-md focus:outline-none"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                />
                
                <input
                    type="password"
                    name="contraseña"
                    placeholder="Contraseña"
                    className="w-full my-2 p-2 border rounded-md focus:outline-none"
                    value={formData.contraseña}
                    onChange={handleChange}
                    required
                    minLength={6}
                />
                
                <input
                    type="password"
                    name="confirmarContraseña"
                    placeholder="Confirmar contraseña"
                    className="w-full my-2 p-2 border rounded-md focus:outline-none"
                    value={formData.confirmarContraseña}
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