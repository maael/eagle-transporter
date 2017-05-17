import React from 'react'
import { Link } from 'react-router'

export default function NotFound ({ fleet, size, className }) {
  return (
    <div className="grid hero-stars" style={{ height: '100%', width: '100%' }}>
      <div className='stars' style={{ zIndex: -1 }} />
      <div className='twinkling' style={{ zIndex: -1 }} />
      <div className="fully-centered not-found-box">
        <h1>404</h1>
        <h2><Link to='/'>Beam me up, Scotty</Link></h2>
      </div>
    </div>
  )
}
