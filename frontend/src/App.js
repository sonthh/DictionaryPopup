import React from 'react';
import { Application } from './containers/Application';
import { Popup } from './containers/Popup';

export const App = () => {

  if (window.location.hash === '#popup') {
    return <Popup />
  }

  return <Application />
}
