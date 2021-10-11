import React, { useEffect, useState } from 'react'
import type { AxiosError } from 'axios' // eslint-disable-line
import Result from 'antd/lib/result'
import Button from 'antd/lib/button'
import { Xenon, UserCredentials } from '@anciitk/xenon-js'
import './styles.module.css' // eslint-disable-line
import { V0alpha1Api, Session } from '@ory/kratos-client' // eslint-disable-line

import Loader from './Loader'

export interface SessionState {
  active: boolean
  logoutUrl: string
  user: UserCredentials
  session: Session
}

interface Props {
  loginUrl: string
  path: string
  basePath: string
  historyPush: (route: string) => void
  sessionState: SessionState
  setSessionState: (session: SessionState) => void
  ory: V0alpha1Api
  xenon: Xenon
}

const VerifyPage: React.FC<Props> = ({
  ory,
  loginUrl,
  basePath,
  path,
  historyPush,
  sessionState,
  setSessionState,
  xenon
}) => {
  const [err, setErr] = useState<AxiosError>()

  useEffect(() => {
    ory
      .toSession()
      .then(({ data: session }) => {
        ory
          .createSelfServiceLogoutFlowUrlForBrowsers()
          .then(({ data: logout }) => {
            xenon
              .whoami()
              .then((user) => {
                setSessionState({
                  active: true,
                  logoutUrl: logout.logout_url || '',
                  user: user,
                  session: session
                })
              })
              .catch((err) => {
                throw new Error(err)
              })
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      })
      .catch((err) => {
        switch (err.response?.status) {
          case 403:
            window.location.href = `${loginUrl}`
          case 401:
            window.location.href = `${loginUrl}?return_to=${basePath}/${path}`
            return
        }
        setErr(err)
        return Promise.reject(err)
      })
  }, [])

  useEffect(() => {
    if (sessionState.active) {
      historyPush(`/${path}`)
    }
  }, [sessionState])

  return (
    <div>
      {err ? (
        <Result
          status='error'
          title={err.message + '!'}
          subTitle={`${err?.response?.status} ${err.response?.statusText}`}
          extra={[
            <a href={loginUrl} key='1'>
              <Button type='primary'>Go to Login</Button>
            </a>
          ]}
        />
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default VerifyPage
