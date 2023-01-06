//Filter
const nums = [9,8,7,6,5];
const add = nums.filter(n=>{
    return n%2===1;
});

// Some / Every
const words = ['dog', 'bag', 'dig', 'wag'];
words.every(word => {
    return word.length ===3;
});

// Reduce
[3,5,7,9,11].reduce((total,val) => {
    return total + val;
});

// Spread
const numbers = [13, 4, 5, 21];
Math.max(...numbers);

// Rest params
function sum(...numbers){
    return numbers.reduce((total,val) => total + val);
}

// Destructing
const scores = [10, 7, 8];
const [first, second] = scores;

const user = {
    firstName : 'first',
    lastName : 'last'
};
const {firstName : name, password = '1234'} = user;

function fullName({firstName, lastName}){
    return `${firstName} ${lastName}`;
}