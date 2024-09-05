'use client';
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useEffect, useId } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { HttpMethod } from '@/types/types';
import ResponseArea from './ResponseArea';
import BodyArea from './BodyArea';
import VariablesArea from './VariablesArea';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { setMethod, setUrl, setObj, setUrlAndUpdateURLInner, setBodyText } from '@/features/RESTFul/RESTFulSlice';
import { convertSlugToObj, getHttpMethods, isMethodWithoutBody } from '@/utils/utilsRESTful';

import { useUser } from '@/hooks/authHook';
import LoginRequired from '@/components/LoginRequired/LoginRequired';
import { URLUpdate } from './URLUpdate';
import SubmitBtn from './SubmitBtn';

// TODO: loader for code area

const httpMethods: HttpMethod[] = getHttpMethods();

export default function RESTFul({ params }: { params: { slug: string[] } }) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useUser();
  const method = useSelector((state: RootState) => state.RESTFul.method);
  const url = useSelector((state: RootState) => state.RESTFul.url);
  const isInitialized = useSelector((state: RootState) => state.RESTFul.isInitialized);

  const idLabel = useId();
  const idSelect = useId();
  const idURL = useId();

  useEffect(() => {
    if (!isInitialized && params.slug) {
      const newObj = convertSlugToObj(params.slug);
      dispatch(setObj(newObj));
    }
  }, [params.slug, isInitialized, dispatch]);

  const handleMethodChange = (event: SelectChangeEvent<HttpMethod>) => {
    const chosenMethod = event.target.value as HttpMethod;
    dispatch(setMethod(chosenMethod));
    if (isMethodWithoutBody(chosenMethod)) {
      dispatch(setBodyText(''));
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUrl(event.target.value));
  };

  const handleUrlBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    dispatch(setUrlAndUpdateURLInner(event.target.value));
  };

  if (!user) {
    return <LoginRequired serviceName="REST" />;
  }

  return (
    <URLUpdate>
      <Box sx={{ my: 2, px: 1 }}>
        <form>
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
              <TextField
                id={idURL}
                label="URL"
                variant="outlined"
                fullWidth
                value={url}
                onChange={handleUrlChange}
                onBlur={handleUrlBlur}
              />
            </FormControl>
            <SubmitBtn />
          </Stack>
        </form>

        <BodyArea />
        <VariablesArea />

        <ResponseArea />
      </Box>
    </URLUpdate>
  );
}
