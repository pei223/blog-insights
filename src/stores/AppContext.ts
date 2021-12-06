import React, { Dispatch } from 'react'

export type AppContextType = {
  pageLoading: boolean
  setPageLoading: Dispatch<React.SetStateAction<boolean>>
}
export const AppContext = React.createContext<AppContextType>({
  pageLoading: false,
  setPageLoading: () => {
    throw new Error('setPageLoading not set')
  },
})
