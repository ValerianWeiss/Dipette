import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { spawn } from 'child_process';
import './index.css';

let screenChecker;

screenChecker = spawn('./public/ScreenChecker/ScreenChecker.exe');
screenChecker.stdin.setDefaultEncoding('utf-8');
screenChecker.stdout.setEncoding('utf-8');

ReactDOM.render(<App screenChecker={screenChecker}/>, document.getElementById('root'));
