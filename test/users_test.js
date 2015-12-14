import { expect } from 'chai';
import { createServer } from '../src/server';
import request from 'superagent-bluebird-promise';

const client = query => {
  const endpointPromise = request
    .get('http://localhost:5000/users')
    .query(query)
    .accept('application/json')
    .type('application/json')
    .then( body => {
      return body;
    });

  return endpointPromise;
};

let server = null;

describe('users', function() { // es6 fat arrow would not work
  this.timeout(5000);

  before(() => server = createServer());
  after(() => server.stop());

  describe('valid params', () => {
    it('should return the response in the right format', done => {
      client()
      .then( res => {
        expect(res.body).to.deep.equal({ users: [] });
        done();
      });
    });
  });
});
