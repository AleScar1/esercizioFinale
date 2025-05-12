import React, { useEffect } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import FormLoginComponent from '../components/FormLoginComponent';
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("accessToken");

    if (token) {
      // Salva il token (puoi anche usare sessionStorage se preferisci)
      localStorage.setItem("accessToken", token);
      // Reindirizza alla homepage o ovunque tu voglia
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <>
      <HeaderComponent />
      <Container className="mt-5 d-flex justify-content-center">
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <FormLoginComponent />
          
        </div>
      </Container>
    </>
  );
}

