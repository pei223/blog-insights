import { UserInfo } from '../../interfaces/wordpresscom/userInfo'

const WP_ACCESS_TOKEN_KEY = 'wp_access_token'
const WP_SITE_ID = 'wp_site_id'

export const saveUserInfoCache = (info: UserInfo) => {
  localStorage.setItem(WP_ACCESS_TOKEN_KEY, info.accessToken)
  localStorage.setItem(WP_SITE_ID, info.siteId)
}

export const readCachedUserInfo = (): UserInfo | null => {
  const accessToken = localStorage.getItem(WP_ACCESS_TOKEN_KEY)
  const siteId = localStorage.getItem(WP_SITE_ID)
  if (!accessToken || !siteId) {
    return null
  }
  return {
    accessToken: accessToken,
    siteId: siteId,
  }
}

export const clearUserInfoCache = () => {
  localStorage.removeItem(WP_ACCESS_TOKEN_KEY)
  localStorage.removeItem(WP_SITE_ID)
}
