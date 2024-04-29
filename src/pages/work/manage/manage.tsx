import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'components/ui/Button'
import { ElementGroup, TableContainer, Title } from 'styles/components'
import { useInitWorkList, useRemoveWork } from './store/manageHook'
import Grid from 'commons/ui/grid/Grid'
import { GridNumberCell } from 'commons/ui/grid/AbsGridCell'
import type { IGrideCell } from 'commons/ui/grid/GridVo'
import type { IMemberPopupReturnData } from 'components/popup/member/store/memberPopupVo'
import styled from 'styled-components'

function MoveRegisterPageBtn() {
  const navigate = useNavigate()
  const onOpenAddForm = () => {
    navigate('/admin/work/register')
  }

  return (
    <Button
      onClick={onOpenAddForm}
      type="button"
      iconName="Edit"
      iconPosition="before"
      color="primary"
      text="업무 작성"
    />
  )
}
function GridMemberListCell({ data }: IGrideCell<[IMemberPopupReturnData[]]>) {
  return (
    <>
      {data[0].map(i => (
        <div key={i.code}>{i.name}</div>
      ))}
    </>
  )
}

function GridDetailCell({ data }: IGrideCell<[string]>) {
  const navigate = useNavigate()

  return (
    <Button
      iconName="Link"
      iconPosition="center"
      btnSize="xsm"
      color="primary"
      thin
      onClick={() => navigate(`/admin/work/detail/${data[0]}`)}
    />
  )
}
function GridRemoveCell({ data }: IGrideCell<[string]>) {
  const remove = useRemoveWork()
  return (
    <Button
      iconName="Delete"
      iconPosition="center"
      btnSize="xsm"
      color="negative"
      thin
      onClick={() => remove(data[0])}
    />
  )
}

const Badge = styled.span<{ state: number }>`
  padding: 2px 8px;
  border-radius: 2px;
  border: 1px solid ${props => (props.state === 2 ? '#ff3939' : props.state === 1 ? '#08df2c' : '#888888')};
  color: ${props => (props.state === 2 ? '#ff3939' : props.state === 1 ? '#08df2c' : '#888')};
  font-weight: 500;
  font-size: 12px;
`

function GridPriorityCell({ data }: IGrideCell<[number]>) {
  const setText = () => {
    switch (data[0]) {
      case 2:
        return '높음'
      case 1:
        return '보통'
      case 0:
        return '낮음'
      default:
        break
    }
  }

  return <Badge state={data[0]}>{setText()}</Badge>
}

function GridStateCell({ data }: IGrideCell<[number]>) {
  const setText = () => {
    switch (data[0]) {
      case 2:
        return '진행완료'
      case 1:
        return '진행중'
      case 0:
        return '진행예정'
      default:
        break
    }
  }

  return <span>{setText()}</span>
}

function WorkList() {
  const list = useInitWorkList()

  return (
    <Grid
      container={TableContainer}
      data={list ? list : []}
      setting={[
        { header: 'No.', id: [], element: GridNumberCell },
        { header: '우선순위', id: ['priority'], element: GridPriorityCell },
        { header: '업무형태', id: ['workState'], element: GridStateCell },
        { header: '제목', id: ['title'] },
        { header: '참여자', id: ['referrer'], element: GridMemberListCell },
        { header: '예상시작일자', id: ['startAt'] },
        { header: '예상종료일자', id: ['endAt'] },
        { header: '상세', id: ['code'], element: GridDetailCell },
        { header: '삭제', id: ['code'], element: GridRemoveCell },
      ]}
    />
  )
}

function WorkManage() {
  return (
    <>
      <ElementGroup.Row flexContent="between">
        <Title size="md" weight="medium">
          업무목록
        </Title>
        <MoveRegisterPageBtn />
      </ElementGroup.Row>

      <WorkList />
    </>
  )
}

export default WorkManage
