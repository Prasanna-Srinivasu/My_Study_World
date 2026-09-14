"use client";

import { HeroParallax } from "./hero-parallax";

const studyWorldTheme = {
  background: "#101716",
  gradient: ["#9BBFB5", "#C8B89A", "#8FA8B8"],
  subtext: "#AAB8B3",
  glow: "rgba(155, 191, 181, 0.28)",
};

export function HeroParallaxDemo() {
  return (
    <HeroParallax
      products={products}
      title="Learn. Practice. Become a Developer."
      description="Build your Java full-stack skills step by step with lessons, practice, coding challenges and interview preparation."
      theme={studyWorldTheme}
    />
  );
}

const products = [
  {
    title: "Java",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Spring Boot",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "React",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/rogue.png",
  },
  {
    title: "SQL",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "DSA",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Coding",
    link: "#",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
];