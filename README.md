SlimId
-----

SlimId is id generator based on mongo's ObjectId generator.
It can generate short text keys (16 chars) which are compatabile with mongos ObjectId key generator.

Features:
- Generates 16 char keys (for ex: KzTi3YbuGlDCAR3R) using perdefiend or custom chars
- Keys are sequential
- It can generate mongo hex keys
- Uses mongos object id generator
- Lightweight, 2KB and no dependecies


Usage
------

```javascript
var slimid = require('slimid');

//key based on default chars
slimid(); //==> "KzTiPYbuGlDCaR3S"

//mongo hex key
slimid({hex: true}); //==> 57f7aeae39fa47138d95c11e

//actual binary buffer
slimid({binary: true}); //==> <Buffer 57 f7 af d2 39 fa 47 13 8d 95 c1 1f>


//custom chars - length needs to be 64
slimid({chars:"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$*"})
//==> JzSl$HbuFlCB*Q2m
```

