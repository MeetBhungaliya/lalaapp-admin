import { GET_LEVELS, GET_STATISTICS, GET_TUTORIALS, GET_USERS } from "@/constants/endpoints";
import { fetchApi } from "@/lib/api";
import { queryOptions } from "@tanstack/react-query";

export function getStatistic({ type }) {
  return queryOptions({
    queryKey: [GET_STATISTICS, type],
    queryFn: async () => fetchApi({ url: `${GET_STATISTICS}?type=${type}` }),
    placeholderData: { data: { list: [] } },
  });
}

export function getUsers({ offset, limit, search }) {
  return queryOptions({
    queryKey: [GET_USERS, offset, limit, search],
    queryFn: async () =>
      fetchApi({
        url: `${GET_USERS}?offset=${offset}&limit=${limit}${
          search ? `&search=${search}` : ""
        }`,
      }),
    placeholderData: { data: { list: [], total_record: null } },
  });
}

export function getTutorials() {
  return queryOptions({
    queryKey: [GET_TUTORIALS],
    queryFn: async () => fetchApi({ url: GET_TUTORIALS }),
    placeholderData: { data: { list: [] } },
  });
}

export function getLevels({ offset, limit, tutorialId, search }) {
  return queryOptions({
    queryKey: [GET_LEVELS, offset, limit, tutorialId, search],
    queryFn: async () =>
      fetchApi({
        url: `${GET_LEVELS}?offset=${offset}&limit=${limit}&tutorialId=${tutorialId}${
          search ? `&search=${search}` : ""
        }`,
      }),
    enabled: Boolean(tutorialId),
    placeholderData: { data: { list: [], total_record: null } },
  });
}
