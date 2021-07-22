import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  validateEmail,
  validateName,
  validatePhone,
} from '../../../utils/validation'

import TeamsDropdown from '../../common/dropdown/teams-dropdown'
import RanksDropdown from '../../common/dropdown/ranks-dropdown'
import ThemesDropdown from '../../common/dropdown/themes-dropdown'

import buttonStyles from '../../../styles/modules/buttons.module.css'
import styles from '../../../styles/modules/maker.module.css'

const AddCardForm = ({ FileInput, createCard, dropDown }) => {
  const history = useHistory()

  const nameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const telephoneRef = useRef()
  const msgRef = useRef()
  const themeRef = useRef()
  const teamRef = useRef()
  const rankRef = useRef()
  const formRef = useRef()

  const [file, setFile] = useState({ fileName: null, fileURL: null })
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [submit, setSubmit] = useState(true)

  useEffect(() => {
    if (
      !nameRef.current.value ||
      !emailRef.current.value ||
      !phoneRef.current.value
    ) {
      setSubmit(true)
      return
    } else {
      if (nameError || emailError || phoneError) {
        setSubmit(true)
      } else {
        setSubmit(false)
      }
    }
  }, [nameError, emailError, phoneError])

  const nameValidate = ({ currentTarget: { value } }) => {
    onValidate(value, validateName, setNameError)
  }

  const emailValidate = ({ currentTarget: { value } }) => {
    onValidate(value, validateEmail, setEmailError)
  }

  const phoneValidate = ({ currentTarget: { value } }) => {
    onValidate(value, validatePhone, setPhoneError)
  }

  const onValidate = (value, valudate, errorType) => {
    if (valudate(value)) {
      errorType(false)
    } else {
      errorType(true)
    }
  }

  const onFileChange = (file) => {
    setFile({
      fileName: file.name,
      fileURL: file.url,
    })
  }

  const submitForm = (e) => {
    e.preventDefault()
    const card = {
      login: true,
      name: nameRef.current.value,
      msg: msgRef.current.value || '',
      telephone: telephoneRef.current.value || '',
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      theme: themeRef.current.innerText,
      team: teamRef.current.innerText,
      rank: rankRef.current.innerText,
      fileName: file.fileName || '',
      fileURL: file.fileURL || '',
    }
    formRef.current.reset()
    setFile({ fileName: null, fileURL: null })
    createCard(card)
    history.push('/main')
  }

  return (
    <form className={styles.authForm} ref={formRef} onSubmit={submitForm}>
      <FileInput name={file.fileName} onFileChange={onFileChange}></FileInput>

      <p className={styles.formLabel}>이름*</p>
      <input
        className={`${styles.authFormInput} ${nameError && styles.isError}`}
        type="text"
        id="name"
        ref={nameRef}
        placeholder="Name"
        onChange={nameValidate}
      />
      {nameError && (
        <strong className={styles.errorText}>
          should only be used in English or Korean without spaces.
        </strong>
      )}

      <p className={styles.formLabel}>이메일*</p>
      <input
        className={`${styles.authFormInput} ${emailError && styles.isError}`}
        type="email"
        id="email"
        ref={emailRef}
        placeholder="Email"
        onChange={emailValidate}
      />
      {emailError && (
        <strong className={styles.errorText}>
          Please maintain the email format.
        </strong>
      )}

      <p className={styles.formLabel}>휴대전화*</p>
      <input
        className={`${styles.authFormInput} ${phoneError && styles.isError}`}
        type="text"
        id="phone"
        ref={phoneRef}
        placeholder={`Phone (Include "-")`}
        onChange={phoneValidate}
      />
      {phoneError && (
        <strong className={styles.errorText}>
          Please enter your phone number including "-"
        </strong>
      )}

      <p className={styles.formLabel}>유선전화</p>
      <input
        className={styles.authFormInput}
        type="text"
        id="telephone"
        ref={telephoneRef}
        placeholder="TelePhone"
      />

      <p className={styles.formLabel}>남긴말</p>
      <textarea
        className={styles.authFormInput}
        id="msg"
        ref={msgRef}
        cols="30"
        rows="3"
        maxLength="100"
        placeholder="Msg"
      ></textarea>

      <div className={styles.typeBtnList}>
        <ThemesDropdown
          dropDown={dropDown}
          themeRef={themeRef}
        ></ThemesDropdown>

        <TeamsDropdown dropDown={dropDown} teamRef={teamRef}></TeamsDropdown>

        <RanksDropdown dropDown={dropDown} rankRef={rankRef}></RanksDropdown>
      </div>

      <button
        className={`${buttonStyles.baseBtn} ${buttonStyles.primaryBtn} ${styles.submitBtn}`}
        type="submit"
        disabled={submit}
      >
        {submit ? 'Disable' : 'Create'}
      </button>
    </form>
  )
}

export default AddCardForm