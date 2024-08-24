const fetchGraphQLData = async (url: string, query: string, headers?: Record<string, string> | null, variables?: string | null) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers
      },
      body: variables ? JSON.stringify({ query, variables }) : JSON.stringify({ query }),
    });
    const data = await res.json();
    const formattedResponse = JSON.stringify(data, null, 2);
    return formattedResponse;
  };

  export {fetchGraphQLData}