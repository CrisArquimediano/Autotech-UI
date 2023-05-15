import { CardContent, CardMedia, Typography, Card, CardActionArea, Box} from "@mui/material";
import React from "react";


export default function CardTurno({title, description, image}){
    return(
        <Box className='col-12 col-sm-6 col-md-3 p-3 mb-2 align-self-center'>
        <Card className="card" sx={{'&:hover':{backgroundColor: 'whitesmoke',boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'}}}>
                    <CardActionArea >
                        <CardMedia component="img" image={image} alt={description} sx={{height:400}}/>
                        <CardContent className="card-body">
                            <Typography variant='h5' fontSize='130%'>{title} &rarr;</Typography>
                        </CardContent>
                </CardActionArea>  
            </Card>
        </Box>
    );
}