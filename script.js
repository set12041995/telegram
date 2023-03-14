const SINGLE_LIST_HEAD = {
  value: 0,
  next: null,
};

function append(value) {
  const newNode = {
    value,
    next: null
  };
  let currentNode = SINGLE_LIST_HEAD;
  while (currentNode.next !== null) {
    currentNode = currentNode.next;
  }
  currentNode.next = newNode;
}

const DEFAULT_PARAMS = [1, 'two', () => console.log('hello'), true];

DEFAULT_PARAMS.forEach(el => append(el));

console.log(SINGLE_LIST_HEAD.next.value);
SINGLE_LIST_HEAD.next.next.next.value();
