// @flow
import React, { Component } from "react";
import photon from "./photon.css";

const peopleViewStyle = {
  backgroundColor: "#1b1a1a",
  width: "100%",
  height: "100%",
  overflow: "auto"
};

const imgStyle = {
  margin: "5px 5px 0px 5px"
};

const divStyle = {
  textAlign: "center",
  backgroundColor: "#1b1a1a"
};

const nameStyle = {
  color: "rgb(160, 160, 160)",
  display: "block",
  marginTop: 0,
  marginBottom: 5
};

const peopleLbl = {
  position: "sticky",
  top: 0,
  backgroundColor: "#1b1a1a"
};

export default class PeopleView extends Component<Props> {
  props: Props;

  createPeopleDivs = () => {
    const people = [];

    for (let i = 0; i < 10; i++) {
      people.push(
        <div style={divStyle}>
          <img
            className={photon["img-circle"] + " " + photon["media-object"]}
            style={imgStyle}
            src="https://www.placecage.com/400/360"
            height="70px"
            width="70px"
          />
          <h5 style={nameStyle}>Nicholas Cage</h5>
        </div>
      );
    }

    return people;
  };

  render() {
    return (
      <div style={peopleViewStyle}>
        <div style={peopleLbl}>
          <h5 className={photon["nav-group-title"]}>People</h5>
        </div>
        {this.createPeopleDivs()}
      </div>
    );
  }
}