"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  has_more: boolean;
  page: number;
  per_page: number;
  total: number;
}

export function PaginationDemo({
  pagination,
}: {
  pagination: PaginationProps;
}) {
  const { has_more, page, per_page, total } = pagination;
  const totalPages = Math.ceil(total / per_page);
  const searchParams = useSearchParams();

  const currentPage = searchParams.get("page") || 1;

  return (
    <Pagination>
      <PaginationContent>
        {Number(currentPage) > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`shop-all/?page=${Number(currentPage) - 1}`}
            />
          </PaginationItem>
        )}
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={`/shop-all?page=${i + 1}`}
              isActive={i + 1 === page}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {Number(currentPage) < totalPages && (
          <PaginationItem>
            <PaginationNext href={`shop-all?page=${Number(currentPage) + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
