'use client';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useId, useTransition } from 'react';

export default function LocaleSwitcher() {
  const localActive = useLocale();
  const id = useId();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value;
    const newPathname = pathname.replace(`/${localActive}`, `/${selectedLanguage}`);

    startTransition(() => {
      router.replace(newPathname);
    });
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId={id}
          id={id}
          label="Language"
          onChange={handleChange}
          defaultValue={localActive}
          disabled={isPending}
        >
          <MenuItem value={'ru'}>ru</MenuItem>
          <MenuItem value={'en'}>en</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
