var expect = require('chai').expect;
var slimid = require('../index');

var ROUNDS = 100;

describe("slimid", function(){
  it('should throw error for invalid chars length', function(){
    expect(slimid.bind(null,{chars: "asd123"})).to.throw("must be a string with length of 64");
  })

  it('should generate short id',function(){
    for(var i=0;i<ROUNDS;i++){
      var id = slimid();
      expect(id.length).to.eql(16);
      expect(id).to.be.a('string');
    }
  })

  it('should generate id as hex',function(){
    for(var i=0;i<ROUNDS;i++){
      var id = slimid({hex: true});
      expect(id.length).to.eql(24);
      expect(id).to.be.a('string');
    }
  })

  it('should generate id as buffer',function(){
    for(var i=0;i<ROUNDS;i++){
      var id = slimid({binary: true});
      expect(id.length).to.eql(12);
      expect(id).to.be.an.instanceof(Buffer);
    }
  })

})
