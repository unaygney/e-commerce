import { Product } from "@/lib/definitions";

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
