import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MovieSearchComponent as MovieSearchFormComponent } from './components/movie-search/movie-search';
import { MovieResultsComponent } from './components/movie-results/movie-results';
import { MovieApiService } from '../../core/services/movie-api.service';
import { MovieSearchStateService } from '../../core/services/movie-search-state.service';
import { WatchlistService } from '../../core/services/watchlist.service';
import { Movie } from '../../core/models/movie-search-response.interface';

@Component({
  selector: 'app-movie-search-page',
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MovieSearchFormComponent,
    MovieResultsComponent
  ],
  templateUrl: './movie-search.html',
  styleUrl: './movie-search.scss',
})
export class MovieSearchComponent implements OnInit {
  movies: Movie[] = [];
  loading: boolean = false;
  error: string | null = null;
  
  
  currentQuery: string = '';
  pageIndex: number = 0;
  pageSize: number = 12;
  pageSizeOptions: number[] = [12, 24, 36, 40];
  totalResults: number = 0;
  hasMore: boolean = false;
  restoredQuery: string = ''; 

  constructor(
    private movieApiService: MovieApiService,
    private searchStateService: MovieSearchStateService,
    private watchlistService: WatchlistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.restoreState();
  }

  onSearch(query: string): void {
    this.currentQuery = query;
    this.pageIndex = 0;
    this.loadMovies();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMovies();
  }

  onPageSizeChange(): void {
    this.pageIndex = 0;
    this.loadMovies();
  }

  private loadMovies(): void {
    this.loading = true;
    this.error = null;

    const offset = this.pageIndex * this.pageSize;

    this.movieApiService.searchMovies(this.currentQuery, this.pageSize, offset).subscribe({
      next: (response) => {
        this.movies = response.titles || [];
        this.totalResults = response.totalResults;
        this.hasMore = response.hasMore || false;
        this.loading = false;
        
        
        this.searchStateService.saveState(
          this.currentQuery,
          this.movies,
          this.pageIndex,
          this.pageSize,
          this.totalResults
        );
      },
      error: (error) => {
        console.error('Error searching movies:', error);
        this.loading = false;
        this.error = 'Error searching movies. Please try again.';
      }
    });
  }

  private restoreState(): void {
    const state = this.searchStateService.getState();
    if (state) {
      this.currentQuery = state.query;
      this.restoredQuery = state.query;
      this.movies = state.movies;
      this.pageIndex = state.pageIndex;
      this.pageSize = state.pageSize;
      this.totalResults = state.totalResults;
    }
  }

  onAddToWatchlist(movie: Movie): void {
    const success = this.watchlistService.addToWatchlist(movie);
    if (success) {
      this.snackBar.open(
        `"${movie.title}" added to Watchlist`, 
        'Close', 
        { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' }
      );
    } else {
      this.snackBar.open(
        `"${movie.title}" is already in your Watchlist`, 
        'Close', 
        { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' }
      );
    }
  }
}
