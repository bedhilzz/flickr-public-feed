'use server'

import { NextApiRequest, NextApiResponse } from "next"

const PUBLIC_FEED_URL = 'https://api.flickr.com/services/feeds/photos_public.gne'

type ResponseData = {
  title: string
  link: string
  author: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData[]>
) {
  const requestParams: string = req.query['image_tag'] as string || ''
  const tags = requestParams.split(' ').join(',')

  const params = new URLSearchParams({
    format: 'json',
    nojsoncallback: '1',
    tags: tags,
  })

  try {
    const response  = await fetch(`${PUBLIC_FEED_URL}?${params}`)
    const data = await response.json()
    var feeds: ResponseData[] = data.items.map((e: any) => {
      return {
        title: e.title,
        link: e.media.m,
        author: e.author
      }
    })
  
    res.status(200).json(feeds)
  } catch (err) {
    console.log(err)
    res.status(500).send([])
  }
}