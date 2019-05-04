import React, { Component } from 'react';
import classes from './DropZone.css';

const ACCEPTED_FILETYPE = 'video';

class DropZone extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = { isDragActive: false, isDragAccept: false };
  }

  onDragEnter = event => {
    event.preventDefault();
    event.stopPropagation();

    let fileAccepted = Object.keys(event.dataTransfer.items).reduce(
      (accumulator, curIdx) => {
        return (
          accumulator ||
          event.dataTransfer.items[curIdx].type.startsWith(ACCEPTED_FILETYPE)
        );
      },
      false
    );
    this.setState({ isDragActive: true, isDragAccept: fileAccepted });
  };

  onDragOver = event => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = this.state.isDragAccept ? 'move' : 'none';
  };

  onDrop = event => {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    const array = this.fileListToArray(files);
    console.log('Drop zone received those files');
    console.log(array);
    this.setState({ isDragActive: false, isDragAccept: false });
  };

  fileListToArray = files => {
    const array = Array.from(files).filter(item =>
      item.type.startsWith(ACCEPTED_FILETYPE)
    );
    return array;
  };

  onDragLeave = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ isDragActive: false, isDragAccept: false });
  };

  render() {
    return (
      <div
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
        onDragLeave={this.onDragLeave}
        className={classes.DropZone}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DropZone;
