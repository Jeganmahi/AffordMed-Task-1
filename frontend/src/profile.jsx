import React, { useEffect, useState } from "react";
import { Button, Row, Col, Card, Form, Container } from "react-bootstrap";
import { useAuth } from "./AuthContext";

function Profile() {
  const { user, logout } = useAuth();
  const name = user.username;
  const [profileData, setProfileData] = useState({});
  
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const response = await fetch(
      `http://localhost:5001/fetchProfileData/${name}`
    );
    const responseData = await response.json();
    setProfileData(responseData);
  };

  return (
    <Container>
      <Card className="mt-4">
        <Card.Body>
          <p className="mb-2" style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>
            Personal Details
          </p>
          <Row className="mb-3">
            <Col xs={4} md={3}>
              <Form.Label style={{ color: "GrayText" }}>User Name:</Form.Label>
            </Col>
            <Col xs={8} md={9}>
              <Form.Label>{profileData.name}</Form.Label>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4} md={3}>
              <Form.Label style={{ color: "GrayText" }}>Phone Number:</Form.Label>
            </Col>
            <Col xs={8} md={9}>
              <Form.Label>{profileData.phonenumber}</Form.Label>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer
          style={{
            background: "rgba(0,0,0,0.1)",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="primary" href="/" onClick={logout}>
            Logout
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Profile;
