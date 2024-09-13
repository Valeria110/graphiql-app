'use server';

import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';

const fetchGraphQLData = async (
  url: string,
  query: string,
  headers?: Record<string, string> | null,
  variables?: Record<string, string> | null,
) => {
  try {
    if (!url) {
      return 'Please, enter a url to make a request';
    }
    const vars = variables ? variables : {};

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
      body: JSON.stringify({ query, variables: vars }),
    });

    const status = res.status;
    const { data, errors } = await res.json();

    const formattedResponse = JSON.stringify({ data, errors, status }, null, 2);

    return formattedResponse;
  } catch (e) {
    console.error('Network error: ', e);
    return 'Network error';
  }
};

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
