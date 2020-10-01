import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './styles/main.scss'
import {
  AppHeader,
  ConnectionPanel,
  LoadingIndicator,
  ConnectionsList
} from './components/components'
import { fetch } from './operations'
import { setFetchSuccess } from './redux/actions'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export const MainView = () => {
  const [savedCredentials, setSavedCredentials] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    document.title = 'AirCMS | Webpages management'
    listSavedFTPConnections()
  }, [])

  const listSavedFTPConnections = () => {
    const listOptions = Object.assign({}, {
      method: 'GET',
      url: 'api/ftp/listSavedFTPConnections'
    })

    dispatch(setFetchSuccess(false))

    fetch(listOptions).then((response) => {
      dispatch(setFetchSuccess(true))
      setSavedCredentials(response.data)
    })
  }

  return (<div>
    <AppHeader text={'AirCMS'} />
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <LoadingIndicator>
            <ConnectionsList {...{ savedCredentials }} />
          </LoadingIndicator>
        </Route>
        <Route exact path='/connectionPanel'>
          <ConnectionPanel />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>)
}