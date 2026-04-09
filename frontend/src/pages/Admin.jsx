import { useEffect, useState } from "react";

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

  const fetchBlogs = () => {
    fetch("http://127.0.0.1:8000/api/blogs/")
      .then(res => res.json())
      .then(data => setBlogs(data));
  };

  useEffect(() => {
    if (isAuth) fetchBlogs();
  }, [isAuth]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editingId) {
      await fetch(`http://127.0.0.1:8000/api/blogs/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      alert("Updated ✅");
    } else {
      await fetch("http://127.0.0.1:8000/api/blogs/", {
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

  const handleDelete = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/blogs/${id}`, {
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

  // 🔐 LOGIN UI (PREMIUM)
  if (!isAuth) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#4f46e5,#9333ea)",
        animation: "fadeIn 0.6s ease"
      }}>
        <div style={{
          background: "rgba(255,255,255,0.95)",
          padding: "40px",
          borderRadius: "16px",
          width: "320px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
          transform: "scale(1)",
          transition: "0.3s"
        }}>
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            🔐 Admin Login
          </h2>

          <label style={labelStyle}>Username</label>
          <input
            style={inputStyle}
            placeholder="Enter username"
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
          />

          <label style={labelStyle}>Password</label>
          <input
            style={inputStyle}
            type="password"
            placeholder="Enter password"
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />

          <button
            style={{ ...buttonStyle, width: "100%" }}
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // 🔥 DASHBOARD UI
  return (
    <div style={{
      padding: "40px",
      background: "#f4f6ff",
      minHeight: "100vh",
      animation: "fadeIn 0.5s ease"
    }}>

      <h1 style={{ marginBottom: "20px" }}>⚙️ Admin Dashboard</h1>

      {/* FORM */}
      <div style={{
        background: "white",
        padding: "30px",
        borderRadius: "16px",
        marginBottom: "30px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
      }}>
        <h2>{editingId ? "✏️ Edit Blog" : "➕ Create Blog"}</h2>

        <label style={labelStyle}>Title</label>
        <input name="title" value={form.title} style={inputStyle} onChange={handleChange} />

        <label style={labelStyle}>Slug</label>
        <input name="slug" value={form.slug} style={inputStyle} onChange={handleChange} />

        <label style={labelStyle}>Meta Title</label>
        <input name="metaTitle" value={form.metaTitle} style={inputStyle} onChange={handleChange} />

        <label style={labelStyle}>Meta Description</label>
        <input name="metaDescription" value={form.metaDescription} style={inputStyle} onChange={handleChange} />

        <label style={labelStyle}>Content</label>
        <textarea
          name="content"
          value={form.content}
          rows="6"
          style={inputStyle}
          onChange={handleChange}
        />

        <button style={buttonStyle} onClick={handleSubmit}>
          {editingId ? "Update Blog" : "Create Blog"}
        </button>
      </div>

      {/* BLOG LIST */}
      {blogs.map((b) => (
        <div key={b.id} style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "15px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
          transition: "0.3s"
        }}>
          <h3>{b.title}</h3>
          <p>{b.metaDescription}</p>

          <button style={buttonStyle} onClick={() => handleEdit(b)}>
            Edit
          </button>

          <button
            onClick={() => handleDelete(b.id)}
            style={{
              ...buttonStyle,
              marginLeft: "10px",
              background: "#ef4444"
            }}
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  );
};

export default Admin;