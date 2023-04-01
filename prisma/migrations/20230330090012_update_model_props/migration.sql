-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
