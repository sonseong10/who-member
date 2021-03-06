function formatDate(value) {
  const date = new Date(value)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month > 9 ? month : `0${month}`
  const day = date.getDate()
  let hours = date.getHours()
  hours = hours > 9 ? hours : `0${hours}`
  let minutes = date.getMinutes()
  minutes = minutes > 9 ? minutes : `0${minutes}`

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

function formatMsg(value) {
  value.replace(/\n/g, '<br/>').replace(/<br\/>/g, '\r\n')

  return value
}

export { formatDate, formatMsg }
