'use strict';


let chai           = require('chai');
let expect         = chai.expect;
let chaiAsPromised = require("chai-as-promised");
let Users          = require('../../server/models/users.js');

describe('verifyInsert', function(){
  it('is a function', function(){
    expect(Users.verifyInsert).to.be.a('function');
  });
});

describe('getById', function(){
  it('is a function', function(){
    expect(Users.getById).to.be.a('function');
  });
});

describe('getByLoggedIn', function(){
  it('is a function', function(){
    expect(Users.getByLoggedIn).to.be.a('function');
  });
});

describe('update', function(){
  it('is a function', function(){
    expect(Users.update).to.be.a('function');
  });
});

describe('pay', function(){
  it('is a function', function(){
    expect(Users.pay).to.be.a('function');
  });
});

describe('newContribs', function(){
  it('is a function', function(){
    expect(Users.newContribs).to.be.a('function');
  });
});

describe('updateContribs', function(){
  it('is a function', function(){
    expect(Users.updateContribs).to.be.a('function');
  });
});

describe('contribsSeen', function(){
  it('is a function', function(){
    expect(Users.contribsSeen).to.be.a('function');
  });
});

describe('delete', function(){
  it('is a function', function(){
    expect(Users.delete).to.be.a('function');
  });
});
