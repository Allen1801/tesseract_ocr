import { useState } from 'react'
import { recognizeText } from './functions/tesseract_ocr'

import './App.css'

function App() {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const handleUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
        const upload_reader = new FileReader();
        upload_reader.onload = async () => {
            setImage(upload_reader.result as string);
            const result = await recognizeText([upload_reader.result as string]);
            setText(result.text);
        };
        upload_reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <div className="card">
        <h1>Tesseract.js OCR</h1>
        <h2>Upload Image</h2>
        <input 
          type="file" 
          name="file" 
          id="file" 
          accept='image/*' 
          onChange={handleUpload}/>

        <div className="container">
          <div className="image-container box">
            <img src={image} />
          </div>

          <div className='text-box box'>
            <textarea 
              name="output" 
              id="output"
              value={text}
              onChange={(e) => setText(e.target.value)}>
              </textarea>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
