import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, InputGroup, Form, Button, Row, Col,Card } from "react-bootstrap"; // Ensure you have react-bootstrap installed

function Weather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [city, setCity] = useState("india");
  const [date, setDate] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            q: city, // Query parameter for location
            appid: "26143d277cebd0cceea96bde3933ffee",
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>No weather data available.</p>;
  }

  const weatherList = data.list.filter((item) => item.dt_txt.startsWith(date));

  const totalPages = Math.ceil(weatherList.length / usersPerPage);

  const currentUsers = weatherList.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleUsersPerPageChange = (event) => {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      <h2>Weather Forecast</h2>
      
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
            <Form.Control
              placeholder="Country"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </InputGroup>
        </Col>
        <Col>
          <Form.Control type="date" onChange={handleDateChange} />
        </Col>
        <Col className="text-end">
          <div className="container mb-5">
            <Form.Select
              value={usersPerPage}
              onChange={handleUsersPerPageChange}
              style={{ width: "50px" }}
            >
              <option value={5}>Five</option>
              <option value={10}>Ten</option>
            </Form.Select>
          </div>
        </Col>

        <Col>
          <Button onClick={fetchData}>Search</Button>
        </Col>
      </Row>
      <div className="mb-5">
        {data && data.city && (
          
          <Card className="background">

          <Form className="p-5">
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="cityName">
                <Form.Label>City Name</Form.Label>
                <Form.Control
                  readOnly
                  value={data.city.name}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  readOnly
                  value={data.city.country}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="timezone">
                <Form.Label>Timezone</Form.Label>
                <Form.Control
                  readOnly
                  value={data.city.timezone}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="sunrise">
                <Form.Label>Sunrise</Form.Label>
                <Form.Control
                  readOnly
                  value={new Date(data.city.sunrise * 1000).toLocaleTimeString()}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="sunset">
                <Form.Label>Sunset</Form.Label>
                <Form.Control
                  readOnly
                  value={new Date(data.city.sunset * 1000).toLocaleTimeString()}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
          </Card>
          
        )}
      </div>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th colSpan="7" className="main-column-border">
              Main
            </th>
            <th colSpan="3" className="wind-column-border">
              Wind
            </th>
            <th className="main-column-border">Visibility</th>
            <th className="clouds-column-border wind-column-border">Clouds</th>
            <th colSpan="3" className="weather-column-header">
              Weather
            </th>
          </tr>
          <tr>
            <th className="main-column">Temp</th>
            <th className="main-column">Date</th>
            <th className="main-column">Feels Like</th>
            <th className="main-column">Temp Min</th>
            <th className="main-column">Temp Max</th>
            <th className="main-column">Pressure</th>
            <th className="main-column main-column-border">Humidity</th>
            <th className="wind-column">Speed</th>
            <th className="wind-column">Deg</th>
            <th className="wind-column wind-column-border">Gust</th>
            <th className="visibility-column">Value</th>
            <th className="clouds-column wind-column-border">All</th>
            <th className="weather-column">Main</th>
            <th className="weather-column">Description</th>
            <th className="weather-column">Icon</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((item, index) => (
            <tr key={index}>
              <td className="main-column">{item.main.temp}</td>
              <td className="main-column">{item.dt_txt}</td>
              <td className="main-column">{item.main.feels_like}</td>
              <td className="main-column">{item.main.temp_min}</td>
              <td className="main-column">{item.main.temp_max}</td>
              <td className="main-column">{item.main.pressure}</td>
              <td className="main-column main-column-border">
                {item.main.humidity}
              </td>
              <td className="wind-column">{item.wind.speed}</td>
              <td className="wind-column">{item.wind.deg}</td>
              <td className="wind-column wind-column-border">
                {item.wind.gust}
              </td>
              <td className="visibility-column">{item.visibility}</td>
              <td className="clouds-column wind-column-border" >{item.clouds.all}%</td>
              <td className="weather-column">{item.weather[0].main}</td>
              <td className="weather-column">{item.weather[0].description}</td>
              <td className="weather-column">
                <img
                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination mb-5">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      <style jsx>{`
        .main-column-header,
        .wind-column-header,
        .visibility-column-header,
        .clouds-column-header,
        .weather-column-header {
          text-align: center;
        }
        cloud-column-border,
        .main-column-border {
          border-right: 3px solid black;
        }
        .wind-column-border {
          border-right: 3px solid black;
        }
        .visibility-column {
          border-right: 3px solid black;
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }
        .pagination span {
          margin: 0 10px;
        }
      `}</style>
    </div>
  );
}

export default Weather;
