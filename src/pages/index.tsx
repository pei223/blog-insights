import { Button, Fab, Grid, TextField } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { generateWordpressComURL } from '../apis/wordpresscom/baseApi'
import NologinLayout from '../components/templates/NologinLayout'
import styles from '../styles/pages/index.module.css'

const IndexPage = () => {
  const router = useRouter()
  const [url, setUrl] = useState('')

  const transitWordpressCom = () => {
    if (url === '') return
    window.location.href = generateWordpressComURL(url)
  }

  const transitDemoPage = () => {
    router.push('/insights?demoMode=true')
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
        Wordpressブログアクセス分析ツール
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
              <p>
                直近1週間のアクセス数をグラフ、記事ごとのアクセスランキング、キーワードごとのアクセスランキングを可視化。
              </p>
              <p>まずはデモモードを使用してみてください。</p>
            </div>
            <div className={styles.demoButtonWrapper}>
              <Button
                variant="outlined"
                className={styles.demoButton}
                onClick={transitDemoPage}
              >
                デモモードで使ってみる
              </Button>
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
                記事タイトルを単語に分割し重要な単語をキーワードとして一覧化・分析。
              </p>
              <p>
                キーワードの総アクセス数、1記事平均のキーワードアクセス数を一覧化。
              </p>
              <p>
                また、指定したキーワードと一緒に出現したキーワードの一覧も表示可能。
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
            <div className={styles.loginButtonWrapper}>
              <Fab
                variant="extended"
                className={styles.loginButton}
                onClick={transitWordpressCom}
              >
                Wordpress.comにログイン
              </Fab>
            </div>

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
