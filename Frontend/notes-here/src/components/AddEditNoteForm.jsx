import React, { useRef, useState } from 'react'
import colors from "../assets/colors.png"
import image from "../assets/image.png"
import close from "../assets/close.png"

function AddEditNoteForm({ closeAddEditNoteForm , getAddImageFlag}) {
  const [openColorSelectorFlag, setOpenColorSelectorFlag] = useState(false);
  const [openImageSelectorFlag, setOpenImageSelectorFlag] = useState(false);
  const [imageSelectedFlag, setImageSelectedFlag] = useState(false);
  const [addedImage, setAddedImage] = useState("");
  // const [colorSelectedFlag, setColorSelectedFlag] = useState(false);


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
    // setColorSelectedFlag(true);
  }

  function onAddingImageInput(e) {
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    // console.log(e.target.files[0]);

    setAddedImage(imgUrl);
    setImageSelectedFlag(true);
  }
  getAddImageFlag(imageSelectedFlag);

  return (
    <>
      <div className="addEditNoteContainer">
        <img onClick={closeAddEditNoteForm} className="addEditcloseIcon" src={close} alt='close button' />
        <h2>Add Note</h2>
        <div className="noteTitleContentDiv">
          <input className='noteTitleInput' type="text" placeholder='Title' spellCheck="false" />
          {imageSelectedFlag && <div contentEditable="false"><img className='addedImageClass' src={addedImage} alt="added Image" /></div>}
          <div contentEditable="true" className='noteContentInputArea' name="content" placeholder='Content' spellCheck="false">
            {/* <div className='noteContentInputArea' contentEditable="true"></div> */}
          </div>
        </div>
        <div className="optionsSaveUpdateDiv">
          <div className="optionsDiv">
            <img onClick={onClickColorSelector} src={colors} alt="add color" />
            <img onClick={onClickImageSelector} src={image} alt="add image" />
          </div>
          <button className="saveUpdateBtn">Add</button>
        </div>
        {openColorSelectorFlag &&
          <div onMouseLeave={() => setOpenColorSelectorFlag(false)} className="colorPopupDiv">
            {colorArray.map((element, index) => (
              <div ref={colorBoxRef.current[index]} onClick={() => onColorBoxClick(element, index)} className={`colorBox colorOption${element}`}></div>
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