import React, { Component } from "react";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";

import { Drawer } from "material-ui";
import { Link } from "react-router";
import { NavToggleButton } from "../styled/NavDrawer";

class NavDrawer extends Component {
  state = {
    open: true,
    width: 250
  };

  toggleFunc = () => {
    this.setState((prevState, props) => {
      return { open: !prevState.open };
    });
  };

  render() {
    return (
      <div>
        <NavToggleButton
          toggle={this.toggleFunc}
          width={this.state.width}
          open={this.state.open}
        />
        <Drawer open={this.state.open} width={this.state.width}>
          <div
            style={{
              height: "200px",
              width: "100%",
              backgroundColor: "red"
            }}
          >
            Login
          </div>
          <Divider />
          <Link to={"/"}>
            <MenuItem onClick={this.toggleFunc} primaryText={"Play"} />{" "}
          </Link>
          <Link to={"/profile"}>
            <MenuItem onClick={this.toggleFunc} primaryText={"Profile"} />
          </Link>
        </Drawer>
      </div>
    );
  }
}

export default NavDrawer;
