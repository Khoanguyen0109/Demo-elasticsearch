import React, { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import * as Yup from "yup";
import DateRangePicker from "@mui/lab/DateRangePicker";

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
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import FileList from "./Grid/FileList";
import axios from "axios";
import { END_POINT, END_POINT_ES } from "./constants";
import { useSnackbar } from "notistack";
import { useAuthDataContext } from "../../Auth/AuthContext";
import TableFile from "./Table/TableFile";
import { Document, Page } from "react-pdf";
import { sub } from "date-fns";
import { useFormik } from "formik";
import DatePicker from "@mui/lab/DatePicker";

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
  const [totalFile, setTotalFile] = useState();
  const [reset, setReset] = useState(false);
  const formik = useFormik({
    initialValues: {
      search: "",
      searchFields: {
        name: false,
        content: false,
        filePath: false,
      },
      fromDate: sub(new Date(), { days: 30 }),
      toDate: new Date(),
      fromSize: null,
      toSize: null,
      sortBy: "uploadTime",
      order: "DESC",
      page: 0,
      size: 10,
    },
  });

  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    resetForm,
    setFieldError,
    validateForm,
  } = formik;

  const {
    search,
    searchFields,
    fromDate,
    toDate,
    fromSize,
    toSize,
    sortBy,
    order,
    page,
  } = values;

  const handleChangePage = (event, newPage) => {
    setFieldValue("page", newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setFieldValue("size", +event.target.value);
    setFieldValue("page", 0);
  };

  const onSubmit = async (e) => {
    console.log("values", values);
    e.preventDefault();
    // if (search === "") {
    // getFile();
    //  getFileByES()
    // } else {
    searchFile();
    // }
  };

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
      searchFile();
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

  useEffect(()=>{
    searchFile();
  },[values.size])

  console.log("reset", reset);
  useEffect(() => {
    if (reset) {
      searchFile();
      setReset(false);
    }
  }, [reset]);

  const onChange = (e) => {
    setFieldValue("search", e.target.value);
  };

  const onChangeSearchField = (event) => {
    setFieldValue("searchFields", {
      ...searchFields,
      [event.target.name]: event.target.checked,
    });
  };

  const searchFile = async () => {
    const res = await axios({
      method: END_POINT.search.method,
      url: END_POINT.search.url,
      data: {
        searchTerm: search,
        fields: Object.keys(searchFields).filter((key) => !!searchFields[key]),
        sortBy: "uploadTime",
        order: "DESC",
        fromDate,
        toDate,
        fromSize,
        toSize,
        size: values.size
      },
    });
    setFiles(res.data);
  };

  const { name, size, content, filePath } = values.searchFields;

  return (
    <Layout>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingDocuments}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          marginTop: "10px",
          marginLeft: "20px",
          marginBottom: "34px",
        }}
      >
        <form onSubmit={onSubmit}>
          <Box mb={2} display="flex">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={search}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={onChange}
              />
            </Search>
            <Button type="submit">Search</Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">Search by: </Typography>
            <Button
              onClick={() => {
                resetForm();
                setReset(true);
              }}
            >
              Reset
            </Button>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <FormGroup
              sx={{
                display: "flex",
                flexDirection: "row",
                marginRight: "34px",
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

            <Box
              sx={{
                width: "60%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DateRangePicker
                startText="Check-in"
                endText="Check-out"
                value={[fromDate, toDate]}
                onChange={(newValue) => {
                  setFieldValue("fromDate", newValue[0]);
                  setFieldValue("toDate", newValue[1]);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              marginTop: "16px",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{}}>
              <Typography variant="h6">File to Get</Typography>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                {/* <Box
                  sx={{
                    marginRight: "16px",
                  }}
                >
                  <TextField
                    label="From Size"
                    onChange={(e) => {
                      setFieldValue("fromSize", parseInt(e.target.value));
                    }}
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                </Box> */}

                <Select
                  sx={{
                    minWidth: 120 
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.size}
                  label="How many file you want to get?"
                  onChange={(e) => {
                    setFieldValue("size", e.target.value);
                  }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>

                  <MenuItem value={100}>100</MenuItem>
                </Select>
                {/* <Box>
                  <TextField
                    label="To Size"
                    onChange={(e) => {
                      setFieldValue("toSize", parseInt(e.target.value));
                    }}
                    type="number"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                </Box> */}
              </Box>
            </Box>
            <Box>
              <Typography variant="h6">Total hits: {totalFile}</Typography>
            </Box>
          </Box>
        </form>
      </Box>

      <Box>
        {/* <DatePicker
    label="Basic example"
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
    renderInput={(params) => <TextField {...params} />}
  /> */}
      </Box>

      {!fileList ? (
        <CircularProgress />
      ) : (
        <TableFile
          data={fileList}
          search={search}
          page={page}
          size={values.size}
          handleChangePage={handleChangePage}
          searchContent={searchFields.content}
        />
      )}
    </Layout>
  );
}

export default MainPage;
