import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { changeType } from '@/type';

interface SimplePaginationProps {
  previous?: string | null;
  next?: string | null;
  handleChange: (page: changeType) => void;
}

/** 上一页，下一页 */
export default function GoNextOrPrevious({
  previous,
  next,
  handleChange
}: Readonly<SimplePaginationProps>): React.ReactElement {

  return (
    <Pagination className="cursor-pointer">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => handleChange('previous')}
            aria-disabled={!previous} 
            className={!previous ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => handleChange('next')}
            aria-disabled={!next}
            className={!next ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}