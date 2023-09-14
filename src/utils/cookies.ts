import Cookies from 'js-cookie'
const Token_Key = 'token_key'
export const setToken = (token: string) => {
  Cookies.set(Token_Key, token)
}
export const getToken = () => {
  return Cookies.get(Token_Key)
}
export const removeToken = () => {
  Cookies.remove(Token_Key)
}
