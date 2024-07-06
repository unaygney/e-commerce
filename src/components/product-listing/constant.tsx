export const SORT_OPTIONS: Sort[] = [
  { value: "created", label: "Newest" },
  { value: "rating", label: "Best rating" },
  { value: "popularity", label: "Most popular" },
  { value: "price", label: "Price: High to low" },
];

export const FILTER_OPTIONS: FilterTabProps[] = [
  {
    id: 0,
    tab_title: "Collections",
    tab_content: [
      {
        id: 0,
        title: "Latest arrivals",
        value: "latest-arrivals",
      },
      {
        id: 1,
        title: "Urban Oasis",
        value: "urban-oasis",
      },
      {
        id: 2,
        title: "Cozy Comfort",
        value: "cozy-comfort",
      },
      {
        id: 3,
        title: "Fresh Fusion",
        value: "fresh-fusion",
      },
    ],
  },
  {
    id: 1,
    tab_title: "Category",
    tab_content: [
      {
        id: 0,
        title: "Unisex",
        value: "unisex",
      },
      {
        id: 1,
        title: "Women",
        value: "women",
      },
      {
        id: 2,
        title: "Men",
        value: "men",
      },
    ],
  },
  {
    id: 2,
    tab_title: "Colors",
    tab_content: [
      {
        id: 0,
        title: "White",
        value: "white",
        color: "#fff",
      },
      {
        id: 1,
        title: "Black",
        value: "black",
        color: "#000",
      },
      {
        id: 2,
        title: "Red",
        value: "red",
        color: "#DC2626",
      },
      {
        id: 3,
        title: "Orange",
        value: "orange",
        color: "#EA580C",
      },
      {
        id: 4,
        title: "Yellow",
        value: "yellow",
        color: "#F59E0B",
      },
      {
        id: 5,
        title: "Green",
        value: "green",
        color: "#059669",
      },
      {
        id: 6,
        title: "Blue",
        value: "blue",
        color: "#4F46E5",
      },
      {
        id: 7,
        title: "Dark Yellow",
        value: "dark-yellow",
        color: "#CA8A04",
      },
      {
        id: 8,
        title: "Beije",
        value: "beije",
        color: "#D2B08A",
      },
      {
        id: 9,
        title: "Purple",
        value: "purple",
        color: "#EC4899",
      },
    ],
  },
  {
    id: 3,
    tab_title: "Rating",
    tab_content: [
      {
        id: 0,
        title: "1 star",
        value: 1,
      },
      {
        id: 1,
        title: "2 stars",
        value: 2,
      },
      {
        id: 2,
        title: "3 stars",
        value: 3,
      },
      {
        id: 3,
        title: "4 stars",
        value: 4,
      },
      {
        id: 4,
        title: "5 stars",
        value: 5,
      },
    ],
  },
];

interface FilterTabProps {
  id: number;
  tab_title: string;
  tab_content: {
    id: number;
    title: string;
    value: string | number;
    color?: string;
  }[];
}

interface Sort {
  value: string;
  label: string;
}
