import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  createTheme,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import router from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import { SEARCH_PERIOD } from '../../../interfaces/commonInterfaces'
import { KEYWORD_VIEW_TARGET } from '../../../interfaces/keywords/KeywordInfo'
import styles from '../../../styles/layout.module.css'

type Props = {
  children?: ReactNode
  title: string
  heading: string
  demoMode?: boolean
}

const Layout = ({ children, title, heading, demoMode = false }: Props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

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
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {heading}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={styles.container}>{children}</div>
      </div>
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <div className={styles.sidemenu}>
          {demoMode && (
            <>
              <ListItem
                className={styles.sidemenuLink}
                button
                onClick={() => router?.push(`/`)}
              >
                デモを終了する
              </ListItem>
              <Divider />
            </>
          )}
          <ListItem
            className={styles.sidemenuLink}
            button
            onClick={() =>
              router?.push(`/insights${demoMode ? '?&demoMode=true' : ''}`)
            }
          >
            TOP
          </ListItem>
          <Divider />
          <ListItem
            className={styles.sidemenuLink}
            button
            onClick={() =>
              router?.push(
                `/keywords?period=${SEARCH_PERIOD.WEEK}&target=${
                  KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS
                }&page=1${demoMode ? '&demoMode=true' : ''}`
              )
            }
          >
            キーワードごとのアクセス数
          </ListItem>
          <Divider />
          <ListItem
            className={styles.sidemenuLink}
            button
            onClick={() =>
              router?.push(`/posts${demoMode ? '?&demoMode=true' : ''}`)
            }
          >
            記事ごとのアクセス数
          </ListItem>
          <Divider />
        </div>
      </Drawer>
    </ThemeProvider>
  )
}

export default Layout
