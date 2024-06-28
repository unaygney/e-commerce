export function adjustSize(size: string) {
  if (size === "xs") return "XS";
  if (size === "sm") return "S";
  if (size === "md") return "M";
  if (size === "lg") return "L";
  if (size === "xl") return "XL";
  else return "STD";
}

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export function formatDate(dateString: string) {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "";
  }

  const day = date.getDate();
  const monthName = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${monthName} ${day}, ${year}`;
}

export function getInitials(fullName: string): string {
  const names = fullName.split(" ").filter(Boolean);
  if (names.length === 0) return "";

  const initials =
    names.length > 1
      ? `${names[0][0]}${names[names.length - 1][0]}`
      : names[0][0];

  return initials.toUpperCase();
}
