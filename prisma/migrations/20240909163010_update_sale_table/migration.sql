/*
  Warnings:

  - You are about to drop the column `warehouse_id` on the `Sale` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_warehouse_id_fkey";

-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "warehouse_id";
