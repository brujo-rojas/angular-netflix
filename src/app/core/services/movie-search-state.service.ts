import { Injectable } from '@angular/core';
import { Movie } from '../models/movie-search-response.interface';

interface MovieSearchState {
  query: string;
  movies: Movie[];
  pageIndex: number;
  pageSize: number;
  totalResults: number;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieSearchStateService {
  private readonly STORAGE_KEY = 'netflix-search-state';
  private readonly MAX_AGE_MS = 24 * 60 * 60 * 1000; 

  saveState(query: string, movies: Movie[], pageIndex: number, pageSize: number, totalResults: number): void {
    try {
      const state: MovieSearchState = {
        query,
        movies,
        pageIndex,
        pageSize,
        totalResults,
        timestamp: Date.now()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving search state:', error);
    }
  }

  getState(): MovieSearchState | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const state: MovieSearchState = JSON.parse(stored);
        
        
        const age = Date.now() - state.timestamp;
        if (age > this.MAX_AGE_MS) {
          this.clearState();
          return null;
        }
        
        return state;
      }
    } catch (error) {
      console.error('Error loading search state:', error);
    }
    return null;
  }

  clearState(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing search state:', error);
    }
  }

  hasState(): boolean {
    return this.getState() !== null;
  }
}

