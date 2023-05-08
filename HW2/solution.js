function reverseNumber(num) {
    let flippedNum = 0
    while (num) {
        flippedNum = flippedNum*10 + num%10;
        num = Math.floor(num / 10);
    }
    return flippedNum;
}

function isPalindrome(s) {
    let n = s.length;
    for (let i = 0; i <= Math.floor(n/2); ++i) {
        if (s[i] !== s[n-i-1]) {
            return false;
        }
    }
    return true;
}

function getCombinations(s) {
    let combinations = new Array();
    for (let i = 0; i < s.length; ++i) {
        for (let j = i+1; j <= s.length; ++j) {
            combinations.push(s.slice(i, j));
        }
    }
    return combinations;
}

function sortString(s) {
    let res = s.split('');
    res.sort();
    return res.join('');
}

function titleCase(s) {
    let res = [];
    for (let word of s.split(' ')) {
        res.push(word.slice(0, 1).toUpperCase() + word.slice(1));
    }
    return res.join(' ');
}

function getLongestWord(s) {
    let arr = s.split(' ');
    let longestWord = '';
    let maxLength = 0;
    for (word of arr) {
        if (maxLength < word.length) {
            maxLength = word.length;
            longestWord = word;
        }
    }
    return longestWord;
}

function getNumOfVowels(s) {
    let vowels = 'aeiouAEIOU'.split('');
    res = 0
    for (char of s) {
        if (vowels.includes(char)) {
            res += 1
        }
    }
    return res;
}

function isPrime(num) {
    if (num ==2) {
        return true;
    }
    for (let i = 2; i < Math.ceil(Math.sqrt(num)); ++i) {
        if (num % i == 0) {
            console.log(num, i);
            return false;
        }
    }
    return true;
}

function getTypeOf(x) {
    return typeof(x);
}

function getIdentityMatrix(n) {
    let matrix = [];
    for (let i=0; i<n; ++i) {
        matrix.push([])
    }

    for (let i=0; i<n; ++i) {
        for (let j=0; j<n; ++j) {
            matrix[i].push(0)
        }
        matrix[i][i] = 1;
    }

    return matrix;
}

function getSecondsMaxMin(nums) {
    max_num = nums.reduce((a, b) => Math.max(a, b), -Infinity);
    min_num = nums.reduce((a, b) => Math.min(a, b), Infinity);
    console.log(max_num, min_num)
    second_max = -Infinity
    second_min = Infinity
    for (let num of nums) {
        if (num != max_num) {
            second_max = Math.max(second_max, num)
        }
        if (num != min_num) {
            second_min = Math.min(second_min, num)
        }
    }
    return [second_min, second_max]
}

function isPerfectNumber(num){
    digits_sum = 0
    for (let i = 1; i < num; ++i) {
        if (num % i == 0) {
            digits_sum += i
        }
    }
    if (digits_sum == num) {
        return true
    }
    return false
}

function getFactors(num) {
    factors = []
    for (let i=0; i< num; ++i) {
        if (num % i == 0) {
            factors.push(i)
        }
    }
    return factors
}


function computeExponent(b, n) {
    return Math.pow(b, n)
}

function getUniqueChars(s) {
    let set = new Set();
    for (char of s.split('')) {
        set.add(char)
    }
    return set
}

function getCharMap(s) {
    map = new Map()
    for (char of s.split('')) {
        if (map.has(char)) {
            map.set(char, map.get(char)+1)
        }
        else {
            map.set(char, 1)
        }
    }
    return map;
}

function binarySearch(arr, val) {
    let start = 0;
    let end = arr.length - 1;
  
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
  
      if (arr[mid] === val) {
        return mid;
      }
  
      if (val < arr[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return -1;
  }

let num = 123;
console.log('reverseNumber - ', reverseNumber(num));

let s = 'madam';
console.log('isPalindrome - ', isPalindrome(s));
s = 'madame';
console.log('isPalindrome - ', isPalindrome(s));

s = 'dog'
combinations = getCombinations(s);
console.log('getCombinations - ', getCombinations(s));

s = 'webmaster';
console.log('sortString - ', sortString(s));

s = 'the quick brown fox'
console.log('titleCase - ', titleCase(s));

s = 'Web Development Tutorial'
console.log('getLongestWord - ', getLongestWord(s));

s = 'The quick brown fox'
console.log('getNumOfVowels - ', getNumOfVowels(s));

num = 7;
console.log('isPrime - ', isPrime(num));


let x = 7;
console.log('getTypeOf - ', getTypeOf(x));

x = 2
console.log('getIdentityMatrix - ', getIdentityMatrix(x));

nums = [1, 2, 3, 4, 5]
console.log('getSecondsMaxMin - ', getSecondsMaxMin(nums));


x=28
console.log('isPerfectNumber - ', isPerfectNumber(x));

console.log(getFactors(48))
console.log(computeExponent(4, 3))
console.log(getUniqueChars('Hllohellohlooo'))
console.log(getCharMap('Hllohellohlooo'))
console.log(binarySearch([1, 2, 3, 4, 5, 6], 5))




function makeId(l){
    var res = "";
    var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i=0; i < l; i++ ){  
        res += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return res;
}
console.log(makeId(8));


function getCount(s, i) {
    let count = 0
    for (char of s.split('')) {
        if (char == i) {
            count += 1
        }
    }
    return count
}
console.log(getCount('Helloo', 'l'))


function getFirstUnique(s) {
    map = new Map();
    for (let char of s.split('')) {
        if (map.has(char)) {
            map.set(char, map.get(char)+1)
        }
        else {
            map.set(char, 1)
        }
    }
    for (let char of s.split('')) {
        if (map.get(char)== 1) {
            return char
        }
    }
}

console.log(getFirstUnique('prpiyanka'))

function swap(arr, xp, yp) {
    let temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}
 
function bubbleSort(arr) {
    let n  = arr.length
    for (let i = 0; i < n-1; ++i) {
        for (let j = 0; j < n-i-1; ++j) {
            if (arr[j] > arr[j+1]) {
                swap(arr,j,j+1);
            }
        }   
    }
    return arr
}
console.log(bubbleSort([4, 2, 6, 2, 4, 54]))


function longestName(names) {
    longest_name = names.reduce((a, b) => {
        if (a.length > b.length) {
            return a
        } 
        else if (a.length < b.length) {
            return b
        }
        else {
            return a
        }
    });
    return longest_name
}
console.log(longestName(['India', 'USA', 'UAE']))


function getFunctionName() {
    console.log( arguments.callee.name );
}

getFunctionName()