import { PaginationContext } from "@/context/PaginationContext";
import { useContext } from "react";

const usePagination = () => {
  return useContext(PaginationContext);
};

export default usePagination;
