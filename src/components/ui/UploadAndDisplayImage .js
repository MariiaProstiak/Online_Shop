import React, { useState, useRef } from "react";

const UploadAndDisplayImage = (props) => {
  const imageRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);

  let [baseImage, setBaseImage] = useState({
    file: null,
    base64URL: "",
  });

  function getBase64(file) {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        //console.log("Called", reader);
        baseURL = reader.result;
        //console.log(baseURL);
        resolve(baseURL);
      };
      //console.log(fileInfo);
    });
  }

  function handleFileInputChange(e) {
    setSelectedImage(e.target.files[0]);
    //console.log(e.target.files[0]);
    let { file } = baseImage;

    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        //console.log("File Is", file);
        props.onImageSelected(result);
        setBaseImage({
          base64URL: result,
          file,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setBaseImage({
      file: e.target.files[0],
    });
  }

  function removeHandler() {
    setSelectedImage(null);
    setBaseImage({ file: null, base64URL: "" });
    imageRef.current.value = null;
  }

  return (
    <div>
      {selectedImage && (
        <div>
          <img
            alt="not fount"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={removeHandler}>Remove</button>
        </div>
      )}
      <br />

      <br />
      <input
        type="file"
        name="myImage"
        required
        accept="image/*"
        ref={imageRef}
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default UploadAndDisplayImage;
