import React, { Component } from 'react';
import './index.scss';

export class Helps extends Component {

  render() {
    return (
      <div id="helpWrapper">
        <div className="helper">
          <h4>Context menu</h4>
          <p>Right click on the selected text and choose Look up "selected text".</p>
        </div>
        <div className="helper">
          <h4>Long press Alt</h4>
          <p>Open popup for the result with selected text.</p>
        </div>
        <div className="helper">
          <h4>Long press Shift</h4>
          <p>Create new dictionary popup or focus on the current popup.</p>
        </div>
        <div className="helper">
          <h4>Double click</h4>
          <p>Double click on a word you want to look it up (only on the popup).</p>
        </div>
        <div className="helper">
          <h4>Contact</h4>
          <p>Any issue or idea directly contact with me at tranhuuhongson@gmail.com or <a
            href="https://github.com/sonthh" target="blank">Github</a></p>
        </div>
        <div className="idiom">
          Take fucking action
        </div>
      </div>
    );
  }
}