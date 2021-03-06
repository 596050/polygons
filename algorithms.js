const isEven = (n) => {
  return Math.abs(n % 2) == 0;
};

// 1. The Fibonacci sequence is defined as a sequence of integers starting with 1 and 1, where each subsequent value is the sum of the preceding two. I.e.
// f(0) = 1
// f(1) = 1
// f(n) = f(n-1) + f(n-2) where n >= 2
// Write a program in a language of your choice to calculate the sum of the first 100 even-valued Fibonacci numbers
// O(n) time
// O(1) space
const getEvenFibonacci = (n = 100) => {
  const lastTwoFib = [1, 1];
  let sum = 0;
  let counter = 0;
  while (counter < n) {
    const nextFib = lastTwoFib[0] + lastTwoFib[1];
    lastTwoFib[0] = lastTwoFib[1];
    lastTwoFib[1] = nextFib;
    if (isEven(nextFib)) {
      sum += nextFib;
      counter++;
    }
  }
  return sum;
};

//6.833002762909235e+31

// 2. Write a function in a language of your choice which, when passed two sorted arrays of integers returns an array of any numbers which appear in both. No value should appear in the returned array more than once.

// Iterates over array1 and searches in array2 for a match
// O(n^2) time
// O(n) space
const matchingPairsFunctional = (array1, array2) =>
  array1.filter((num) => array2.includes(num));

// Creates two pointers for each array index and increments both if the elements match or if one is smaller than the other
// O(n + m) time where n and m are the lengths of each array which are iterated over once each
// O(n) space, we create a new array of the matching elements
const matchingPairsIterative = (array1, array2) => {
  const matching = [];
  let array1Pointer = (array2Pointer = 0);
  while (array1Pointer < array1.length && array2Pointer < array2.length) {
    const array1Element = array1[array1Pointer];
    const array2Element = array2[array2Pointer];
    if (array1Element === array2Element) {
      matching.push(array1Element);
      array1Pointer++;
      array2Pointer++;
    } else if (array1Element < array2Element) {
      array1Pointer++;
    } else if (array1Element > array2Element) {
      array2Pointer++;
    }
  }
  return matching;
};

// Uses the fact that the arrays are sorted to apply binary search
// O(nlog(m)) time using a binary search on array2 (log(m)) for each element in array1 (n)
// O(n) space a new array is created
const matchingPairsBinarySearch = (array1, array2) => {
  return array1.reduce((acc, num) => {
    const index = binarySearch(array2, num);
    return index > -1 ? [...acc, array2[index]] : acc;
  }, []);
};

const binarySearchHelper = (array, lpointer, rpointer, target) => {
  const mid = Math.floor((lpointer + rpointer) / 2);
  const midEl = array[mid];
  if (target === midEl) {
    return mid;
  }
  if (lpointer === rpointer) {
    return -1;
  }
  if (target < midEl) {
    return binarySearchHelper(array, lpointer, mid, target);
  } else if (target > midEl) {
    return binarySearchHelper(array, mid + 1, rpointer, target);
  }
  return -1;
};

const binarySearch = (array, target) => {
  return binarySearchHelper(array, 0, array.length - 1, target);
};

// console.log(matchingPairsBinarySearch([-1, 0, 1, 8, 776, 76], [-1, 0, 1, 8])); // [ -1, 0, 1, 8 ]

// 3. Write a function in a language of your choice which, when passed a positive integer returns
// true if the decimal representation of that integer contains no odd digits and otherwise returns
// false.

// O(n) time
// O(1) space
const containsOddDigits = (value) => {
  const valueStringArr = value.toString().split("");
  for (let i = 0; i < valueStringArr.length; i++) {
    if (!isEven(valueStringArr[i])) {
      return false;
    }
  }
  return true;
};

// 4. Write a function in a language of your choice which, when passed a decimal digit X, returns the value of X+XX+XXX+XXXX. E.g. if the supplied digit is 3 it should return 3702 (3+33+333+3333).

const sumDigits = (value) => {
  const str = `${value}+${value}${value}+${value}${value}${value}+${value}${value}${value}${value}`;
  return eval(str);
};

module.exports = {
  getEvenFibonacci,
  isEven,
  matchingPairsFunctional,
  matchingPairsIterative,
  containsOddDigits,
  sumDigits,
  matchingPairsBinarySearch,
};
