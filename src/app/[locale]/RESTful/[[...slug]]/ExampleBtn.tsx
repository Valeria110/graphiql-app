import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { setObj, updateURLInner } from '@/features/RESTFul/RESTFulSlice';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { RESTFulState } from '@/types/types';

export default function ExampleBtn() {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    const bodyObj = {
      likes: 30,
      title: 'Some title',
      body: '__body__',
    };
    const formattedBodyText = JSON.stringify(bodyObj, null, 2);

    const newObj: RESTFulState = {
      method: 'POST',
      url: 'https://httpbin.org/post',
      variableTable: [
        {
          variable: 'body',
          value: 'An example of the text we store in the body variable',
        },
      ],
      bodyText: formattedBodyText,
      bodyType: 'json',
      urlInner: '',
      isInitialized: true,
      date: '',
    };
    dispatch(setObj(newObj));
    dispatch(updateURLInner());
  };

  return (
    <>
      <Button endIcon={<FormatColorTextIcon />} variant="contained" onClick={handleClick} color="secondary">
        Fill example
      </Button>
    </>
  );
}
