import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => (
  <div className='container'>
    <div className='row'>
      <div className='col-12 col-md-8 m-auto pt-4'>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title h1 text-center'>404</h5>
            <p className='card-text text-center'>
              Opps... We Very Sorry for this, Request Page not found
            </p>
            <Link to='/' className='btn btn-primary btn-block '>
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default NotFound
