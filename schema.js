import { pgTable, serial, date, varchar, boolean, integer } from "drizzle-orm/pg-core";

export const transactions = pgTable('transactions', {
    id: serial('id').primaryKey(),
    title: varchar({ length: 100 }).notNull(),
    amount: integer().notNull(),
    isdebtor: boolean(),
    debtor: varchar({ length: 50 }),
    creditor: varchar({ length: 50 }),
    description: varchar({ length: 255 }),
    input_date: date().notNull(),
    deadline: date().notNull(),
    issettle: boolean()
})