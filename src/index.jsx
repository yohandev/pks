/* @refresh reload */
import { render } from 'solid-js/web';

import Home from './components/home';

import './styles/index.css';

const root = document.getElementById('root');

render(() => <Home />, root)
