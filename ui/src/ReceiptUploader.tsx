import React from "react";
import { useDropzone } from "react-dropzone";
import { Trans } from "@lingui/macro";
import styled from "styled-components";
import { GetExpenseReceipts as Receipt } from "./generated/types";

const Dropzone = styled.div<{ draggedOver: boolean; isEmpty: boolean }>`
  border: 2px dashed #3490dc;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${props => (!props.isEmpty ? "flex-start" : "center")};
  align-items: center;
  min-height: 6rem;
  background-color: ${props => (props.draggedOver ? "#EFF8FF" : "transparent")};
`;

const ReceiptImage = styled.a`
  display: block;
  max-width: 25%;
  padding: 0.5rem;
  img {
    width: 100%;
    min-width: 3rem;
    min-height: 3rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }
`;

type ReceiptUploaderProps = {
  id: string;
  onUploadComplete: () => void;
  uploaded: Receipt[];
};

function ReceiptUploader({
  id,
  onUploadComplete,
  uploaded
}: ReceiptUploaderProps) {
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
    <Dropzone
      {...getRootProps()}
      draggedOver={isDragActive}
      isEmpty={!uploaded.length}
    >
      {uploaded.map(upload => (
        <ReceiptImage
          href={`${process.env.REACT_APP_API_URL}${upload.url}`}
          target="_blank"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={`${process.env.REACT_APP_API_URL}${upload.url}`}
            key={upload.url}
          />
        </ReceiptImage>
      ))}
      <input {...getInputProps()} accept="image/*;capture=camera" />
      {!uploaded.length && (
        <p>
          {isDragActive ? (
            <Trans>Go on, drop it!</Trans>
          ) : (
            <Trans>Drag and drop or click to upload.</Trans>
          )}
        </p>
      )}
    </Dropzone>
  );
}

export default ReceiptUploader;
