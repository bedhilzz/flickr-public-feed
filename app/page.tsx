'use client'

import { getPublicFeed } from './lib/functions'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './page.module.css'

export default function Home() {
  const [feeds, setFeeds] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  const fetchFeeds = async () => {
    const feeds: any[] = await getPublicFeed(searchQuery)
    setFeeds(feeds)
  }

  const handleSearch = () => {
    fetchFeeds()
  }

  useEffect(() => {
    fetchFeeds()
  }, [])

  return (
    <div className='container py-3'>
      <div className='row'>
        <div className='input-group'>
          <input className='form-control' type='text' placeholder='Enter image tag' onChange={(e) => setSearchQuery(e.target.value)}></input>
          <button className='btn btn-primary' onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className='row row-cols-1 row-cols-md-3'>
        {feeds.map(function (entry: any, i: any) {
          return (
            <div className='col gy-4'>
              <div className='card h-100'>
                <img src={entry.link} className={['card-img-top', styles.cardImgFit].join(" ")} alt='...'></img>
                <div className='card-body'>
                  <h5 className='card-title text-truncate'>{entry.title}</h5>
                  <a href={entry.link} className='btn btn-primary'>View Image</a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
