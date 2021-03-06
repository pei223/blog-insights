import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { NextSeo } from 'next-seo'
import router from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { generateWordpressComURL } from '../apis/wordpresscom/baseApi'
import NologinLayout from '../components/templates/NologinLayout'
import { AppContext } from '../stores/AppContext'
import styles from '../styles/pages/login.module.css'

const LoginPage = () => {
  const { userInfo } = useContext(AppContext)
  const [url, setUrl] = useState('')

  const transitWordpressCom = () => {
    if (url === '') return
    window.location.href = generateWordpressComURL(url)
  }

  const onEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      transitWordpressCom()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', onEnter)
    if (userInfo) {
      router.push('/insights')
    }
    return () => window.removeEventListener('keydown', onEnter)
    // 初回マウントのみの処理のため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NextSeo title="ログイン - blog insights" description="ログイン" />
      <NologinLayout title="login - blog insights">
        <div className={styles.root}>
          <Grid container className={styles.container}>
            <Grid item sm={6} xs={12}>
              <Card>
                <CardContent className={styles.loginCardContent}>
                  <div className={styles.inputArea}>
                    <Typography
                      variant="h6"
                      component="h2"
                      className={styles.loginTitle}
                    >
                      ログイン
                    </Typography>
                    <TextField
                      label="URLを入力"
                      variant="standard"
                      className={styles.urlField}
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    className={styles.loginButton}
                    onClick={transitWordpressCom}
                  >
                    Wordpress.comにログイン
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </NologinLayout>
    </>
  )
}

export default LoginPage
