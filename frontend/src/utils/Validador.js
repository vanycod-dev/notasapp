export const validarRegistro = (form) => {
    const { nombre, correo, contrasena, password2 } = form;
    const dominiosPermitidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'];
    const errores = {};

    // Validar nombre
    if (!nombre.trim()) {
        errores.nombre = "El nombre es requerido";
    } else if (nombre.length < 3) {
        errores.nombre = "El nombre debe tener al menos 3 caracteres";
    } else if (nombre.length > 50) {
        errores.nombre = "El nombre no puede exceder los 50 caracteres";
    }

    // Validar correo
    if (!correo.trim()) {
        errores.correo = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        errores.correo = "El correo no es válido";
    } else {
        const dominio = correo.split('@')[1];
        if (!dominiosPermitidos.includes(dominio)) {
            errores.correo = `Dominio no permitido. Use: ${dominiosPermitidos.join(', ')}`;
        }
    }

    // Validar contraseña
    if (!contrasena) {
        errores.contrasena = "La contraseña es requerida";
    } else if (contrasena.length < 6) {
        errores.contrasena = "La contraseña debe tener al menos 6 caracteres";
    } else if (contrasena.length > 20) {
        errores.contrasena = "La contraseña no puede exceder los 20 caracteres";
    } else if (!/[A-Z]/.test(contrasena)) {
        errores.contrasena = "La contraseña debe contener al menos una mayúscula";
    }

    // Validar confirmación de contraseña
    if (!password2) {
        errores.password2 = "Confirme su contraseña";
    } else if (contrasena !== password2) {
        errores.password2 = "Las contraseñas no coinciden";
    }

    return errores;
}

export const validarLogin = (form) => {
    const { usuario, contrasena } = form;
    const errores = {};

    // Validar usuario/email
    if (!usuario.trim()) {
        errores.usuario = "El usuario es requerido";
    } else if (usuario.length < 3) {
        errores.usuario = "El usuario debe tener al menos 3 caracteres";
    }

    // Validar contraseña
    if (!contrasena) {
        errores.contrasena = "La contraseña es requerida";
    } else if (contrasena.length < 6) {
        errores.contrasena = "La contraseña debe tener al menos 6 caracteres";
    }

    return errores;
}