// src/utils/handlers.js

export const handleChange = (e, form, setForm) => {
    const { name, value, files } = e.target;
  
    const formattedValue = value.replace(',', '.');
  
    if (name === "photo") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: formattedValue });
    }
  };
  