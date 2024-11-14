CREATE TABLE IF NOT EXISTS "adoptionRequest" (
	"id" text PRIMARY KEY NOT NULL,
	"petId" text NOT NULL,
	"orgId" text NOT NULL,
	"userId" text NOT NULL,
	"adoptiondate" timestamp with time zone DEFAULT now() NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"whatsapp" text NOT NULL,
	"address" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pet" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" text NOT NULL,
	"sex" text NOT NULL,
	"size" text NOT NULL,
	"color" text NOT NULL,
	"description" text NOT NULL,
	"city" text NOT NULL,
	"status" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"orgId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"whatsapp" text NOT NULL,
	"orgId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adoptionRequest" ADD CONSTRAINT "adoptionRequest_petId_pet_id_fk" FOREIGN KEY ("petId") REFERENCES "public"."pet"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adoptionRequest" ADD CONSTRAINT "adoptionRequest_orgId_org_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."org"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "adoptionRequest" ADD CONSTRAINT "adoptionRequest_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pet" ADD CONSTRAINT "pet_orgId_org_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."org"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_orgId_org_id_fk" FOREIGN KEY ("orgId") REFERENCES "public"."org"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
