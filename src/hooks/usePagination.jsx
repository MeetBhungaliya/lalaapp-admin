import { PaginationContext } from '@/context/PaginationContext'
import React, { useContext } from 'react'

const usePagination = () => {
  return useContext(PaginationContext)
}

export default usePagination