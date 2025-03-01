
import { useRouter } from 'next/navigation';
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SimplePaginationProps {
  previous?: string | null;
  next?: string | null;
}

/** 上一页，下一页 */
export default function GoNextOrPrevious({
  previous,
  next
}: Readonly<SimplePaginationProps>): React.ReactElement {
  const router = useRouter();
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => router.push(previous!)}
            aria-disabled={!previous} 
            className={!previous ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => router.push(next!)} 
            aria-disabled={!next}
            className={!next ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}