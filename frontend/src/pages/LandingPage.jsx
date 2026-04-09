import React from "react";
import "./landing.css";
import heroimage from "../assets/hero.gif";
import aboutme from "../assets/me.gif";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [blogs, setBlogs] = useState([]);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/blogs`)
    .then(res => res.json())
    .then(data => setBlogs(data))
    .catch(err => console.log(err));
}, []);

  return (
    <div>

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">
        Smital <span>Kaginkar</span>
        </h2>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#blog">Blog</a>
          <a href="/admin">Admin</a> 
        </div>

        <a href="mailto:kaginkarsmital@gmail.com" className="talk-btn">
          Let's Talk
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <p className="intro">Full Stack Developer</p>

          <h1>
            I build scalable backend systems <br />
            <span>that solve real-world problems</span>
          </h1>

          <p className="desc">
            Final-year Computer Science student with hands-on experience building
            full-stack applications using React, Spring Boot, and Flask.
            <br /><br />
            I have developed production-style systems like a digital wallet,
            hostel management platform, and AI-based project planning tools —
            focusing on performance, security, and scalability.
          </p>

          <div className="buttons">
            <a href="#projects" className="primary">View Projects</a>
            <a href="mailto:kaginkarsmital@gmail.com" className="secondary">
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-right">
          <img src={heroimage} alt="profile" />
        </div>
      </section>

      {/* ABOUT */}
       <section id="about" className="about-section">

  <h2 className="about-title">About Me</h2>

  <div className="about-container">

    {/* LEFT SIDE (GIF) */}
    <div className="about-image">
      <img src={aboutme} alt="about" />
    </div>

    {/* RIGHT SIDE (CONTENT CARD) */}
    <div className="about-card">

      <h3>Full Stack Developer with Backend Focus</h3>

      <p>
        I'm a final-year Computer Science student who focuses on building
        systems, not just applications.
      </p>

      <div className="about-points">
        <p>🚀 Strong in backend systems & API design</p>
        <p>⚙️ React, Spring Boot, Flask</p>
        <p>🧠 Structured problem solving</p>
        <p>📊 Built scalable real-world projects</p>
      </div>

      <div className="about-highlight">
        I design systems that are secure, scalable, and efficient —
        solving real-world problems with clean architecture.
      </div>

    </div>

  </div>

</section>
      

      {/* PROJECTS */}
      <section id="projects" className="section">
        <h2>Projects</h2>

        <div className="projects">
          <div className="card">
            <h3>Hostel Management System</h3>

            <p><b>Problem:</b> Manual hostel operations caused inefficiency.</p>

            <p><b>Approach:</b> Designed role-based system with real-time updates.</p>

            <p><b>Tech:</b> Flask, MongoDB</p>

            <p><b>Result:</b> Improved tracking, automation, and reduced manual work.</p>
            <p><b>Type:</b> Full Stack Application</p>

            <a href="https://github.com/Smital25/MinorprojectHMS" target="_blank" rel="noreferrer">
                View Project →
            </a>
            </div>

         
            <div className="card">
            <h3>Movie Booking System</h3>

            <p><b>Problem:</b> Users face difficulty in selecting seats and managing bookings efficiently.</p>

            <p><b>Approach:</b> Designed a structured booking flow with real-time seat selection and backend optimization.</p>

            <p><b>Tech:</b> Java, MySQL</p>

            <p><b>Result:</b> Improved booking efficiency and ensured accurate seat allocation with optimized database handling.</p>
            <p><b>Type:</b> Full Stack Application</p>
            <a 
                href="https://github.com/Smital25/MovieTicketBooking" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                View Project →
            </a>
        </div>
          

            <div className="card">
            <h3>AI Agents for Project Planning</h3>

            <p><b>Problem:</b> Managing academic projects manually leads to inefficiency and poor planning.</p>

            <p><b>Approach:</b> Built AI agents using local LLM (Ollama) to automate task planning, research, and coordination.</p>

            <p><b>Tech:</b> Python, Streamlit, MongoDB, LLM</p>

            <p><b>Result:</b> Enabled automated workflows, improved productivity, and ensured privacy-focused project management.</p>
            <p><b>Type:</b> Full Stack Application</p>
            <a 
                href="https://github.com/Smital25/AI-Agents" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                View Project →
            </a>
            </div>
          </div>

        

         {/* VIEW MORE */}
        <div style={{ marginTop: "30px" }}>
          <a
            href="https://github.com/Smital25"
            target="_blank"
            className="primary"
          >
            View More Projects →
          </a>
        </div>
      </section>


      <section className="section">
  <h2>How I Think</h2>

  <div className="exp-container">

    <div className="exp-card">
      <h3>First Principles Thinking</h3>
      <p>
        I break down complex problems into fundamentals instead of copying
        solutions, ensuring deeper understanding and better outcomes.
      </p>
    </div>

    <div className="exp-card">
      <h3>System Design Approach</h3>
      <p>
        Before coding, I design scalable architecture to ensure performance,
        maintainability, and future growth.
      </p>
    </div>

    <div className="exp-card">
      <h3>Problem → Solution → Scale</h3>
      <p>
        I focus on solving real-world problems and building systems that can
        scale efficiently in production environments.
      </p>
    </div>

    <div className="exp-card">
  <h3>Optimization Mindset</h3>
  <p>
    I focus on writing efficient code and optimizing performance
    for better scalability and user experience.
  </p>
</div>

  </div>
</section>


<section id="blog" className="section">
  <h2>Blog & Insights</h2>

  <div className="projects">

    {/* STATIC BLOGS (KEEP) */}
    <div className="card">
      <h3>Why Most Developers Fail at Backend</h3>
      <p>
        Many developers focus on frameworks instead of fundamentals like system design.
      </p>
    </div>

    <div className="card">
      <h3>How to Think Like a System Designer</h3>
      <p>
        Learn how to approach problems using first principles.
      </p>
    </div>

    <div className="card">
      <h3>Beginner’s Guide to Backend Development</h3>
      <p>
        Learn APIs, databases, and authentication fundamentals.
      </p>
    </div>

    {/* 🔥 DYNAMIC BLOGS (ADD ONLY ONCE) */}
    {blogs.map((b, i) => (
      <div className="card" key={i}>
        <h3>{b.title}</h3>
        <p>{b.metaDescription}</p>

        <Link to={`/blog/${b.slug}`}>
          Read More →
        </Link>
      </div>
    ))}

  </div>
</section>
        {/* Internship and certificates */}

        <section className="section">
  <h2>Experience & Certifications</h2>

  <div className="exp-container">

    {/* INTERNSHIP 1 */}
    <div className="exp-card">
      <h3>Full Stack Developer Intern</h3>
      <p className="company">Global Next Consultant Pvt Ltd (2025)</p>

      <ul>
        <li>Built responsive UI using React.js</li>
        <li>Developed REST APIs using Node.js & MongoDB</li>
        <li>Implemented Digital Wallet with JWT authentication</li>
      </ul>
    </div>

    {/* INTERNSHIP 2 */}
    <div className="exp-card">
      <h3>Web Development Intern</h3>
      <p className="company">SV Mind Logic (2023)</p>

      <ul>
        <li>Developed web apps using HTML, CSS, JavaScript, PHP</li>
        <li>Built Online Medicine Shopping platform</li>
        <li>Designed SQL-based backend systems</li>
      </ul>
    </div>

    {/* CERTIFICATIONS */}
    <div className="exp-card">
      <h3>Certifications</h3>

      <ul>
        <li>📜 ReactJS for Beginners – Simplilearn</li>
        <li>📜 Software Design & Development – Infosys Springboard</li>
        <li>📜 GenAI for Professionals – Udemy</li>
      </ul>
    </div>

  </div>
</section>

<section className="section">
  <h2>Publication</h2>

  <div className="exp-container">

    <div className="exp-card">
      <h3>Towards Digital Hostel Administration</h3>

      <p>
        Published in IJSRED Journal (Vol. 8, Issue 3)
      </p>

      <p>
        This research focuses on designing a digital system to automate hostel
        operations using role-based architecture and real-time data handling.
      </p>

      <p>
        Demonstrates practical application of system design and backend concepts.
      </p>
      <p><b>Focus:</b> System design, automation, backend architecture</p>
    </div>
  </div>
</section>

       

      {/* CONTACT */}
      <section id="contact" className="section contact">
  <h2>Let's Build Something Meaningful</h2>

  <p className="contact-text">
    I'm open to internship and entry-level opportunities.
    If you're looking for someone who can build scalable systems — let's connect.
  </p>

  <div className="contact-links">
    <a href="mailto:kaginkarsmital@gmail.com" className="primary">
      Email Me
    </a>

    <a
      href="https://www.linkedin.com/in/smital-k-a04919326"
      target="_blank"
      className="linkedin-btn"
    >
      LinkedIn →
    </a>
  </div>

  <p style={{ marginTop: "20px" }}>
    <b>GitHub:</b><br/> 
<a href="https://github.com/Smital25" target="_blank">
  <b>github.com/Smital25</b>
</a>
  </p>
</section>

    </div>
  );
};

export default LandingPage;
