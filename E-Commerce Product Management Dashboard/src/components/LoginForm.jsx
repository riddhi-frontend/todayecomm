import { AppProvider, Button, Card, Text, TextField } from '@shopify/polaris'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <AppProvider>
      <div className="login-container">
      <Card roundedAbove="md" color= "--p-color-bg-surface-success">
        <div className="login-form">
          <Text as='h2' variant='heading2xl' color="critical">Login</Text>
          <input label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin}>Login</Button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </Card>
        </div>
    </AppProvider>
  )
}

export default LoginForm 