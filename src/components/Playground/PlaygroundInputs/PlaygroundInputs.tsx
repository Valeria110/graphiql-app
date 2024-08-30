'use client';

import { PagesRoutes } from '@/types/types';
import styles from './PlaygroundInputs.module.scss';
import { formatToBase64 } from '@/utils/utils';
import { TextField } from '@mui/material';
import { useLocale } from 'next-intl';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { setSdlUrl, setUrlEndpoint } from '@/features/graphiql/graphiqlEditorSlice';
import { usePathname } from 'next/navigation';

export default function PlaygroundInputs() {
  const localActive = useLocale();
  const dispatch = useAppDispatch();
  const { urlEndpoint, query, sdlUrl } = useAppSelector((state) => state.graphiqlEditor);
  const [endpointUrlValue, setEndpointUrlValue] = useState(urlEndpoint);
  const pathUrl = usePathname();
  const [pathname, setPathname] = useState(pathUrl);

  useEffect(() => {
    window.history.replaceState(null, '', pathname);
  }, [pathname]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndpointUrlValue(e.target.value);
  };

  const handleFocusOut = () => {
    const urlEndpointBase64 = formatToBase64(endpointUrlValue);
    const queryBase64 = formatToBase64(query);
    const newPathname = `/${localActive}/${PagesRoutes.Graphql}/${urlEndpointBase64}/${queryBase64}`;
    setPathname(newPathname);
    dispatch(setUrlEndpoint(endpointUrlValue));
  };

  return (
    <>
      <TextField
        className={styles.urlUnput}
        variant="outlined"
        value={endpointUrlValue}
        placeholder="Enter endpoint url..."
        style={{ color: 'whitesmoke' }}
        onBlur={handleFocusOut}
        onChange={handleChange}
      />
      <TextField
        className={styles.urlUnput}
        variant="outlined"
        placeholder="Enter SDL url..."
        style={{ color: 'whitesmoke' }}
        defaultValue={sdlUrl}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => dispatch(setSdlUrl(e.target.value))}
      />
    </>
  );
}
