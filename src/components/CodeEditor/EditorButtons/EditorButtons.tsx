import styles from './EditorButtons.module.scss';
import { fetchGraphQLData } from '@/api/graphqlRequests';
import { setQuery, setResponse } from '@/features/graphiql/graphiqlEditorSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { saveGraphqlRequestsHistory } from '@/utils/saveGraphqlRequestsHistory';
import { prettifyGraphQL } from '@/utils/utils';
import classNames from 'classnames';
import { Dispatch, SetStateAction, useTransition } from 'react';

interface EditorButtonsProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

export default function EditorButtons({ query, setQuery: setEditorQuery }: EditorButtonsProps) {
  const dispatch = useAppDispatch();
  const [, startTransition] = useTransition();
  const { urlEndpoint: url, sdlUrl, headers, variables } = useAppSelector((state) => state.graphiqlEditor);

  const runCode = () => {
    startTransition(async () => {
      const res = await fetchGraphQLData(url, query, headers, variables);
      if (res) {
        dispatch(setResponse(res));
      }
      dispatch(setQuery(query));
      saveGraphqlRequestsHistory({ url, sdlUrl, body: query, headers, variables, date: new Date() });
    });
  };

  const prettifyCode = () => {
    const formattedCode = prettifyGraphQL(query);
    setEditorQuery(formattedCode);
    dispatch(setQuery(formattedCode));
  };

  return (
    <div className={styles.btnsWrapper} data-testid="editor-btns-wrapper">
      <button className={classNames(styles.btn, styles.runCodeBtn)} onClick={runCode} data-testid="run-code-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <polygon points="5,3 19,12 5,21" fill="#fff" />
        </svg>
      </button>
      <button className={styles.btn} onClick={prettifyCode} data-testid="prettify-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
          <path
            fill="#fff"
            d="M13.5 1a.5.5 0 0 1 .5.5V2h.5a.5.5 0 0 1 0 1H14v.5a.5.5 0 0 1-1 0V3h-.5a.5.5 0 0 1 0-1h.5v-.5a.5.5 0 0 1 .5-.5m-10 2a.5.5 0 0 1 .5.5V4h.5a.5.5 0 1 1 0 1H4v.5a.5.5 0 1 1-1 0V5h-.5a.5.5 0 0 1 0-1H3v-.5a.5.5 0 0 1 .5-.5m9 9a.5.5 0 0 0 0-1H12v-.5a.5.5 0 0 0-1 0v.5h-.5a.5.5 0 0 0 0 1h.5v.5a.5.5 0 0 0 1 0V12zM8.73 4.563a1.914 1.914 0 0 1 2.707 2.708l-7.17 7.17a1.914 1.914 0 0 1-2.707-2.708zm-.48 1.894L2.267 12.44a.914.914 0 0 0 1.293 1.293L9.543 7.75zm2 .586l.48-.48a.914.914 0 1 0-1.293-1.292l-.48.48z"
          />
        </svg>
      </button>
    </div>
  );
}
