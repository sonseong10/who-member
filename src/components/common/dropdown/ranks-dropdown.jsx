import React, { useState } from 'react'
import { BiChevronUp } from 'react-icons/bi'

import DropDown from './dropdown'

import styles from '../../../styles/modules/dropdown.module.css'
import formStyles from '../../../styles/modules/search_form.module.css'
import buttonStyles from '../../../styles/modules/buttons.module.css'

const RanksDropdown = ({ dropDown, rankRef, rankValue }) => {
  const items = dropDown.getRanks()

  const [ranksType, setRanksType] = useState(rankValue ? rankValue : items[0].value)
  const [ranksIsOpen, setRanksIsOpen] = useState(false)


  const handleRanksValue = (value) => {
    onRanksOpen()
    setRanksType(value)
  }

  const onRanksOpen = () => {
    setRanksIsOpen(!ranksIsOpen)
  }

  return (
    <div className={`${styles.ranks} ${ranksIsOpen && styles.isActive}`}>
      <p className={formStyles.formLabel}>직급명</p>

      <button
        className={`${formStyles.formInput} ${buttonStyles.baseBtn}`}
        onClick={onRanksOpen}
        type="button"
        ref={rankRef}
      >
        {ranksType} <BiChevronUp className={styles.dropdownIcon} />
      </button>

      <div className={styles.ranksList}>
        <DropDown
          listItems={items}
          handleEvent={handleRanksValue}
        />
      </div>
    </div>
  )
}

export default RanksDropdown