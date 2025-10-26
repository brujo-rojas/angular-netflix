import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  getApiConfig() {
    return {
      rapidApiKey: environment.apiConfig.rapidApiKey,
      rapidApiHost: environment.apiConfig.rapidApiHost,
      rapidApiUrl: environment.apiConfig.rapidApiUrl
    };
  }
}
