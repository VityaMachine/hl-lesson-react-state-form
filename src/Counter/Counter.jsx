import { Card, Typography } from "@mui/material";

import React from "react";
import CounterControls from "./CounterControls";

class Counter extends React.Component {
  static defaultProps = {
    initialValue: 0,
  };

  state = {
    value: this.props.initialValue,
  };

  handleClick = (type) => {
    if (type === "increase") {
      this.setState((prevState) => ({
        value: prevState.value + 1,
      }));
    }

    if (type === "decrease") {
      this.setState((prevState) => ({
        value: prevState.value - 1,
      }));
    }
  };

  render() {
    return (
      <>
        <Card elevation={1}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            {this.state.value}
          </Typography>

          <CounterControls handleClick={this.handleClick} />
        </Card>
      </>
    );
  }
}

export default Counter;
