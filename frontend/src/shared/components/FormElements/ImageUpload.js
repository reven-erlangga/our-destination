import React, { useRef } from "react";

import "./ImageUpload.css";

import Button from "./Button";

const ImageUpload = (props) => {
  const filePickerRef = useRef();

  const pickHandler = (event) => {};

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        style={{ display: "none" }}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={pickHandler}
      />

      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          <img src="" alt="Preview" />
        </div>

        <Button type="button" onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
