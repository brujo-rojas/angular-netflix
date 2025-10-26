import { Component, EventEmitter, Output, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-search',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './movie-search.html',
  styleUrl: './movie-search.scss',
})
export class MovieSearchComponent implements OnInit, OnChanges {
  @Input() initialQuery: string = '';
  searchQuery: string = '';
  
  @Output() searchEvent = new EventEmitter<string>();

  ngOnInit(): void {
    if (this.initialQuery) {
      this.searchQuery = this.initialQuery;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialQuery'] && this.initialQuery) {
      this.searchQuery = this.initialQuery;
    }
  }

  onSearch(): void {
    const trimmedQuery = this.searchQuery.trim();
    if (trimmedQuery && trimmedQuery.length >= 2 && trimmedQuery.length <= 50) {
      this.searchEvent.emit(trimmedQuery);
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}
