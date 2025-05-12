import React from 'react'
import FormRegisterComponent from '../components/FormRegisterComponent'
import HeaderComponent from '../components/HeaderComponent'
import { Container } from "react-bootstrap"; 

export default function RegisterPage() {
  return (
    <>
      <HeaderComponent />
      <Container className="mt-5 d-flex justify-content-center">
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <FormRegisterComponent />
        </div>
      </Container>
    </>
  )
}
