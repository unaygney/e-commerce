"use server";
import { Product } from "./definitions";

interface ReviewQueryParams {
  page?: number;
  per_page?: number;
  rating?: number;
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

export const getBasketData = async () => {
  let url =
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/cart-sample";
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getAllCountries = async () => {
  const url = "https://countriesnow.space/api/v0.1/countries/states";
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    console.log(data);
    throw new Error(data.error || "Something went wrong");
  }

  const countries = data.data.map((country: { name: string }) => {
    return country.name;
  });

  return countries;
};

export const getProvincesByCounty = async (country: string) => {
  let url = "https://countriesnow.space/api/v0.1/countries";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("An unexpected error occurred");
  }

  const data = await response.json();

  const provinces = data.data.find(
    (p: any) => p.country.toUpperCase() === country.toUpperCase(),
  );

  return provinces?.cities || [`${country}`];
};
