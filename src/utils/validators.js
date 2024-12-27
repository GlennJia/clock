export const emailValidator = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const nameValidator = (name) => {
  return name.length >= 2 && name.length <= 50
} 