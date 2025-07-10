import { getLevels, getTutorials } from "@/api/query-option";
import Datatable from "@/components/common/Datatable";
import SearchBox from "@/components/common/SearchBox";
import Button from "@/components/custom/Button";
import { METHODS } from "@/constants/common";
import { ADD_UPDATE_TUTORIAL_SCRIPT, DELETE_LEVEL } from "@/constants/endpoints";
import { SearchDataChange } from "@/context/SearchDataContext";
import useDebounce from "@/hooks/use-debounce";
import useColumnDef from "@/hooks/useColumnDef";
import usePagination from "@/hooks/usePagination";
import { fetchApi } from "@/lib/api";
import { EDIT_WHITE_ICON } from "@/lib/images";
import { asyncResponseToaster } from "@/lib/toasts";
import AddScript from "@/modal/AddScript";
import DeleteModal from "@/modal/DeleteModal";
import ViewWordPronouncesModal from "@/modal/ViewWordPronouncesModal";
import WordPronouncesModal from "@/modal/WordPronouncesModal";
import { PAGINATION_DISPATCH_TYPES, TUTORIAL_TYPES } from "@/utils/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

const WordPronounces = () => {
  const [open, setOpen] = useState({ open: false, data: null });
  const [openView, setOpenView] = useState({ open: false, data: null });
  const [openDelete, setOpenDelete] = useState({ open: false, data: null });
  const [openScript, setOpenScript] = useState({ open: false, data: null });
  const [deleteScript, setDeleteScript] = useState(null);

  const {
    state: { page, limit },
    dispatch,
  } = usePagination();
  const search = SearchDataChange();
  const debouncedSearch = useDebounce(search.searchQuery);

  const tutorialsData = useQuery(getTutorials());

  const { tutorialId, tutorialScript } = useMemo(() => {
    if (tutorialsData.isFetching || !tutorialsData.data.data.list.length)
      return { tutorialId: null };

    const tutorial = tutorialsData.data.data.list.find(
      (t) => t.tutorialType === TUTORIAL_TYPES.word_pronunciation
    );

    return {
      tutorialId: tutorial?.tutorialId,
      tutorialScript: tutorial?.tutorialScript,
    };
  }, [tutorialsData.isFetching]);

  const levelsData = useQuery(
    getLevels({ offset: page, limit, tutorialId, search: debouncedSearch })
  );

  const addUpdateScriptMutation = useMutation({
    mutationFn: async (data) =>
      fetchApi({ url: ADD_UPDATE_TUTORIAL_SCRIPT, method: METHODS.POST, data }),
  });

  const deleteLevelMutation = useMutation({
      mutationFn: async (data) =>
        fetchApi({ url: DELETE_LEVEL, method: METHODS.DELETE, data }),
    });

  useEffect(() => {
    if (!levelsData.data.data.total_record) return;

    const pages = Math.ceil(levelsData.data.data.total_record / limit);

    dispatch({
      type: PAGINATION_DISPATCH_TYPES.SET_TOTALRECORD,
      payload: levelsData.data.data.total_record,
    });

    if (page > pages && page !== 1) {
      dispatch({ type: PAGINATION_DISPATCH_TYPES.SET_PAGE, payload: 1 });
    }
  }, [levelsData.isFetching, page, limit, debouncedSearch]);

  const handleView = (row) => setOpenView({ open: true, data: row });
  const handleEdit = (row) => setOpen({ open: true, data: row });
  const handleDelete = (row) => setOpenDelete({ open: true, data: row });

  const { wordPronouncesColumns } = useColumnDef({
    handleView,
    handleEdit,
    handleDelete,
  });

  const onDeleteLevel = async (data) => {
    const result = await asyncResponseToaster(() =>
      deleteLevelMutation.mutateAsync({ levelId: data?.levelId })
    );

    if (result.success && result.value && result.value.isSuccess) {
      levelsData.refetch();
    }
  };

  const onDeleteScript = async () => {
    const result = await asyncResponseToaster(() =>
      addUpdateScriptMutation.mutateAsync({
        tutorialId,
        tutorialScript: "",
      })
    );

    if (result.success && result.value && result.value.isSuccess) {
      tutorialsData.refetch();
    }
  };
  
  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden gap-6 p-6">
        <div className="flex items-center justify-between">
          <div className="max-w-[550px] min-w-[350px]">
            <SearchBox />
          </div>
          <Button
            className="text-base shadow-[0px_4px_6px_0px_#8FD5FF] py-[12.5px] font-semibold sm:text-lg w-fit px-8"
            type="button"
            onClick={() => setOpen({ open: true, data: null })}
          >
            + Add Word
          </Button>
        </div>

        <div className="flex-1 flex overflow-hidden gap-6 h-full">
          {/* Datatable - 3/4 width */}
          <div className="flex-1 w-3/4">
            <Datatable
              data={levelsData.data.data.list}
              loading={levelsData.isFetching}
              columns={wordPronouncesColumns}
              title="Word Pronounces"
            />
          </div>

          {/* Script Section - 1/4 width */}
          <div className="w-1/4 bg-white rounded-[24px] flex flex-col relative">
            <div className="bg-[#F2F4FC] flex justify-between items-center px-5 py-[21px] rounded-t-[24px]">
              <p className="text-lg font-medium text-black">Script</p>
              <div className="sm:size-[36px] size-[32px] rounded-[8px] shadow-[0px_4px_6px_0px_#8FD5FF] bg-main flex items-center justify-center cursor-pointer">
                <img
                  src={EDIT_WHITE_ICON}
                  alt="EDIT_WHITE_ICON"
                  onClick={() =>
                    setOpenScript({ open: true, data: { tutorialScript } })
                  }
                />
              </div>
            </div>
            <div
              className="px-5 py-[21px]"
              dangerouslySetInnerHTML={{ __html: tutorialScript }}
            />
            <div className="absolute bottom-5 flex justify-center right-34">
              <Button
                className="text-base shadow-[0px_4px_6px_0px_#8FD5FF] py-[12.5px] font-semibold sm:text-lg w-fit px-8 bg-main"
                type="button"
                onClick={() => setDeleteScript({ open: true, data: null })}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
      <WordPronouncesModal
        open={open}
        setOpen={setOpen}
        tutorialId={tutorialId}
      />
      <ViewWordPronouncesModal open={openView} setOpen={setOpenView} />
      {openDelete.open && (
        <DeleteModal
          open={openDelete}
          setOpen={setOpenDelete}
          name="Level"
          title={openDelete?.data?.levelName}
          onSucess={onDeleteLevel}
        />
      )}
      {openScript?.open && (
        <AddScript
          open={openScript}
          setOpen={setOpenScript}
          tutorialId={tutorialId}
          refechQuery={tutorialsData.refetch}
        />
      )}
      {deleteScript?.open && (
        <DeleteModal
          open={deleteScript}
          setOpen={setDeleteScript}
          name="Script"
          title="this script"
          onSucess={onDeleteScript}
        />
      )}
      {/* <DeleteWordPronounceModal open={openDelete} setOpen={setOpenDelete} /> */}
    </>
  );
};

export default WordPronounces;
