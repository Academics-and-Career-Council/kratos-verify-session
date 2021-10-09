# kratos-verify-session

> Propreity package to check Ory Kratos session and handle redirects accordingly

[![NPM](https://img.shields.io/npm/v/kratos-verify-session.svg)](https://www.npmjs.com/package/kratos-verify-session) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save kratos-verify-session
```

## Usage

```tsx
import React, { Component } from 'react'

import Verify from 'kratos-verify-session'
import 'kratos-verify-session/dist/index.css'

class Example extends Component {
  render() {
    return <Verfiy 
      loginUrl: 'url to login page'
      basePath: 'basePath of your main application' //eg http://localhost:3000
      path: 'on path that you want to go' //eg dashboard
      historyPush: 'funtion to push the new route in history'
      setSessionState: 'funtion to update session state'
      xenon: 'pass a xenon reference aftrer importing in your application'
      ory: 'locally defined ory instance in your application'
    />
  }
}
```

## session state

```tsx
interface sessionState {
  active: boolean
  logoutUrl: string
  user: UserCrediantials //type obtained from @anciitk/xenon
  session: Session //type obtained from @ory/kratos-client
}
```

## historyPush

### for react

```tsx
const app = ({history}) => {
  // this function was provided by react router
  history.push(/something)
}
```

### for next

```tsx
import {useRouter} from 'next/router'

const app = () => {
  const router = useRouter();
  historyPush = router.push;
}
```

## License

MIT © [Mshivam2409](https://github.com/Mshivam2409)
