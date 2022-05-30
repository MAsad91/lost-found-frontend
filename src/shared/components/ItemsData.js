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
import { Form, Upload } from "antd";
// import ImgCrop from "antd-img-crop";
import { useHistory } from "react-router-dom";
import ImgCarousel from "./ImgCarousel";
import { AuthContext } from "../context/auth-context";
import styles from "../../shared/Css/FormStyling.module.css";

const ItemsData = (props) => {
  const [image, setImage] = useState();
  const auth = useContext(AuthContext);
  const history = useHistory();
  console.log(props);
  console.log(props.data.map((value) => value.creator));

  const uploadHandle = ({ fileList }) => {
    setImage(fileList);
  };

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
                <Card.Title>
                  {value.founditemtype || value.lostitemtype}
                </Card.Title>
                <Card.Text>Details: {value.details}</Card.Text>
                <Card.Text>Description: {value.description}</Card.Text>
                <hr />
                <ListGroup className="list-group-flush">
                  <ListGroupItem>Item Name: {value.itemname}</ListGroupItem>
                  <ListGroupItem>Color: {value.color}</ListGroupItem>
                  <ListGroupItem>State: {value.state}</ListGroupItem>
                  <ListGroupItem>Location: {value.location}</ListGroupItem>
                  <ListGroupItem>Reporter Name: {value.name}</ListGroupItem>
                </ListGroup>
                <hr />

                {!(auth.userId === value.creator) && value.founditemtype && (
                  <Form
                    onFinish={async (value) => {
                      console.log(value);
                      try {
                        let formData = new FormData();
                        formData.append("image", image.originFileObj);
                        const response = await axios({
                          method: "post",
                          url: "http://localhost:5000/founditemimage",
                          data: formData,
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        });
                        console.log(response);
                      } catch (err) {
                        const message = err.response.data.message;
                        console.log(message);
                      }
                    }}
                  >
                    {/* <div className={styles["form-control"]}>
                      <Form.Item
                        name="image"
                        rules={[
                          {
                            required: true,
                            message: "Upload found item image you found",
                          },
                        ]}
                      >
                        <ImgCrop rotate>
                          <Upload.Dragger
                            accept=".png,.jpg,.jpeg"
                            onChange={uploadHandle}
                            // beforeUpload={() => false}
                          >
                            Drag found item image you found
                            <br />
                            <Button variant="dark" size="sm">
                              Confirm
                            </Button>
                          </Upload.Dragger>
                        </ImgCrop>
                      </Form.Item>
                    </div> */}
                  </Form>
                )}

                {!(auth.userId === value.creator) && value.lostitemtype && (
                  <Form
                    onFinish={async (value) => {
                      console.log(value);
                      try {
                        let formData = new FormData();
                        formData.append("image", image.originFileObj);
                        const response = await axios({
                          method: "post",
                          url: "http://localhost:5000/lostitemimage",
                          data: formData,
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        });
                        console.log(response);
                      } catch (err) {
                        const message = err.response.data.message;
                        console.log(message);
                      }
                    }}
                  >
                    {/* <div className={styles["form-control"]}>
                      <Form.Item
                        name="image"
                        rules={[
                          {
                            required: true,
                            message: "Upload lost item image you found",
                          },
                        ]}
                      >
                        <ImgCrop rotate>
                          <Upload.Dragger
                            accept=".png,.jpg,.jpeg"
                            onChange={uploadHandle}
                            // beforeUpload={() => false}
                          >
                            Drag lost item image you found
                            <br />
                            <Button variant="dark" size="sm">
                              Confirm
                            </Button>
                          </Upload.Dragger>
                        </ImgCrop>
                      </Form.Item>
                    </div> */}
                  </Form>
                )}

                {auth.userId === value.creator && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="dark"
                      size="sm"
                      className="mt-2 "
                      style={{ textAlign: "center" }}
                      onClick={async () => {
                        if (value.founditemtype) {
                          try {
                            const creator = auth.userId;
                            const response = await axios({
                              method: "delete",
                              url: `http://localhost:5000/found-report/${value.id}`,
                              data: { creator },
                              headers: {
                                Authorization: "Bearer " + auth.token,
                              },
                            });
                            console.log(response);
                            if (response.status === 200) {
                              const currentPath = window.location.pathname;
                              history.replaceState(`${currentPath}/replace`);
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
                              url: `http://localhost:5000/lost-report/${value.id}`,
                              data: { creator },
                              headers: {
                                Authorization: "Bearer " + auth.token,
                              },
                            });
                            console.log(response);
                            if (response.status === 200) {
                              const currentPath = window.location.pathname;
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
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default ItemsData;
