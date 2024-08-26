import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function ErrorPage() {
  return (
    <>
      <Navigation />
      <main
        style={{
          minHeight: "100vh",
          margin: "5rem 2rem",
          padding: "2rem 2rem",
          width: "100%",
          textAlign: "center",
          backgroundColor: "#fffefe9f",
        }}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </main>
      <Footer />
    </>
  );
}

export default ErrorPage;
