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

interface SocialLink {
  id: number;
  name: string;
  icons: JSX.Element;
}
