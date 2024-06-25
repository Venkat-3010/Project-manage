import React from 'react'
import { useNavigate } from 'react-router-dom'

const Analytics = () => {
  const navigate = useNavigate();

  if(!localStorage.getItem('token')){
    navigate('/')
  }

  return (
    <div>Analytics</div>
  )
}

export default Analytics