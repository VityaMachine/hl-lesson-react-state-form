import React, { Component } from "react";
import "./Dropdown.css";

class Dropdown extends Component {
  state = {
    visible: false,
  };

  showCloseHandler = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible,
    }));
  };

  render() {
    return (
      <div className="Dropdown">
        <button type="button" className="Dropdown__toggle" onClick={this.showCloseHandler}>
          {!this.state.visible ? "Show" : "Close"}
        </button>

        {
            this.state.visible && <div className="Dropdown__menu">Випадаюче меню</div>
        }
      </div>
    );
  }
}

export default Dropdown;
