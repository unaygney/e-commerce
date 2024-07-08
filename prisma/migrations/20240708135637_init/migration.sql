-- CreateTable
CREATE TABLE "Product" (
    "product_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "sku" TEXT NOT NULL,
    "list_price" DOUBLE PRECISION NOT NULL,
    "sale_price" DOUBLE PRECISION NOT NULL,
    "size" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("sku")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" SERIAL NOT NULL,
    "total_list_price" DOUBLE PRECISION NOT NULL,
    "total_sale_price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "cart_id" TEXT NOT NULL,
    "summaryId" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "Summary" (
    "id" SERIAL NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "discount_code" TEXT,
    "shipping" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Summary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_summaryId_key" ON "Cart"("summaryId");

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("sku") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("cart_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_summaryId_fkey" FOREIGN KEY ("summaryId") REFERENCES "Summary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
