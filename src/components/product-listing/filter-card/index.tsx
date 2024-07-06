"use client";
import React, { useState, useEffect } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FILTER_OPTIONS } from "../constant";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/label";
import Rating from "@mui/material/Rating";
import { X } from "@/components/icons";
import { StarIcon } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const FilterCard = ({
  className,
  isActive,
  setActive,
}: {
  className?: string;
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filters, setFilters] = useState<{
    [key: string]: (string | number)[];
  }>({});

  const ref: any = useClickAway(() => {
    setActive(false);
  });

  const handleFilterChange = (
    key: string,
    value: string | number,
    checked: boolean,
  ) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        if (!updatedFilters[key]) {
          updatedFilters[key] = [];
        }
        updatedFilters[key].push(value);
      } else {
        if (updatedFilters[key]) {
          updatedFilters[key] = updatedFilters[key].filter((v) => v !== value);
          if (updatedFilters[key].length === 0) {
            delete updatedFilters[key];
          }
        }
      }
      return updatedFilters;
    });
  };

  const isChecked = (key: string, value: string | number) => {
    return filters[key]?.includes(value) ?? false;
  };

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    Object.keys(filters).forEach((key) => {
      currentParams.delete(key);
      filters[key].forEach((value) => {
        currentParams.append(key, value.toString());
      });
    });
    router.replace(`${pathname}?${currentParams.toString()}`);
  }, [filters, router, pathname, searchParams]);

  console.log("filters", filters);

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
                        value={value.toString()}
                        checked={isChecked(tab_title.toLowerCase(), value)}
                        onChange={(e) =>
                          handleFilterChange(
                            tab_title.toLowerCase(),
                            value,
                            (e.target as HTMLInputElement).checked,
                          )
                        }
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
                    <div key={id} className="flex items-center gap-3">
                      <Checkbox
                        className="rounded-full border-neutral-200"
                        key={id}
                        id={value.toString()}
                        checked={isChecked("color", value)}
                        style={{
                          backgroundColor: color,
                        }}
                        onChange={(e) =>
                          handleFilterChange(
                            "color",
                            value,
                            (e.target as HTMLInputElement).checked,
                          )
                        }
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
                        checked={isChecked("rating", value)}
                        className="invisible opacity-0"
                        onChange={(e) =>
                          handleFilterChange(
                            "rating",
                            value,
                            (e.target as HTMLInputElement).checked,
                          )
                        }
                      />
                      <Label
                        className="cursor-pointer"
                        htmlFor={value.toString()}
                      >
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

export default FilterCard;
