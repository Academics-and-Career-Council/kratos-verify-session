import React, {useState} from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import { V0alpha1Api, Configuration } from '@ory/kratos-client'
import router from 'next/router'

import VerifyPage from 'kratos-verify-session'

const instance = axios.create({
  baseURL: 'http://localhost:4433',
  withCredentials: true
})

const ory = new V0alpha1Api(
  new Configuration({
    basePath: 'http://localhost:4433'
  }),
  "http://localhost:4433",
  instance
)

const Verify: NextPage = () => {
  const [session, setSession] = useState({active: false, logoutUrl: ''})
  return <VerifyPage loginUrl='http://localhost:3001/login' historyPush={router.push} setSessionState={setSession}  path='dashboard' ory={ory} />
}

export default Verify

