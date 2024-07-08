'use server'

const PUBLIC_FEED_URL = 'https://api.flickr.com/services/feeds/photos_public.gne'

export async function getPublicFeed(imageTag: string) {
  const tags = imageTag.split(' ').join(',')

  const params = new URLSearchParams({
    format: 'json',
    nojsoncallback: '1',
    tags: tags,
  })

  const response  = await fetch(`${PUBLIC_FEED_URL}?${params}`)
  const data = await response.json()
  var feeds: any[] = data.items.map((e: any) => {
    return {
      title: e.title,
      link: e.media.m,
      author: e.author
    }
  })

  return feeds;
}