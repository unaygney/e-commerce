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
