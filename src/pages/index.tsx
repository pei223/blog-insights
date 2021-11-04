import { Fab, Grid, TextField } from '@mui/material'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { generateWordpressComURL } from '../apis/wordpresscom/baseApi'
import NologinLayout from '../components/templates/NologinLayout'
import styles from '../styles/pages/index.module.css'

const IndexPage = () => {
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
    return () => window.removeEventListener('keydown', onEnter)
    // 初回マウントのみの処理のため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <NologinLayout title="blog insights">
      <h1 className={styles.topTitle}>
        Blog insights
        <br />
        ブログアクセス分析ツール
      </h1>
      <section className={styles.section1}>
        <Grid container spacing={4}>
          <Grid item md={4} sm={6} xs={12}>
            <img
              className={styles.image}
              src="/insights.png"
              alt="トップページ"
            />
          </Grid>
          <Grid item md={8} sm={6} xs={12}>
            <h2 className={styles.heading}>
              ブログの上位アクセス記事・キーワードを一覧化
            </h2>
            <div className={styles.description}>
              直近2週間のアクセス数、キーワードごとのアクセス数、前日比アクセス数を一覧表示。
            </div>
          </Grid>
        </Grid>
      </section>
      <section className={styles.section2}>
        <Grid container spacing={4}>
          <Grid item md={8} sm={6} xs={12}>
            <h2 className={styles.heading}>キーワードを分析</h2>
            <div className={styles.description}>
              <p>キーワードに着目したアクセス数を表示。</p>
              <p>
                キーワードの総アクセス数、1記事平均のキーワードアクセス数を一覧化。
              </p>
            </div>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <img
              className={styles.image}
              src="/keywords.png"
              alt="キーワード一覧"
            />
          </Grid>
        </Grid>
      </section>
      <section className={styles.section3}>
        <Grid container spacing={4}>
          <Grid item md={4} sm={6} xs={12}>
            <img
              className={styles.image}
              src="/wordpress.jpg"
              alt="Wordpress"
            />
          </Grid>
          <Grid item md={8} sm={6} xs={12}>
            <h2 className={styles.heading}>Wordpress.comと連携</h2>
            <div className={styles.description}>
              <p>
                Wordpress.comを介してWordpressのブログ情報と連携することでこのツールを利用できます。
              </p>
              <p>
                事前にWordpressのブログとWordpress.comへの紐づけが必要になります。
              </p>
            </div>
          </Grid>
        </Grid>
      </section>
      <section>
        <Grid container className={styles.formSection}>
          <Grid
            item
            xs={12}
            sm={10}
            md={8}
            className={styles.formSectionContent}
          >
            <h2 className={styles.heading}>始めてみよう</h2>
            <TextField
              label="URLを入力"
              variant="filled"
              className={styles.urlField}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Fab
              variant="extended"
              className={styles.loginButton}
              onClick={transitWordpressCom}
            >
              Wordpress.comにログイン
            </Fab>

            <p className={styles.alreadyLoginBlock}>
              <Link href="/insights" passHref>
                <span className={styles.alreadyLoginLink}>
                  すでに登録済みの方はこちらから
                </span>
              </Link>
            </p>
          </Grid>
        </Grid>
      </section>
    </NologinLayout>
  )
}

export default IndexPage
