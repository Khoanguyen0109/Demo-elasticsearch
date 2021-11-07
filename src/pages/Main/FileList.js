import { Grid } from '@mui/material'
import React from 'react'
import File from './File'
function FileList(props) {
    const { fileList} = props
    return (
        <Grid container justify='flex-start' spacing={3}>
              {fileList.map((item, index) => (
          <Grid item xs={4} sm={3} md={3} lg={3} xl={1} key={index}>
              <File/>
          </Grid>
        ))}
      </Grid>
    )
}

export default FileList
