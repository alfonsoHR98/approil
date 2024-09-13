-- DropForeignKey
ALTER TABLE "BatcheDetail" DROP CONSTRAINT "BatcheDetail_batche_id_fkey";

-- DropForeignKey
ALTER TABLE "SaleDetail" DROP CONSTRAINT "SaleDetail_sale_id_fkey";

-- AddForeignKey
ALTER TABLE "BatcheDetail" ADD CONSTRAINT "BatcheDetail_batche_id_fkey" FOREIGN KEY ("batche_id") REFERENCES "Batche"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleDetail" ADD CONSTRAINT "SaleDetail_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
