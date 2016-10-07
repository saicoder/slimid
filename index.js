'use strict'

var DEFAULT_CHARS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz"
var MACHINE_ID = parseInt(Math.random() * 0xFFFFFF, 10);

var index = ~~(Math.random() * 0xFFFFFF);
var get_inc = function() {
  return index = (index + 1) % 0xFFFFFF;
}

function generateObjectId(time) {
  if ('number' != typeof time) {
    time = ~~(Date.now()/1000);
  }

  // Use pid
  var pid = (typeof process === 'undefined' ? Math.floor(Math.random() * 100000) : process.pid) % 0xFFFF;
  var inc = get_inc();

  // Buffer used
  var buffer = new Buffer(12);
  // Encode time
  buffer[3] = time & 0xff;
  buffer[2] = (time >> 8) & 0xff;
  buffer[1] = (time >> 16) & 0xff;
  buffer[0] = (time >> 24) & 0xff;
  // Encode machine
  buffer[6] = MACHINE_ID & 0xff;
  buffer[5] = (MACHINE_ID >> 8) & 0xff;
  buffer[4] = (MACHINE_ID >> 16) & 0xff;
  // Encode pid
  buffer[8] = pid & 0xff;
  buffer[7] = (pid >> 8) & 0xff;
  // Encode index
  buffer[11] = inc & 0xff;
  buffer[10] = (inc >> 8) & 0xff;
  buffer[9] = (inc >> 16) & 0xff;
  // Return the buffer
  return buffer;
};



function getHexValue(buffer){
  var valBuff = [];

  for(var i=0;i<12;i++){
    var val = buffer[i].toString(16);
    if(val.length==1)val = "0" + val;
    valBuff.push(val);
  }
  
  return valBuff.join('');
}

function getSlimValues(chars, buff){
  var str = "";
  
  var leftBits = 0, buffIndex=buff.length-1, reg;

  while(buffIndex > -1 || leftBits != 0){
    if(leftBits < 6){
      reg = (buff[buffIndex]<<leftBits) | reg;
      leftBits += 8;
      buffIndex -= 1;
    }
    
    str = chars[reg & 0x3f] + str; 
    reg >>= 6
    leftBits-=6;
  }

  return str;
}


module.exports = function(options){
  var chars = DEFAULT_CHARS;
  options = options || {};

  if(options.chars != null){
    if(options.chars.length!=64)throw new Error("`chars` param in generator must be a string with length of 64 charactes");
    chars = options.chars.split('').sort().join('');
  }
  
  var binary = generateObjectId();
  
  if(options.binary === true)return binary;
  if(options.hex === true)return getHexValue(binary);
  return getSlimValues(chars, binary);
}

