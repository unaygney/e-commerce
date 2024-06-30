import { Youtube, Instagram, Facebook, Github, X } from "../icons";
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 0,
    name: "Youtube",
    icons: <Youtube />,
  },
  {
    id: 1,
    name: "Instagram",
    icons: <Instagram />,
  },
  {
    id: 2,
    name: "Facebook",
    icons: <Facebook />,
  },
  {
    id: 3,
    name: "Github",
    icons: <Github />,
  },
  {
    id: 4,
    name: "X",
    icons: <X />,
  },
];

export const FOOTER_LINKS: FooterLink[] = [
  {
    id: 0,
    title: "Shop Categories",
    categories: [
      {
        id: 0,
        linkName: "Unisex",
        link: "#",
      },
      {
        id: 1,
        linkName: "Men",
        link: "#",
      },
      {
        id: 2,
        linkName: "Women",
        link: "#",
      },
    ],
  },
  {
    id: 1,
    title: "Shop Collections",
    categories: [
      {
        id: 0,
        linkName: "Latest arrivals",
        link: "#",
      },
      {
        id: 1,
        linkName: "Urban Oasis",
        link: "#",
      },
      {
        id: 2,
        linkName: "Cozy Comfort",
        link: "#",
      },
      {
        id: 3,
        linkName: "Fresh Fusion",
        link: "#",
      },
    ],
  },
];

interface FooterLink {
  id: number;
  title: string;
  categories: Category[];
}

interface Category {
  id: number;
  linkName: string;
  link: string;
}

interface SocialLink {
  id: number;
  name: string;
  icons: JSX.Element;
}
