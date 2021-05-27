import React, { useEffect, useState } from 'react'

import './styles/main.css'

import SideNavigation from './components/side-navigation'
import Overlay from './components/common/overlay'
import AuthPopup from './components/common/auth-popup'
import Router from './routers/router'
import { BrowserRouter } from 'react-router-dom'

const App = ({ authService }) => {
  const [menus, setMenus] = useState('home')
  const [overlay, setOverlay] = useState('close')
  const [isUser, setIsUser] = useState(false)
  const [searchIsOpen, setSearchIsOpen] = useState(true)
  const [teams] = useState([
    { id: 1, value: '전체' },
    { id: 2, value: '인사' },
    { id: 3, value: '회계' },
    { id: 4, value: '개발' },
    { id: 5, value: '영업' },
    { id: 6, value: '기획' },
    { id: 7, value: '디자인' },
  ])
  const [ranks] = useState([
    { id: 1, value: '전체' },
    { id: 2, value: '부장' },
    { id: 3, value: '차장' },
    { id: 4, value: '과장' },
    { id: 5, value: '대리' },
    { id: 6, value: '직원' },
  ])
  const [cards] = useState([
    {
      uid: '1',
      time: '10:00',
      team: '개발',
      ramk: '대리',
      name: 'Anna',
      theme: '1',
      msg: '오늘도 화이팅!',
      phone: '010-1234-5678',
      telephone: '9101',
      imgURL: null,
      email: 'test123@abc.com',
      position: '3층 E5',
    },
  ])

  const onSearchOpen = () => {
    setSearchIsOpen()
  }

  const handleHomeActive = () => {
    setMenus('home')
  }

  const handleSearchActive = () => {
    setMenus('search')
  }

  const handleOpenPopup = () => {
    overlay === 'close' ? setOverlay('open') : setOverlay('close')
  }

  useEffect(() => {
    authService.onAuthChange((user) => {
      user ? setIsUser(true) : setIsUser(false)
    })
  })

  return (
    <BrowserRouter>
      <div className="container">
        <div className="row">
          <SideNavigation
            handleHomeActive={handleHomeActive}
            handleSearchActive={handleSearchActive}
            handleOpenPopup={handleOpenPopup}
            menus={menus}
            isUser={isUser}
            authService={authService}
            setSearchIsOpen={setSearchIsOpen}
          ></SideNavigation>
          <Router
            authService={authService}
            isUser={isUser}
            handleHomeActive={handleHomeActive}
            handleSearchActive={handleSearchActive}
            searchIsOpen={searchIsOpen}
            onSearchOpen={onSearchOpen}
            cards={cards}
            teams={teams}
            ranks={ranks}
          ></Router>
        </div>
      </div>
      <AuthPopup
        overlay={overlay}
        handleOpenPopup={handleOpenPopup}
        authService={authService}
      ></AuthPopup>
      <Overlay overlay={overlay} handleOpenPopup={handleOpenPopup}></Overlay>
    </BrowserRouter>
  )
}

export default App
