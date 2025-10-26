import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Movie } from '../../../../core/models/movie-search-response.interface';
import { MovieCardComponent } from '../movie-card/movie-card';
import { WatchlistService } from '../../../../core/services/watchlist.service';

@Component({
  selector: 'app-movie-results',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSnackBarModule,
    MovieCardComponent
  ],
  templateUrl: './movie-results.html',
  styleUrl: './movie-results.scss',
})
export class MovieResultsComponent {
  @Input() movies: Movie[] = [];
  @Input() loading: boolean = false;
  @Input() error: string | null = null;
  
  @Output() addToWatchlist = new EventEmitter<Movie>();

  constructor(private watchlistService: WatchlistService) {}

  get hasResults(): boolean {
    return this.movies.length > 0;
  }

  onAddToWatchlist(movie: Movie): void {
    this.addToWatchlist.emit(movie);
  }

  isInWatchlist(movieId: string): boolean {
    return this.watchlistService.isInWatchlist(movieId);
  }
}
