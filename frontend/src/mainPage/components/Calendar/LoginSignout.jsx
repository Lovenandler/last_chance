import React, { useEffect } from 'react'

export const LoginSignout = () => {
  const googleApi = window.gapi;
  const google = window.google;

  const CLIENT_ID = '620057456341-ju225f3hvbd0fiu5gfm9ge59skmaiun4.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyAp-9m3vJA_N1AqUtFffjbfob42CLYokbY';
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  const SCOPES = "https://www.googleapis.com/auth/calendar";

  const accessToken = localStorage.getItem('access_token');
  const expiresIn = localStorage.getItem('expires_in');

  let googleApiInitialized = false, googleDataInited = false, tokenClient;

  useEffect(() => {
    googleApiLoad()
    googleDataLoaded()
  }, [])

  function googleApiLoad() {
    googleApi.load('client', initializeGoogleApiClient);
  }

  async function initializeGoogleApiClient() {
    await googleApi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    googleApiInitialized = true;

    if (accessToken && expiresIn) {
      googleApi.client.setToken({
        access_token: accessToken,
        expires_in: expiresIn,
      });
      listUpcomingEvents();
    }
  }

  function googleDataLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });

    googleDataInited = true;
  }

  //Позволяет взаимодействовать с пользователем после загрузки библиотек.

  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error) {
        throw (resp);
      }
      await listUpcomingEvents();
      const { access_token, expires_in } = googleApi.client.getToken();
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('expires_in', expires_in)
    };

    if (!(accessToken && expiresIn)) {
      // Выбор учетную запись Google и согласие на передачу данных при создании новой сессии.
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Пропустить выбор учетной записи и согласия для существующего сеанса.
      tokenClient.requestAccessToken({ prompt: '' });
    }
  }

  //Выход из аккаунта

  function handleSignoutClick() {
    const token = googleApi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      googleApi.client.setToken('');
      localStorage.clear();
    }
  }

  async function listUpcomingEvents() {
    let response;
    try {
      const request = {
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime',
      };
      response = await googleApi.client.calendar.events.list(request);
    } catch (err) {
      document.getElementById('content').innerText = err.message;
      return;
    }

    const events = response.result.items;
    if (!events || events.length === 0) {
      document.getElementById('content').innerText = 'Событий не найдено.';
      return;
    }
    // настройка отображения событий
    const output = events.reduce(
      (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,'События:\n');
    document.getElementById('content').innerText = output;
  }
  
  
  return (
    <div className='calendar_space_return'>
      <button id="authorize_button" hidden={accessToken && expiresIn} onClick={handleAuthClick}>Войти</button>
      <button id="signout_button" hidden={!accessToken && !expiresIn}   onClick={handleSignoutClick}>Выйти</button>
      <pre id="content" className='events_content' style={{ whiteSpace: 'pre-wrap' }}></pre>
    </div>
  )
}