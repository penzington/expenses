import React from "react";
import { useDropzone } from "react-dropzone";

type UploaderProps = { id: string };
function Uploader({ id }: UploaderProps) {
  const uploadUrl = `${process.env.REACT_APP_UPLOAD_URL}/${id}/receipts`;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async acceptedFiles => {
      const data = new FormData();
      data.append("receipt", acceptedFiles[0]);
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: data
      });
      const body = await response.json();
      console.log(body);
    }
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop it! 🙈</p> : <p>Drag and drop or click!</p>}
    </div>
  );
}

export default Uploader;
