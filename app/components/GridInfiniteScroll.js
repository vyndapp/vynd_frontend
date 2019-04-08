// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import routes from "../constants/routes";
import {
  Box,
  Grid,
  InfiniteScroll,
  Text,
} from "grommet";

// Test input
const allItems = Array(60)
  .fill()
  .map((_, i) => `VIDEO ${i + 1}`);

export default class GridInfiniteScroll extends Component<Props> {
  props: Props;

  render() {
    return (
      <Box height="large" overflow="auto">
      <Grid columns="small" rows="xsmall" style={{gridAutoRows: "120px"}}>
        <InfiniteScroll items={allItems} step={10}>
          {item => (
            <Box key={item} pad="xsmall" flex={false}>
              <img src="https://via.placeholder.com/100x90?text=VIDEO" style={{boxShadow:"0px 2px 5px 1px rgb(0, 0, 0)"}} />
              <Text style={{ color: "white", fontSize: 11 }}>{item}</Text>
            </Box>
          )}
        </InfiniteScroll>
      </Grid>
    </Box>
    );
  }
}