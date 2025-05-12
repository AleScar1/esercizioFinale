import React from 'react'
import HeaderComponent from '../components/HeaderComponent'
import FormLoginComponent from '../components/FormLoginComponent'
import { Container } from "react-bootstrap";


export default function LoginPage() {
  return (
    <>
        <HeaderComponent />
        <Container className="mt-5 d-flex justify-content-center">
          <div style={{ width: "100%", maxWidth: "400px" }}>
            <FormLoginComponent />
          </div>
        </Container>
    </>
  )
}
