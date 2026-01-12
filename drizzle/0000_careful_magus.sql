CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"isdebtor" boolean,
	"debtor" varchar(50),
	"creditor" varchar(50),
	"description" varchar(255),
	"input_date" date NOT NULL,
	"deadline" date NOT NULL
);
