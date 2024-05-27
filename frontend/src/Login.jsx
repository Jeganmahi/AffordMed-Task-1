import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { CardHeader, Stack } from "react-bootstrap";
import { Nav, NavItem } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AdminLogin from "./AdminLogin";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const Navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("regular");
  const handleLogin = async () => {
    const form = {
      email: username,
      pass: password,
    };
    console.log(form);
    try {
      const response = await fetch(`http://localhost:5001/handleLogin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const responseData = await response.json();
      console.log(responseData);
      let role = responseData.role;
      if (responseData.role === "admin") {
        const userData = { username, password, role }; // Example user data
        login(userData);
        Swal.fire({
          title: "Success!",
          text: "Login success",
          icon: "success",
          confirmButtonText: "OK",
        });
        Navigate("/dashboard");
      }
      else{
        const userData = { username, role }; // Example user data
        login(userData);
        Navigate("/profile");
      }
    } 
    catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      style={{ minHeight: "95vh", display: "flex", flexDirection: "column" }}
    >
      <Container
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            width: "500px",
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Nav
            variant="tabs"
            defaultActiveKey="regular"
            onSelect={(selectedTab) => setActiveTab(selectedTab)}
          ></Nav>
          <Card.Body>
            <Container className="d-flex justify-content-center">
              <Card.Title
                className="mb-5"
                style={{
                  fontSize: "2rem",
                  color: "rgb(7, 68, 152)",
                  fontWeight: "bolder",
                }}
              >
                Welcome Back
              </Card.Title>
            </Container>
            {activeTab === "regular" && (
              <Form style={{ maxWidth: "400px", margin: "0 auto" }}>
                <Form.Group className="mb-3" controlId="regularEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    style={{ height: "50px", fontSize: "18px" }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="regularPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    style={{ height: "50px", fontSize: "18px" }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <Button
                  style={{
                    width: "100%",
                    height: "50px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    background: "rgb(7, 68, 152)",
                  }}
                  className="mb-3"
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
                <p className="text-center mb-3">
                  Don't have an account?{" "}
                  <span
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    //   onClick={MoveToSignUp}
                  >
                    Sign up
                  </span>
                </p>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Container>
      {/* <Footer /> */}
    </Stack>
  );
}

export default Login;
