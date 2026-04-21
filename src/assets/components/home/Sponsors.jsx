import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/Card3d/index.css';
import { SPONSORS } from '../../data/sponsors';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 },
  hover: { y: -5 },
};

const Sponsors = () => {
  return (
    <section className="w-full h-auto">
      <div className="maincontainer w-full m-auto flex flex-col items-center">
        <h4 className="h4 py-9">NUESTROS VALIOSOS SPONSORS</h4>
        <motion.div
          className="w-full flex gap-10 flex-wrap justify-center items-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {SPONSORS.map((item, i) => (
            <motion.div
              key={i}
              className="thecard"
              variants={itemVariants}
              whileHover="hover"
            >
              <a href={item.href} target='_blank' className="thefront bg-gray-800 border-[1px] border-gray-500">
                <img src={item.image} alt={item.name} />
              </a>
          
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const tempErrors = validateForm(form);
  setErrors(tempErrors);

  if (Object.keys(tempErrors).length === 0) {
    try {
      const formattedBirthDate = formatDate(form.birthDate);

      // Initialize photoUrl as an empty string
      let photoUrl = ''; 

      // Upload image to Cloudinary if photo is present
      if (form.photo) {
        const formData = new FormData();
        formData.append('file', form.photo);
        formData.append('upload_preset', UPLOAD_PRESET);

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        );

        // Get the photo URL
        photoUrl = cloudinaryResponse.data.secure_url; 
      }

      // Prepare data for the API
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
        photoUrl: photoUrl, // Use the photo URL returned from Cloudinary as a string
      };

      console.log("Data being sent to API:", apiData);

      // Call your API to create a task
      await createTask(apiData);

      // Parameters for emailJS
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
        photo_url: photoUrl, // Send the photo URL here as well
        message: "Formulario de Inscripción",
      };

      // Send email with emailJS
      emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .then((response) => {
          console.log('Correo enviado!', response.status, response.text);
          setLoading(false);
          setModalOpen(true);
          // Reset form
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
            photo: '', // Reset photo to empty string
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