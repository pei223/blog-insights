import axios from 'axios'

const WORDPRESS_COM_OAUTH_URL =
  'https://public-api.wordpress.com/oauth2/authorize'
const WORDPRESS_COM_SCOPE = 'auth posts stats sites'

export const wordpressComFetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WORDPRESS_API_PATH,
})

export const generateWordpressComURL = (blogUrl: string): string => {
  return `${WORDPRESS_COM_OAUTH_URL}?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/insights&response_type=token&blog=${blogUrl}&scope=${WORDPRESS_COM_SCOPE}`
}

export const demoFetcher = axios.create({
  baseURL: '/api/demo/',
})
