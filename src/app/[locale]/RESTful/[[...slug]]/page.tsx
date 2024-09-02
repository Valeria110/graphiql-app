'use client';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useEffect, useId } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { HttpMethod, RESTFulState } from '@/types/types';
import ResponseArea from './ResponseArea';
import BodyArea from './BodyArea';
import VariablesArea from './VariablesArea';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { setMethod, setUrl, setResponse, setObj } from '@/features/RESTFul/RESTFulSlice';
import insertVariablesInBody from './insertVariablesInBody';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
  addObjectToLocalStorage,
  convertSlugToObj,
  functionConvertObjToURL,
  getHttpMethods,
} from '@/utils/utilsRESTful';
import { useLocale } from 'next-intl';

// TODO: add icon to submit btn
// TODO: add warning for body GET, DELETE, HEAD, OPTIONS
// TODO: loader for code area
// TODO: change between JSON and text
// TODO: delete "" in var table

const httpMethods: HttpMethod[] = getHttpMethods();

export default function RESTFul({ params }: { params: { slug: string[] } }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const localActive = useLocale();

  const method = useSelector((state: RootState) => state.RESTFul.method);
  const url = useSelector((state: RootState) => state.RESTFul.url);
  const headers = useSelector((state: RootState) => state.RESTFul.headers);
  const bodyText = useSelector((state: RootState) => state.RESTFul.bodyText);
  const variableTable = useSelector((state: RootState) => state.RESTFul.variableTable);
  const obj = useSelector((state: RootState) => state.RESTFul);
  const urlInner = useSelector((state: RootState) => state.RESTFul.urlInner);
  const isInitialized = useSelector((state: RootState) => state.RESTFul.isInitialized);

  const idLabel = useId();
  const idSelect = useId();
  const idURL = useId();

  useEffect(() => {
    if (!isInitialized && params.slug) {
      console.log('🟨 useEffect firstUpdateRedux');
      const newObj = convertSlugToObj(params.slug);
      dispatch(setObj(newObj));
    }
  }, [params.slug, isInitialized, dispatch]);

  useEffect(() => {
    console.log('useEffect urlInner');
    updateURL2(router, localActive as 'en' | 'ru', urlInner);
  }, [urlInner]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    updateURL(router, obj);
    addObjectToLocalStorage(obj);

    const replacedBody = insertVariablesInBody(variableTable, bodyText);

    try {
      const options: RequestInit = {
        method,
        headers: headers,
        ...(replacedBody && { body: replacedBody }),
      };

      const start = Date.now();
      const res = await fetch(url, options);
      const data = await res.json();
      const finish = Date.now();

      dispatch(
        setResponse({
          code: res.status,
          timeMs: finish - start,
          responseText: JSON.stringify(data, null, 2),
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleMethodChange = (event: SelectChangeEvent<HttpMethod>) => {
    dispatch(setMethod(event.target.value as HttpMethod));
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUrl(event.target.value));
  };

  return (
    <Box sx={{ my: 2, px: 1 }}>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id={idLabel}>Method</InputLabel>
            <Select labelId={idLabel} id={idSelect} value={method} label="Method" onChange={handleMethodChange}>
              {httpMethods.map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <TextField id={idURL} label="URL" variant="outlined" fullWidth value={url} onChange={handleUrlChange} />
          </FormControl>

          <Button variant="contained" type="submit">
            Send
          </Button>
        </Stack>
      </form>

      <BodyArea />
      <VariablesArea />

      <ResponseArea />
    </Box>
  );
}

function updateURL(router: AppRouterInstance, obj: RESTFulState) {
  const currentURL = new URL(window.location.href);

  const newURL = new URL(currentURL);
  newURL.pathname = functionConvertObjToURL('en', obj);

  console.log('updateURL', newURL.pathname);
  router.replace(newURL.toString(), undefined);
}

function updateURL2(router: AppRouterInstance, locale: 'en' | 'ru', urlInner: string) {
  const currentURL = new URL(window.location.href);

  const newURL = new URL(currentURL);
  newURL.pathname = `/${locale}/RESTful/` + (urlInner ?? '');

  router.replace(newURL.toString(), undefined);
}
