import { NextApiRequest, NextApiResponse } from 'next'
import { SiteInfo } from '../../../interfaces/wordpresscom/siteInfo'

const handler = (req: NextApiRequest, res: NextApiResponse<SiteInfo>) => {
  const result: SiteInfo = {
    ID: 181112209,
    name: 'deecode blog',
    description: 'IT系の技術/話のブログ',
    URL: 'https://deecode.net',
    jetpack: true,
    jetpack_connection: true,
    subscribers_count: 1,
    icon: {
      img: 'https://i1.wp.com/deecode.net/wp-content/uploads/2020/08/cropped-Web-1920-–-1-1.png?fit=512%2C512&ssl=1',
      ico: 'https://i1.wp.com/deecode.net/wp-content/uploads/2020/08/cropped-Web-1920-–-1-1.png?fit=16%2C16&ssl=1',
    },
    logo: {
      id: 0,
      sizes: [],
      url: '',
    },
    is_following: false,
    meta: {
      links: {
        self: 'https://public-api.wordpress.com/rest/v1.1/sites/181112209',
        help: 'https://public-api.wordpress.com/rest/v1.1/sites/181112209/help',
        posts:
          'https://public-api.wordpress.com/rest/v1.1/sites/181112209/posts/',
        comments:
          'https://public-api.wordpress.com/rest/v1.1/sites/181112209/comments/',
        xmlrpc: 'http://deecode.net/xmlrpc.php',
      },
    },
    launch_status: '',
    is_fse_active: false,
    is_fse_eligible: false,
    is_core_site_editor_enabled: false,
    site_migration: null,
  } as SiteInfo
  res.status(200).send(result)
}

export default handler
