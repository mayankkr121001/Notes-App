import React, { useEffect, useRef, useState } from 'react'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import dataurlToBlob from 'dataurl-to-blob'
import api from '../interceptors/axios.js'

const ASPECT_RATIO = 1
const MIN_DIMENSION = 150

function UploadProfilePic({updateProfileImage}) {
  const [image, setImage] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");


  const imageRef = useRef(null);


  function onImageInputHandler(e) {
    // console.log(e.target.files[0]);
    // setImage(URL.createObjectURL(e.target.files[0]));

    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      if (error) setError("");
      setImage(imageUrl);
    })
    reader.readAsDataURL(file);
  }

  function onImageLoad(e) {
    const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
      setError("Image must be at least 150 x 150 pixels.");
      setImage("");
      return;
    }

    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  }

   // CANVAS FOR GETTING URL OF CROPPED IMAGE 
   function setCanvasForImage(
    imageElm, //HtmlImageElement
    // canvas, //HtmlCanvasElement
    pixelCrop //pixelCrop
  ) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    const pixelRatio = window.devicePixelRatio;
    const scaleX = imageElm.naturalWidth / imageElm.width;
    const scaleY = imageElm.naturalHeight / imageElm.height;

    canvas.width = Math.floor(pixelCrop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(pixelCrop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothQuality = "high";
    ctx.save();

    const cropX = pixelCrop.x * scaleX;
    const cropY = pixelCrop.y * scaleY;

    ctx.translate(-cropX, -cropY);
    ctx.drawImage(
      imageElm,
      0,
      0,
      imageElm.naturalWidth,
      imageElm.naturalHeight,
      0,
      0,
      imageElm.naturalWidth,
      imageElm.naturalHeight
    );

    const dataUrl = canvas.toDataURL()
    // updateProfileImage(dataUrl);
    ctx.restore();

    return dataurlToBlob(dataUrl);

  }

  function onSaveBtnClick() {
    const dataUrl = setCanvasForImage(
      imageRef.current,
      convertToPixelCrop(crop, imageRef.current.width, imageRef.current.height)
    )

    // console.log(dataUrl);

    const formData = new FormData();
    formData.append('profileImage', dataUrl)


    api.post("/user/uploadProfileImage", formData)
      .then((response) => {
        // console.log(response);
        updateProfileImage();
      })
      .catch((error) => {
        console.log(error);
        // console.log(imageURL);
      })

  }

  return (
    <>
      <div className="uploadImageContainer">
        {/* {imageURL} */}
        <h4>Choose a Profile Picture:</h4>
        <input type="file" accept="image/*" onChange={onImageInputHandler} />
        {error && <p className='errorPara'>{error}</p>}
        {image && <div className="previewCropDiv">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img ref={imageRef} src={image} alt="upload" accept="image/*" onLoad={onImageLoad} />
          </ReactCrop>

          <div className="uploadImageSaveBtnDiv">
            <button onClick={onSaveBtnClick} className="uploadImageSaveBtn">Save</button>
          </div>
        </div>}
      </div>
    </>
  )
}

export default UploadProfilePic