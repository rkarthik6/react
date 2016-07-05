var React = require('react');
var ReactDOM = require('react-dom');
var Todo = require('./src/componets/app');

ReactDOM.render(<Todo count={10} />, document.getElementById('app'));