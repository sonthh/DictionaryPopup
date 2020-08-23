import React, { Component } from 'react';
import './index.scss';
import { Switch } from '../Switch';
import { getStorage, setStorage } from '../../extensions/lib';
import { storageKeys } from '../../contants';

export class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkedLongPressAlt: true,
    }
  }

  componentDidMount = async () => {
    try {
      const storage = await getStorage([storageKeys.settings.pressingAlt]);
      const tmp = storage[storageKeys.settings.pressingAlt];

      const checkedLongPressAlt = tmp === undefined ? false : tmp;

      this.setState({ checkedLongPressAlt });
    } catch (err) { }
  }

  onChangeLongPress = async e => {
    try {
      const checked = e.target.checked;
      this.setState({ checkedLongPressAlt: checked });
      await setStorage(storageKeys.settings.pressingAlt, checked);
    } catch (err) { }
  }

  render() {
    return (
      <div id="settingsWrapper">
        <div className="setting-item">
          <h4>
            Long press Alt
          </h4>
          <Switch
            checked={this.state.checkedLongPressAlt}
            onChange={this.onChangeLongPress}
          />
        </div>
        <div className="idiom">
          It's never too late to learn
        </div>
      </div>
    );
  }
}