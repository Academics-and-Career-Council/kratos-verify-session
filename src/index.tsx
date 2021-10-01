import React, { useEffect, useState } from 'react'
import type { AxiosError } from 'axios' // eslint-disable-line
import Result from 'antd/lib/result'
import Button from 'antd/lib/button'
import 'antd/dist/antd.css'
// import styles from './styles.module.css' // eslint-disable-line
import type { V0alpha1Api } from '@ory/kratos-client' // eslint-disable-line

import Loader from './Loader'

interface Props {
  loginUrl: string
  path: string
  basePath: string
  historyPush: (route: string) => void
  setSessionState: ({
    active,
    logoutUrl
  }: {
    active: boolean
    logoutUrl: string
  }) => void
  ory: V0alpha1Api
}

const VerifyPage: React.FC<Props> = ({
  ory,
  loginUrl,
  basePath,
  path,
  historyPush,
  setSessionState
}) => {
  const [err, setErr] = useState<AxiosError>()

  useEffect(() => {
    ory
      .toSession()
      .then(() => {
        setSessionState({ active: true, logoutUrl: '' })
        ory
          .createSelfServiceLogoutFlowUrlForBrowsers()
          .then(({ data }) => {
            setSessionState({ active: true, logoutUrl: data.logout_url || '' })
          })
          .catch((err) => {
            return Promise.reject(err)
          })
        historyPush(`/${path}`)
      })
      .catch((err) => {
        switch (err.response?.status) {
          case 403:
          case 401:
            window.location.href = `${loginUrl}?return_to=${basePath}/${path}`
            return
        }
        setErr(err)
        return Promise.reject(err)
      })
  }, [])

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
