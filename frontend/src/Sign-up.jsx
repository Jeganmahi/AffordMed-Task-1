import { Button, Card, CardBody, CardHeader } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

function SignUp() {
    
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card style={{ width: "350px" }}>
        <CardHeader>Create account</CardHeader>
        <CardBody>
          <Form style={{ width: "100%" }}>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control type="password" placeholder="Re-enter your password" />
            </Form.Group>
            <Button variant="success" style={{ width: "100%" }}>
              Create account
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default SignUp;
