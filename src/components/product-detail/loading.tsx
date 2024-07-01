import React from "react";

const ProductDetailLoading: React.FC = () => {
  return (
    <section className="container mx-auto flex flex-col gap-12 rounded-md bg-white px-4 py-12 shadow-sm lg:flex-row lg:gap-8 lg:p-24">
      <div className="shimmer h-96 w-full lg:max-w-[48%]"></div>
      <div className="flex w-full flex-1 flex-col lg:min-w-[48%]">
        <div className="shimmer mb-4 h-12 w-3/4"></div>
        <div className="shimmer mb-4 h-8 w-1/2"></div>
        <div className="shimmer mb-4 h-6 w-full"></div>
        <div className="shimmer mb-4 h-6 w-full"></div>
        <div className="shimmer mb-4 h-6 w-full"></div>
        <div className="shimmer mb-4 h-6 w-full"></div>
        <div className="shimmer mb-4 h-6 w-full"></div>
      </div>
    </section>
  );
};

export default ProductDetailLoading;
