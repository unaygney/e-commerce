"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { FORM_INPUT, FormInput } from "./constant";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema } from "@/lib/validations";
import { Check } from "lucide-react";
import { getAllCountries, getProvincesByCounty } from "@/lib/services";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export default function CheckoutForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(checkoutFormSchema),
  });

  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => await getAllCountries(),
  });

  const [provinces, setProvinces] = useState([]);
  const selectedCountry = watch("country");

  useEffect(() => {
    if (selectedCountry) {
      getProvincesByCounty(selectedCountry).then((data) => setProvinces(data));
    } else {
      setProvinces([]);
    }
  }, [selectedCountry]);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };

  return (
    <form
      id="checkout-form"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full xl:w-[592px]"
    >
      <div>
        {FORM_INPUT.map(({ fields, id, title }) => {
          if (title === "Contact Information") {
            return (
              <div
                key={id}
                className="flex flex-col gap-6 border-b border-neutral-300 pb-10"
              >
                <h2 className="text-lg font-medium leading-7 text-neutral-600">
                  {title}
                </h2>
                {fields.map(
                  ({
                    id,
                    label,
                    name,
                    type,
                    placeholder,
                    required,
                    className,
                  }) => (
                    <div key={id} className="flex flex-col gap-1.5">
                      <Label htmlFor={name}>{label}</Label>
                      <Input
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        {...register(name as keyof FormInput, { required })}
                        className={className}
                      />
                      {errors[name as keyof FormInput] && (
                        <p className="text-sm font-normal leading-5 text-red-600">
                          {errors[name as keyof FormInput]?.message}
                        </p>
                      )}
                    </div>
                  ),
                )}
              </div>
            );
          }
          if (title === "Shipping Information") {
            return (
              <div
                key={id}
                className="flex flex-col gap-6 border-b border-neutral-300 py-10"
              >
                <h2 className="text-lg font-medium leading-7 text-neutral-600">
                  {title}
                </h2>
                <div className="flex w-full flex-wrap gap-2">
                  {fields.map(
                    ({
                      id,
                      label,
                      name,
                      type,
                      placeholder,
                      required,
                      className,
                    }) => (
                      <div
                        key={id}
                        className={cn(`flex flex-col gap-1.5`, className)}
                      >
                        <Label htmlFor={name}>{label}</Label>
                        {name === "country" ? (
                          <Select
                            onValueChange={(value) =>
                              setValue("country", value)
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries?.map((country: any, i: number) => (
                                <SelectItem key={i} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : name === "city" ? (
                          <Select
                            onValueChange={(value) => setValue("city", value)}
                            disabled={!selectedCountry}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a city" />
                            </SelectTrigger>
                            <SelectContent>
                              {provinces?.map((city: any, i: number) => (
                                <SelectItem key={i} value={city}>
                                  {city}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            className="h-10"
                            {...register(name as keyof FormInput, { required })}
                          />
                        )}

                        {errors[name as keyof FormInput] && (
                          <p className="text-sm font-normal leading-5 text-red-600">
                            {errors[name as keyof FormInput]?.message}
                          </p>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            );
          }
          if (title === "Delivery Method") {
            return (
              <div
                key={id}
                className="flex flex-col gap-6 border-b border-neutral-300 py-10"
              >
                <h2 className="text-lg font-medium leading-7 text-neutral-600">
                  {title}
                </h2>
                <div className="flex flex-col gap-4 md:flex-row">
                  {fields.map(({ id, label, name, placeholder, price }) => (
                    <div
                      key={id}
                      className="relative flex flex-1 flex-col gap-1.5"
                    >
                      <input
                        id={name}
                        type="radio"
                        value={name}
                        defaultChecked={id === 0}
                        className="peer absolute opacity-0"
                        {...register("deliveryMethod")}
                      />
                      <Label
                        htmlFor={name}
                        className={cn(
                          "relative flex h-[120px] flex-col rounded-lg border-2 border-neutral-200 p-4 hover:bg-[#fafafa]",
                          "peer-checked:border-indigo-700",
                        )}
                      >
                        <p className="text-base font-medium capitalize leading-6 text-neutral-900">
                          {label}
                        </p>
                        <p className="text-sm font-normal leading-7 text-neutral-600">
                          {placeholder}
                        </p>
                        <span className="mt-auto text-base font-medium uppercase leading-6">
                          {price === null ? "Free" : `$${price}`}
                        </span>
                      </Label>
                      <span
                        className={cn(
                          "absolute right-4 top-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#6366F1] opacity-0 peer-checked:opacity-100",
                        )}
                      >
                        <Check className="h-5 w-5 text-white" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          if (title === "Payment Method") {
            return (
              <div
                key={id}
                className="flex flex-col gap-6 border-b border-neutral-300 py-10"
              >
                <h2 className="text-lg font-medium leading-7 text-neutral-600">
                  {title}
                </h2>
                <div className="flex w-full flex-wrap gap-2">
                  {fields.map(
                    ({
                      id,
                      label,
                      name,
                      type,
                      placeholder,
                      required,
                      className,
                    }) => (
                      <div
                        key={id}
                        className={cn(`flex flex-col gap-1.5`, className)}
                      >
                        <Label htmlFor={name}>{label}</Label>
                        <Input
                          id={name}
                          type={type}
                          placeholder={placeholder}
                          className="h-10"
                          {...register(name as keyof FormInput, { required })}
                        />
                        {errors[name as keyof FormInput] && (
                          <p className="text-sm font-normal leading-5 text-red-600">
                            {errors[name as keyof FormInput]?.message}
                          </p>
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>
    </form>
  );
}
