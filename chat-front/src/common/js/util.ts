export function setStorage(key: string, value: any) {
  if (typeof value === "string") {
    localStorage.setItem(key, value)
  } else {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export function getStorage(key: string, type: 'string' | 'object') {
  const value = localStorage.getItem(key)
  if (type === "string") {
    return value
  } else {
    return value ? JSON.parse(value) : null
  }
}
