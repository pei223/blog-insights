import { KeywordAccess } from '../../interfaces/keywords/KeywordInfo'
import { PostAccess } from '../../interfaces/wordpresscom/postAccess'
import { EXTENSION_STOP_WORD_LIST, STOP_WORD_LIST } from './StopWord'

export default class KeywordService {
  private static instance: KeywordService
  private readonly stopWords: string[]

  private constructor() {
    this.stopWords = STOP_WORD_LIST.concat(EXTENSION_STOP_WORD_LIST)
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new KeywordService()
    }
    return this.instance
  }

  /**
   * 指定したキーワードと共起するキーワードを取得する
   * @param keyword 指定キーワード
   * @param postAccessList 記事アクセス情報リスト
   * @returns 指定したキーワードと同時に出現するキーワード一覧
   */
  parseCoOccurrenceKeywords(
    targetKeyword: string,
    postAccessList: PostAccess[]
  ): KeywordAccess[] {
    const TinySegmenter = require('tiny-segmenter')
    const segmenter = new TinySegmenter()
    const keywordAccessDict = {}
    const keywordPostCountDict = {}
    postAccessList.forEach((post) => {
      const keys: string[] = segmenter.segment(post.title)
      const keywords = keys
        .map((key) => this.filterOtherThanAlphabetAndJapanese(key))
        .filter((keyword) => !this.isUnwantedWord(keyword))
      if (keywords.includes(targetKeyword)) {
        keywords
          .filter((keyword) => keyword !== targetKeyword)
          .forEach((keyword) => {
            if (!keywordAccessDict[keyword]) {
              keywordAccessDict[keyword] = post.views
            } else {
              keywordAccessDict[keyword] += post.views
            }
            if (!keywordPostCountDict[keyword]) {
              keywordPostCountDict[keyword] = 1
            } else {
              keywordPostCountDict[keyword] += 1
            }
          })
      }
    })

    const keywordInfoList = Object.keys(keywordAccessDict).map(
      (key): KeywordAccess => {
        return {
          keyword: key,
          postCount: keywordPostCountDict[key],
          totalAccess: keywordAccessDict[key],
          averagePostAccess: keywordAccessDict[key] / keywordPostCountDict[key],
        }
      }
    )
    keywordInfoList.sort((a, b) => {
      return b.averagePostAccess - a.averagePostAccess
    })
    return keywordInfoList
  }

  parseToKeywordInfo(postAccessList: PostAccess[]): KeywordAccess[] {
    const TinySegmenter = require('tiny-segmenter')
    const segmenter = new TinySegmenter()
    const keywordAccessDict = {}
    const keywordPostCountDict = {}
    postAccessList.forEach((post) => {
      const keys = segmenter.segment(post.title)
      keys.forEach((key: string) => {
        const keyword = this.filterOtherThanAlphabetAndJapanese(key)
        if (this.isUnwantedWord(keyword)) {
          return
        }
        if (!keywordAccessDict[keyword]) {
          keywordAccessDict[keyword] = post.views
        } else {
          keywordAccessDict[keyword] += post.views
        }
        if (!keywordPostCountDict[keyword]) {
          keywordPostCountDict[keyword] = 1
        } else {
          keywordPostCountDict[keyword] += 1
        }
      })
    })

    const keywordInfoList = Object.keys(keywordAccessDict).map(
      (key): KeywordAccess => {
        return {
          keyword: key,
          postCount: keywordPostCountDict[key],
          totalAccess: keywordAccessDict[key],
          averagePostAccess: keywordAccessDict[key] / keywordPostCountDict[key],
        }
      }
    )
    keywordInfoList.sort((a, b) => {
      return b.averagePostAccess - a.averagePostAccess
    })
    return keywordInfoList
  }

  private filterOtherThanAlphabetAndJapanese(text: string) {
    return text
      .replaceAll(
        /[^a-zA-Z\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]/g,
        ''
      )
      .toLocaleLowerCase()
  }

  private isUnwantedWord(word: string): boolean {
    if (word.length < 2) {
      return true
    }
    if (this.isIncluded(word, this.stopWords)) {
      return true
    }
    if (word.substr(1, 1) === 'っ') {
      return true
    }
    return false
  }

  private isIncluded(text: string, compareTextList: string[]) {
    return (
      compareTextList.filter((compareText) => compareText === text).length > 0
    )
  }
}
