/* import AppInsights */
import { AppInsights } from 'applicationinsights-js';
//import { AppInfoApi } from 'app/api/mapper/swagger/typescript-fetch-client/api';
import { Configuration } from 'app/api/mapper/swagger/typescript-fetch-client/configuration';
import { BASE_URL } from 'app/config';

const cfg : Configuration =
  {
    basePath: BASE_URL,
  };

//const apiClient : AppInfoApi = new AppInfoApi(cfg);
/*apiClient.appInfoGetAPMKey().then((r) => {
  AppInsights.downloadAndSetup({ instrumentationKey: r });

    /* example: track page view 
  AppInsights.trackPageView();

});*/
