import React from 'react'
import styles from '../../styles/modules/common.module.css'

interface ILodingSpinner {
  dark?: boolean
}

const LodingSpinner = ({ dark }: ILodingSpinner) => {
  return (
    <div className={`${styles.lodingBackGround} ${dark && styles.isDark}`}>
      <div className={`${styles.lodingMiddle}`}>
        <span className="visually-hidden">로딩중</span>
      </div>
    </div>
  )
}

export default React.memo(LodingSpinner)
