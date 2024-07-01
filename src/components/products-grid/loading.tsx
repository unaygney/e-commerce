import React from "react";

const ProductGridLoading: React.FC = () => {
  const placeholders = Array.from({ length: 8 });
  return (
    <section className="container mx-auto flex w-full flex-col gap-8 bg-white px-3 py-12 shadow-sm md:px-4 md:py-16 xl:p-24">
      <div className="flex justify-between">
        <div className="shimmer mb-4 h-8 w-1/3"></div>
        <div className="shimmer mb-4 h-8 w-1/6"></div>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        {placeholders.map((_, index) => (
          <div key={index} className="group flex flex-col">
            <div className="shimmer relative h-[300px] w-full overflow-hidden rounded-lg"></div>
            <div className="py flex flex-col">
              <div className="flex flex-col gap-0.5 py-4">
                <div className="shimmer mb-2 h-4 w-1/4"></div>
                <div className="shimmer mb-2 h-6 w-2/3"></div>
                <div className="shimmer mb-2 h-4 w-1/2"></div>
                <div className="shimmer mb-2 h-4 w-1/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGridLoading;
