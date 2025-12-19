import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Header(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(s => s.auth.loggedUser)

  return (
    <div className="flex items-center justify-between p-4 bg-linear-to-br from-blue-950 to-purple-800 text-white">
      <div className="text-xl font-bold">EMS • Dashboard</div>
      <div className="flex items-center gap-4">
        <div className="text-sm">{user?.name}</div>
        <button
          onClick={() => { dispatch(logout()); navigate('/') }}
          className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm"
        >Logout</button>
      </div>
    </div>
  )
}
