import LinkedList from "./linked-list.js";

class HashMap {
  constructor(loadFactor, capacityInterval) {
    this.loadFactor = loadFactor;
    this.capacityInterval = capacityInterval;
    this.capacity = capacityInterval;
    this.#buckets.length = this.capacity;
  }

  #buckets = [];

  set(key, value) {
    this.evaluateCapacity();
    const newHash = this.hash(key);
    if (newHash < 0 || newHash >= this.#buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const linkedList = this.#buckets[newHash];
    if (!linkedList) {
      const newList = new LinkedList()
      this.#buckets[newHash] = newList;
    }
    if (this.has(key)) linkedList.getNodeFromKey(key).value = value;
    else this.#buckets[newHash].append(key, value);
  }

  get(key) {
    const keyHash = this.hash(key);
    const linkedList = this.#buckets[keyHash];
    let product = null;
    if (linkedList) product = linkedList.getNodeFromKey(key).value;
    return product;
  }

  has(key) {
    const keyHash = this.hash(key);
    const linkedList = this.#buckets[keyHash];
    if (linkedList && linkedList.findKey(key) !== null) return true;
    return false;
  }

  remove(key) {
    const keyHash = this.hash(key);
    const linkedList = this.#buckets[keyHash];
    if (linkedList && linkedList.findKey(key) !== null) {
      if (linkedList.size() === 1) this.#buckets[keyHash] = null;
      else {
        linkedList.removeAt(linkedList.findKey(key));
      }
      return true;
    }
    return false;
  }

  length() {
    return this.keys().length;
  }

  clear() {
    this.#buckets.length = 0;
    this.capacity = this.capacityInterval;
    this.#buckets.length = this.capacity;
  }

  keys() {
    let keys = [];
    this.#buckets.forEach((e, i) => {
      if (e) {
        keys = keys.concat(e.getKeys());
      }
    })
    return keys;
  }

  values() {
    let values = [];
    this.#buckets.forEach((e, i) => {
      if (e) {
        values = values.concat(e.getValues());
      }
    })
    return values;
  }

  entries() {
    let entries = [];
    this.#buckets.forEach((e, i) => {
      if (e) {
        entries = entries.concat(e.getEntries());
      }
    })
    return entries;
  }

  getBuckets() {
    return this.#buckets;
  }

  evaluateCapacity() {
    const load = Math.ceil(this.length() / (this.capacityInterval * this.loadFactor)) + 1;
    const loadInterval = load * this.capacityInterval;

    if (this.length() >= this.capacity * this.loadFactor) {
      const arrayCopy = this.entries().slice();
      this.clear();
      this.capacity = loadInterval;
      this.#buckets.length = this.capacity;
      arrayCopy.forEach((e) => {
        this.set(e[0], e[1]);
      })
    };
  }

  hash(key, max = this.capacity) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % max;
    }
    return hashCode
  }
}

export default HashMap;