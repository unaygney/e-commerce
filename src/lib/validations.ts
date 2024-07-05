import { z } from "zod";

export const checkoutFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  country: z.string().min(1, "Country is required."),
  first_name: z.string().min(1, "First name is required."),
  last_name: z.string().min(1, "Last name is required."),
  address: z.string().min(1, "Address line 1 is required."),
  address_2: z.string().optional(),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  zip: z.string().min(1, "Zip code is required."),
  card_number: z.string().min(1, "Card number is required."),
  name_on_card: z.string().min(1, "Cardholder name is required."),
  expiry: z.string().min(1, "Expiry date is required."),
  cvv: z.string().min(1, "CVV is required."),
});
