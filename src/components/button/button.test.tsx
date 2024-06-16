import { describe, it, expect } from "bun:test";

import React from "react";
import { createRoot } from "react-dom/client";
import { Button } from ".";

describe("Button component", () => {
  it("renders correctly with default variant and size", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<Button>Default Button</Button>);
    const buttonElement = container.querySelector("button");
    if (buttonElement) {
      expect(buttonElement.textContent).toBe("Default Button");
      expect(buttonElement.className).toContain(
        "inline-flex items-center justify-center whitespace-nowrap rounded font-medium transition disabled:cursor-not-allowed",
      );
      expect(buttonElement.className).toContain("bg-[#4338CA] text-white");
    }
    document.body.removeChild(container);
  });

  it("renders correctly with secondary variant", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<Button variant="secondary">Secondary Button</Button>);
    const buttonElement = container.querySelector("button");
    if (buttonElement) {
      expect(buttonElement.textContent).toBe("Secondary Button");
      expect(buttonElement.className).toContain(
        "border-[0.5px] border-[#e6e6e6] bg-white text-neutral-900",
      );
    }
    document.body.removeChild(container);
  });

  it("renders correctly with large size", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<Button size="large">Large Button</Button>);
    const buttonElement = container.querySelector("button");
    if (buttonElement) {
      expect(buttonElement.textContent).toBe("Large Button");
      expect(buttonElement.className).toContain(
        "gap-1.5 px-4 py-2.5 text-base leading-6",
      );
    }
    document.body.removeChild(container);
  });

  it("renders correctly with disabled state", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<Button disabled>Disabled Button</Button>);
    const buttonElement = container.querySelector("button");
    if (buttonElement) {
      expect(buttonElement.textContent).toBe("Disabled Button");
      expect(buttonElement.disabled).toBe(true);
      expect(buttonElement.className).toContain(
        "disabled:bg-[#F5F5F5] disabled:text-neutral-400",
      );
    }
    document.body.removeChild(container);
  });
});
