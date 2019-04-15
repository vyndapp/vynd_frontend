// @flow
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import routes from "../constants/routes";

type Props = {};

export default class VideoPage extends Component<Props> {
  props: Props;

  render() {
    console.log(this.props);
    return <div>
      <Link to={routes.GALLERY}>
        <h1>Back to Home</h1>
      </Link>
      <p>Hello World!! {this.props.match.params.videoId}</p>
      </div>;
  }
}
