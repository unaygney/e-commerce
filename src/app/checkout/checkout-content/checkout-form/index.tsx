"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { FORM_INPUT, FormInput } from "./constant";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { cn } from "@/lib/utils";

export default function CheckoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

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
                    </div>
                  ),
                )}
              </div>
            );
          } else if (title === "Shipping Information") {
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
                      </div>
                    ),
                  )}
                </div>
              </div>
            );
          } else if (title === "Delivery Method") {
            return (
              <div
                key={id}
                className="flex flex-col gap-6 border-b border-neutral-300 py-10"
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
                    </div>
                  ),
                )}
              </div>
            );
          } else if (title === "Payment Method") {
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
