'use server';

import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';

const fetchGraphQLData = async (
  url: string,
  query: string,
  headers?: Record<string, string> | null,
  variables?: string | null,
) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    body: variables ? JSON.stringify({ query, variables }) : JSON.stringify({ query }),
  });
  const status = res.status;
  const data = await res.json();

  const formattedResponse = JSON.stringify({ data, status }, null, 2);
  return formattedResponse;
};

// url - это SDL url, которая находится в соответствующем input, на этот url и нужно делать запрос для получения схемы
const getGraphqlSchema = async (url: string): Promise<IntrospectionQuery | undefined> => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getIntrospectionQuery(),
      }),
    });
    const schema = await res.json();

    return schema.data;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export { fetchGraphQLData, getGraphqlSchema };
