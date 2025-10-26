import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from '../../core/models/movie-search-response.interface';
import { WatchlistService } from '../../core/services/watchlist.service';
import { RatingSelectorComponent } from '../../shared/components/rating-selector/rating-selector';

@Component({
  selector: 'app-watchlist',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    RouterModule,
    RatingSelectorComponent
  ],
  templateUrl: './watchlist.html',
  styleUrl: './watchlist.scss',
})
export class WatchlistComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['image', 'info', 'userRating', 'userComment', 'actions'];
  watchlist: Movie[] = [];
  isEditing: { [key: string]: boolean } = {};
  tempComments: { [key: string]: string } = {};
  tempRatings: { [key: string]: number } = {};
  private destroy$ = new Subject<void>();

  constructor(
    private watchlistService: WatchlistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.watchlistService.watchlist$
      .pipe(takeUntil(this.destroy$))
      .subscribe(movies => {
        this.watchlist = movies;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeFromWatchlist(movie: Movie): void {
    const movieCopy = { ...movie };
    this.watchlistService.removeFromWatchlist(movie.id);
    
    const snackBarRef = this.snackBar.open(
      `"${movie.title}" removed from Watchlist`, 
      'Undo',
      { duration: 5000, verticalPosition: 'top', horizontalPosition: 'center' }
    );
    
    snackBarRef.onAction().subscribe(() => {
      this.watchlistService.addToWatchlist(movieCopy);
    });
  }

  clearAll(): void {
    if (this.watchlist.length === 0) return;
    
    this.watchlistService.clearWatchlist();
    this.snackBar.open(
      'Watchlist cleared', 
      'Close', 
      { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' }
    );
  }

  getGenreText(genres: string[]): string {
    return genres ? genres.join(', ') : '';
  }

  getStars(rating: number): string[] {
    return Array(5).fill('star').map((_, i) => i < rating ? 'star' : 'star_border');
  }

  toggleEdit(movieId: string): void {
    if (this.isEditing[movieId]) {
      this.cancelEdit(movieId);
    } else {
      this.isEditing[movieId] = true;
      const movie = this.watchlist.find(m => m.id === movieId);
      this.tempComments[movieId] = movie?.userComment || '';
      this.tempRatings[movieId] = movie?.userRating || 0;
    }
  }

  saveEdit(movie: Movie): void {
    this.watchlistService.updateMovieComment(movie.id, this.tempComments[movie.id] || '');
    this.watchlistService.updateMovieRating(movie.id, this.tempRatings[movie.id] || 0);
    this.isEditing[movie.id] = false;
    this.snackBar.open('Changes saved', 'Close', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'center' });
  }

  cancelEdit(movieId: string): void {
    this.isEditing[movieId] = false;
    delete this.tempComments[movieId];
    delete this.tempRatings[movieId];
  }

  updateRating(movie: Movie, rating: number): void {
    this.watchlistService.updateMovieRating(movie.id, rating);
  }

  get hasItems(): boolean {
    return this.watchlist.length > 0;
  }
}
