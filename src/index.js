import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ImageFileInput from './components/common/image-file-input'
import AuthService from './service/auth.service'
import ImageUploader from './service/image-uploader'
import DropDown from './utils/dropdown'

const authService = new AuthService()
const imageUploader = new ImageUploader()
const dropDown = new DropDown()

const FileInput = (props) => (
  <ImageFileInput {...props} imageUploader={imageUploader}></ImageFileInput>
)

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} dropDown={dropDown} FileInput={FileInput} />
  </React.StrictMode>,
  document.getElementById('root')
)
