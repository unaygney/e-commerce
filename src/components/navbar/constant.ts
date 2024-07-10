export const LINKS: LinkProps[] = [
  {
    id: 0,
    title: "Shop all",
    href: "/shop-all",
  },
  {
    id: 1,
    title: "Latest arrivals",
    href: "/shop-all?sort=created",
  },
];

interface LinkProps {
  id: number;
  title: string;
  href: string;
}
