export default function Dropfiles() {
    const [files , setFiles] = useState([])
    const [file , setFile] = useState('')
    // const [loading, setLoading] = useState(false)
    const {getRootProps, getInputProps }= useDropzone({
      onDrop:  (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file)=> Object.assign(file , {
            preview: URL.createObjectURL(file)
          }))
        )
       upload(acceptedFiles);
      }
    })
    const resultFiles = files.map((file) => (
      <div key={file.name}>
        <p>{file.name}</p>
  
      </div>
    ))
  
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
        .then(res => console.log(res))
        .catch(err => console.log(err));
      });
    }
    return (
      <div>
         <div {...getRootProps()} style={{width:"200px", height:"200px"}} > 
            <input {...getInputProps()} />
         <p> Drop files </p>
         </div>
         <div>
           {resultFiles} 
         </div>
         <div>
           {/* {uploadedFile} */}
         </div>
       </div>
    )
  }