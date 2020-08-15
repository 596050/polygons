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
  const lastTwo = [1, 1];
  let sum = 0;
  let counter = 0;
  while (counter < n) {
    const nextFib = lastTwo[0] + lastTwo[1];
    lastTwo[0] = lastTwo[1];
    lastTwo[1] = nextFib;
    if (isEven(nextFib)) {
      sum += nextFib;
      counter++;
    }
  }
  return sum;
};

//6.833002762909235e+31

// 2. Write a function in a language of your choice which, when passed two sorted arrays of integers returns an array of any numbers which appear in both. No value should appear in the returned array more than once.

// functional solution, iterates over array1 and searches in array2 for a match
// O(n^2) time
// O(n) space
const matchingPairsFunctional = (array1, array2) =>
  array1.filter((num) => array2.includes(num));

// non-functional, creates two pointers for each array index and increments both if the elements match or if one is smaller than the other
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

const matchingPairsBinarySearch = (array1, array2) => {};

// function binarySearch(array, target) {
//     return binarySearchHelper(array, target, 0
//    }
//    function binarySearchHelper(array, target, l
//     while (left <= right) {
//     const middle = Math.floor((left + right)
//     const potentialMatch = array[middle];
//     if (target === potentialMatch) {
//     return middle;
//     } else if (target < potentialMatch) {
//     right = middle - 1;
//     } else {
//     left = middle + 1;
//     }
//     }
//     return -1;
//    }

// console.log(
//   matchingPairsBinarySearch([-1, 0, 1, 2, 5, 6], [-1, 1, 5, 5, 6, 12, 500])
// );

// [ -1, 1, 5, 6 ]

// 3. Write a function in a language of your choice which, when passed a positive integer returns
// true if the decimal representation of that integer contains no odd digits and otherwise returns
// false.

const containsOddDigits = (value) => {};

// 4. Write a function in a language of your choice which, when passed a decimal digit X, returns the
// value of X+XX+XXX+XXXX. E.g. if the supplied digit is 3 it should return 3702
// (3+33+333+3333).

const sumDigits = (value) => {};

module.exports = {
  getEvenFibonacci,
  isEven,
  matchingPairsFunctional,
  matchingPairsIterative,
  containsOddDigits,
  sumDigits,
  matchingPairsBinarySearch,
};
