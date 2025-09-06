import { IsString, Length } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @Length(5, 500, { message: 'error on quote length' })
  quote: string;

  @IsString()
  @Length(2, 100, { message: 'error on author length' })
  author: string;
}
