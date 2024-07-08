"use server";
import { Product } from "@/lib/definitions";
import { cookies } from "next/headers";
import { db } from "@/db";

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    let url: string = `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${id}`;

    const response = await fetch(url);

    if (!response.ok) {
      return undefined;
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getCollectionById(collection_id: string) {
  let url = `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products?collection=${collection_id}`;

  const response = await fetch(url);

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  return data;
}

export async function addProductToCart(formData: FormData) {
  try {
    const cookieStore = cookies();
    let cartId = cookieStore.get("cart_id")?.value;
    let cart;

    // if cartId exists, get the cart
    if (cartId) {
      cart = await db.cart.findUnique({
        where: {
          cart_id: cartId,
        },
      });
    }

    // Product Data
    const product = await getProductById(formData.get("product_id") as string);
    const color = formData.get("color") as string;
    const size = formData.get("size") as string;
    const quantity = parseInt(formData.get("quantity") as string);

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    const unit = product.inventory.find(
      (item: any) =>
        item.color === color &&
        (item.size?.toString() === size?.toString() ||
          !item.size ||
          item.size === "std"),
    );

    if (!unit) {
      return { success: false, message: "Unit not found" };
    }

    // Check if the card_id exists or not . IF card_id does not exist then
    // create a new cart and set the cart_id in the cookie
    // IF cart_id exists then update the cart with the new item

    if (!cartId) {
      const newCart = await db.cart.create({
        data: {
          items: {
            create: {
              product: {
                connectOrCreate: {
                  where: { product_id: product.product_id },
                  create: {
                    product_id: product.product_id,
                    name: product.name,
                    description: product.description,
                  },
                },
              },
              unit: {
                connectOrCreate: {
                  where: { sku: unit.sku },
                  create: {
                    sku: unit.sku,
                    list_price: unit.list_price,
                    sale_price: unit.sale_price,
                    size: String(unit.size),
                    color: unit.color,
                    stock: Number(unit.stock),
                    image_url:
                      product.images.find(
                        (img: any) => img.color === unit.color,
                      )?.image_url || "",
                  },
                },
              },
              total_list_price: unit.list_price * quantity,
              total_sale_price: unit.sale_price * quantity,
              quantity: quantity,
            },
          },
          summary: {
            create: {
              subtotal: unit.sale_price * quantity,
              discount: 0,
              shipping: 0,
              total: unit.sale_price * quantity,
            },
          },
        },
      });

      cartId = newCart.cart_id;

      cookieStore.set("cart_id", cartId, { path: "/", httpOnly: true });
    } else {
      await db.cart.update({
        where: { cart_id: cartId },
        data: {
          items: {
            create: {
              product: {
                connectOrCreate: {
                  where: { product_id: product.product_id },
                  create: {
                    product_id: product.product_id,
                    name: product.name,
                    description: product.description,
                  },
                },
              },
              unit: {
                connectOrCreate: {
                  where: { sku: unit.sku },
                  create: {
                    sku: unit.sku,
                    list_price: unit.list_price,
                    sale_price: unit.sale_price,
                    size: String(unit.size),
                    color: unit.color,
                    stock: Number(unit.stock),
                    image_url:
                      product.images.find(
                        (img: any) => img.color === unit.color,
                      )?.image_url || "",
                  },
                },
              },
              total_list_price: unit.list_price * quantity,
              total_sale_price: unit.sale_price * quantity,
              quantity: quantity,
            },
          },
          summary: {
            update: {
              subtotal: { increment: unit.sale_price * quantity },
              total: { increment: unit.sale_price * quantity },
            },
          },
        },
      });
    }

    return {
      success: true,
      message: "Product added to cart successfully",
      cart: cart,
    };
  } catch (e) {
    console.log(e);
  }
}
