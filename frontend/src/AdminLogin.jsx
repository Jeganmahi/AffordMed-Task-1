import React from "react";
import { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { useHref, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handeleAdminLogin = () => {
    if (username === "admin" && password === "admin") {
      navigate("/dashboard");
    }
  };
  return (
    <div>
      <Form>
        <Form.Group className="mb-5" controlId="ownerEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            style={{ height: "50px", fontSize: "20px", width: "100%" }}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-5" controlId="ownerPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            style={{ height: "50px", fontSize: "20px" }}
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
          onClick={handeleAdminLogin}
        >
          Sign In
        </Button>
      </Form>
    </div>
  );
}

export default AdminLogin;
