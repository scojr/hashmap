import HashMap from "./hashmap.js"

const test = new HashMap(0.75, 16)

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('dog', 'green')

console.log(test.get("dog"));
console.log(test.get("apple"));
console.log(test.get("ice cream"));
console.log(test.get("sun"));

console.log(test.entries());



