import { Button, Card, CardContent, Typography } from '@mui/material'
import { generateWordpressComURL } from '../apis/wordpresscom/baseApi'
import Layout from '../components/templates/wordpresscom/Layout'

const IndexPage = () => {
  // const [url, setUrl] = useState('')

  const transitWordpressCom = () => {
    window.location.href = generateWordpressComURL('https://deecode.net')
  }

  return (
    <Layout title="Home | Next.js + TypeScript Example" heading="">
      <Card>
        <CardContent>
          <Typography variant="h3" component="h1">
            ブログを分析しよう
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={transitWordpressCom}
          >
            Login with wordpress.com
          </Button>
        </CardContent>
      </Card>
      <h1>Hello Next.js 👋</h1>
    </Layout>
  )
}

export default IndexPage
