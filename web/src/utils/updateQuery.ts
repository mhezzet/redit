import { QueryInput, Cache } from "@urql/exchange-graphcache";

export const updateQuery = <Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  resault: any,
  fn: (r: Result, q: Query) => Query
) => {
  return cache.updateQuery(
    queryInput,
    (data) => fn(resault, data as any) as any
  );
};
