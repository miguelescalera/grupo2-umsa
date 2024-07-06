import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


export default function Calendar(props: any) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                onChange={(e) => props.onChange(e)}
                value={props.value}
                label="Fecha Y Hora"
                sx={{ width: '100%' }}
            />
        </LocalizationProvider>
    );
}
