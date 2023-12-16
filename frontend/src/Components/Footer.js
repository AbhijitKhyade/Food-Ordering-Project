import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div>
      <footer className="text-center text-lg-start">
        <div className="text-center p-3">
          <p> © 2023 Copyright: <Link className="text-white">Food Swift</Link></p>
        </div>
      </footer>
    </div>
  )
}
