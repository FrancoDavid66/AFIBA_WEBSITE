import axios from 'axios';
import emailjs from "@emailjs/browser";

 import { validateForm } from '../../assets/utils/form/validateForm';
 import { formatDate } from '../../assets/utils/form/formatDate';
import { createTask } from '../../api/tasks.api';

export const handleSubmit = async (e, form, setLoading, setErrors, setModalOpen, setForm) => {
    e.preventDefault();
    setLoading(true);

    const tempErrors = validateForm(form);
    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
        try {
            const formattedBirthDate = formatDate(form.birthDate);
            let photoUrl = '';

            if (form.photo) {
                const formData = new FormData();
                formData.append('file', form.photo);
                formData.append('upload_preset', UPLOAD_PRESET);

                const cloudinaryResponse = await axios.post(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                    formData
                );

                photoUrl = cloudinaryResponse.data.secure_url;
            }

            const apiData = {
                email: form.email,
                fullName: form.fullName,
                birthDate: formattedBirthDate,
                dni: form.dni,
                locality: form.locality,
                modality: form.modality,
                category: form.category,
                competitionWeight: form.competitionWeight,
                height: form.height,
                phone: form.phone,
                trainer: form.trainer,
                photoUrl: photoUrl,
            };

            console.log("Data being sent to API:", apiData);

            await createTask(apiData);

            const templateParams = {
                form_name: form.fullName,
                to_name: form.fullName,
                to_email: form.email,
                to_birthDate: formattedBirthDate,
                to_dni: form.dni,
                to_locality: form.locality,
                to_modality: form.modality,
                to_category: form.category,
                to_competitionWeight: form.competitionWeight,
                to_height: form.height,
                to_phone: form.phone,
                to_trainer: form.trainer,
                photo_url: photoUrl,
                message: "Formulario de Inscripción",
            };

            emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
                .then((response) => {
                    console.log('Correo enviado!', response.status, response.text);
                    setLoading(false);
                    setModalOpen(true);
                    setForm({
                        email: "",
                        fullName: "",
                        birthDate: "",
                        dni: "",
                        locality: "",
                        modality: "",
                        category: "",
                        competitionWeight: "",
                        height: "",
                        phone: "",
                        trainer: "",
                        photo: '',
                    });
                })
                .catch((err) => {
                    console.error('Error al enviar el correo:', err);
                    setLoading(false);
                });
        } catch (error) {
            console.error('Error en el proceso de inscripción:', error);
            setLoading(false);
        }
    } else {
        setLoading(false);
    }
};
