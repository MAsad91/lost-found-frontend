import axios from "axios";
import React, { Fragment, useContext, useState } from "react";
import {
  Col,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import { AuthContext } from "../context/auth-context";
import { useHistory } from "react-router-dom";
import ImgCarousel from "./ImgCarousel";

const CardData = (props) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  console.log(props);
  return (
    <Fragment>
      <Row xs={1} md={2} className="g-4" style={{ marginTop: "1rem" }}>
        {props.data.map((value) => (
          <Col>
            <Card>
              <ImgCarousel
                image={value.images.map((img) => {
                  return "http://localhost:5000/" + img;
                })}
              />
              <Card.Body>
                <Card.Title>{value.crimetype || value.reporttype}</Card.Title>
                <Card.Text>Details: {value.details}</Card.Text>
                <hr />
                <ListGroup className="list-group-flush">
                  <ListGroupItem>Reporter Name: {value.name}</ListGroupItem>
                  <ListGroupItem>Location: {value.location}</ListGroupItem>
                </ListGroup>
                <hr />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="dark"
                    size="sm"
                    className="mt-2 "
                    onClick={async () => {
                      if (value.crimetype) {
                        try {
                          const creator = auth.userId;
                          const response = await axios({
                            method: "delete",
                            url: `http://localhost:5000/crime-report/${value.id}`,
                            data: { creator },
                            headers: { Authorization: "Bearer " + auth.token },
                          });
                          console.log(response);
                          if (response.status === 200) {
                            let currentPath = window.location.pathname;
                            history.replace(`${currentPath}/replace`);
                            setTimeout(() => {
                              history.replace(currentPath);
                            }, 0);
                          }
                        } catch (err) {
                          const message = err.response.data.message;
                          console.log(message);
                        }
                      } else {
                        try {
                          const creator = auth.userId;
                          const response = await axios({
                            method: "delete",
                            url: `http://localhost:5000/safelife-report/${value.id}`,
                            data: { creator },
                            headers: { Authorization: "Bearer " + auth.token },
                          });
                          console.log(response);
                          if (response.status === 200) {
                            let currentPath = window.location.pathname;
                            history.replace(`${currentPath}/replace`);
                            setTimeout(() => {
                              history.replace(currentPath);
                            }, 0);
                          }
                        } catch (err) {
                          const message = err.response.data.message;
                          console.log(message);
                        }
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default CardData;
