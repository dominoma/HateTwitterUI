import hashtagList from '~/assets/data/hashtagList.json'
import hashtag from '~/assets/data/hashtag.json'
import { Hashtag } from '~/types'

// eslint-disable-next-line require-await
export async function fetchTopHashtags(): Promise<Hashtag[]> {
  return hashtagList
}

// eslint-disable-next-line require-await, @typescript-eslint/no-unused-vars
export async function fetchHashtag(name: string): Promise<Hashtag> {
  console.log(name)
  return hashtag
}
