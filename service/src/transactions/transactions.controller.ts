import { Controller, Body, Get, Post, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { TransactionDTO } from './dto/transactions.dto'
import { SpendPointsDto } from './dto/spendPoints.dto';

@Controller('transaction')
export class TransactionsController {
  constructor (private readonly transactionsService: TransactionsService) {}

  @Get('balance')
  getBalance () {
    return this.transactionsService.getBalance()
  }

  @Get('balanceInDetail')
  getBalanceDetails () {
    return this.transactionsService.getBalanceDetails()
  }

  @Get('totalBalance')
  getTotalBalance () {
    return this.transactionsService.getTotalBalance()
  }

  @Post('addTransaction')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  addTransaction (@Body() transaction: TransactionDTO[]) {
    if (!Array.isArray(transaction) || transaction.length === 0) {
      throw new BadRequestException('Request body should not be empty and must contain at least one transaction.');
    }
    return this.transactionsService.addTransacation(transaction);
  }

  @Post('spendPoints')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  spendPoints(@Body() body: SpendPointsDto) {
    return this.transactionsService.spendPoints(body.points);
  }
}
