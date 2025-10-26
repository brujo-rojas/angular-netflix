import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MovieDetailResponse, NetflixJawSummary } from '../../core/models/movie-search-response.interface';
import { WatchlistService } from '../../core/services/watchlist.service';
import { MovieApiService } from '../../core/services/movie-api.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss',
})
export class MovieDetailComponent implements OnInit {
  movieDetails: MovieDetailResponse | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieApiService: MovieApiService,
    private watchlistService: WatchlistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.loadMovie(movieId);
    } else {
      this.error = 'Invalid movie ID';
      this.loading = false;
    }
  }

  private loadMovie(movieId: string): void {
    console.log('Loading movie details for ID:', movieId);
    this.movieApiService.getMovieDetails(movieId).subscribe({
      next: (movieDetails: MovieDetailResponse | null) => {
        console.log('Movie details received:', movieDetails);
        if (movieDetails) {
          this.movieDetails = movieDetails;
        } else {
          this.error = 'Movie not found';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading movie details:', error);
        this.error = 'Error loading movie';
        this.loading = false;
      }
    });
  }

  addToWatchlist(): void {
    if (!this.movieDetails) return;
    
      
      const movie = this.convertToMovie(this.movieDetails);
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

  isInWatchlist(): boolean {
    if (!this.movieDetails) return false;
    const movie = this.convertToMovie(this.movieDetails);
    return this.watchlistService.isInWatchlist(movie.id);
  }

      private convertToMovie(movieDetails: MovieDetailResponse): any {
        const details = movieDetails.details;
        
        const coverImage = details.backgroundImage?.url || 
                           details.logoImage?.url;
    
    return {
      id: movieDetails.titleId,
      title: details.title,
      type: details.type,
      year: details.releaseYear,
      synopsis: details.synopsis,
      image: coverImage,
      runtime: details.runtime ? Math.round(details.runtime / 60) : undefined, 
      rating: details.maturity?.rating?.value,
      genres: details.genres?.map(genre => genre.name) || []
    };
  }

  goBack(): void {
    this.router.navigate(['/search']);
  }

  goToWatchlist(): void {
    this.router.navigate(['/watchlist']);
  }

  getGenreText(genres: string[]): string {
    return genres ? genres.join(', ') : '';
  }

  
  Math = Math;
}
