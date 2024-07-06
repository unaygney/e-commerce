"use client";
import React from "react";
import ProductsGrid from "../products-grid";
import { Button } from "../button";
import { Filter, StarIcon, X } from "lucide-react";
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
import { useClickAway } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";
import { FILTER_OPTIONS, SORT_OPTIONS } from "./constant";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../label";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function ProductListing({ products }: { products: any }) {
  const [isActive, setActive] = React.useState<boolean>(false);

  return (
    <section className="relative mx-auto flex h-full w-full bg-white py-12 md:py-16 xl:flex-row xl:gap-16 xl:p-24">
      <FilterCard isActive={isActive} setActive={setActive} />
      <ProductsGrid
        className="xl:grid-cols-3"
        leftComponent={
          <FilterButton
            className="xl:hidden"
            isActive={isActive}
            setActive={setActive}
          />
        }
        rightComponent={<SortButton />}
        products={products}
      />
      {isActive && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          aria-hidden="true"
        />
      )}
    </section>
  );
}

function SortButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSortChange = (value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("sort", value);

    router.replace(`${pathname}?${currentParams.toString()}`);
  };

  return (
    <Select onValueChange={handleSortChange}>
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

function FilterButton({
  isActive,
  setActive,
  className,
}: {
  className?: string;
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Button
      variant="secondary"
      size="medium"
      className={cn("w-[91px]", className)}
      onClick={() => setActive(!isActive)}
    >
      <Filter width={16} height={16} />
      Filter
    </Button>
  );
}

const FilterCard = ({
  className,
  isActive,
  setActive,
}: {
  className?: string;
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const ref: any = useClickAway(() => {
    setActive(false);
  });

  return (
    <aside
      ref={ref}
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-[90%] transform bg-white p-4 transition-transform duration-300 xl:relative xl:w-full xl:max-w-[248px] xl:transform-none xl:pb-4 xl:pl-0 xl:pr-4 xl:pt-4",
        isActive ? "translate-x-0" : "-translate-x-full",
        className,
      )}
    >
      <div className="flex items-center justify-between xl:hidden">
        <h4 className="text-xl font-normal leading-7 text-neutral-900">
          Filter
        </h4>
        <button onClick={() => setActive(false)}>
          <X width={20} height={20} />
        </button>
      </div>
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
};
