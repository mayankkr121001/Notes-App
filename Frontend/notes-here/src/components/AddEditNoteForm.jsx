import React, { useEffect, useRef, useState } from 'react'
import colors from "../assets/colors.png"
import image from "../assets/image.png"
import close from "../assets/close.png"

import api from '../interceptors/axios.js'


function AddEditNoteForm({ closeAddEditNoteForm, getAddImageFlag, addOrEdit, currentNoteDetails }) {
  const [openColorSelectorFlag, setOpenColorSelectorFlag] = useState(false);
  const [openImageSelectorFlag, setOpenImageSelectorFlag] = useState(false);
  const [imageSelectedFlag, setImageSelectedFlag] = useState(false);
  const [addedImage, setAddedImage] = useState("");
  // const [colorSelectedFlag, setColorSelectedFlag] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("");
  const [contentImage, setContentImage] = useState("");


  let colorArray = [1, 2, 3, 4, 5];
  const colorBoxRef = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

  function onClickColorSelector() {
    setOpenColorSelectorFlag(true);
  }
  function onClickImageSelector() {
    setOpenImageSelectorFlag(true);
  }
  function onColorBoxClick(elm, index) {
    // console.log(colorBoxRef.current[index].current.classList);
    // console.log(colorBoxRef.current[index].current);
    if (colorBoxRef.current[index].current.classList.contains(`colorOption${elm}`)) {
      colorArray.forEach((elm, ind) => {
        colorBoxRef.current[ind].current.classList.remove("colorBoxActive");
      })
      colorBoxRef.current[index].current.classList.add("colorBoxActive");
    }

    // console.log(window.getComputedStyle(colorBoxRef.current[index].current).backgroundColor);
    const boxColor = window.getComputedStyle(colorBoxRef.current[index].current).backgroundColor;
    setColor(boxColor);
    // setColorSelectedFlag(true);
  }

  function onAddingImageInput(e) {
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    // console.log(e.target.files[0]);
    setContentImage(e.target.files[0])

    setAddedImage(imgUrl);
    setImageSelectedFlag(true);
  }
  useEffect(() => {
    getAddImageFlag(imageSelectedFlag);
  }, [imageSelectedFlag, addedImage])


  // useEffect for showing previous data on edit form
  useEffect(() => {
    if (addOrEdit === "Edit") {
      // console.log("It is edit");
      // console.log(currentNoteDetails);

      setTitle(currentNoteDetails.title)
      setContent(currentNoteDetails.content)
      setColor(currentNoteDetails.color)
      setContentImage(currentNoteDetails.contentImage)
      // console.log(currentNoteDetails.contentImage);

      setAddedImage(currentNoteDetails.contentImage)

    }
  }, [])

  function onAddEditBtnClickFunc() {
    if (addOrEdit === "Add") {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('color', color);
      formData.append('contentImage', contentImage);
      // console.log("addClicked");
      // console.log(addedImage);

      api.post("/note/createNote", formData)
        .then((response) => {
          // console.log(response);

          closeAddEditNoteForm();
        })
        .catch((error) => {
          console.log(error);

        })

    }
    else if (addOrEdit === "Edit") {
      // console.log("editClicked");
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('color', color);
      formData.append('contentImage', contentImage);

      function editNoteFunc() {
        api.patch(`/note/editNote/${currentNoteDetails._id}`, formData)
          .then(response => {
            // console.log(response);
            closeAddEditNoteForm();

          })
          .catch(error => {
            console.log(error);

          })

      }
      editNoteFunc()

    }
  }




  return (
    <>
      <div className="addEditNoteContainer">
        <img onClick={closeAddEditNoteForm} className="addEditcloseIcon" src={close} alt='close button' />
        <h2>{addOrEdit} Note</h2>
        <div className="noteTitleContentDiv">
          <input onChange={e => setTitle(e.target.value)} className='noteTitleInput' type="text" placeholder='Title' spellCheck="false" value={title} />

          {imageSelectedFlag && <div><img className='addedImageClass' src={addedImage} alt="added Image" /></div>}
          {!imageSelectedFlag && currentNoteDetails?.contentImage && <div><img className='addedImageClass' src={addedImage} alt="added Image" /></div>}

          <textarea onChange={e => setContent(e.target.value)} className='noteContentInputArea' name="content" placeholder='Content' spellCheck="false" value={content}>
          </textarea>
        </div>
        <div className="optionsSaveUpdateDiv">
          <div className="optionsDiv">
            <img onClick={onClickColorSelector} src={colors} alt="add color" />
            <img onClick={onClickImageSelector} src={image} alt="add image" />
          </div>
          <button onClick={onAddEditBtnClickFunc} className="saveUpdateBtn">{addOrEdit}</button>
        </div>
        {openColorSelectorFlag &&
          <div onMouseLeave={() => setOpenColorSelectorFlag(false)} className="colorPopupDiv">
            {colorArray.map((element, index) => (
              <div key={index} ref={colorBoxRef.current[index]} onClick={() => onColorBoxClick(element, index)} className={`colorBox colorOption${element}`}></div>
            ))
            }
          </div>
        }
        {openImageSelectorFlag &&
          <div onMouseLeave={() => setOpenImageSelectorFlag(false)} className="imageSelectorDiv">
            <input onChange={onAddingImageInput} type="file" accept='image/*' />
          </div>
        }
      </div>
    </>
  )
}

export default AddEditNoteForm