"use server";
import { db } from "@/db";
import { z } from "zod";

export const subscribeEmail = async (email: string) => {
  const emailSchema = z.string().email("Invalid email address");

  try {
    let isValid = emailSchema.parse(email);

    if (!isValid) {
      throw new Error("Invalid email address");
    }

    const existingSubscriber = await db.subscription.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      throw new Error("This email already exists!");
    }

    const newSubscription = await db.subscription.create({
      data: {
        email,
      },
    });

    return {
      success: true,
      message: "Subscription successful",
      subscription: newSubscription,
    };
  } catch (e: any) {
    console.log(e);
    throw new Error("An unexpected error occurred");
  }
};
