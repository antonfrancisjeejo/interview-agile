"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

interface FileUploadProps {
  onUpload: (files: FileList | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const FileUpload = ({ onUpload, fileInputRef }: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const dataTransfer = new DataTransfer();
      acceptedFiles.forEach((file) => dataTransfer.items.add(file));
      onUpload(dataTransfer.files);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: true,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpload(event.target.files);
    if (event.target) {
      event.target.value = "";
    }
  };

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center w-full"
    >
      <label
        htmlFor="resume-upload"
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <Upload className="w-8 h-8 mb-4 text-gray-500" />
          <p className="mb-2 text-sm text-gray-500">
            {isDragActive ? (
              <span className="font-semibold">Drop your resumes here</span>
            ) : (
              <>
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </>
            )}
          </p>
          <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
        </div>
        <input
          id="resume-upload"
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          ref={fileInputRef}
          {...getInputProps()}
        />
      </label>
    </div>
  );
};

export default FileUpload;
