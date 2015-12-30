var chai = require('chai');

chai.use(require('chai-datetime'));

process.env.NODE_ENV = 'mocha';

global.expect = chai.expect;