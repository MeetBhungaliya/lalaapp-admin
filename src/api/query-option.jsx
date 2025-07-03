import { GET_STATISTICS, GET_USERS } from "@/constants/endpoints";
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
