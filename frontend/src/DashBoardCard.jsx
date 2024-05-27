import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardBody, Button } from "react-bootstrap";
import { FaUser, FaFlag, FaBook, FaCheckCircle } from "react-icons/fa"; // Importing icons from react-icons library

export default function DashboardCards({}) {
  useEffect(() => {
    findTotalUserCount();
    findTotalOnlineUsers();
  }, []);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [offlineUsers, setOfflineUsers] = useState(0);

  const [userData, setUserData] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const findTotalOnlineUsers = () => {
    userData.map((user, index) => {
      const parts = user.login.split(" @ ");
      const dateParts = parts[0].split("/");
      const timeParts = parts[1].split(":");

      // Adding leading zeros where necessary
      const formattedDate = `${dateParts[2]}-${dateParts[1].padStart(
        2,
        "0"
      )}-${dateParts[0].padStart(2, "0")}T${timeParts[0].padStart(
        2,
        "0"
      )}:${timeParts[1].padStart(2, "0")}:${timeParts[2].padStart(2, "0")}`;

      // Parse the formatted date-time string into a Date object
      const ogTime = new Date(formattedDate);
      const currentTime = new Date();
      const timeDiffMilliseconds = Math.abs(currentTime - ogTime);

      // Convert milliseconds to hours
      const timeDiffHours = timeDiffMilliseconds / (1000 * 60 * 60);
      if (user.logout === "0000" && timeDiffHours <= 2) {
        setOnlineUsers(onlineUsers + 1);
      } else if (user.logout === "0000" && timeDiffHours >= 4) {
        setOfflineUsers(offlineUsers + 1);
      } else {
        setOfflineUsers(offlineUsers + 1);
      }
    });
  };
  const findTotalUserCount = async () => {
    const response = await fetch(`http://localhost:5001/userData`);
    const responseData = await response.json();
    setUserData(responseData);
    setTotalUser(responseData.length);
    console.log(responseData.length);
  };
  return (
    <Container>
      <Row className="mt-4">
        {/* Welcome Card */}
        <Col>
          <Card className="shadow rounded-lg" style={{ border: "none" }}>
            <div className="d-flex justify-content-center align-items-center p-3">
              <Card.Title className="mb-0" style={{ fontSize: "1.8rem" }}>
                WELCOME
              </Card.Title>
              <FaUser
                className="ml-2"
                style={{ color: "#FF8C00", fontSize: "2rem" }}
              />
            </div>
            <hr className="my-2" />
            <CardBody className="py-3 text-center">Admin</CardBody>
          </Card>
        </Col>
        <Col>
          <Card className="shadow rounded-lg" style={{ border: "none" }}>
            <div className="d-flex justify-content-center align-items-center p-3">
              <Card.Title className="mb-0" style={{ fontSize: "1.8rem" }}>
                Total users
              </Card.Title>
              <FaUser
                className="ml-2"
                style={{ color: "#FF8C00", fontSize: "2rem" }}
              />
            </div>
            <hr className="my-2" />
            <CardBody className="py-3 text-center">{totalUser}</CardBody>
          </Card>
        </Col>
        <Col>
          <Card className="shadow rounded-lg" style={{ border: "none" }}>
            <div className="d-flex justify-content-center align-items-center p-3">
              <Card.Title className="mb-0" style={{ fontSize: "1.8rem" }}>
                Online Users
              </Card.Title>
              <FaUser
                className="ml-2"
                style={{ color: "#FF8C00", fontSize: "2rem" }}
              />
            </div>
            <hr className="my-2" />
            <CardBody className="py-3 text-center">{onlineUsers}</CardBody>
          </Card>
        </Col>
        <Col>
          <Card className="shadow rounded-lg" style={{ border: "none" }}>
            <div className="d-flex justify-content-center align-items-center p-3">
              <Card.Title className="mb-0" style={{ fontSize: "1.8rem" }}>
                Offline Users
              </Card.Title>
              <FaUser
                className="ml-2"
                style={{ color: "#FF8C00", fontSize: "2rem" }}
              />
            </div>
            <hr className="my-2" />
            <CardBody className="py-3 text-center">{offlineUsers}</CardBody>
          </Card>
        </Col>

        {/* Nationality Card */}
      </Row>
    </Container>
  );
}
