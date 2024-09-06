import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setObj, updateURLInner } from '@/features/RESTFul/RESTFulSlice';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { RESTFulState } from '@/types/types';
import { useTranslations } from 'next-intl';

export default function ExampleBtn() {
  const dispatch = useDispatch<AppDispatch>();
  const t = useTranslations('RESTful.ExampleBtn');

  const handleClick = () => {
    const bodyObj = {
      likes: 30,
      title: t('ExampleBodyTitle'),
      body: '__body__',
    };
    const formattedBodyText = JSON.stringify(bodyObj, null, 2);

    const newObj: RESTFulState = {
      method: 'POST',
      url: 'https://httpbin.org/post',
      variableTable: [
        {
          variable: 'body',
          value: t('ExampleBodyValue'),
        },
      ],
      bodyText: formattedBodyText,
      bodyType: 'json',
      urlInner: '',
      isInitialized: true,
      date: '',
      headers: [['Content-Type', 'application/json']],
    };
    dispatch(setObj(newObj));
    dispatch(updateURLInner());
  };

  return (
    <>
      <Button endIcon={<FormatColorTextIcon />} variant="contained" onClick={handleClick} color="secondary">
        {t('FillBtn')}
      </Button>
    </>
  );
}
