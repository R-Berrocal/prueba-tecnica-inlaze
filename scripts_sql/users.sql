DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."users" (
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "full_name" varchar NOT NULL,
    "email" varchar NOT NULL,
    "password" varchar NOT NULL,
    "phone" varchar,
    "is_deleted" bool NOT NULL DEFAULT false,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    "roleId" uuid,
    CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "public"."role"("id"),
    PRIMARY KEY ("id")
);

INSERT INTO "public"."users" ("id", "full_name", "email", "password", "phone", "is_deleted", "created_at", "updated_at", "roleId") VALUES
('c6794101-2e90-49e2-86c7-cfca98b2fd56', 'Jose Luis', 'jose23@gmail.com', '$2b$10$ugEiBgVN75wAXbg1PnNDgOvfgwE3wwx4LJUB0OByMr7cGN.LXZNVK', '302834622', 'f', '2023-08-28 15:51:18.146619', '2023-08-28 15:51:18.146619', '9bcadb61-b5f8-424b-bcf5-9f369c448e6d');
INSERT INTO "public"."users" ("id", "full_name", "email", "password", "phone", "is_deleted", "created_at", "updated_at", "roleId") VALUES
('5f2b26f9-2ef4-471d-b78a-a668d52dc2d3', 'roberto berrocal', 'robertoberro20@gmail.com', '$2b$10$vC1JXhy68/zGFuxXjLFmwOPpoF8lzzeKhPvYo1MI0lGKXqgZ0Q3GC', '3052846691', 'f', '2023-08-27 20:57:07.368548', '2023-08-28 16:09:39.681454', '47c2cbf4-778e-4baf-8641-d1ab5e753e4a');
