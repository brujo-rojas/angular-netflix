import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Movie } from '../../../../core/models/movie-search-response.interface';

@Component({
  selector: 'app-movie-card',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCardComponent {
  @Input() movie!: Movie;
  @Input() isInWatchlist: boolean = false;
  
  @Output() addToWatchlist = new EventEmitter<Movie>();

  onAddToWatchlist(): void {
    this.addToWatchlist.emit(this.movie);
  }
}

