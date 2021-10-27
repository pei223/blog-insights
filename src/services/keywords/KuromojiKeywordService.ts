export const a = 1
// import * as kuromoji from 'kuromoji'
// import { KeywordAccessInfo } from '../interfaces/wordpresscom/KeywordInfo'
// import { PostAccessInfo } from '../interfaces/wordpresscom/PostAccessInfo'

// export class KuromojiKeywordService {
//   private static instance: KuromojiKeywordService
//   private readonly dictPath: string
//   private tokenizer: kuromoji.Tokenizer<any> = null

//   constructor(dictPath: string) {
//     this.dictPath = dictPath
//   }
//   async initializeTokenizer() {
//     const builder = kuromoji.builder({
//       dicPath: this.dictPath,
//     })
//     const buildTokenizer = () => {
//       return new Promise((resolve, reject) => {
//         builder.build((err, tokenizer) => {
//           if (err) {
//             console.log(err)
//             reject(err)
//             return
//           }
//           resolve(tokenizer)
//         })
//       })
//     }

//     this.tokenizer = (await buildTokenizer()) as kuromoji.Tokenizer<any>
//   }

//   static getInstance(dictPath: string) {
//     if (!this.instance) {
//       this.instance = new KuromojiKeywordService(dictPath)
//     }
//     return this.instance
//   }

//   async aggregateKeywordInfo(
//     postList: PostAccessInfo[]
//   ): Promise<KeywordAccessInfo[]> {
//     await this.initializeTokenizer()
//     const keywordAccessDict = {}
//     const keywordPostCountDict = {}
//     postList.forEach((post) => {
//       const keywords = this.devideToKeywords(post.title)
//       keywords.forEach((keyword) => {
//         if (!keywordAccessDict[keyword]) {
//           keywordAccessDict[keyword] = post.views
//         } else {
//           keywordAccessDict[keyword] += post.views
//         }
//         if (!keywordPostCountDict) {
//           keywordPostCountDict[keyword] = 1
//         } else {
//           keywordPostCountDict[keyword] += 1
//         }
//       })
//     })

//     const keywordInfoList = Object.keys(keywordAccessDict).map(
//       (key): KeywordAccessInfo => {
//         return {
//           keyword: key,
//           postCount: keywordPostCountDict[key],
//           totalAccess: keywordAccessDict[key],
//           averagePostAccess: keywordAccessDict[key] / keywordPostCountDict[key],
//         }
//       }
//     )
//     return keywordInfoList
//   }

//   private devideToKeywords(text: string): string[] {
//     const result = this.tokenizer.tokenize(text)
//     return result
//       .filter((row) => {
//         const e =
//           row.surface_form.includes('[') ||
//           row.surface_form.includes(']') ||
//           row.surface_form.includes('(') ||
//           row.surface_form.includes(')') ||
//           row.surface_form.includes('/') ||
//           row.surface_form.includes('-')
//         return row['pos'] === '名詞' && !e && row.surface_form.length > 1
//       })
//       .map((row) => row.surface_form)
//   }
// }
