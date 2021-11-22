import React, { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/system";
import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button, FormControl, Grid, Skeleton, Typography } from "@mui/material";
import FileList from "./FileList";
import axios from "axios";
import { END_POINT, END_POINT_ES } from "./constants";
import { useSnackbar } from "notistack";
import { useAuthDataContext } from "../../Auth/AuthContext";
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
  const {currentUser} = useAuthDataContext()
  const { enqueueSnackbar } = useSnackbar();
  const [fileList, setFileList] = useState([]);
  const [search, setSearch] = useState('')
  const [timeToFind, setTimeToFind] = useState()
  const [totalFile, setTotalFile] = useState()
  const getAllFile = async ()=>{
    const config = {
      header: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
  };
    const res = await axios({
      method: END_POINT.get_documents.method,
      url: END_POINT.get_documents.url,
      // config
      headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
    });
    setFileList(res.data.documents);
    console.log("res", res);
  }

  const setFiles =(data) =>{ 
    setFileList(data.hits.hits)
    setTotalFile(data.hits.total.value)
    setTimeToFind(data.took)
  }

  const getFileByES = async () =>{
    const res = await axios({
      method: END_POINT_ES.get_all.method,
      url: END_POINT_ES.get_all.url,
      data: {
        ...END_POINT_ES.get_all.params,
        
      },
      header: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }

    })
    setFiles(res.data)
    // setFileList(res.data.hits.hits)
    // setTotalFile(res.data.hits.total.value)
    // setTimeToFind(res.data.took)

    return res
  }
  const searchFile = async ()=>{
    const data = {...END_POINT_ES.search_file.params(search)}
    const res =  await axios({
      method: END_POINT_ES.search_file.method,
      url : END_POINT_ES.search_file.url,
      data: data,
      header: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }

    })
    setFiles(res.data)

    // setFileList(res.data.hits.hits)
    // setTotalFile(res.data.hits.total.value)
    // setTimeToFind(res.data.took)
  }
  useEffect(() => {
    //fetching file
    // getAllFile();
    getFileByES()
  }, []);
  
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('document', file)
    // data.append('userId', currentUser.id );
    try {
      const res = await axios({
        method: END_POINT.upload.method,
        url: END_POINT.upload.url,
        data,
        headers: { "Content-Type": "multipart/form-data", "Authorization" : `Bearer ${localStorage.getItem('access_token')}`},
      });
          enqueueSnackbar("Successfully " , {
            variant: 'success',
          })
      if(res){
        getFileByES()
      }
    } catch (error) {
      console.log('object', error.response.status)
      switch (error.response.status) {
        case 400: 
          enqueueSnackbar(error.response.data.message , {
            variant: 'warning',
          })
          break;
        case 500:
          enqueueSnackbar("Something went wring " , {
            variant: 'error',
          })
          break 
        default:
          break;
      }
    }


  };

  const onChange = (e) =>{
    setSearch(e.target.value)
  
  }
  const onSubmit = async(e) =>{
    e.preventDefault()
   if(search === ''){
     getFileByES()
   }else{
    searchFile();
   }

  }
  console.log('fileList', fileList)

  return (
    <Layout>
        <form onSubmit={onSubmit}>
        <Box mb={2} display='flex' >

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
        <Button type='submit'>
          Search
        </Button>
      </Box>
      </form>

      <Box ml={3}>
        <input
          // style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={uploadFile}
        />
        {/* <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span" > 
            Upload
          </Button>
        </label> */}
      </Box>

      <Box>
        <Typography variant="h6">
          Total File: {totalFile}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6">
          Time to find: {timeToFind} millisecond
        </Typography>
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
          <FileList fileList={fileList} setFileList={setFileList} />
        )}
      </Box>

      {/* <MyCoursesList /> */}
    </Layout>
  );
}

export default MainPage;
