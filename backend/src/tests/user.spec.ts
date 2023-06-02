import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
 


describe('Users api unit test', () => {
    
  it('returns a data for a specified user', () => {
     request('http://localhost:5000/api/v1')
      .get('/user/clf5r7z720000ufycmt4k3fdv')
      .then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.success).to.eql(true);
      });
  });
});







