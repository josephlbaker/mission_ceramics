import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as AlertProvider } from 'react-alert'
// import AlertTemplate from 'react-alert-template-basic'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// alert configuration
const options = {
  position: 'bottom center',
  timeout: 3000,
  offset: '30px',
  transition: 'scale'
}

const AlertTemplate = ({ style, options, message }) => (
  <div className="alert-modal" style={style}>
    {options.type === 'info'}
    {options.type === 'success'}
    {options.type === 'error'}
    {message}
  </div>
)

const Root = () => (
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
