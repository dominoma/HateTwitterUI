export interface TweetsCount {
  pos: number
  neg: number
  unknown: number
  total: number
}

export interface Hashtag {
  name: string
  tweets: TweetsCount
  topTweetId: string
  tweetDates: { [date: string]: TweetsCount }
  langUsage: { [lang: string]: number }
  langUsagePerDay: { date: string; lang: string; value: number }[]
  ranking: number
}

export type HashtagUsage = Pick<Hashtag, 'tweets' | 'name' | 'topTweetId'> & {
  hypePeak: string
}

export interface Zoom {
  min: number | undefined
  max: number | undefined
}
