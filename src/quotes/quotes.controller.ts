import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { Quote } from 'src/drizzle/schema';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  async create(@Body() createQuoteDto: CreateQuoteDto) {
    const quote = await this.quotesService.create(createQuoteDto);
    return new ApiResponseDto(quote, 'Quote created successfully.');
  }

  @Get()
  async findAll(): Promise<ApiResponseDto<Quote[]>> {
    const quotes = await this.quotesService.findAll();
    return new ApiResponseDto(quotes, 'All quotes fetched successfully.');
  }

  @Get('random')
  async getRandomQuote(): Promise<ApiResponseDto<Quote>> {
    const quote = await this.quotesService.getRandomQuote();

    return new ApiResponseDto(quote, 'Random quote fetched successfully.');
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const quote = await this.quotesService.findOne(+id);
    return new ApiResponseDto(quote, 'Quote fetched successfully.');
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuoteDto: UpdateQuoteDto,
  ) {
    const updatedQuote = await this.quotesService.update(+id, updateQuoteDto);
    return new ApiResponseDto(updatedQuote, 'Quote updated successfully.');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.quotesService.remove(+id);
    return new ApiResponseDto(null, 'Quote removed successfully.');
  }
}
