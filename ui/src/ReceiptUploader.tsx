import React from "react";
import { useDropzone } from "react-dropzone";

type ReceiptUploaderProps = { id: string; onUploadComplete: () => void };

function ReceiptUploader({ id, onUploadComplete }: ReceiptUploaderProps) {
  const uploadUrl = `${process.env.REACT_APP_API_URL}/upload/${id}/receipts`;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async acceptedFiles => {
      const body = new FormData();
      body.append("receipt", acceptedFiles[0]);
      const response = await fetch(uploadUrl, { method: "POST", body });
      await response.json();
      onUploadComplete();
    }
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} accept="image/*;capture=camera" />
      {isDragActive ? <p>Drop it! 🙈</p> : <p>Drag and drop or click!</p>}
    </div>
  );
}

export default ReceiptUploader;
