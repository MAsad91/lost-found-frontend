import React, { Fragment, useContext } from "react";
import { Layout, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const { Sider } = Layout;

const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    auth.logout();
    history.push("/login");
  };

  return (
    <Fragment>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo">
          <h5>Lost And Found</h5>
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item>
            <Link to={`/home/${auth.userId}`}>Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/lost-report`}>Lost Item Report</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/found-report`}>Found Item Report</Link>
          </Menu.Item>
          <Menu.Item>
            <Link onClick={logoutHandler}> LogOut</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Fragment>
  );
};

export default Navbar;
