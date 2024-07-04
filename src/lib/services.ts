"use server";
import { Product } from "./definitions";

interface ReviewQueryParams {
  page?: number;
  per_page?: number;
  rating?: number;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    let url: string = `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(3000);

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getProductReview(id: string, params?: ReviewQueryParams) {
  try {
    let url = new URL(
      `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${id}/reviews`,
    );

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key as keyof ReviewQueryParams] !== undefined) {
          url.searchParams.append(
            key,
            params[key as keyof ReviewQueryParams]!.toString(),
          );
        }
      });
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export const subscribeEmail = async (email: string) => {
  const url = `https://www.greatfrontend.com/api/projects/challenges/newsletter`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("An unexpected error occurred");
  }
};

export const applyCoupon = async (coupon: string) => {
  let url =
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/coupons/apply";

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coupon_code: coupon }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      throw new Error(data.error || "Something went wrong");
    }

    return data;
  } catch (e: any) {
    console.log(e);
    throw new Error(e.message || "An unexpected error occurred");
  }
};

export const getBasketData = async () => {
  let url =
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/cart-sample";
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
