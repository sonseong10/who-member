import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatMsg } from '../../../utils/filters'

import DEFAULT_USER_IMG from '../../../assets/images/img-user-default.png'

import buttonStyles from '../../../styles/modules/buttons.module.css'
import styles from '../../../styles/modules/detail.module.css'
import type { ICardVo } from 'types/grobal-type'

interface IDetailProps {
  cards?: {
    [key: string]: ICardVo
  }
  dark: boolean
}

const Detail = ({ cards, dark }: IDetailProps) => {
  const [card, setCard] = useState<ICardVo | undefined>(undefined)
  const position = location.href.split('/').pop()

  useEffect(() => {
    setCard({ ...cards![position!] })
  }, [cards])

  const replaceMsg = card?.msg && formatMsg(card?.msg)

  return (
    <div className="col-sm-4 col-md-12">
      <div className={`${styles.detailGroup} ${dark && styles.isDark}`}>
        <header className={styles.header}>
          <h2 className={styles.pageTitle}>사용자 정보</h2>
        </header>
        <div>
          <div className={styles.infoGroup}>
            <figure className={styles.imgWrapper}>
              <img src={card?.fileURL || DEFAULT_USER_IMG} alt="" />
              <figcaption className="visually-hidden">profile</figcaption>
            </figure>

            <dl className={styles.userInfoList}>
              <div className={styles.userInfoItem}>
                <dt>이름</dt>
                <dd>{card?.name}</dd>
              </div>
              <div className={styles.userInfoItem}>
                <dt>이메일</dt>
                <dd>
                  <a href={`mailto:${card?.email}`}>{card?.email}</a>
                </dd>
              </div>
              <div className={styles.userInfoItem}>
                <dt>부서</dt>
                <dd>{card?.team}</dd>
              </div>
              <div className={styles.userInfoItem}>
                <dt>직급</dt>
                <dd>{card?.rank}</dd>
              </div>
              <div className={styles.userInfoItem}>
                <dt>휴대전화</dt>
                <dd>
                  <a href={`tel:+${card?.phone}`}>{card?.phone}</a>
                </dd>
              </div>
            </dl>
          </div>
          <div className={styles.contentsGroup}>
            <dl className={styles.infoContents}>
              <div className={styles.userInfoItem}>
                <dt>상태</dt>
                <dd>
                  <strong className={`${styles.loginState} ${card?.login ? styles.isLogin : styles.isOffline}`}>
                    {card?.login ? '근무중' : '오프라인'}
                  </strong>
                </dd>
              </div>
              <div className={`${styles.userInfoItem} ${styles.msg}`}>
                <dt>남긴말</dt>
                <dd className={styles.msgBox}>{replaceMsg ? replaceMsg : '없음'}</dd>
              </div>
            </dl>
          </div>
        </div>
        <footer className={styles.footer}>
          <Link to="/admin/member" className={`${buttonStyles.baseBtn} ${buttonStyles.ghostBtn} ${styles.returnBtn}`}>
            Close
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default Detail
