import { relations } from 'drizzle-orm';
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const quotes = pgTable('quotes', {
  id: serial('id').primaryKey(),
  quote: text('quote').notNull(),
  author: text('author').notNull(),
  // creatorId: integer('creatorId').references(() => users.id),
});

export type Quote = typeof quotes.$inferSelect;

//todo: Implement user authentication and authorization later after Midterm

// export const users = pgTable('users', {
//   id: serial('id').primaryKey(),
//   name: text('name').notNull(),
//   email: text('email').notNull(),
//   password: text('password').notNull(),
// });

//? Relationship
// export const quoteRelations = relations(quotes, ({ one }) => ({
//   creator: one(users, {
//     fields: [quotes.creatorId],
//     references: [users.id],
//   }),
// }));

// export const userRelations = relations(users, ({ many }) => ({
//   quotes: many(quotes),
// }));
