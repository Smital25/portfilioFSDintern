import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL; // 🔥 IMPORTANT LINE

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "16px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none",
  transition: "0.3s"
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#333"
};

const buttonStyle = {
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#4f46e5",
  color: "white",
  cursor: "pointer",
  transition: "0.3s"
};

const Admin = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [login, setLogin] = useState({ username: "", password: "" });

  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    slug: "",
    metaTitle: "",
    metaDescription: ""
  });

  const handleLogin = () => {
    if (login.username === "admin" && login.password === "admin123") {
      setIsAuth(true);
    } else {
      alert("Invalid credentials ❌");
    }
  };

  // ✅ FETCH BLOGS
  const fetchBlogs = () => {
    fetch(`${API}/api/blogs/`)
      .then(res => res.json())
      .then(data => setBlogs(data));
  };

  useEffect(() => {
    if (isAuth) fetchBlogs();
  }, [isAuth]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ CREATE / UPDATE
  const handleSubmit = async () => {
    if (editingId) {
      await fetch(`${API}/api/blogs/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      alert("Updated ✅");
    } else {
      await fetch(`${API}/api/blogs/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      alert("Created ✅");
    }

    setForm({
      title: "",
      content: "",
      slug: "",
      metaTitle: "",
      metaDescription: ""
    });

    setEditingId(null);
    fetchBlogs();
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    await fetch(`${API}/api/blogs/${id}`, {
      method: "DELETE"
    });
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title || "",
      content: blog.content || "",
      slug: blog.slug || "",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || ""
    });

    setEditingId(blog.id);
  };

  // 🔐 LOGIN UI
  if (!isAuth) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#4f46e5,#9333ea)"
      }}>
        <div style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          width: "320px"
        }}>
          <h2 style={{ textAlign: "center" }}>🔐 Admin Login</h2>

          <input
            style={inputStyle}
            placeholder="Username"
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
          />

          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />

          <button style={buttonStyle} onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    );
  }

  // 🔥 DASHBOARD
  return (
    <div style={{ padding: "40px" }}>
      <h1>⚙️ Admin Dashboard</h1>

      <div style={{ background: "white", padding: "20px", marginBottom: "20px" }}>
        <h2>{editingId ? "Edit Blog" : "Create Blog"}</h2>

        <input name="title" value={form.title} style={inputStyle} onChange={handleChange} />
        <input name="slug" value={form.slug} style={inputStyle} onChange={handleChange} />
        <input name="metaTitle" value={form.metaTitle} style={inputStyle} onChange={handleChange} />
        <input name="metaDescription" value={form.metaDescription} style={inputStyle} onChange={handleChange} />

        <textarea
          name="content"
          value={form.content}
          rows="5"
          style={inputStyle}
          onChange={handleChange}
        />

        <button style={buttonStyle} onClick={handleSubmit}>
          {editingId ? "Update" : "Create"}
        </button>
      </div>

      {blogs.map((b) => (
        <div key={b.id}>
          <h3>{b.title}</h3>

          <button onClick={() => handleEdit(b)}>Edit</button>
          <button onClick={() => handleDelete(b.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Admin;
