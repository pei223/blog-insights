import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  createTheme,
  Divider,
  Drawer,
  IconButton,
  LinearProgress,
  ListItem,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import router from 'next/router'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { SEARCH_PERIOD } from '../../../interfaces/commonInterfaces'
import { KEYWORD_VIEW_TARGET } from '../../../interfaces/keywords/KeywordInfo'
import { AppContext } from '../../../stores/AppContext'
import styles from '../../../styles/layout.module.css'

type Props = {
  children?: ReactNode
  title: string
  heading: string
}

const Layout = ({ children, title, heading }: Props) => {
  const { pageLoading, demoMode } = useContext(AppContext)
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

  const withDemoMode = (query) => {
    if (demoMode) {
      query['demoMode'] = true
    }
    return query
  }

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
              {`${demoMode ? 'DEMO ' : ''}${heading}`}
            </Typography>
          </Toolbar>
        </AppBar>
        {pageLoading ? (
          <>
            <LinearProgress />
            <div
              style={{
                zIndex: 9999,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
              }}
            ></div>
          </>
        ) : (
          <div style={{ height: '4px' }}></div>
        )}
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
                ?????????????????????
              </ListItem>
              <Divider />
            </>
          )}
          <ListItem
            className={styles.sidemenuLink}
            button
            onClick={() =>
              router?.push({
                pathname: '/insights',
                query: withDemoMode({}),
              })
            }
          >
            TOP
          </ListItem>
          <Divider />
          <ListItem
            className={styles.sidemenuLink}
            button
            onClick={() =>
              router?.push({
                pathname: `/keywords`,
                query: withDemoMode({
                  period: SEARCH_PERIOD.WEEK,
                  target: KEYWORD_VIEW_TARGET.AVERAGE_POST_ACCESS,
                  page: 1,
                }),
              })
            }
          >
            ???????????????????????????????????????
          </ListItem>
          <Divider />
          <ListItem
            className={styles.sidemenuLink}
            button
            onClick={() =>
              router?.push({
                pathname: '/posts',
                query: withDemoMode({}),
              })
            }
          >
            ??????????????????????????????
          </ListItem>
          <Divider />
          {!demoMode && (
            <>
              <ListItem
                className={styles.sidemenuLink}
                button
                onClick={() => router?.push(`/`)}
              >
                ???????????????
              </ListItem>
              <Divider />
            </>
          )}
        </div>
      </Drawer>
    </ThemeProvider>
  )
}

export default Layout
