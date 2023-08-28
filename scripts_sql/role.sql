DROP TABLE IF EXISTS "public"."role";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."role" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" varchar NOT NULL,
    "is_deleted" bool NOT NULL DEFAULT false,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY ("id")
);

INSERT INTO "public"."role" ("id", "name", "is_deleted", "created_at", "updated_at") VALUES
('9bcadb61-b5f8-424b-bcf5-9f369c448e6d', 'ADMIN', 'f', '2023-08-27 18:41:18.27457', '2023-08-27 18:41:18.27457');
INSERT INTO "public"."role" ("id", "name", "is_deleted", "created_at", "updated_at") VALUES
('47c2cbf4-778e-4baf-8641-d1ab5e753e4a', 'USER', 'f', '2023-08-27 17:10:11.94606', '2023-08-27 20:12:03.844227');
