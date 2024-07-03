// src/components/FechaSelector.tsx
import React from 'react';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface FechaSelectorProps {
  onFechaChange: (fecha: Dayjs | null) => void;
}

const FechaSelector: React.FC<FechaSelectorProps> = ({ onFechaChange }) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Seleccione una fecha"
        
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          onFechaChange(newValue);
        }}
        
      />
    </LocalizationProvider>
  );


};

export default FechaSelector;
