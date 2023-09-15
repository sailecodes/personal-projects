'use strict';

/* ================================================================ */
/* STATIC DATA */

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

/* ================================================================ */
/* DOM ELEMENTS*/

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/* ================================================================ */
/* FUNCTIONS */

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov} EUR</div>
    </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${income} EUR`;

  const loss = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(loss)} EUR`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => mov * (acc.interestRate / 100))
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov);
  labelSumInterest.textContent = `${interest} EUR`;
};

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

/* ================================================================ */
/* EVENT LISTENERS */

let currAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currAccount = accounts.find(acc => acc.username == inputLoginUsername.value);
  if (currAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.text = `Welcome back, ${currAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    inputLoginUsername.value = '';
    inputLoginPin.value = '';

    inputLoginPin.blur();
    inputLoginUsername.blur();

    updateUI(currAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  const amount = Number(inputTransferAmount.value);
  inputTransferAmount.value = '';
  inputTransferTo.value = '';

  inputTransferAmount.blur();
  inputTransferTo.blur();

  if (
    amount > 0 &&
    receiverAcc &&
    receiverAcc.username !== currAccount.username &&
    currAccount.balance >= amount
  ) {
    currAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currAccount.username &&
    Number(inputClosePin.value) === currAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currAccount.username
    );
    containerApp.style.opacity = 0;

    accounts.splice(index, 1);
  }

  inputCloseUsername.value = '';
  inputClosePin.value = '';

  inputCloseUsername.blur();
  inputClosePin.blur();
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currAccount.movements.some(mov => mov >= amount * 0.1)) {
    currAccount.movements.push(amount);

    updateUI(currAccount);
  }

  inputLoanAmount.value = '';
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*const eurToUSD = 1.1;
const movementsUSD = movements.map(mov => mov * eurToUSD);

const movementsDescriptions = movements.map((mov, i) => {
  return `Movement ${i + 1}: You ${
    mov > 0 ? 'deposited' : 'withdrew'
  } ${Math.abs(mov)}`;
});

console.log(movementsDescriptions);*/

/*const deposits = movements.filter(function (mov) {
  return mov > 0;
});

console.log(deposits);*/

/*const balance = movements.reduce(function (acc, cur, i, arr) {
  return acc + cur;
}, 0);

console.log(balance);*/
