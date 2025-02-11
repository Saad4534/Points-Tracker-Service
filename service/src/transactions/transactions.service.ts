import { Injectable } from '@nestjs/common'
import { TransactionDTO } from './dto/transactions.dto'

@Injectable()
export class TransactionsService {
  private transactions: { payer: string; points: number; timestamp: string }[] =
    []
  private balance: Record<string, number> = {}

  getBalance () {
    if (Object.keys(this.balance).length === 0) {
      return 'No Balance To Show as of NOW!'
    }
    return this.balance
  }

  getBalanceDetails () {
    if (this.transactions.length === 0) {
      return "No Details to Show as of NOW!"
    }
    return this.transactions;
  }

  addTransacation(transactionsArray: TransactionDTO[]) {

    for (const singleTransaction of transactionsArray) {
      this.transactions.push(singleTransaction);
  
      if (!this.balance[singleTransaction.payer]) {
        this.balance[singleTransaction.payer] = 0;
      }
      this.balance[singleTransaction.payer] += singleTransaction.points;
    }
    return {
      message: 'Transactions added successfully!',
      updatedBalances: this.balance,
      totalBalance: this.getTotalBalance(),
    };
}

  getTotalBalance (): number {
    return Object.values(this.balance).reduce((sum, points) => sum + points, 0);
  }

  spendPoints(points: number) {

    if(this.transactions.length === 0) {
      return { message: "No transactions available! Please add transactions first." }
    }

    if (points > this.getTotalBalance()) {
        throw new Error('Not enough points available!');
    }
    this.transactions.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()); // sorting transactions
    const spendPoints: Record<string, number> = {};

    for (const transaction of this.transactions) {
      if (points <= 0) break;
      if (transaction.points === 0) continue;

      // if transaction points are -ve
      if (transaction.points < 0) { 
          let reqAmount = Math.min(Math.abs(transaction.points), points); // required Amount to Add to make the negative transaction points 0 
          transaction.points += reqAmount; // making transaction point 0
          points += reqAmount; // adding points because it was spent to make the points 0 this time
          spendPoints[transaction.payer] = (spendPoints[transaction.payer] || 0) + reqAmount; // assigning payer's points
          this.balance[transaction.payer] += reqAmount; // balance adjustmnt
      } else {
          let spendAmount = Math.min(transaction.points, points); // check whichever is the lowest i.e. in case of AMAZON example
          transaction.points -= spendAmount; // spending the right amount
          points -= spendAmount; // updating the points just, accordingly...
          spendPoints[transaction.payer] = (spendPoints[transaction.payer] || 0) - spendAmount; // assigning payer's points
          this.balance[transaction.payer] -= spendAmount; // balance adjustment
      }
    }
    return {message:"Points deducted from Payers!!", spendPoints};
  }
}
