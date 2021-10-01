import React, {useState} from 'react'
import axios from 'axios'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { V0alpha1Api, Configuration } from '@ory/kratos-client'
import VerifyPage from 'kratos-verify-session'
import 'kratos-verify-session/dist/index.css'

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

const Verify: React.FC<RouteComponentProps> = ({history}) => {
  const [session, setSession] = useState({active: false, logoutUrl: ''})
  console.log(session)
  return <VerifyPage loginUrl='http://localhost:3001/login' historyPush={history.push} setSessionState={setSession} basePath='localhost:3000'  path='dashboard' ory={ory} />
}

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route component={() => <div>Sensitive info</div>} path='/dashboard' />
      <Route component={Verify} path='/'/>
    </Switch>
  </BrowserRouter>
)

export default App
