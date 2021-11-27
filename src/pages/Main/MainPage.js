import React, { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/system";
import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import FileList from "./Grid/FileList";
import axios from "axios";
import { END_POINT, END_POINT_ES } from "./constants";
import { useSnackbar } from "notistack";
import { useAuthDataContext } from "../../Auth/AuthContext";
import TableFile from "./Table/TableFile";
import { Document, Page } from 'react-pdf';

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
  const { currentUser } = useAuthDataContext();
  const { enqueueSnackbar } = useSnackbar();
  const [fileList, setFileList] = useState([]);
  const [search, setSearch] = useState("");
  const [timeToFind, setTimeToFind] = useState();
  const [totalFile, setTotalFile] = useState();
  const [searchFields, setSearchFields] = useState({
    name: true,
    content: false,
    size: false,
    filePath: false,
  });

  const [loadingDocuments, setLoadingDocuments] = useState(false);

  const setFiles = (data) => {
    setFileList(data);
    setTotalFile(data.length);
  };

  const initDocument = async () => {
    try {
      setLoadingDocuments(true);
      // const reCreate = await axios({
      //   method: END_POINT.recreate.method,
      //   url: END_POINT.recreate.url
      // })
      // const res = await axios({
      //   method: END_POINT.init_document.method,
      //   url: END_POINT.init_document.url
      // })
      getFile();
      setLoadingDocuments(false);
    } catch (e) {
      setLoadingDocuments(false);
    }
  };

  const getFile = async () => {
    const res = await axios({
      method: END_POINT.get_all.method,
      url: END_POINT.get_all.url,
    });
    setFiles(res.data);
  };
  useEffect(() => {
    initDocument();
  }, []);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onChangeSearchField = (event) => {
    setSearchFields({
      ...searchFields,
      [event.target.name]: event.target.checked,
    });
  };

  console.log('totalFile', totalFile)
  const searchFile = async () => {
    const res = await axios({
      method: END_POINT.search.method,
      url: END_POINT.search.url,
      data: {
        searchTerm: search,
        fields: Object.keys(searchFields).filter(key=> !!searchFields[key]),
      },
    });
    setFiles(res.data)
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (search === "") {
      getFile();
      //  getFileByES()
    } else {
      searchFile();
    }
  };

  const { name, size, content, filePath } = searchFields;

  return (
    <Layout>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingDocuments}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={onSubmit}>
        <Box mb={2} display="flex">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={onChange}
            />
          </Search>
          <Button type="submit">Search</Button>
        </Box>
      </form>

      <Box>
        <Typography variant="h6">Search by: </Typography>
      </Box>
      <FormGroup
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={name}
              onChange={onChangeSearchField}
              name="name"
            />
          }
          label="Name"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={size}
              onChange={onChangeSearchField}
              name="size"
            />
          }
          label="Size"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={content}
              onChange={onChangeSearchField}
              name="content"
            />
          }
          label="Content"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filePath}
              onChange={onChangeSearchField}
              name="filePath"
            />
          }
          label="File Path"
        />
      </FormGroup>

      <Box>
        <Typography variant="h6">Total hits: {totalFile}</Typography>
      </Box>
      {!fileList ? <CircularProgress /> : <TableFile data={fileList}  search={search} searchContent={searchFields.content} />}
    </Layout>
  );
}

export default MainPage;
