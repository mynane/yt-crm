/**
 * @file index.js
 * @author denglingbo
 */

import Immutable from 'immutable';

import user from './user';
import book from './book';
import topic from './topic';

export default Immutable.fromJS({
    user,
    book,
    topic,
});
