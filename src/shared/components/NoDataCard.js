import React, { Fragment } from "react";
import { Card } from "react-bootstrap";

const Nodatacard = (props) => {
  return (
    <Fragment>
      <Card className="text-center" style={{ marginTop: "1rem" }}>
        <Card.Header>Data Availability</Card.Header>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>{props.text}</Card.Text>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Nodatacard;
