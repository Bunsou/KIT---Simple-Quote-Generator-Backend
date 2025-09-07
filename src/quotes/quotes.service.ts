import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import type { DrizzleDB } from 'src/drizzle/types/drizzle';
import { quotes } from 'src/drizzle/schema';
import type { Quote } from 'src/drizzle/schema';
import { eq, sql } from 'drizzle-orm';

@Injectable()
export class QuotesService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async create(createQuoteDto: CreateQuoteDto) {
    return await this.db.insert(quotes).values(createQuoteDto).returning();
  }

  async findAll() {
    return await this.db.query.quotes.findMany({});
  }

  async findOne(id: number) {
    return await this.db.query.quotes.findFirst({
      where: eq(quotes.id, id),
    });
  }

  async getRandomQuote(): Promise<Quote> {
    const result = await this.db
      .select()
      .from(quotes)
      .orderBy(sql`RANDOM()`)
      .limit(1);

    if (!result || result.length === 0) {
      throw new NotFoundException('No quotes found in the database.');
    }

    return result[0];
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto) {
    return await this.db
      .update(quotes)
      .set(updateQuoteDto)
      .where(eq(quotes.id, id));
  }

  async remove(id: number) {
    return await this.db.delete(quotes).where(eq(quotes.id, id));
  }
}
