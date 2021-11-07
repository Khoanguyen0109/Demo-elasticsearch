import React, { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/system";
import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid, Skeleton } from "@mui/material";
import FileList from "./FileList";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#ebe8e8",
  "&:hover": {
    backgroundColor: "#ebe8e8",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function MainPage() {
  const [isFetching, setIsFetching] = useState(false);
  const [fileList, setFileList] = useState([1]);
  useEffect(() => {
    //fetching file
  }, []);

  return (
    <Layout>
      <Box mb={2}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Box>
      <Box ml={3}>
        <input
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
      </Box>
      <Box ml={3} mt={4}>
        {isFetching ? (
          <Grid container justify="flex-start" spacing={3}>
            {[0, 1, 2, 3].map((item, index) => (
          <Grid item xs={4} sm={3} md={3} lg={3} xl={1} key={index}>
          <Skeleton variant="rect" height={200} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <FileList fileList={fileList} />
        )}
      </Box>

      {/* <MyCoursesList /> */}
    </Layout>
  );
}

export default MainPage;
