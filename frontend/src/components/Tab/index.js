import React, { Component } from 'react';

export class Tab extends Component {

  render() {
    const {
      props: {
       children
      },
    } = this;

    return (
      <li>
        {children}
      </li>
    );
  }
}