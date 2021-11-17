import { IconButton, Typography } from "@mui/material";
import { borderRadius, Box } from "@mui/system";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { format } from "date-fns";
function File(props) {
  const { id, name, size, type, uploadTime, onDelete } = props;
  
  console.log('id', props)
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "180px",
        backgroundColor: "#EAE8E8",
        borderRadius: "8px",
        padding: "8px",
      }}
    >
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          top: "3%",
          right: "3%",
        }}
        onClick={() => onDelete(id)}
      >
        <CancelIcon />
      </IconButton>
      <Box flexGrow={3}></Box>
      <Box paddingTop={1} flexGrow={1}>
        <Typography>Name: {name}</Typography>
        <Typography>Type: {type}</Typography>
        <Typography>Size: {size}</Typography>

        <Typography>
          Upload date: {format(new Date(uploadTime), "dd/mm/yyyy , hh:mm")}{" "}
        </Typography>
      </Box>
    </Box>
  );
}

export default File;
