function generateUniqueCode() {
    return (Math.random().toString().slice(2,10)+Math.random().toString().slice(2,10)).slice(4, 12);
  }

// If working correctly this should shoot out an 8 digit code.  
//console.log(generateUniqueCode());
module.exports = generateUniqueCode;