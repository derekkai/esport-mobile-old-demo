const getBalance = Authtoken =>
  fetch(`${process.env.API_URL}/ESPMember/GetMemberClientBalance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      AuthID: Authtoken,
    }),
  })
    .then(response => response.json())
    .catch(err => {
      console.log('error:', err);
    });

const getUserInfo = Authtoken =>
  fetch(`${process.env.API_URL}/ESPMember/GetMemberClientDetail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      AuthID: Authtoken,
    }),
  })
    .then(response => response.json())
    .catch(err => {
      console.log('error:', err);
    });

const getBalanceHistory = (Authtoken, StartDateTs, EndDateTs) =>
  fetch(`${process.env.API_URL}/ESPMember/GetMemberWallet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Authtoken,
      StartDateTs,
      EndDateTs,
    }),
  })
    .then(response => response.json())
    .catch(err => {
      console.log('error:', err);
    });

const getBetHistory = (Authtoken, StartDateTs, EndDateTs, Lang) =>
  fetch(`${process.env.API_URL}/ESPMember/GetMemberTransbetResult`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Authtoken,
      StartDateTs,
      EndDateTs,
      Lang,
    }),
  })
    .then(response => response.json())
    .catch(err => {
      console.log('error:', err);
    });

const getNewsData = () =>
  fetch(`${process.env.API_URL}/ESPMember/GetAnnouncement/ESP`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .catch(err => {
      console.log('error:', err);
    });

// const getPlatformStatus = fetch(
//   `${process.env.API_URL}/GamePlatform/CheckGamePlatformStatus/esp`,
// )
//   .then(response => response.json())
//   .catch(err => {
//     console.log('error:', err);
//   });

export {
  getBalance,
  getUserInfo,
  getBalanceHistory,
  getBetHistory,
  // getPlatformStatus,
  getNewsData,
};
