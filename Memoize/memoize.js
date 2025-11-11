function memoize(fn) {
    const cache = {};
  
    return function(a, b) {  
      const clave = `${a},${b}`;  
  
      if (cache[clave]) {
        console.log("Se saco de cache ");
        return cache[clave];
      }
  
      const resultado = fn(a, b);  
      cache[clave] = resultado;  
  
      return resultado;  
    };
  }
  
  
let callCount = 0;
  
const memoizedFn = memoize(function (a, b) {
 	 callCount += 1;
    return a + b;

});


console.log(memoizedFn(2,3));
console.log(memoizedFn(2,3));
console.log(callCount);
 
