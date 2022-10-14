import React, { useState } from 'react'
import * as Components from './styled'
import style from './auth.module.scss'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios'
import { toast } from 'react-toastify'
export default function Auth() {
  const [signIn, toggle] = useState(true)
  const [value, setValue] = useState({
    nama: '',
    email: '',
    password: '',
  })

  const handleChange = (name) => (e) => {
    setValue({ ...value, [name]: e.target.value })
  }
  const handleLogin = async () => {
    try {
      const { data } = await axios.post('/user/login', {
        email: value.email,
        password: value.password,
      })
      localStorage.setItem('_q', data.accessToken)
      window.location.reload()
    } catch (error) {
      toast.error('login error')
    }
  }
  const handleRegister = async () => {
    try {
      await axios.post('/user/register', {
        nama: value.nama,
        email: value.email,
        password: value.password,
      })
      toggle(true)
    } catch (error) {
      toast.error('register error')
    }
  }
  return (
    <div className={style.container}>
      <Link to='/'>
        <img src={logo} alt='logo' className={style.logo} />
      </Link>
      <Components.Container>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type='text'
              placeholder='Name'
              onChange={handleChange('nama')}
            />
            <Components.Input
              type='email'
              placeholder='Email'
              onChange={handleChange('email')}
            />
            <Components.Input
              type='password'
              placeholder='Password'
              onChange={handleChange('password')}
            />
            <Components.Button onClick={handleRegister}>
              Sign Up
            </Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={signIn}>
          <Components.Form>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type='email'
              placeholder='Email'
              onChange={handleChange('email')}
            />
            <Components.Input
              type='password'
              placeholder='Password'
              onChange={handleChange('password')}
            />
            <Components.Anchor href='#'>
              Forgot your password?
            </Components.Anchor>
            <Components.Button onClick={handleLogin}>Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  )
}
