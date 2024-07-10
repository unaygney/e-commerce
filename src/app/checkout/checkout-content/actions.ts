export async function createCheckoutSession(formData: FormData) {
  console.log("formData", formData);
  const response = await new Promise((res) => setTimeout(() => res({}), 5000));
  return response;
}
