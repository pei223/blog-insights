import {
  AppBar,
  createTheme,
  LinearProgress,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import React, { ReactNode, useContext, useEffect } from 'react'
import { AppContext } from '../../stores/AppContext'

type Props = {
  children?: ReactNode
  title: string
}

const NologinLayout = ({ children, title }: Props) => {
  const { pageLoading } = useContext(AppContext)
  const theme = createTheme({
    palette: {
      primary: {
        main: '#311b92',
      },
    },
  })
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blog insights
            </Typography>
          </Toolbar>
        </AppBar>
        {pageLoading && <LinearProgress />}
        <div>{children}</div>
      </div>
    </ThemeProvider>
  )
}

export default NologinLayout
