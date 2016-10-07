var expect = require('chai').expect;
var assert = require('assert');
var slimid = require('../index');

var ROUNDS = 10000;

describe("slimid keys behaviour", function(){
  it('should generate sequential keys',function(){
    var ids = [];
    for(var i=0;i<ROUNDS;i++)ids.push(slimid());
    
    expect(ids.slice().sort()).to.eql(ids);
  })

  it('should generate unique keys',function(){
    var lastID = null, id = null;
    for(var i=0;i<ROUNDS;i++){
      id = slimid();
      assert(id !== lastID, 'keys collision'); //faster that expect
      lastID = id;
    }
  })
})
