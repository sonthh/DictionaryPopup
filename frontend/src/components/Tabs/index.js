import React, { Component } from 'react';
import './index.scss';

export class Tabs extends Component {

  render() {
    const { children, onTabClick, activeKey } = this.props;

    return (
      <div className="tabs">
        <ol className="tab-list">
          {
            children.map(child => {
              let className = 'tab-list-item';

              if (String(child.key) === String(activeKey)) {
                className += ' tab-list-active';
              }

              return (
                <li
                  onClick={() => onTabClick(child.key)}
                  className={className}
                  key={child.key}
                >
                  <span
                    title={child.props.label}
                    className={child.key}
                  />
                </li>
              );
            })
          }
        </ol>
        <div className="tab-content">
          {children
            .filter(child => String(child.key) === String(activeKey))
            .map(child => child.props.children)
          }
        </div>
      </div>
    );
  }
}