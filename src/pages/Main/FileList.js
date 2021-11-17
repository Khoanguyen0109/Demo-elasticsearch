import { Grid } from "@mui/material";
import axios from "axios";
import React from "react";
import { END_POINT } from "./constants";
import File from "./File";
function FileList(props) {
  const { fileList, setFileList } = props;

  const deleteFile = async(id) => {
    console.log('id', id)
    setFileList(fileList.filter((item) => item._source.id !== id));
    const res = await axios({
      method: END_POINT.delete_document.method,
      url: END_POINT.delete_document.url(id)
    })
  };
  return (
    <Grid container justify="flex-start" spacing={3}>
      {fileList.map((item, index) => {
        console.log('item', item)
        const {_source: {name , size, type ,id ,uploadTime}} = item;
        return (
          <Grid item xs={4} sm={3} md={3} lg={3} xl={1} key={index}>
          <File
            key={id}
            id={id}
            name={name}
            type={type ?? ""}
            size={size}
            uploadTime={uploadTime || new Date()}
            onDelete={deleteFile}
          />
        </Grid>
        )
      }
      )}
    </Grid>
  );
}

export default FileList;
