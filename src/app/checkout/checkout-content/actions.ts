"use server";
import { cookies } from "next/headers";
import { db } from "@/db";
import { checkoutFormSchema } from "@/lib/validations";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";

export async function createCheckoutSession(formData: FormData) {
  const cookiesStore = cookies();
  const cart_id = cookiesStore.get("cart_id")?.value;

  const rawFormData = {
    address: formData.get("address"),
    address_2: formData.get("address_2"),
    city: formData.get("city"),
    country: formData.get("country"),
    cvv: formData.get("cvv"),
    email: formData.get("email"),
    expiry: formData.get("expiry"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    name_on_card: formData.get("name_on_card"),
    state: formData.get("state"),
    zip: formData.get("zip"),
    card_number: formData.get("card_number"),
  };
  //* Check if the form data is valid or not?
  const formSchema = checkoutFormSchema.safeParse(rawFormData);

  if (!formSchema.success) {
    return {
      success: false,
      message: "Validation error",
      errors: formSchema.error.errors,
    };
  }

  //* Check if the cart exists or not?
  if (!cart_id) return { success: false, message: "Cart not found" };
  const cart = await db.cart.findUnique({
    where: { cart_id: cart_id },
    include: {
      items: {
        include: {
          product: true,
          unit: true,
        },
      },
      summary: true,
      orders: true,
    },
  });

  if (!cart) return { success: false, message: "Cart not found" };

  const {
    card_number,
    address,
    city,
    country,
    cvv,
    email,
    expiry,
    first_name,
    last_name,
    name_on_card,
    state,
    zip,
    address_2,
  } = formSchema.data;

  let price = cart.summary.total;

  const newOrder = await db.order.create({
    data: {
      amount: price,
      cart: {
        connect: {
          cart_id: cart_id,
        },
      },
      shippingAddress: {
        create: {
          line1: address,
          line2: address_2,
          city: city,
          state: state,
          zip: zip,
          country: country,
        },
      },
      billingAddress: {
        create: {
          line1: address,
          line2: address_2,
          city: city,
          state: state,
          zip: zip,
          country: country,
        },
      },
    },
  });

  const lineItems = cart.items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product.name,
      },
      unit_amount: item.unit.sale_price * 100,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?order_id=${newOrder.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
    mode: "payment",
    metadata: {
      order_id: newOrder.id,
      cart_id: cart_id,
    },
  });

  revalidatePath("/");

  return {
    success: true,
    message: "Order created successfully",
    url: session.url,
  };
}
