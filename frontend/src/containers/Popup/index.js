import React, { Component } from 'react';
import './index.scss';
import { handleLookupWord } from '../../extensions';
import { dictionaryOptions } from '../../contants';
import { getStorage, setStorage } from '../../extensions/lib';
import { storageKeys } from '../../contants'
import { Tabs } from '../../components/Tabs';
import { Tab } from '../../components/Tab';
import { Settings } from '../../components/Settings';
import { Helps } from '../../components/Helps';
import { Histories } from '../../components/Histories';

export class Popup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      type: 'longman',
      activeKey: 'home',
    }
  }

  componentDidMount = async () => {
    try {
      const storage = await getStorage([storageKeys.type]);

      const type = storage[storageKeys.type];

      this.setState({ type });
    } catch (err) { }
  }

  onSearch = async e => {
    if (e.keyCode !== 13) return;

    try {
      await handleLookupWord(this.state.input);
    } catch (err) { }
  }

  onSearchButton = async () => {
    try {
      await handleLookupWord(this.state.input);
    } catch (err) { }
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onChangeDicType = async e => {
    try {
      const value = e.target.value;
      this.setState({ type: value });
      await setStorage(storageKeys.type, value);
    } catch (err) { }
  }

  onTabClick = key => {
    this.setState({ activeKey: key });
  }

  render = () => {
    return (
      <div className="wrapper" >

        <div className="section-select">
          <select
            value={this.state.type}
            name="type"
            id="selectDictionary"
            onChange={this.onChangeDicType}>
            {
              Object.keys(dictionaryOptions).map(key => (
                <option key={key} value={key}>{dictionaryOptions[key]}</option>
              ))
            }
          </select>
        </div>

        <div className="contentWrapper">

          <div className="section-input">
            <div className="input-wrapper">
              <input type=" text" placeholder="Look up..." name="input" id="inputSearch" size="21" maxLength="100" autoFocus
                autoComplete="off" onKeyUp={this.onSearch}
                onChange={this.onInputChange} />
              <button type="button" id="btnSearch" onClick={this.onSearchButton}></button>
            </div>
          </div>

          <Tabs
            activeKey={this.state.activeKey}
            onTabClick={this.onTabClick}
          >
            <Tab label='Home' key="home">
              <Histories />
            </Tab>
            <Tab label='Settings' key="settings">
              <Settings />
            </Tab>
            <Tab label='Help' key="about">
              <Helps />
            </Tab>
          </Tabs>

        </div>
      </div>
    );
  }
}
