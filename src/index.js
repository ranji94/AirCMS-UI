import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from "./main-view";
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <MainView />
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
