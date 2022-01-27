import React, { Dispatch } from 'react'
import { UserInfo } from '../interfaces/wordpresscom/userInfo'

export type AppContextType = {
  pageLoading: boolean
  setPageLoading: Dispatch<React.SetStateAction<boolean>>
  userInfo: UserInfo
  setUserInfo: Dispatch<React.SetStateAction<UserInfo>>
  demoMode: boolean
}
export const AppContext = React.createContext<AppContextType>(
  {} as AppContextType
)
