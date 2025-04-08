class LinkedList {
  constructor() {
    this._head = new Node(null, null);
  }

  append(key, value) {
    const newNode = new Node(key, value, null);
    this.tail().nextNode = newNode;
  }

  prepend(key, value) {
    const newNode = new Node(key, value, this.head().nextNode);
    this.head().nextNode = newNode;
  }

  size() {
    let counter = 0;
    this.iterateList((node) => {
      counter++;
    });
    return counter;
  }

  head() {
    return this._head;
  }

  tail() {
    if (!this.head()) return null;
    let temp = this.head();
    this.iterateList((node) => {
      temp = node;
    });
    return temp;
  }

  at(index) {
    let node = this.head();
    for (let i = -1; i < index; i++) {
      node = node.nextNode;
    }
    return node.value;
  }

  pop() {
    if (!this.head()) return null;
    let temp = this.head();
    this.iterateList((node, i, previousNode) => {
      temp = previousNode;
    });
    temp.nextNode = null;
  }

  contains(query) {
    let result = false;
    this.iterateList((node, i) => {
      if (node.value === query) result = true;
    });
    return result;
  }

  findKey(query) {
    let index = null;
    this.iterateList((node, i) => {
      if (node.key === query) index = i;
    });
    return index;
  }

  findValue(query) {
    let index = null;
    this.iterateList((node, i) => {
      if (node.value === query) index = i;
    });
    return index;
  }

  getEntries() {
    let entries;
    this.iterateList((node, i) => {
      entries = [node.key, node.value];
    });
    return entries;
  }

  getNodeFromKey(query) {
    let product = null;
    this.iterateList((node, i) => {
      if (node.key === query) product = node;
    });
    return product;
  }

  insertAt(key, value, index) {
    const newNode = new Node(key, value);
    this.iterateList((node, i, previousNode) => {
      if (index === i) {
        console.log(node, i);
        previousNode.nextNode = newNode;
        newNode.nextNode = node;
      }
      return;
    });
  }

  removeAt(index) {
    this.iterateList((node, i, previousNode) => {
      if (index === i) previousNode.nextNode = node.nextNode
      return;
    });
  }

  toString() {
    let product = '';

    this.iterateList((node, i) => {
      product = product + formatValue(node.key, node.value, i);
      node = node.nextNode;
    });
    return product + 'null';

    function formatValue(key, value, index) {
      return `( [${index}] Key: ${key} Value: ${value} ) -> `;
    }
  }

  iterateList(callback) {
    let node = this.head().nextNode;
    let previousNode = null;
    let index = 0;
    while (node !== null) {
      callback(node, index, previousNode);
      previousNode = node;
      node = node.nextNode;
      index++;
    }
  }
}

class Node {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

export default LinkedList;