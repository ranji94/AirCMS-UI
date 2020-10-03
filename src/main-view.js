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
import { API } from './constants'

export const MainView = () => {
  const dispatch = useDispatch()

  const [savedCredentials, setSavedCredentials] = useState([])

  const listSavedFTPConnections = () => {  
      dispatch(setFetchSuccess(false))
  
      fetch(API.LISTFTPCONN).then((response) => {
        dispatch(setFetchSuccess(true))
        setSavedCredentials(response.data)
      })
    }

  useEffect(() => {
    document.title = 'AirCMS | Webpages management'
    listSavedFTPConnections()
  }, [])

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