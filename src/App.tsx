import React, {
  useCallback,
  useEffect,
  useState,
  type MemoExoticComponent,
  lazy,
  Suspense,
} from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import GlobalHeader from './components/common/global-header'
import GlobalFooter from './components/common/global-footer'
import Overlay from './components/common/overlay'
import MsgPopup from './components/common/popup/msg-popup'
import MobileSideBar from './components/common/mobile-sidebar'

import './styles/main.css'
import type WorkRepository from 'service/work-repository'
import type CardRepository from 'service/card_repository'
import type DropDown from 'utils/dropdown'
import type AuthService from 'service/auth_service'
import type { User } from 'firebase/auth'
import type ImageUploader from 'service/image-uploader'
import type { ICardVo, IWorkVo } from 'types/grobal-type'
import LodingSpinner from 'components/common/loding-spinner'

const HomePage = lazy(() => import('pages/home/home-page'))
const Maker = lazy(() => import('components/form/maker/maker'))
const Search = lazy(() => import('pages/search/search'))
const Work = lazy(() => import('pages/work/work'))
const Update = lazy(() => import('components/form/update/update'))
const Detail = lazy(() => import('pages/search/detail/detail'))
const ProductList = lazy(() => import('pages/product/list'))
const NotPage = lazy(() => import('components/errors/not-page'))
const Login = lazy(() => import('pages/auth/login'))
const MainContent = lazy(() => import('components/main-content'))
const ProductDetail = lazy(() => import('pages/product/detail'))

interface IAppProps {
  FileInput: MemoExoticComponent<
    (props: {
      imageUploader?: ImageUploader
      name: string
      onFileChange?: (obj: { name?: string; url?: string }) => void
    }) => React.JSX.Element
  >
  dropDown: DropDown
  authService: AuthService
  cardRepository: CardRepository
  workRepository: WorkRepository
}

function App({
  FileInput,
  dropDown,
  authService,
  cardRepository,
  workRepository,
}: IAppProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const historyState = location?.state

  const [userId, setUserId] = useState(historyState && historyState.id)

  const [cards, setCards] = useState<{ [key: string]: ICardVo } | undefined>(
    undefined
  )
  const [works, setWorks] = useState<{ [key: string]: IWorkVo } | undefined>(
    undefined
  )

  const [userCard, setUserCard] = useState<ICardVo | undefined>(undefined)
  const [popupMsg, setpopupMsg] = useState({ title: '', desc: '' })

  const [menuActive, setMenuActive] = useState<string>('home')
  const [loding, setLoding] = useState(false)
  const [authPopup, setAuthPopup] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [magPopup, setMagPopup] = useState(false)

  const [dark, setDark] = useState(localStorage.getItem('darkMode') === 'true')

  useEffect(() => {
    setLoding(true)
    authService.onAuthChange((user: User) => {
      if (user) {
        setUserId(user.uid)
      } else {
        setUserId('')
        navigate('/')
      }
      setLoding(false)
    })
  }, [authService, navigate])

  const onLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    authService.login(event.currentTarget!.value, setMsg).then(
      (data) =>
        data &&
        cards![data.user.uid] &&
        cardRepository.saveCard(data.user.uid, {
          ...cards![data.user.uid],
          login: true,
        })
    )
    setWorks({})
    setUserCard(undefined)
    navigate('/admin/main')
  }

  const onLogout = () => {
    userCard &&
      Object.keys(userCard!).length &&
      cardRepository.saveCard(userId, {
        ...(
          cards as {
            [key: string]: ICardVo
          }
        )[userId],
        login: false,
      })
    setUserCard(undefined)
    window.location.href = '/'
    authService.logout()
  }

  const deleteAccount = () => {
    deleteCard()
    setWorks({})
    setUserCard(undefined)
    setMagPopup(true)
    workRepository.removeWorkAll(userId)
    authService.delete(setMsg)
  }

  const setMsg = (title: string, desc: string) => {
    setpopupMsg({
      title: '',
      desc: '',
    })
    setpopupMsg({
      title: title,
      desc: desc,
    })
    setMagPopup(true)
  }

  useEffect(() => {
    cardRepository.syncCards((cards: { [key: string]: ICardVo }) => {
      setCards(cards)
    })
    return () => {}
  }, [cardRepository, userId])

  useEffect(() => {
    if (!userId) {
      return
    }

    if (cards && Object.keys(cards).find((item) => item === userId)) {
      setUserCard({ ...cards![userId] })
    } else {
      setUserCard(undefined)
    }
  }, [cards, userId])

  const createOrUpdateCard = (card: ICardVo) => {
    setCards((cards) => {
      const updated: {
        [key: string]: ICardVo
      } = { ...cards }
      updated[userId] = card
      return updated
    })
    cardRepository.saveCard(userId, card)
  }

  const deleteCard = () => {
    setCards((cards) => {
      const updated = { ...cards }
      delete updated[userId]
      return updated
    })
    cardRepository.removeCard(userId)
  }

  useEffect(() => {
    if (!userId) {
      return
    }
    const stopSync = workRepository.syncWorks(
      userId,
      (works: { [key: string]: IWorkVo }) => {
        setWorks(works)
      }
    )

    return () => {
      stopSync()
    }
  }, [userId, workRepository])

  const createOrUpdateWork = (work: IWorkVo) => {
    setWorks((works) => {
      const updated = { ...works }
      updated[userId] = work
      return updated
    })
    workRepository.saveWork(userId, work)
  }

  const deleteWork = (work: IWorkVo) => {
    setWorks((works) => {
      const updated = { ...works }
      delete updated[work.time]
      return updated
    })
    workRepository.removeWork(userId, work)
  }

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(dark))
  }, [dark])

  const handleModeChange = useCallback(() => {
    document.body.classList.toggle('isDark')
    setDark(!dark)
  }, [dark])

  const toggleOverlay = useCallback(() => {
    setAuthPopup(!authPopup)
  }, [authPopup])

  const toggleOpenSideBar = useCallback(() => {
    setSidebarOpen(!sidebarOpen)
  }, [sidebarOpen])

  const toggleMsgPopup = useCallback(() => {
    setMagPopup(!magPopup)
  }, [magPopup])

  const onMenuChange = (value: string) => {
    setMenuActive(value)
  }

  return (
    <div className="app">
      <GlobalHeader
        userId={userId}
        userCard={userCard}
        toggleOverlay={toggleOverlay}
        toggleOpenSideBar={toggleOpenSideBar}
        dark={dark}
      ></GlobalHeader>

      <Routes>
        <Route index element={<Login onLogin={onLogin} />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<LodingSpinner />}>
              <MainContent
                ToggleOverlay={toggleOverlay}
                dark={dark}
                handleModeChange={handleModeChange}
                loding={loding}
                menuActive={menuActive}
                onLogout={onLogout}
                userId={userId}
                userCard={userCard}
              />
            </Suspense>
          }
        >
          <Route
            path="main"
            element={
              <Suspense fallback={<LodingSpinner />}>
                <HomePage
                  isCard={userCard}
                  cards={cards}
                  works={works}
                  userCard={userCard}
                  onMenuChange={onMenuChange}
                  dark={dark}
                />
              </Suspense>
            }
          />
          <Route
            path="maker"
            element={
              <Suspense fallback={<LodingSpinner />}>
                <Maker
                  FileInput={FileInput}
                  dropDown={dropDown}
                  isCard={userCard}
                  createCard={createOrUpdateCard}
                  onMenuChange={onMenuChange}
                  dark={dark}
                ></Maker>
              </Suspense>
            }
          />
          <Route
            path="member"
            element={
              <Suspense fallback={<LodingSpinner />}>
                <Search
                  dropDown={dropDown}
                  cards={cards}
                  onMenuChange={onMenuChange}
                  dark={dark}
                ></Search>
              </Suspense>
            }
          />
          <Route
            path="work"
            element={
              <Suspense fallback={<LodingSpinner />}>
                <Work
                  onMenuChange={onMenuChange}
                  userId={userId}
                  works={works}
                  createWork={createOrUpdateWork}
                  updateWork={createOrUpdateWork}
                  deleteWork={deleteWork}
                  dark={dark}
                ></Work>
              </Suspense>
            }
          ></Route>
          <Route
            path="update"
            element={
              <Suspense fallback={<LodingSpinner />}>
                <Update
                  FileInput={FileInput}
                  userCard={userCard}
                  dropDown={dropDown}
                  updateCard={createOrUpdateCard}
                  deleteCard={deleteAccount}
                  dark={dark}
                ></Update>
              </Suspense>
            }
          ></Route>
          <Route
            path="detail"
            element={
              <Suspense fallback={<LodingSpinner />}>
                <Detail cards={cards} dark={dark}></Detail>
              </Suspense>
            }
          ></Route>
          <Route path="product/*">
            <Route
              path="list"
              element={
                <Suspense fallback={<LodingSpinner />}>
                  <ProductList onMenuChange={onMenuChange} dark={dark} />
                </Suspense>
              }
            ></Route>
            <Route
              path="info"
              element={
                <Suspense fallback={<LodingSpinner />}>
                  <ProductDetail />
                </Suspense>
              }
            ></Route>
            <Route
              path="*"
              element={
                <Suspense fallback={<LodingSpinner />}>
                  <NotPage dark={dark}></NotPage>
                </Suspense>
              }
            ></Route>
          </Route>
          <Route
            path="*"
            element={
              <Suspense fallback={<LodingSpinner />}>
                <NotPage dark={dark}></NotPage>
              </Suspense>
            }
          ></Route>
        </Route>
      </Routes>

      <MobileSideBar
        onLogout={onLogout}
        isCard={userCard !== undefined ? Object.keys(userCard).length : 0}
        sidebarOpen={sidebarOpen}
        toggleOpenSideBar={toggleOpenSideBar}
        handleModeChange={handleModeChange}
        dark={dark}
      ></MobileSideBar>

      {magPopup && (
        <>
          <MsgPopup
            popupMsg={popupMsg}
            magPopup={magPopup}
            toggleMsgPopup={toggleMsgPopup}
          ></MsgPopup>
          <Overlay overlay={magPopup} ToggleOverlay={toggleMsgPopup}></Overlay>
        </>
      )}

      <GlobalFooter
        userId={userId}
        menuActive={menuActive}
        dark={dark}
      ></GlobalFooter>
    </div>
  )
}

export default App
