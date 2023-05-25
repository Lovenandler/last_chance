import React, { useEffect } from 'react'

export const LoginSignout = () => {
  const gapi = window.gapi;
  const google = window.google;

  const CLIENT_ID = '620057456341-ju225f3hvbd0fiu5gfm9ge59skmaiun4.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyAp-9m3vJA_N1AqUtFffjbfob42CLYokbY';
  const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  const SCOPES = "https://www.googleapis.com/auth/calendar";

  const accessToken = localStorage.getItem('access_token');
  const expiresIn = localStorage.getItem('expires_in');

  let gapiInited = false, gisInited = false, tokenClient;

  useEffect(() => {
    //const expiryTime = new Date().getTime() + expiresIn * 1000;
    gapiLoaded()
    gisLoaded()
  }, [])

  function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
  }

  async function initializeGapiClient() {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;

    if (accessToken && expiresIn) {
      gapi.client.setToken({
        access_token: accessToken,
        expires_in: expiresIn,
      });
      listUpcomingEvents();
    }
  }

  function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });

    gisInited = true;
  }

  //Enables user interaction after all libraries are loaded.

  function handleAuthClick() {
    tokenClient.callback = async (resp) => {
      if (resp.error) {
        throw (resp);
      }
      await listUpcomingEvents();
      const { access_token, expires_in } = gapi.client.getToken();
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('expires_in', expires_in)
    };

    if (!(accessToken && expiresIn)) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: '' });
    }
  }

  //Sign out the user upon button click.

  function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
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
      response = await gapi.client.calendar.events.list(request);
    } catch (err) {
      document.getElementById('content').innerText = err.message;
      return;
    }

    const events = response.result.items;
    if (!events || events.length === 0) {
      document.getElementById('content').innerText = 'Событий не найдено.';
      return;
    }
    // Flatten to string to display
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