import React from "react";
import ProductsGrid from "../products-grid";
import { Button } from "../button";
import { Filter, StarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";
import { FILTER_OPTIONS, SORT_OPTIONS } from "./constant";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../label";
import Rating from "@mui/material/Rating";

export default function ProductListing() {
  return (
    <section className="container mx-auto flex bg-white py-12 md:py-16 xl:flex-row xl:gap-16 xl:p-24">
      <FilterCard />
      <ProductsGrid
        className="xl:grid-cols-3"
        leftComponent={<FilterButton className="xl:hidden" />}
        rightComponent={<SortButton />}
      />
    </section>
  );
}

function SortButton() {
  return (
    <Select>
      <SelectTrigger
        className={
          "ml-auto h-10 w-[103px] text-sm font-medium leading-5 text-neutral-900 shadow"
        }
      >
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className={cn("hover:bg-red-800-100 hover:text-red-500")}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function FilterButton({ className }: { className?: string }) {
  return (
    <Button
      variant="secondary"
      size="medium"
      className={cn("w-[91px]", className)}
    >
      <Filter width={16} height={16} />
      Filter
    </Button>
  );
}

function FilterCard() {
  return (
    <aside className="hidden w-full max-w-[248px] pb-4 pr-4 pt-4 xl:flex">
      <Accordion type="multiple" className="w-full">
        {FILTER_OPTIONS.map(({ tab_content, tab_title, id }) => {
          if (tab_title === "Collections" || tab_title === "Category") {
            return (
              <AccordionItem key={id} value={tab_title}>
                <AccordionTrigger>{tab_title}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-6">
                  {tab_content.map(({ title, value, id }) => (
                    <div key={id} className="flex items-center gap-3">
                      <Checkbox
                        id={value.toString()}
                        className="checked:bg-indigo-600 data-[state=checked]:border-none data-[state=checked]:bg-indigo-600"
                      />
                      <Label
                        className="text-base font-normal leading-6 text-neutral-600"
                        htmlFor={value.toString()}
                      >
                        {title}
                      </Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          } else if (tab_title === "Colors") {
            return (
              <AccordionItem key={id} value={tab_title}>
                <AccordionTrigger>{tab_title}</AccordionTrigger>
                <AccordionContent className="flex flex-wrap gap-4">
                  {tab_content.map(({ title, value, id, color }) => (
                    <Checkbox
                      className="rounded-full border-neutral-200 bg-red-800"
                      key={id}
                      id={value.toString()}
                      style={{
                        backgroundColor: color,
                      }}
                    />
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          } else if (tab_title === "Rating") {
            return (
              <AccordionItem key={id} value={tab_title}>
                <AccordionTrigger>{tab_title}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  {tab_content.map(({ title, value, id }) => (
                    <div key={id} className="relative">
                      <Checkbox
                        key={id}
                        id={value.toString()}
                        className="invisible opacity-0"
                      />
                      <Label className="cursor-pointer">
                        <Rating
                          name="text-feedback"
                          size="small"
                          readOnly
                          precision={0.5}
                          className="absolute"
                          value={Number(value)}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55, width: 16, height: 16 }}
                              fontSize="inherit"
                            />
                          }
                        />
                      </Label>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            );
          }
        })}
      </Accordion>
    </aside>
  );
}
