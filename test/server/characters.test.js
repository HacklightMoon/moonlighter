'use strict';

let expect    = require('chai').expect;
let Character = require('../../server/models/characters.js');

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
  })
  it('returns the proper level based on exp', function(){
    expect(Character.getLevelFromExp(100).level).to.equal(2);
  })
});
