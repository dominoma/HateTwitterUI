export interface Hashtag {
  hashtag: string
  sum: number
  date: { [date: string]: number }
  lang: { [lang: string]: number }
  dateLang: { date: string; lang: string; value: number }[]
}
