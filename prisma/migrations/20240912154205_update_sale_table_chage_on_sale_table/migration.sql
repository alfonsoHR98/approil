/*
  Warnings:

  - Added the required column `saleType` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SaleType" AS ENUM ('CLIENT', 'WAREHOUSE');

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "saleType" "SaleType" NOT NULL,
ADD COLUMN     "warehouse_id" TEXT;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "Warehouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
