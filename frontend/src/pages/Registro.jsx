import { useState } from "react";
import { useNavigate } from "react-router";
import { validarRegistro } from "../utils/Validador";
import registro from "../utils/RegistroAxios";

function Registro() {
    const [form, setForm] = useState({
        nombre: "",
        correo: "",
        contrasena: "",
        password2: ""
    });
    const [errores, setErrores] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navegar = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Validación en tiempo real (opcional)
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
        
        const formularioValidado = validarRegistro(form);
        if (Object.keys(formularioValidado).length > 0) {
            setErrores(formularioValidado);
            setIsSubmitting(false);
            return;
        }
        
        try {
            const nuevoRegistro = {
                usuario: form.nombre,
                email: form.correo,
                password: form.contrasena
            };
            
            await registro(nuevoRegistro); // Espera a que la promesa se resuelva
            
            // Reset después del éxito
            setForm({ nombre: "", correo: "", contrasena: "", password2: "" });
            setErrores({});
            alert("Registro exitoso!");
            navegar("/login"); // Redirige a la página de inicio de sesión
        } catch (error) {
            console.error("Error en el registro:", error);
            alert(error.response?.data?.message || "Error durante el registro");
        } finally {
            setIsSubmitting(false);
        }
    };

    return ( 
        <div className="max-w-md mx-auto mt-8 p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Registro</h2>

            <form 
                className="bg-white p-6 rounded-lg shadow-md"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-gray-700 mb-2">Nombre:</label>
                    <input 
                        type="text" 
                        id="nombre"
                        name="nombre"
                        className={`w-full p-2 border rounded ${errores.nombre ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Nombre completo"
                        value={form.nombre}
                        onChange={handleChange}
                    />
                    {errores.nombre && <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="correo" className="block text-gray-700 mb-2">Email:</label>
                    <input 
                        type="email" 
                        id="correo"
                        name="correo"
                        className={`w-full p-2 border rounded ${errores.correo ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="tu@email.com"
                        value={form.correo}
                        onChange={handleChange}
                    />
                    {errores.correo && <p className="text-red-500 text-sm mt-1">{errores.correo}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="contrasena" className="block text-gray-700 mb-2">Contraseña:</label>
                    <input 
                        type="password" 
                        id="contrasena"
                        name="contrasena"
                        className={`w-full p-2 border rounded ${errores.contrasena ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Mínimo 6 caracteres"
                        value={form.contrasena}
                        onChange={handleChange}
                    />
                    {errores.contrasena && <p className="text-red-500 text-sm mt-1">{errores.contrasena}</p>}
                </div>

                <div className="mb-6">
                    <label htmlFor="password2" className="block text-gray-700 mb-2">Confirmar contraseña:</label>
                    <input 
                        type="password" 
                        id="password2"
                        name="password2"
                        className={`w-full p-2 border rounded ${errores.password2 ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Repite tu contraseña"
                        value={form.password2}
                        onChange={handleChange}
                    />
                    {errores.password2 && <p className="text-red-500 text-sm mt-1">{errores.password2}</p>}
                </div>

                <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200 disabled:opacity-50"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Registrando...' : 'Registrarse'}
                </button>

                <p className="text-center mt-4 text-sm text-gray-600">
                    ¿Ya tienes una cuenta?{' '}
                    <a href="#" className="text-blue-600 hover:underline">Iniciar sesión</a>
                </p>
            </form>
        </div>
    );
}

export default Registro;