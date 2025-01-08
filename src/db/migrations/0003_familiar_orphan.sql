ALTER TABLE "user" DROP CONSTRAINT "user_orgId_org_id_fk";
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "orgId";