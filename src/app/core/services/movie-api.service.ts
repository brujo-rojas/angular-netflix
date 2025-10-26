import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import { MovieSearchResponse, NetflixApiResponse, NetflixTitle, NetflixSuggestion, MovieDetailResponse } from '../models/movie-search-response.interface';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {}

  searchMovies(query: string, limit: number = 50, offset: number = 0): Observable<MovieSearchResponse> {
    return this.searchRealApi(query, limit, offset);
  }

  private searchRealApi(query: string, limit: number = 50, offset: number = 0): Observable<MovieSearchResponse> {
    const apiConfig = this.apiConfigService.getApiConfig();
    
    if (!apiConfig.rapidApiKey) {
      console.error('API Key not configured');
      return of({
        titles: [],
        suggestions: [],
        totalResults: 0
      });
    }

    const headers = new HttpHeaders({
      'X-RapidAPI-Key': apiConfig.rapidApiKey,
      'X-RapidAPI-Host': apiConfig.rapidApiHost
    });

    const params = {
      query: query,
      offset: offset.toString(),
      limit_titles: limit.toString(),
      limit_suggestions: '20',
      lang: 'en'
    };

    return this.http.get<NetflixApiResponse>(apiConfig.rapidApiUrl, { headers, params }).pipe(
      map(response => {
        
        const transformedTitles = response.titles?.map((item: NetflixTitle) => {
          
          
          const coverImage = item.jawSummary.backgroundImage?.url || 
                           item.jawSummary.logoImage?.url || 
                           'https://via.placeholder.com/300x450'
          
          return {
            id: item.jawSummary.id?.toString() || Math.random().toString(),
            title: item.jawSummary.title || 'No title',
            type: item.jawSummary.type || 'Movie',
            year: item.jawSummary.releaseYear || new Date().getFullYear(),
            synopsis: item.jawSummary.synopsis || item.jawSummary.contextualSynopsis?.text || 'No synopsis available',
            image: coverImage,
            runtime: item.jawSummary.runtime ? Math.round(item.jawSummary.runtime / 60) : 0, 
            rating: item.jawSummary.maturity?.rating?.value || 'N/A',
            genres: item.jawSummary.genres?.map(genre => genre.name) || ['No genre']
          };
        }) || [];

        
        const transformedSuggestions = response.suggestions?.map((suggestion: NetflixSuggestion) => 
          suggestion.summary.name
        ) || [];

        const titlesLength = response.titles?.length || 0;
        const hasMoreResults = titlesLength >= limit;
        
        
        const estimatedTotal = offset + titlesLength + (hasMoreResults ? 100 : 0);
        
        return {
          titles: transformedTitles,
          suggestions: transformedSuggestions,
          totalResults: estimatedTotal,
          hasMore: hasMoreResults
        };
      }),
      catchError((error) => {
        console.error('Error searching real API:', error);
        return of({
          titles: [],
          suggestions: [],
          totalResults: 0
        });
      })
    );
  }

  getMovieDetails(movieId: string): Observable<MovieDetailResponse | null> {
    const apiConfig = this.apiConfigService.getApiConfig();
    
    if (!apiConfig.rapidApiKey) {
      console.error('API Key not configured');
      return of(null);
    }

    const headers = new HttpHeaders({
      'X-RapidAPI-Key': apiConfig.rapidApiKey,
      'X-RapidAPI-Host': apiConfig.rapidApiHost
    });

    const detailsUrl = `https://netflix54.p.rapidapi.com/title/${movieId}?lang=en`;

    return this.http.get<MovieDetailResponse[]>(detailsUrl, { headers }).pipe(
      map(response => {
        if (response && response.length > 0) {
          return response[0];
        }
        return null;
      }),
      catchError((error) => {
        console.error('Error loading real movie details:', error);
        return of(null);
      })
    );
  }
}
