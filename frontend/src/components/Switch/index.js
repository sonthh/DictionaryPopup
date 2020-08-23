import React, { Component } from 'react';
import './index.scss';

export class Switch extends Component {

  render() {
    const {
      props: {
        checked,
        onChange,
      },
    } = this;

    return (
      <label className="switch">
        <input type="checkbox" id="settingPressCtrl" onChange={e => onChange(e)} checked={checked} />
        <span className="slider round"></span>
      </label>
    );
  }
}