import React from "react";
import { Button, Row, Col, Container } from "react-bootstrap";

const LandingPage = () => {
  const styles = {
    landingPage: {
      background: "url(/landing.jpg) no-repeat center center fixed",
      backgroundSize: "cover",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100%",
    },
    content: {
      textAlign: "center",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      padding: "20px",
      borderRadius: "10px",
    },
    button: {
      margin: "10px",
      padding: "10px 20px",
      borderRadius: "5px",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.landingPage}>
      <Container style={styles.content}>
        <Row className="justify-content-center">
          <Col xs="auto">
            <Button
              href="/login"
              variant="primary"
              style={styles.button}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor =
                  styles.buttonHover.backgroundColor)
              }
              onMouseOut={(e) => (e.target.style.backgroundColor = "")}
            >
              Login
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              href="/signup"
              variant="primary"
              style={styles.button}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor =
                  styles.buttonHover.backgroundColor)
              }
              onMouseOut={(e) => (e.target.style.backgroundColor = "")}
            >
              Sign up
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
