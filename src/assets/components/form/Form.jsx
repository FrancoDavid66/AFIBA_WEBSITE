import React, { useRef } from 'react'

import imgCarnet1 from "../../imgs/form/imgCarnet1.jpg";
import imgCarnet2 from "../../imgs/form/imgCarnet2.jpg";
import imgCarnet3 from "../../imgs/form/imgCarnet3.jpg";
import imgCarnet4 from "../../imgs/form/imgCarnet4.webp";
import imgCarnet5 from "../../imgs/form/imgCarnet5.webp";


const Form = ({ form,
    setForm,
    errors,
    handleChange,
    handleSubmit,
    validateForm,
    fileInputRef,
    localities,
    modalities,
    categories,
    provinces,
    countries,
    loading,
    cloudName,
    uploadPreset,
    templateId,
    serviceId,
    publicKey,
   }) => {
    const formRef = useRef();

  return (
    <form
    className="flex flex-col items-start space-y-6"
    ref={formRef}
    onSubmit={handleSubmit}
    encType="multipart/form-data"
    method="post"
  >
    {/* email - correo */}
    <div className="w-full">
      <label
        className="block text-lg font-semibold mb-2"
        htmlFor="email"
      >
        Correo Electrónico:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="ejemplo@correo.com"
        className={`w-full px-4 py-2 border bg-gray-100 text-black ${
          errors.email ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
      />
      {errors.email && <p className="text-red-600">{errors.email}</p>}
      
    </div>

    {/* name - nombre y apellido */}
    <div className="w-full">
      <label
        className="block text-lg font-semibold mb-2"
        htmlFor="fullName"
      >
        Nombre y Apellido:
      </label>
      <input
        type="text"
        id="fullName"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        placeholder="Juan Pérez"
        className={`w-full px-4 py-2 border bg-gray-100 text-black ${
          errors.fullName ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
      />
      {errors.fullName && (
        <p className="text-red-600">{errors.fullName}</p>
      )}
    </div>

    {/* birthDate - fecha de nacimiento */}
    <div className="w-full">
      <label
        className="block text-lg font-semibold mb-2"
        htmlFor="birthDate"
      >
        Fecha de Nacimiento:
      </label>
      <input
        type="date"
        id="birthDate"
        name="birthDate"
        value={form.birthDate}
        onChange={handleChange}
        className={`w-full px-4 py-2 border bg-gray-100 text-black ${
          errors.birthDate ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
      />
      {errors.birthDate && (
        <p className="text-red-600">{errors.birthDate}</p>
      )}
    </div>

    {/* dni - DNI */}
    <div className="w-full">
      <label className="block text-lg font-semibold mb-2" htmlFor="dni">
        DNI:
      </label>
      <input
        type="text"
        id="dni"
        name="dni"
        value={form.dni}
        onChange={handleChange}
        placeholder="123456789"
        className={`w-full px-4 py-2 border bg-gray-100 text-black ${
          errors.dni ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
      />
      {errors.dni && <p className="text-red-600">{errors.dni}</p>}
    </div>
       {/* countri - pais */}
       <div className="w-full">
      <label
        className="block text-lg font-semibold mb-2"
        htmlFor="locality"
      >
        Pais:
      </label>
      <select
        id="country"
        name="country"
        value={form.country}
        onChange={handleChange}
        className={`w-full px-4 py-2 border bg-gray-100 text-black ${
          errors.country ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
      >
        <option value="">Selecciona tu Pais</option>
        {countries.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
      {errors.countries && (
        <p className="text-red-600">{errors.countries}</p>
      )}
    </div>
       {/* province - provincia */}
       <div className="w-full">
      <label
        className="block text-lg font-semibold mb-2"
        htmlFor="locality"
      >
        Provincia:
      </label>
      <select
        id="province"
        name="province"
        value={form.province}
        onChange={handleChange}
        className={`w-full px-4 py-2 border bg-gray-100 text-black ${
          errors.locality ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
      >
        <option value="">Selecciona una provincia</option>
        {provinces.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
      {errors.locality && (
        <p className="text-red-600">{errors.province}</p>
      )}
    </div>

    {/* locality - localidad */}
    <div className="w-full">
      <label
        className="block text-lg font-semibold mb-2"
        htmlFor="locality"
      >
        Localidad:
      </label>
      <select
        id="locality"
        name="locality"
        value={form.locality}
        onChange={handleChange}
        className={`w-full px-4 py-2 border bg-gray-100 text-black ${
          errors.locality ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
      >
        <option value="">Selecciona una localidad</option>
        {localities.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
      {errors.locality && (
        <p className="text-red-600">{errors.locality}</p>
      )}
    </div>

    {/* modality - modalidad */}
    <div className="w-full">
      <label
        className="block text-lg font-semibold mb-2"
        htmlFor="modality"
      >
        Modalidad:
      </label>
      <select
        id="modality"
        name="modality"
        value={form.modality}
        onChange={handleChange}
        className={`w-full px-4 py-2 border bg-gray-100 text-black ${
          errors.modality ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
      >
        <option value="">Selecciona una modalidad</option>
        {modalities.map((mod) => (
          <option key={mod} value={mod}>
            {mod}
          </option>
        ))}
      </select>
      {errors.modality && (
        <p className="text-red-600">{errors.modality}</p>
      )}
    </div>

    {/* category - categoría */}
    <div className="w-full">
      <label
        className="block text-lg font-semibold mb-2"
        htmlFor="category"
      >
        Categoría:
      </label>
      <select
        id="category"
        name="category"
        value={form.category}
        onChange={handleChange}
        className={`w-full px-4 py-2 border bg-gray-100 text-black ${
          errors.category ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      {errors.category && (
        <p className="text-red-600">{errors.category}</p>
      )}
    </div>

    {/* competitionWeight - peso de competencia */}
    <div className="w-full">
      <label
        className="block text-lg font-semibold mb-2"
        htmlFor="competitionWeight"
      >
        Peso de Competencia (kg):
      </label>
      <input
        type="text"
        id="competitionWeight"
        name="competitionWeight"
        value={form.competitionWeight}
        onChange={handleChange}
        placeholder="80.6"
        className={`w-full px-4 py-2 border bg-gray-100 text-black ${
          errors.competitionWeight
            ? "border-red-500"
            : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
      />
      {errors.competitionWeight && (
        <p className="text-red-600">{errors.competitionWeight}</p>
      )}
    </div>

    {/* height - altura */}
    <div className="w-full">
      <label
        className="block text-lg font-semibold mb-2"
        htmlFor="height"
      >
        Altura (m):
      </label>
      <input
        type="text"
        id="height"
        name="height"
        value={form.height}
        onChange={handleChange}
        placeholder="1.80"
        className={`w-full px-4 py-2 border bg-gray-100 text-black ${
          errors.height ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
      />
      {errors.height && <p className="text-red-600">{errors.height}</p>}
    </div>

    {/* phone - teléfono */}
    <div className="w-full">
      <label
        className="block text-lg font-semibold mb-2"
        htmlFor="phone"
      >
        Teléfono:
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="+5491121736846"
        className={`w-full px-4 py-2 border bg-gray-100 text-black ${
          errors.phone ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
      />
      {errors.phone && <p className="text-red-600">{errors.phone}</p>}
    </div>

  {/* photo - foto carnet */}
  <div className="flex flex-col w-full">
      <label
        htmlFor="photo"
        className="text-sm  text-gray-600 uppercase font-bold"
      >
        Foto 'estilo' Carnet (solo se aceptan archivos jpg, jpeg y png)
      </label>

      {/* imágenes de ejemplo */}
      <div className="w-full h-30 flex justify-center flex-col gap-y-4 items-center rounded p-2 border border-gray-300 mb-4">
       
        <span>
          La fotografía debe ser tomada de frente, asegurando que el
          rostro sea claramente visible.
        </span>{" "}
        <span>
          Si se envía una imagen incorrecta o inapropiada, no se podrá
          continuar con el proceso de preinscripción.
        </span>{" "}

        <span className="text-sm font-bold text-gray-600">
          Ejemplos
        </span>
        <div className="w-full flex justify-around items-center">
          <div
            className="w-16 h-16 rounded-full border border-gray-300 bg-cover bg-center"
            style={{ backgroundImage: `url(${imgCarnet1})` }}
          ></div>
          <div
            className="w-16 h-16 rounded-full border border-gray-300 bg-cover bg-center"
            style={{ backgroundImage: `url(${imgCarnet2})` }}
          ></div>
          <div
            className="w-16 h-16 rounded-full border border-gray-300 bg-cover bg-center"
            style={{ backgroundImage: `url(${imgCarnet3})` }}
          ></div>
          {/* Mostrar más imágenes en pantallas grandes */}
          <div
            className="hidden sm:block w-16 h-16 rounded-full border border-gray-300 bg-cover bg-center"
            style={{ backgroundImage: `url(${imgCarnet4})` }}
          ></div>
          <div
            className="hidden sm:block w-16 h-16 rounded-full border border-gray-300 bg-cover bg-center"
            style={{ backgroundImage: `url(${imgCarnet5})` }}
          ></div>
        </div>
      </div>

      <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={(e) => handleChange(e, form, setForm)}
        ref={fileInputRef}
        className="p-2 border border-gray-300 rounded"
      />
      {errors.photo && (
        <span className="text-red-500">{errors.photo}</span>
      )}
    </div>

        {/* trainer - entrenador */}
        <div className="w-full">
      <label
        className="block text-lg font-semibold mb-2"
        htmlFor="instagram"
      >
        Instagram - (opcional):
      </label>
      <input
        type="text"
        id="instagram"
        name="instagram"
        value={form.instagram}
        onChange={handleChange}
        placeholder="Su nombre de usuario de Instagram"
        className={`w-full px-4 py-2 border bg-gray-100 text-black ${
          errors.instagram ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
      />
      {errors.instagram && (
        <p className="text-red-600">{errors.instagram}</p>
      )}
    </div>


    {/* trainer - entrenador */}
    <div className="w-full">
      <label
        className="block text-lg font-semibold mb-2"
        htmlFor="trainer"
      >
        Entrenador:
      </label>
      <input
        type="text"
        id="trainer"
        name="trainer"
        value={form.trainer}
        onChange={handleChange}
        placeholder="Nombre del Entrenador"
        className={`w-full px-4 py-2 border bg-gray-100 text-black ${
          errors.trainer ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
      />
      {errors.trainer && (
        <p className="text-red-600">{errors.trainer}</p>
      )}
    </div>

  

    <div className="flex justify-center w-full">
      <button
        type="submit"
        disabled={loading}
        className={`px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </div>
    <div className="m-auto flex flex-col justify-center items-center gap-y-5">
      {" "}
      <p className="text-primary-100">
        Si tenés algún problema o necesitás ayuda para completar el
        formulario, comunicate a este número por WhatsApp: 
      </p>
      <div>
        <div className="flex justify-center items-center flex-col">
      <p className="text-blue-500 hover:underline m-auto">
        <a href="https://wa.me/541164235336" target="_blank">
          +54 11 6423-5336 .
        </a>
     
      </p>
      <p className="italic text-gray-600 text-sm">Hacer click en el numero para abrir WhatsApp</p>
      </div>
    </div>
    </div>
  </form>
  )
}

export default Form