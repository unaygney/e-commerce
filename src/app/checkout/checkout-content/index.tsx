import CheckoutForm from "./checkout-form";
import CheckoutSummary from "./checkout-summary";

export default function CheckoutContent() {
  return (
    <div className="flex w-full flex-col gap-8 xl:flex-row">
      <CheckoutForm />
      <CheckoutSummary />
    </div>
  );
}
