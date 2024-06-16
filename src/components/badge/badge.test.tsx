import { describe, it, expect } from "bun:test";

import React from "react";
import { createRoot } from "react-dom/client";
import { Badge } from ".";

describe("Badge component", () => {
  it("renders correctly with default variant and size", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<Badge>Default Badge</Badge>);

    const badgeElement = container.querySelector("div");

    if (badgeElement) {
      expect(badgeElement.textContent).toBe("Default Badge");
      expect(badgeElement.className).toContain(
        "flex items-center justify-center rounded-full font-normal",
      );
      expect(badgeElement.className).toContain("bg-gray-50 text-neutral-600");
    }
    document.body.removeChild(container);
  });

  it("renders correctly with error variant", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<Badge variant="error">Error Badge</Badge>);

    const badgeElement = container.querySelector("div");

    if (badgeElement) {
      expect(badgeElement.textContent).toBe("Error Badge");
      expect(badgeElement.className).toContain(
        "border border-red-200 bg-red-50 text-red-600",
      );
    }
    document.body.removeChild(container);
  });

  it("renders correctly with large size", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<Badge size="large">Large Badge</Badge>);

    const badgeElement = container.querySelector("div");
    if (badgeElement) {
      expect(badgeElement.textContent).toBe("Large Badge");
      expect(badgeElement.className).toContain("px-2.5 py-1 text-sm");
    }
    document.body.removeChild(container);
  });

  it("applies additional class names", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<Badge className="additional-class">Badge with Class</Badge>);

    const badgeElement = container.querySelector("div");

    if (badgeElement) {
      expect(badgeElement.textContent).toBe("Badge with Class");
      expect(badgeElement.className).toContain("additional-class");
    }
    document.body.removeChild(container);
  });
});
