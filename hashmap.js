class HashMap {
  constructor(loadFactor, capacity) {

  }
}

function hash(key, max) {
  let hashCode = 0;
  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % max;
  }
  return hashCode
}