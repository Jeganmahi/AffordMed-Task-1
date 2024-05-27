import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  OverlayTrigger,
  Stack,
} from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
import { useState } from "react";
import UserListTable from "./UserListTable";
import DashboardCards from "./DashBoardCard";
function AdminDashboard() {
  const [activeCard, setActiveCard] = useState("dashboard");
  const handleCardClick = (card) => {
    setActiveCard(card);
  };
  const [userData,setUserData] = useState([]);
  useEffect(()=>{
      fetchData();
  },[]);
  const fetchData =  async () => {
    const response  = await fetch(`http://localhost:5001/fetchData`);
    const responseData = await response.json();
    setUserData(responseData);
    console.log(userData);
  }
  return (
    <div style={{ height: "100%" }}>
      <Container fluid style={{ minHeight: "100vh", padding: "0" }}>
        <Row style={{ margin: "0" }}>
          <Col sm={2} style={{ padding: "0" }}>
            <Stack
              style={{ minHeight: "100vh", backgroundColor: "rgb(7, 68, 152)" }}
            >
              <Card
                className="mt-5"
                style={{
                  backgroundColor: "rgb(7, 68, 152))",
                  border: "none",
                  marginBottom: "0",
                }}
              >
                <Card.Body
                  onClick={() => handleCardClick("dashboard")}
                  style={{
                    padding: "10px 15px",
                    backgroundColor:
                      activeCard === "dashboard"
                        ? "#007bff"
                        : "rgb(7, 68, 152)",
                  }}
                >
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Dashboard</Tooltip>}
                  >
                    <span
                      style={{
                        cursor: "pointer",
                        fontWeight: "bolder",
                        color: "white",
                      }}
                    >
                      <i
                        className="bi bi-ui-checks-grid"
                        style={{ marginRight: "10px" }}
                      ></i>
                      Dashboard
                    </span>
                  </OverlayTrigger>
                </Card.Body>
                <Card.Body
                  onClick={() => handleCardClick("userList")}
                  style={{
                    padding: "10px 15px",
                    backgroundColor:
                      activeCard === "userList" ? "#007bff" : "rgb(7, 68, 152)",
                  }}
                >
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>User List</Tooltip>}
                  >
                    <span
                      style={{
                        cursor: "pointer",
                        fontWeight: "bolder",
                        color: "white",
                      }}
                    >
                      <i
                        className="bi bi-building-fill"
                        style={{ marginRight: "10px" }}
                      ></i>
                      User list
                    </span>
                  </OverlayTrigger>
                </Card.Body>
              </Card>
            </Stack>
          </Col>
          <Col style={{ padding: "0" }}>
            <Container>
              <Card className="mt-5" style={{ border: "none" }}>
                {activeCard === "userList" && <div>
                      <UserListTable userData = {userData}/>
                    </div>}
                {activeCard === "dashboard" && <div>
                  <DashboardCards/>
                  </div>}
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
