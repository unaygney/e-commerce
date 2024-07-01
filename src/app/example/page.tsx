import CollectionsGridSection from "@/components/collections-grid-section";
import React from "react";
import { Collections } from "@/lib/definitions";
export default async function Examplepage() {
  const collections: Collections[] = await fetch(
    "https://www.greatfrontend.com/api/projects/challenges/e-commerce/collections",
  ).then((res) => res.json().then((data) => data.data));

  return <CollectionsGridSection collections={collections} />;
}
