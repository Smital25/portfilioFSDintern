import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BlogPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${slug}`)
      .then(res => res.json())
      .then(data => {
        setBlog(data);

        document.title = data.metaTitle;

        const meta = document.querySelector("meta[name='description']");
        if (meta) {
          meta.setAttribute("content", data.metaDescription);
        }
      });
  }, [slug]);

  if (!blog) return <h2 style={{ padding: "40px" }}>Loading...</h2>;

  return (
    <div style={{ padding: "60px" }}>
      <h1>{blog.title}</h1>
      <p style={{ marginTop: "20px", lineHeight: "1.6" }}>
        {blog.content}
      </p>
    </div>
  );
};

export default BlogPage;
