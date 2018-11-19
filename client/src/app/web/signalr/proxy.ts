import { BASE_URL } from 'app/config';

let signalrConnection : any  = null ;
let userHubProxy : any = null ;

if (typeof $ !== 'undefined') {
  const hubConnection : any = $['hubConnection'];
  signalrConnection = hubConnection(`${BASE_URL}/signalr`);
  signalrConnection.logging = true;
  userHubProxy = signalrConnection.createHubProxy('UserHub');
}

export { signalrConnection, userHubProxy };
