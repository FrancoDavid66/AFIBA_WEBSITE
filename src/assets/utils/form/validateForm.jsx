// src/utils/formValidation.js
export const validateForm = (form) => {
    let tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dniPattern = /^[0-9]+$/; // Acepta cualquier cantidad de números
    const phonePattern = /^\+?[\d\s]+$/;
    const weightPattern = /^[0-9]+\.[0-9]+$/; // Acepta solo números con punto (ej. 80.6)
    const heightPattern = /^[0-9]+\.[0-9]+$/; // Acepta solo números con punto (ej. 1.80)

    if (!form.email) {
        tempErrors.email = "Correo Electrónico es requerido";
    } else if (!emailPattern.test(form.email)) {
        tempErrors.email = "Correo Electrónico no es válido";
    }

    if (!form.fullName) tempErrors.fullName = "Nombre y Apellido es requerido";

    if (!form.birthDate) {
        tempErrors.birthDate = "Fecha de Nacimiento es requerida";
    } else {
        const birthDate = new Date(form.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 0 || age > 100) {
            tempErrors.birthDate = "Debes tener entre 18 y 100 años";
        }
    }

    if (!form.dni) {
        tempErrors.dni = "DNI es requerido";
    } else if (!dniPattern.test(form.dni)) {
        tempErrors.dni = "DNI debe tener exactamente 9 dígitos";
    }

    if (!form.locality) tempErrors.locality = "Localidad es requerida";

    if (!form.modality) tempErrors.modality = "Modalidad es requerida";

    if (!form.category) tempErrors.category = "Categoría es requerida";

    if (!form.competitionWeight) {
        tempErrors.competitionWeight = "Peso de Competencia es requerido";
    } else if (!weightPattern.test(form.competitionWeight)) {
        tempErrors.competitionWeight = "Peso de Competencia debe ser un número con punto (por ejemplo, 80.6)";
    }

    if (!form.height) {
        tempErrors.height = "Altura es requerida";
    } else if (!heightPattern.test(form.height)) {
        tempErrors.height = "Altura debe ser un número con punto (por ejemplo, 1.80)";
    }

    if (!form.phone) {
        tempErrors.phone = "Teléfono es requerido";
    } else if (!phonePattern.test(form.phone)) {
        tempErrors.phone = "Teléfono no es válido";
    }

    if (!form.trainer) tempErrors.trainer = "Entrenador es requerido";

    if (!form.photo) {
        tempErrors.photo = "Foto carnet es requerida";
    }

    return tempErrors;
};
