'use strict';

let chai           = require('chai');
let expect         = chai.expect;
let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
let Character      = require('../../server/models/characters.js');

describe('getExpFromContribs', function(){
  it('is a function', function(){
    expect(Character.getExpFromContribs).to.be.a('function');
  });
  it('returns the input times 17', function(){
    expect(Character.getExpFromContribs(1)).to.equal(17);
  });
});

describe('getLevelFromExp', function(){
  it('is a function', function(){
    expect(Character.getLevelFromExp).to.be.a('function');
  });
  it('returns an object', function(){
    expect(Character.getLevelFromExp(0)).to.be.a('object');
  });
  it('returns the proper level based on exp', function(){
    expect(Character.getLevelFromExp(100).level).to.equal(2);
    expect(Character.getLevelFromExp(300).level).to.equal(3);
    expect(Character.getLevelFromExp(600).level).to.equal(4);
  });
});

describe('getAll', function(){
  it('is a function', function(){
    expect(Character.getAll).to.be.a('function');
  });
  it('returns a promise which resolves as an array', function(){
    expect(Character.getAll()).to.eventually.be.a('array');
  });
});
