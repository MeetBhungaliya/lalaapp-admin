import { getSubscriberList } from "@/api/query-option";
import Datatable from "@/components/common/Datatable";
import SearchBox from "@/components/common/SearchBox";
import { SearchDataChange } from "@/context/SearchDataContext";
import useDebounce from "@/hooks/use-debounce";
import useColumnDef from "@/hooks/useColumnDef";
import usePagination from "@/hooks/usePagination";
import DeleteModal from "@/modal/DeleteModal";
import UserDetail from "@/modal/UserDetail";
import { PAGINATION_DISPATCH_TYPES } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Subscriptions = () => {
    const [openView, setOpenView] = useState({ open: false, data: null });
    const [openDelete, setOpenDelete] = useState({ open: false, data: null });

    const {
    state: { page, limit },
    dispatch,
  } = usePagination();
  const search = SearchDataChange();
  const debouncedSearch = useDebounce(search.searchQuery);

   const subscribersData = useQuery(
     getSubscriberList({ offset: page, limit, search: debouncedSearch })
   );

    useEffect(() => {
    if (!subscribersData.data.data.total_record) return;

    const pages = Math.ceil(subscribersData.data.data.total_record / limit);

    dispatch({
      type: PAGINATION_DISPATCH_TYPES.SET_TOTALRECORD,
      payload: subscribersData.data.data.total_record,
    });

    if (page > pages && page !== 1) {
      dispatch({ type: PAGINATION_DISPATCH_TYPES.SET_PAGE, payload: 1 });
    }
  }, [subscribersData.isFetching, page, limit, debouncedSearch]);
  
    const handleView = (row) => {
        setOpenView({ open: true, data: row });
    };

    const handleDelete = (row) => {
        setOpenDelete({ open: true, data: row?.name });
    };

    const { subscriptionsColumns } = useColumnDef({ handleView, handleDelete });

    return (
      <>
        <div className="flex-1 flex flex-col overflow-auto gap-6 p-6">
          <div className="flex items-center justify-between">
            <div className="max-w-[550px] min-w-[350px]">
              <SearchBox />
            </div>
          </div>
          <Datatable
            data={subscribersData.data.data.list}
            loading={Boolean(subscribersData.isFetching)}
            columns={subscriptionsColumns}
            title="Subscriptions"
          />
        </div>
        <UserDetail open={openView} setOpen={setOpenView} />
        <DeleteModal
          open={openDelete}
          setOpen={setOpenDelete}
          name={"User"}
          title={openDelete?.data}
        />
      </>
    );
};

export default Subscriptions;