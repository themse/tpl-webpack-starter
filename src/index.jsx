import React from 'react';
import ReactDOM from 'react-dom';

import * as $ from 'jquery';

import './babel';

import { Post } from '@models/Post';
import './styles/stylesheet.css';
import './styles/main.scss';
import jsonObj from './assets/data';
import img from './assets/ferrari-p80-c.jpg';
import xmlData from './assets/note.xml';
import csvData from './assets/addresses.csv';

const post = new Post('Title 1', img);

$('.content').html(post.toString());

console.log('JSON: ', jsonObj);
console.log('XML: ', xmlData);
console.log('CSV: ', csvData);

const App = () => {
    return (
        <div className="container">
            <div className="logo" />
            <h1>React works!</h1>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias possimus
                ipsum, consectetur cum eos vel quibusdam obcaecati aut laudantium.
                Repellendus ex ea doloremque error inventore id eum repudiandae beatae
                nulla?
            </p>
            <hr />
            <pre className="content" />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
