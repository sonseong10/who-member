import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiUserCircle } from 'react-icons/bi'

import buttonStyles from '../../styles/modules/buttons.module.css'
import styles from '../../styles/modules/mobile-navbar.module.css'

import DEFAULT_USER_IMG from '../../assets/images/img-user-default.png'
import Logo from '../../assets/images/logo.svg'
import type { ICardVo } from 'types/grobal-type'

interface IGlobalHeaderProps {
  userId: string
  userCard?: ICardVo
  toggleOverlay: () => void
  toggleOpenSideBar: () => void
  dark: boolean
}
const GlobalHeader = memo(
  ({
    userId,
    userCard,
    toggleOverlay,
    toggleOpenSideBar,
    dark,
  }: IGlobalHeaderProps) => {
    const [hide, setHide] = useState(false)
    const [pageY, setPageY] = useState(0)

    const sticky = function (stickyScroll: () => void, waitTime: number) {
      let timerId: NodeJS.Timeout | null = null
      return () => {
        if (timerId) return
        timerId = setTimeout(() => {
          stickyScroll.call(null)
          timerId = null
        }, waitTime)
      }
    }

    const handleScroll = () => {
      const { pageYOffset } = window
      const deltaY = pageYOffset - pageY
      const hide = pageYOffset !== 0 && deltaY >= 0
      setHide(hide)
      setPageY(pageYOffset)
    }

    const stickyScroll = sticky(handleScroll, 50)

    useEffect(() => {
      document.addEventListener('scroll', stickyScroll)
      return () => document.removeEventListener('scroll', stickyScroll)
    }, [stickyScroll, pageY])

    return (
      <header className={`sm-only ${styles.header} ${dark && styles.isDark}`}>
        <div className={`${styles.globalHeader} ${hide && styles.hide}`}>
          <strong className={styles.logo}>
            <Link to={userId ? '/' : '#'}>
              <img
                className="logo-img"
                src={!dark ? Logo : ''}
                alt="WhoMember"
              />
            </Link>
          </strong>

          <button
            className={`${buttonStyles.baseBtn} ${styles.mobileIcon}`}
            onClick={!userId ? toggleOverlay : toggleOpenSideBar}
            type="button"
          >
            {!userId ? (
              <>
                <BiUserCircle aria-hidden />
                <strong className="visually-hidden">
                  로그인 또는 회원가입
                </strong>
              </>
            ) : (
              <figure>
                <img
                  className={styles.smProfile}
                  src={userCard ? userCard!.fileURL : DEFAULT_USER_IMG}
                  alt=""
                />
                <figcaption className="visually-hidden">사용자</figcaption>
              </figure>
            )}
          </button>
        </div>
      </header>
    )
  }
)

export default GlobalHeader
