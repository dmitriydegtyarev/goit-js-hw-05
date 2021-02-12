/*
 * Типов транзацкий всего два.
 * Можно положить либо снять деньги со счета.
 */

let id = 10241024;
// let id = `f${(~~(Math.random()*1e8)).toString(16)}`;

const getId = function () {
  // console.log(`Генерируем id: ${id}`);
  return id += 1024;
}

const Transaction = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};

/*
 * Каждая транзакция это объект со свойствами: id, type и amount
 */

const account = {
  // Текущий баланс счета
  balance: 0,

  // История транзакций
  transactions: [],

  /*
   * Метод создает и возвращает объект транзакции.
   * Принимает сумму и тип транзакции.
   */
  createTransaction(amount, type) {
    return {
      id: getId(),
      type,
      amount,
    };    
  },

  /*
   * Метод отвечающий за добавление суммы к балансу.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций
   */
  deposit(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      console.log('Invalid transaction');
      return;
    };

    const transaction = this.createTransaction(amount, Transaction.DEPOSIT);
    this.transactions.push(transaction);    
    console.log(`Сумма ${amount} зачислена на баланс`);
    this.balance += amount;
    // console.log(this.transactions);
  },

  /*
   * Метод отвечающий за снятие суммы с баланса.
   * Принимает сумму танзакции.
   * Вызывает createTransaction для создания объекта транзакции
   * после чего добавляет его в историю транзакций.
   *
   * Если amount больше чем текущий баланс, выводи сообщение
   * о том, что снятие такой суммы не возможно, недостаточно средств.
   */
  withdraw(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      console.log('Invalid transaction');
      return;
    }

    if (amount > this.balance) {
      console.log('Снятие такой суммы не возможно, недостаточно средств');
      return;
    }

    const transaction = this.createTransaction(amount, Transaction.WITHDRAW);
    this.transactions.push(transaction);    
    console.log(`Сумма ${amount} списана с баланса`);
    this.balance -= amount;
  },

  /*
   * Метод возвращает текущий баланс
   */
  getBalance() {
    return this.balance;
  },

  /*
   * Метод ищет и возвращает объект транзации по id
   */
  getTransactionDetails(id) {

    for (const transaction of this.transactions) {
      if (id !== transaction.id) {
        continue
      }
      return transaction;
    }
    return 'Транзакция не найдена';
  },

  /*
   * Метод возвращает количество средств
   * определенного типа транзакции из всей истории транзакций
   */
  getTransactionTotal(type) {

    let sum = 0;

    for (const transaction of this.transactions) {

      if (type === transaction.type) {
        sum += transaction.amount;
      }         
      
      // if (type !== transaction.type) {
      //   const error = 'Ошибка';
      //   console.log(error);
      //   continue;
      // }
    } 
    
  return sum;
  }, 
};

console.log(account.getBalance());
account.deposit(576); // 576
account.deposit('576'); // 'Invalid transaction'
account.deposit(0); // 'Invalid transaction'
account.deposit(424); // 1000
account.deposit(1500); // 2500
account.withdraw(50); // 2450
account.withdraw(450); // 2000
account.withdraw(1500); // 500
account.withdraw('fe3'); // 'Invalid transaction'
account.withdraw(605); // 'Снятие такой суммы не возможно, недостаточно средств'
console.log(account.getBalance());
console.log(account.getTransactionDetails(10244096)); // true
console.log(account.getTransactionDetails(10246144)); // true
console.log(account.getTransactionDetails(10245120)); // true
console.log(account.getTransactionDetails(10245123)); // false
console.table(account.transactions);
console.log(account.getTransactionTotal(Transaction.WITHDRAW));
console.log(account.getTransactionTotal(Transaction.DEPOSIT));
console.log(account.getTransactionTotal(555));