// icons
import {
  Recycle,
  Shirt,
  HandHeart,
  Wind,
  Blend,
  Layers,
  ShieldAlert,
  Rainbow,
  Shapes,
} from "lucide-react";
import {
  PaintLine,
  PlantLine,
  Scale2,
  WaterFlashLine,
  PriceTag2,
  Shirt2,
} from "../icons";

export const TAB_LIST: Tab[] = [
  {
    id: 0,
    tab_title: "Sustainability",
    content_title: "Eco-Friendly Choice",
    content:
      "With our sustainable approach, we curate clothing that makes a statement of care—care for the planet, and for the art of fashion.",
    images: {
      mobile: "/sustainability-image-mobile.png",
      tablet: "/sustainability-image-tablet.png",
      desktop: "/sustainability-image-mobile.png",
      alt: "Sustainability Image",
    },
    features: [
      {
        id: 0,
        feature: "Recycled Materials",
        feature_icon: <Recycle />,
      },
      {
        id: 1,
        feature: "Low Impact Dye",
        feature_icon: <PaintLine />,
      },
      {
        id: 2,
        feature: "Carbon Neutral",
        feature_icon: <PlantLine />,
      },
      {
        id: 3,
        feature: "Water Conservation",
        feature_icon: <WaterFlashLine />,
      },
    ],
  },
  {
    id: 1,
    tab_title: "Comfort",
    content_title: "Uncompromised Comfort",
    content:
      "Our garments are a sanctuary of softness, tailored to drape gracefully and allow for freedom of movement.",
    images: {
      mobile: "/comfort-image-mobile.png",
      tablet: "/comfort-image-tablet.png",
      desktop: "/comfort-image-mobile.png",
      alt: "Comfort Image",
    },
    features: [
      {
        id: 0,
        feature: "Ergonomic Fits",
        feature_icon: <Shirt />,
      },
      {
        id: 1,
        feature: "Soft-to-the-Touch Fabrics",
        feature_icon: <HandHeart />,
      },
      {
        id: 2,
        feature: "Breathable Weaves",
        feature_icon: <Wind />,
      },
      {
        id: 3,
        feature: "Thoughtful Design",
        feature_icon: <Blend />,
      },
    ],
  },
  {
    id: 2,
    tab_title: "Durability",
    content_title: "Built to Last",
    content:
      "Here’s to apparel that you can trust to look as good as new, wear after wear, year after year.",
    images: {
      mobile: "/product-image-mobile.png",
      tablet: "/product-image-tablet.png",
      desktop: "/product-image-mobile.png",
      alt: "Product Image",
    },
    features: [
      {
        id: 0,
        feature: "Reinforced Construction",
        feature_icon: <Layers />,
      },
      {
        id: 1,
        feature: "Quality Control",
        feature_icon: <Scale2 />,
      },
      {
        id: 2,
        feature: "Material Resilience",
        feature_icon: <ShieldAlert />,
      },
      {
        id: 3,
        feature: "Warranty and Repair",
        feature_icon: <PriceTag2 />,
      },
    ],
  },
  {
    id: 3,
    tab_title: "Versality",
    content_title: "Versatile by Design",
    content:
      "Our pieces are a celebration of versatility, offering a range of styles that are as perfect for a business meeting as they are for a casual brunch. ",
    images: {
      mobile: "/versatility-image-mobile.png",
      tablet: "/versatility-image-tablet.png",
      desktop: "/versatility-image-mobile.png",
      alt: "versatility Image",
    },
    features: [
      {
        id: 0,
        feature: "Adaptive Styles",
        feature_icon: <Rainbow />,
      },
      {
        id: 0,
        feature: "Functional Fashion",
        feature_icon: <Shirt2 />,
      },
      {
        id: 0,
        feature: "Timeless Aesthetics",
        feature_icon: <PlantLine />,
      },
      {
        id: 0,
        feature: "Mix-and-Match Potential",
        feature_icon: <Shapes />,
      },
    ],
  },
];

interface Tab {
  id: number;
  tab_title: string;
  content_title: string;
  content: string;
  images: Images;
  features: Features[];
}

interface Images {
  alt: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

interface Features {
  id: number;
  feature: string;
  feature_icon: JSX.Element;
}
