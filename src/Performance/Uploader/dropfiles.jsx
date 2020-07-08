import React, {useState, useMemo, Fragment} from 'react';
import {useDropzone} from 'react-dropzone';
import axios from 'axios';
import './dropfiles.css';
const baseStyle = {
  height:'98%',
  width:'98%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  // borderColor: '#19262C',
  borderStyle: 'dashed',
  // backgroundColor: '#fafafa',
  // color: '#bdbdbd',
  border: '1px dashed #19262C',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


export default function Dropfiles(props) {
  const [files , setFiles] = useState([])
  const [file , setFile] = useState("")
  let uploadedFiles = [];
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      upload(acceptedFiles);
    }
  });
  const upload = (acceptedFiles) =>
    {
      // const uploadURL1 = "https://pc-performance-violet.dev.pro.preqin.com/pc-perf-api/S3File/Upload"
      const uploadURL = "https://pc-performance-violet.dev.pro.preqin.com/pc-perf-api/v1/S3File/Upload";
     
      acceptedFiles.forEach(file => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name);
        axios({
          url:uploadURL,
          method:"POST",     
          headers: {
            "Content-Type" : "application/x-www-form-urlencoded",  
            // "Content-Type" : "multipart/form-data",    
          },
          data: formData
        })
        .then(res => {
          console.log(files);
          console.log(res.data.fileName);
          // setFile(res.data.fileName)
          setFiles(files.concat(res.data.fileName))
          uploadedFiles.push(res.data.fileName);
        })
        .catch(err => console.log(err));
      });
    }
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
const ResultFiles = ({file}) => <div>{file}</div>
  

  return (
    <Fragment>
    <div style={{width:'800px', height:'536px', background:'#F5F6F7'}}>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag and drop multiple files here or <br/> browse to select files</p>
      </div>
    </div>
    <div>
      <p className = "result"> Files being uploaded... </p>
      {
        
        uploadedFiles.map((file, i) => (
          <div> {file } </div>
        ))
      }
    </div>
    </Fragment>
  );

}