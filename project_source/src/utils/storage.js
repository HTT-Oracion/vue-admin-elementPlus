const getItem = (name) => {
  let data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}

const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

const storageClear = () => {
  window.localStorage.clear()
}

export {
  getItem,
  setItem,
  storageClear
}