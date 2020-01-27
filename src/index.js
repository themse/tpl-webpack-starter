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
