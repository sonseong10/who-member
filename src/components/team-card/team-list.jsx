import React, { useRef } from 'react'
import TeamItem from './team-item'

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

import styles from '../../styles/modules/team_card.module.css'

const TeamList = ({ cards, userCard }) => {
  const containerRef = useRef()

  const filterKey = Object.keys(cards).filter(
    (key) => key && cards[key].team.includes(userCard.team)
  )

  const onPrevScroll = () => {
    containerRef.current.scrollLeft -= 260
  }

  const onNextScroll = () => {
    containerRef.current.scrollLeft += 260
  }

  return (
    <div className={styles.teamListWrapper}>
      <ul className={styles.teamList} ref={containerRef}>
        {filterKey.length &&
          filterKey.map((key) => (
            <TeamItem card={cards[key]} key={key}></TeamItem>
          ))}
      </ul>

      <button
        className={`sm-hidden ${styles.moveBtn} ${styles.prevBtn}`}
        onClick={onPrevScroll}
      >
        <BiChevronLeft />
        <span className="visually-hidden">preview</span>
      </button>

      <button
        className={`sm-hidden ${styles.moveBtn} ${styles.nextBtn}`}
        onClick={onNextScroll}
      >
        <BiChevronRight />
        <span className="visually-hidden">next</span>
      </button>
    </div>
  )
}

export default TeamList
