/**
 * @file service.js
 * @author deo
 *
 * service
 */

import { get, post } from 'freed-spa/lib/util/request';

export const fetchUser = () => get('/user');

export const fetchBookList = () => get('/book');

export const fetchBookDetail = (params) => get('/bookDetail', params);

export const fetchTopic = () => get('/topic');

export const createTopic = (params) => post('/topic/create', params);
