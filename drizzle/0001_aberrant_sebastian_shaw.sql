ALTER TABLE "transactions" ADD COLUMN "amount" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "issettle" boolean;