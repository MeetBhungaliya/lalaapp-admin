import { getUsers } from "@/api/query-option";
import Datatable from "@/components/common/Datatable";
import SearchBox from "@/components/common/SearchBox";
import { METHODS } from "@/constants/common";
import { DELETE_USER } from "@/constants/endpoints";
import { SearchDataChange } from "@/context/SearchDataContext";
import useDebounce from "@/hooks/use-debounce";
import useColumnDef from "@/hooks/useColumnDef";
import usePagination from "@/hooks/usePagination";
import { fetchApi } from "@/lib/api";
import { asyncResponseToaster } from "@/lib/toasts";
import DeleteModal from "@/modal/DeleteModal";
import { PAGINATION_DISPATCH_TYPES } from "@/utils/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const Users = () => {
  const [open, setOpen] = useState({
    open: false,
    data: null,
  });

  const {
    state: { page, limit },
    dispatch,
  } = usePagination();
  const search = SearchDataChange();
  const debouncedSearch = useDebounce(search.searchQuery);

  const usersData = useQuery(
    getUsers({ offset: page, limit, search: debouncedSearch })
  );

  const deleteUserMutation = useMutation({
    mutationFn: async (data) =>
      fetchApi({ url: DELETE_USER, method: METHODS.DELETE, data }),
  });

  useEffect(() => {
    if (!usersData.data.data.total_record) return;

    dispatch({
      type: PAGINATION_DISPATCH_TYPES.SET_TOTALRECORD,
      payload: usersData.data.data.total_record,
    });

    return () => {
      dispatch({ type: PAGINATION_DISPATCH_TYPES.SET_PAGE, payload: 1 });
    };
  }, [usersData.isFetching, page, limit, debouncedSearch]);

  const handleDelete = (row) => {
    setOpen({
      open: true,
      data: { userId: row.userId, name: `${row?.fname} ${row?.lname}` },
    });
  };

  const { usersColumns } = useColumnDef({
    handleDelete,
  });

  const onDelete = async (data) => {
    const result = await asyncResponseToaster(() =>
      deleteUserMutation.mutateAsync({ userId: data.userId })
    );

    if (result.success && result.value && result.value.isSuccess) {
      usersData.refetch();
      setOpen({
        open: false,
        data: null,
      });
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col overflow-auto gap-6 p-6">
        <div className="max-w-[350px]">
          <SearchBox />
        </div>
        <Datatable
          data={usersData.data.data.list}
          columns={usersColumns}
          title="Users"
          loading={usersData.isFetching}
        />
      </div>
      {open && (
        <DeleteModal
          open={open}
          setOpen={setOpen}
          name={"User"}
          title={open?.data?.name}
          onSucess={onDelete}
        />
      )}
    </>
  );
};

export default Users;
