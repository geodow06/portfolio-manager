import React, { Component } from "react";

class Brand extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-middle flex-space-between brand-area">
        <div className="flex flex-middle brand">
          <span className="brand__text">Portfolio</span>
        </div>
      </div>
    );
  }
}

export default Brand;
