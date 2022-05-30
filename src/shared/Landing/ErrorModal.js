import React, { Fragment, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const Errormodal = (props) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };
  return (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.errorTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{props.error}</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={(handleClose, props.onClear)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Errormodal;
