import React from "react";
import { Badge, Button, Table } from "react-bootstrap";

function UserListTable({ userData }) {
  const findstatus = (logout, login) => {
    const parts = login.split(" @ ");
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

    if (logout === "0000" && timeDiffHours <= 2) {
      return (
        <Button className="btn btn-success" size="sm" disabled>
          online
        </Button>
      );
    } else if (logout === "0000" && timeDiffHours > 2 && timeDiffHours <= 4) {
      return (
        <Button className="btn btn-success" size="sm" disabled>
          away
        </Button>
      );
    } else if (logout === "0000" && timeDiffHours >= 4) {
      return (
        <Button className="btn btn-success" size="sm" disabled>
          offline
        </Button>
      );
    } else {
      return (
        <Button className="btn btn-danger" size="sm" disabled>
          offline
        </Button>
      );
    }
  };
  const checkStatus = (logout, login) => {
    if (logout === "0000") {
      return (
        <Badge className="primary">
          N/A
        </Badge>
      );
    } else {
      return <p>{logout}</p>;
    }
  };
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>User name</th>
            <th>login</th>
            <th>logout</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.login}</td>
              <td>{checkStatus(user.logout)}</td>
              <td>{findstatus(user.logout, user.login)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserListTable;
