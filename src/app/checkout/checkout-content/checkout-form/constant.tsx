export const FORM_INPUT: FormInput[] = [
  {
    id: 0,
    title: "Contact Information",
    fields: [
      {
        id: 0,
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "user@example.com",
        required: true,
        className: "w-full",
      },
    ],
  },
  {
    id: 1,
    title: "Shipping Information",
    fields: [
      {
        id: 0,
        label: "Country / Region",
        name: "country",
        type: "select",
        placeholder: "United States",
        required: true,
        className: "w-full",
      },

      {
        id: 1,
        label: "First name",
        name: "first_name",
        type: "text",
        placeholder: "John",
        required: true,
        className: "w-full xl:w-[49%]",
      },
      {
        id: 2,
        label: "Last name",
        name: "last_name",
        type: "text",
        placeholder: "Appleseed",
        required: true,
        className: "w-full xl:w-[49%]",
      },
      {
        id: 3,
        label: "Address",
        name: "address",
        type: "text",
        placeholder: "Street address",
        required: true,
        className: "w-full",
      },
      {
        id: 4,
        label: null,
        name: "address_2",
        type: "text",
        placeholder: "Apartment,suite,etc(optional)",
        required: false,
        className: "w-full",
      },
      {
        id: 5,
        label: "City",
        name: "city",
        type: "text",
        placeholder: "City",
        required: true,
        className: "w-full md:w-[32%]",
      },
      {
        id: 6,
        label: "State",
        name: "state",
        type: "select",
        placeholder: "State",
        required: true,
        className: "w-full md:w-[32.5%]",
      },
      {
        id: 7,
        label: "Zip",
        name: "zip",
        type: "number",
        placeholder: "12345",
        required: true,
        className: "w-full md:w-[32.5%]",
      },
    ],
  },
  {
    id: 2,
    title: "Delivery Method",
    fields: [
      {
        id: 0,
        name: "standard",
        label: "Standard Delivery",
        placeholder: "4-10 business days",
        price: null,
        type: "radio",
        required: true,
        className: "w-full",
      },
      {
        id: 1,
        name: "express",
        label: "Express Delivery",
        placeholder: "2-5 business days",
        price: 15,
        type: "radio",
        required: true,
        className: "w-full",
      },
    ],
  },
  {
    id: 3,
    title: "Payment Method",
    fields: [
      {
        id: 0,
        label: "Card number",
        type: "number",
        name: "card_number",
        placeholder: "1234 1234 1234 1234",
        required: true,
        className: "w-full",
      },
      {
        id: 1,
        label: "Name on card",
        type: "text",
        name: "name_on_card",
        placeholder: "Full name on card",
        required: true,
        className: "w-full",
      },
      {
        id: 2,
        label: "Expiry",
        name: "expiry",
        type: "date",
        placeholder: "MM/YY",
        required: true,
        className: "w-full xl:w-[49%]",
      },
      {
        id: 3,
        label: "CVV",
        type: "number",
        name: "cvv",
        placeholder: "123",
        required: true,
        className: "w-full xl:w-[49.5%]",
      },
    ],
  },
];

export interface FormInput {
  id: number;
  title: string;
  fields: Field[];
  deliveryMethod?: string;
  country?: string;
  city?: string;
}

interface Field {
  id: number;
  name: string;
  label: string | null;
  type: string;
  placeholder: string;
  required: boolean;
  price?: number | null;
  className?: string;
}
