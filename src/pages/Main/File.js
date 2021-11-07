import { IconButton, Typography } from '@mui/material';
import { borderRadius, Box } from '@mui/system'
import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
function File(props) {

    const getIconFileType =() =>{
        return ;
    }

    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '180px',
            backgroundColor: '#EAE8E8',
            borderRadius: '8px',
            padding: '8px'
        }}>
            <IconButton
            size='small'
            sx={{
                position: 'absolute',
                top: '3%',
                right: '3%',
            }} onClick={()=>{}}>
                <CancelIcon/>
            </IconButton>
            <Box flexGrow={3}>

            </Box>
            <Box paddingTop={1} flexGrow={1}>
                <Typography>file name</Typography>
                <Typography>upload date </Typography>


            </Box>
        </Box>
    )
}

export default File
