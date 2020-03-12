import axios from 'axios'
import { Hashtag, HashtagUsage } from '~/types'

const base =
  'http://basecamp-demos.informatik.uni-hamburg.de:8080/BackendHateTwitter'

/**
 * Fetches the top 30 hashtags and their usage data @see HashtagUsage
 */
export async function fetchTopHashtags(): Promise<HashtagUsage[]> {
  const rsp = await axios.get(`${base}/hashtags/tophashtags?count=30`)
  return rsp.data
}

/**
 * fetches all data of a specific hashtag
 * @param name the name of the hashtag
 */
export async function fetchHashtag(name: string): Promise<Hashtag> {
  const rsp = await axios.get(`${base}/hashtags/${name}`)
  return rsp.data
}

/**
 * fetches all data of the top 5 hashtags
 */
export async function fetchTop5Hashtags(): Promise<Hashtag[]> {
  const rsp = await axios.get(`${base}/hashtags/tophashtags?count=5&full=true`)
  return rsp.data
}
