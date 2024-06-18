export const LINKS: LinkProps[] = [
  {
    id: 0,
    title: "Shop all",
    href: "/shop",
  },
  {
    id: 1,
    title: "Latest arrivals",
    href: "/latest-arrivals",
  },
];

interface LinkProps {
  id: number;
  title: string;
  href: string;
}
