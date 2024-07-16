-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImageOnProduct" (
    "productId" INTEGER NOT NULL,
    "productImageId" INTEGER NOT NULL,

    CONSTRAINT "ProductImageOnProduct_pkey" PRIMARY KEY ("productId","productImageId")
);

-- CreateTable
CREATE TABLE "_ProductToProductImages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductImages_AB_unique" ON "_ProductToProductImages"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductImages_B_index" ON "_ProductToProductImages"("B");

-- AddForeignKey
ALTER TABLE "ProductImageOnProduct" ADD CONSTRAINT "ProductImageOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImageOnProduct" ADD CONSTRAINT "ProductImageOnProduct_productImageId_fkey" FOREIGN KEY ("productImageId") REFERENCES "ProductImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductImages" ADD CONSTRAINT "_ProductToProductImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductImages" ADD CONSTRAINT "_ProductToProductImages_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
