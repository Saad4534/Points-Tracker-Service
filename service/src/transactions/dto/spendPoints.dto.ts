import { IsInt, IsNotEmpty } from 'class-validator';

export class SpendPointsDto {
  @IsNotEmpty({ message: 'Points field is required' })
  @IsInt({ message: 'Points must be a number' })
  points: number;
}
