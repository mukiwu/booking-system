// timestamp convert to date format
const dateFormat = (timestamp: number) => {
  const tmp = new Date(timestamp)
  const year = tmp.getFullYear()
  let month: string | number = tmp.getMonth() + 1
  let day: string | number = tmp.getDate()
  let hour: string | number = tmp.getHours()
  let minute: string | number = tmp.getMinutes()

  month = month < 10 ? `0${month}` : month
  day = day < 10 ? `0${day}` : day
  hour = hour < 10 ? `0${hour}` : hour
  minute = minute < 10 ? `0${minute}` : minute

  return `${year}-${month}-${day} ${hour}:${minute}`
}

export {
  dateFormat
}
