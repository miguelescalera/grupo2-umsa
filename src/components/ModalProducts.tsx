import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, TextField } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'gray',
  boxShadow: 24,
  p: 4,
  color: "black",
  textAlign: "center"
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Añadir Turno Medico
          </Typography>
          <TextField id="outlined-basic" label="Motivo de Consulta" variant="outlined" sx={{ m: 0.5, width: '200px' }}/>
          <TextField
            sx={{ m: 0.5, width: '200px' }}
            id="outlined-multiline-flexible"
            label="Motivo de Consulta"
            multiline
            maxRows={4}
          />
          <TextField
            sx={{ m: 0.5, width: '200px' }}
            id="outlined-select-currency"
            select
            label="Profesional Medico"
            defaultValue="#"
          >
            <MenuItem>Holas</MenuItem>
          </TextField>
          <TextField
            sx={{ m: 0.5, width: '200px' }}
            id="outlined-select-currency"
            select
            label="Paciente"
            defaultValue="#"
          >
            <MenuItem>Holas</MenuItem>
          </TextField>
          <TextField
            sx={{ m: 0.5, width: '200px' }}
            id="outlined-select-currency"
            select
            label="Horario"
            defaultValue="#"
          >
            <MenuItem>Holas</MenuItem>
          </TextField>
        </Box>
      </Modal>
    </div>
  );
}