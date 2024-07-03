import { Truck, ShieldCheck, BadgeDollarSign } from "lucide-react";

export type Feature = {
  id: number;
  title: string;
  content: string;
  icon: JSX.Element;
};

export const FEATURES: Feature[] = [
  {
    id: 0,
    title: "Complimentary Shipping",
    content:
      "Once you subscribe to our plans, they're all yours. Download as many as you want and use them for work presentations, wallpapers, and much more.",
    icon: <Truck />,
  },
  {
    id: 1,
    title: "2-Year Quality Promise",
    content:
      "Shop with confidence knowing that we stand behind our products. Should any issue arise within the first two years, rest assured we're here to help with a hassle-free replacement.",
    icon: <ShieldCheck />,
  },
  {
    id: 2,
    title: "Easy Exchanges",
    content:
      "If your purchase isn't quite right, pass it on to a friend who might love it, and let us know. We're happy to facilitate an exchange to ensure you have the perfect item to complement your lifestyle.",
    icon: <BadgeDollarSign />,
  },
];
