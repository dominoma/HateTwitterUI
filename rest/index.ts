import axios from 'axios'
import { Hashtag, HashtagUsage } from '~/types'

export async function fetchTopHashtags(): Promise<HashtagUsage[]> {
  const rsp = await axios.get('http://localhost:5000/tophashtags?count=30')
  return rsp.data
}

export async function fetchHashtag(name: string): Promise<Hashtag> {
  const rsp = await axios.get(`http://localhost:5000/hashtag/${name}`)
  return rsp.data
}

export async function fetchTop5Hashtags(): Promise<Hashtag[]> {
  const rsp = await axios.get(
    'http://localhost:5000/tophashtags?count=5&full=true'
  )
  return rsp.data
}
