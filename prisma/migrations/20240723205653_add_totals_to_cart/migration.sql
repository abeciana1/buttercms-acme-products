/*
  Warnings:

  - Added the required column `shippingTotal` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTotal` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "shippingTotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "subTotal" DOUBLE PRECISION NOT NULL;
