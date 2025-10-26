import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie-search-response.interface';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private readonly STORAGE_KEY = 'netflix-watchlist';
  private watchlistSubject = new BehaviorSubject<Movie[]>([]);
  public watchlist$ = this.watchlistSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const movies = JSON.parse(stored);
        this.watchlistSubject.next(movies);
      }
    } catch (error) {
      console.error('Error loading watchlist from storage:', error);
      this.watchlistSubject.next([]);
    }
  }

  private saveToStorage(movies: Movie[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(movies));
    } catch (error) {
      console.error('Error saving watchlist to storage:', error);
    }
  }

  addToWatchlist(movie: Movie): boolean {
    const currentWatchlist = this.watchlistSubject.value;
    
    
    const exists = currentWatchlist.some(m => m.id === movie.id);
    if (exists) {
      return false; 
    }

    const updatedWatchlist = [...currentWatchlist, movie];
    this.watchlistSubject.next(updatedWatchlist);
    this.saveToStorage(updatedWatchlist);
    return true;
  }

  removeFromWatchlist(movieId: string): void {
    const currentWatchlist = this.watchlistSubject.value;
    const updatedWatchlist = currentWatchlist.filter(m => m.id !== movieId);
    this.watchlistSubject.next(updatedWatchlist);
    this.saveToStorage(updatedWatchlist);
  }

  isInWatchlist(movieId: string): boolean {
    const currentWatchlist = this.watchlistSubject.value;
    return currentWatchlist.some(m => m.id === movieId);
  }

  getWatchlist(): Movie[] {
    return this.watchlistSubject.value;
  }

  updateMovieComment(movieId: string, comment: string): void {
    const currentWatchlist = this.watchlistSubject.value;
    const updatedWatchlist = currentWatchlist.map(m => 
      m.id === movieId ? { ...m, userComment: comment } : m
    );
    this.watchlistSubject.next(updatedWatchlist);
    this.saveToStorage(updatedWatchlist);
  }

  updateMovieRating(movieId: string, rating: number): void {
    const currentWatchlist = this.watchlistSubject.value;
    const updatedWatchlist = currentWatchlist.map(m => 
      m.id === movieId ? { ...m, userRating: rating } : m
    );
    this.watchlistSubject.next(updatedWatchlist);
    this.saveToStorage(updatedWatchlist);
  }

  clearWatchlist(): void {
    this.watchlistSubject.next([]);
    this.saveToStorage([]);
  }
}
