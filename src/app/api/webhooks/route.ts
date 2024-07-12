import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const { order_id, cart_id } = session.metadata || {
        order_id: null,
        cart_id: null,
      };

      if (!order_id || !cart_id) {
        return NextResponse.json({
          success: false,
          message: "Invalid metadata",
        });
      }

      const cart = await db.cart.findUnique({
        where: { cart_id },
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

      if (!cart) {
        return NextResponse.json({ success: false, message: "Cart not found" });
      }

      await db.order.updateMany({
        where: { cartId: cart_id, id: order_id },
        data: {
          status: "fulfilled",
          isPaid: true,
        },
      });

      revalidatePath("/");

      const response = NextResponse.json({ success: true });
      response.cookies.delete("cart_id");
      return response;
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 },
    );
  }
}
