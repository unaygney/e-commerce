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
      return {
        success: false,
        message: "This email already exists!",
      };
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
    if (e instanceof z.ZodError) {
      return {
        success: false,
        message: e.errors[0].message,
      };
    }

    console.log(e);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};
