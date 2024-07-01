import React from "react";

const ProductSpecificationsLoading: React.FC = () => {
  return (
    <section
      id="product-specifications-loading"
      className="flex flex-col gap-4 rounded bg-white px-4 py-12 shadow-sm md:py-16 xl:px-28 xl:py-24"
    >
      <div className="shimmer mb-4 h-12 w-full"></div>
      <div className="shimmer mb-4 h-8 w-1/2"></div>
      <div className="shimmer mb-4 h-8 w-1/2"></div>
    </section>
  );
};

export default ProductSpecificationsLoading;
