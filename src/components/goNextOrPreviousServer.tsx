import Link from "next/link";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SimplePaginationProps {
  page: number;
  type: string | string[];
  total: number;
}

/** 上一页，下一页 */
export default function GoNextOrPreviousServer({
  page,
  type,
  total
}: Readonly<SimplePaginationProps>): React.ReactElement {
  const limit = 20;
  const totalPages = Math.ceil(total / limit);
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

  const buildPageUrl = (newPage: number) => {
    const baseUrl = '/pokemon';
    const typeParam = type ? `&types=${type}` : '';
    return `${baseUrl}?page=${newPage}${typeParam}`;
  };

  return (
    <Pagination className="cursor-pointer">
      <PaginationContent>
        <PaginationItem>
          {hasPrevious ? (
            <Link href={buildPageUrl(page - 1)}>
              <PaginationPrevious 
                aria-disabled={!hasPrevious}
                className={!hasPrevious ? "pointer-events-none opacity-50" : ""}
              />
            </Link>
          ) : (
            <PaginationPrevious 
              aria-disabled={true}
              className="pointer-events-none opacity-50"
            />
          )}
        </PaginationItem>
        
        <PaginationItem>
          {hasNext ? (
            <Link href={buildPageUrl(page + 1)}>
              <PaginationNext 
                aria-disabled={!hasNext}
                className={!hasNext ? "pointer-events-none opacity-50" : ""}
              />
            </Link>
          ) : (
            <PaginationNext 
              aria-disabled={true}
              className="pointer-events-none opacity-50"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}