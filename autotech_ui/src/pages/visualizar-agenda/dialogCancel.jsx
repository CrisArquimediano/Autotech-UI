import * as React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText, Box} from "@mui/material";
//children en el parametro de arriba y en coso dentro de props para forms (ver video del indio)
export default function DialogCancel(props){
    const {title, openDialog, setOpenDialog} = props;

    return (
        <Dialog open={openDialog} maxWidth='md' onClose={()=> setOpenDialog(false)}> 
            <DialogTitle id='alert-dialog-title'> 
                {title}
                {/*<div style={{display:'flex'}}>
                <Typography variant="h6" component='div' style={{flexGrow:1}} sx={{paddingRight:0}}>
                    {title}
                    </Typography>
                <Button size="small" onClick={()=>{setOpenDialog(false)}}>X</Button>
                    </div>*/}
            </DialogTitle>
            <DialogContent dividers>
                {/*{children}*/}
                <Box>
				<DialogContentText id='alert-dialog-description'>
					¿Está seguro que desea cancelar el turno? No se podrá modificar la acción una vez realizada. 
				</DialogContentText>
				<DialogActions>
                    <Button color='primary' variant='outlined'onClick={() => {setOpenDialog(false)}}>Aceptar</Button>
					<Button color='error' variant="outlined" onClick={() => {setOpenDialog(false)}}>Cancelar</Button>
				</DialogActions>
			</Box>
            </DialogContent>
        </Dialog>
    );
}