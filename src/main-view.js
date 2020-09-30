import React, { useEffect, useState } from 'react'
import './styles/main.scss'
import { AppHeader } from './components/components'
import { fetch } from './operations'
import { LoadingIndicator } from './components/loadingIndicator/loading-indicator'

export const MainView = () => {
  const [connected, setConnected] = useState(false)
  const [server, setServer] = useState('')
  const [user, setUser] = useState('')
  const [news, setNews] = useState([])
  const [fetchSuccess, setFetchSuccess] = useState(true)

  useEffect(() => {
    document.title = 'AirCMS | Webpages panel'
  }, [])

  const fetchNews = () => {
    const downloadOptions = Object.assign({}, {
      method: 'GET',
      url: 'api/ftp/download'
    })

    setFetchSuccess(false)

    fetch(downloadOptions).then((response) => {
      setFetchSuccess(true)
      setNews(response.data)
    })
  }

  const connectFTP = () => {
    const body = {
      ftpServer: '',
      ftpUser: '',
      password: '',
      port: 21
    }

    const connectFTPOptions = Object.assign({}, {
      method: 'POST',
      url: 'api/ftp/connect',
      data: body,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    setFetchSuccess(false)

    fetch(connectFTPOptions).then((response) => {
      const body = response.data
      setConnected(body.connected)
      setUser(body.connectedUser)
      setServer(body.connectedServer)
      setFetchSuccess(true)
    }).catch((error) => {
      console.log('ERROR CONNECTION FAILED', error)
    })
  }

  return (<div>
    <AppHeader text={'AirCMS'} />

    <div>
      Connection data:
      Status: {connected}
      Server: {server}
      User: {user}
    </div>

    <button onClick={() => connectFTP()}>Connect ag.zgora</button>
    <button disabled={!connected} onClick={() => fetchNews()}>FETCH NEWS</button>

    <div>
      NEWS:
      <ul>
          {news.map(({ id, description, images, date }) => {
              return <li>ID: {id} DESCRIPTION: {description} date: {date}</li>
          })}
      </ul>
      {getLoadingIndicator(fetchSuccess)}
    </div>
  </div>)
}

const getLoadingIndicator = (isLoading) => {
  return isLoading ? <span /> : <LoadingIndicator />
}