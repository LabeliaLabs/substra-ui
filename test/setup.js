import {toHaveStyle} from 'jest-dom';
import 'jest-dom/extend-expect';

expect.extend({toHaveStyle});

global.Blob = (content, options) => ({content, options});
