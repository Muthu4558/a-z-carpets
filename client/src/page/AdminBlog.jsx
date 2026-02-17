import { useState } from "react";
import axios from "axios";

const categories = [
  "Hand Tufted Rugs",
  "Shaggy Carpets",
  "Persian Silk Carpets",
  "Designer Carpets",
  "Luxury Viscose Rugs",
  "Iranian Imported Rugs",
  "Irregular Shaped Rugs",
  "Traditional Persian Rugs",
  "Round Shaggy Carpets",
  "Round Tufted Carpets",
  "Children Rugs",
];

const AdminBlog = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    subtitle: "",
    content: "",
    date: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    await axios.post(
      `${import.meta.env.VITE_APP_BASE_URL}/api/blog`,
      data
    );

    alert("Blog Added Successfully");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Add Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <select name="category" onChange={handleChange} required className="w-full border p-2">
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          onChange={handleChange}
          required
          className="w-full border p-2"
        />

        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <textarea
          name="content"
          placeholder="Blog Content"
          onChange={handleChange}
          required
          className="w-full border p-2 h-40"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />

        <button className="bg-green-600 text-white px-6 py-2 rounded">
          Add Blog
        </button>

      </form>
    </div>
  );
};

export default AdminBlog;
