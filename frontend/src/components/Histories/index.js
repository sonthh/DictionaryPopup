import React, { Component } from 'react';
import './index.scss';
import { getStorage, setStorage } from '../../extensions/lib';
import { storageKeys, copyToClipboard } from '../../contants';
import { handleLookupWord } from '../../extensions';

export class Histories extends Component {

  constructor(props) {
    super(props);
    this.state = {
      histories: [],
    };
  }

  componentDidMount = async () => {
    try {
      const storage = await getStorage([storageKeys.history]);

      const histories = storage[storageKeys.history];

      this.setState({ histories });
    } catch (err) { }
  }

  onClickText = async ({ text }) => {
    try {
      await handleLookupWord(text);
    } catch (err) { }
  }

  onDeleteText = async ({ _id }) => {
    try {
      const histories = this.state.histories.filter(each => each._id !== _id);
      this.setState({ histories });
      await setStorage(storageKeys.history, histories);
    } catch (err) { }
  }

  onCopyToClipboard = async ({ text }) => {
    copyToClipboard(text);
  }

  render() {
    const tableRows = this.state.histories.map((each) => (
      <tr key={each._id}>
        <td onClick={() => this.onClickText(each)}>
          <span>{each.text}</span>
        </td>
        <td>
          <span
            class='btnDelete'
            onClick={() => this.onDeleteText(each)}
            title={`Delete ${each.text}`}
          />
          <span
            class='btnCopy'
            title='Copy to clipboard'
            onClick={() => this.onCopyToClipboard(each)}
          />
        </td>
      </tr>
    ));

    return (
      <>
        <table id="historyTable">
          <tbody>
            <tr>
              <th>Text</th>
              <th>Action</th>
            </tr>
            {tableRows}
          </tbody>
        </table>
        <div className="idiom">
          Practice make perfect
        </div>
      </>
    );
  }
}