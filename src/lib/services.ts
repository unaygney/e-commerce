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
