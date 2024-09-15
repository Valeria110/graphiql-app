import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { addObjectToLocalStorage } from '@/utils/utilsRESTful';
import { RESTFulRequests } from '@/api/RESTFulRequests';
import { setResponse } from '@/features/RESTFul/RESTFulSlice';
import { useTranslations } from 'next-intl';

export default function SubmitBtn() {
  const dispatch = useDispatch<AppDispatch>();
  const obj = useSelector((state: RootState) => state.RESTFul);
  const t = useTranslations('RESTful.SubmitBtn');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const date = new Date().toISOString();

    const updatedObj = {
      ...obj,
      date,
    };

    addObjectToLocalStorage(updatedObj);

    const response = await RESTFulRequests(obj);
    dispatch(setResponse(response));
  };

  return (
    <>
      <Button endIcon={<SendIcon />} variant="contained" type="submit" onClick={handleSubmit}>
        {t('SubmitBtn')}
      </Button>
    </>
  );
}
