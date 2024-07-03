// src/components/HoraSelector.tsx
import React from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';

interface HoraSelectorProps {
  fechaSeleccionada: Dayjs | null;
  onHoraChange: (hora: Dayjs | null) => void;
}

const HoraSelector: React.FC<HoraSelectorProps> = ({ fechaSeleccionada, onHoraChange }) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Seleccione un horario"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          onHoraChange(newValue);
        }}
      />
    </LocalizationProvider>
  );
};

export default HoraSelector;
