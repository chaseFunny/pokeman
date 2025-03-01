import Link from "next/link";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DEFAULT_PAGE_LIMIT } from "@/constants";

interface SimplePaginationProps {
  page: number;
  type?:  string[];
  total: number;
}

/** 上一页，下一页 */
export default function GoNextOrPreviousServer({
  page = 1,
  type =[],
  total
}: Readonly<SimplePaginationProps>): React.ReactElement {

  const totalPages = Math.ceil(total / DEFAULT_PAGE_LIMIT);
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;
  
  const buildPageUrl = (newPage: number) => {
    const baseUrl = '/pokemon-ssr';

    const formatType = typeof type === 'string'  ? [] : type.filter(ele => !!ele);
    const typeParam = formatType.length > 0 ? `&type=${type.join(',')}` : '';
        console.log(typeParam, ';type');
    return `${baseUrl}?page=${newPage === 1 ? (newPage + 1) : newPage}${typeParam}`;
  };
  return (
    <Pagination className="cursor-pointer">
      <PaginationContent>
        <PaginationItem>
          {hasPrevious ? (
            <Link href={buildPageUrl(page - 1)} >
              <div>
                <PaginationPrevious 
                    aria-disabled={!hasPrevious}
                    className={!hasPrevious ? "pointer-events-none opacity-50" : ""}
                  />
              </div>
          
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
            <Link href={buildPageUrl(page + 1)} >
              <div>
                <PaginationNext 
                  aria-disabled={!hasNext}
                  className={!hasNext ? "pointer-events-none opacity-50" : ""}
                />
              </div>
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