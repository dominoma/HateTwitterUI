export interface TweetsCount {
  pos: number
  neg: number
  unknown: number
  total: number
}
/**
 * Full hashtag dataset
 */
export interface Hashtag {
  name: string
  tweets: TweetsCount
  topTweetId: string
  tweetDates: { [date: string]: TweetsCount }
  langUsage: { [lang: string]: number }
  langUsagePerDay: { date: string; lang: string; value: number }[]
  ranking: number
}

/**
 * HahstagUsage contains only the most important hashtag keys (tweets, name and topTweetId)
 * Also contains hypePeak
 */
export type HashtagUsage = Pick<Hashtag, 'tweets' | 'name' | 'topTweetId'> & {
  /**
   * The date where the most tweets using this hashtag were postet
   */
  hypePeak: string
}
/**
 * represents min date and max date of data shon in charts.
 * Dates are represented by their timestamps
 */
export interface Zoom {
  min: number | undefined
  max: number | undefined
}
