import { IsInt, IsString, IsISO8601, IsNotEmpty } from 'class-validator';

export class TransactionDTO {
  @IsNotEmpty({ message: 'Payer field is required' })
  @IsString({ message: 'Payer must be a String'})
  payer: string;

  @IsNotEmpty({ message: 'Points field is required' })
  @IsInt({ message: 'Points must be a number' }) 
  points: number;

  @IsNotEmpty({ message: 'TimeStamp field is required' })
  @IsISO8601()
  timestamp: string;
}
