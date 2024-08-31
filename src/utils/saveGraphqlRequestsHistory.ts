export interface IRequestData {
  url: string;
  sdlUrl: string;
  body: string;
  headers: Record<string, string> | null;
  variables: string | null;
  date: Date;
}

export const saveGraphqlRequestsHistory = (lastRequestObj: IRequestData) => {
  const prevRequests = localStorage.getItem('graphqlRequests') ?? '';
  const prevRequestsArr = prevRequests ? JSON.parse(prevRequests) : [];
  const updatedHistory: IRequestData[] = [...prevRequestsArr, lastRequestObj];
  localStorage.setItem('graphqlRequests', JSON.stringify(updatedHistory));
  return updatedHistory;
};
