import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating-selector',
  imports: [CommonModule, FormsModule],
  templateUrl: './rating-selector.html',
  styleUrl: './rating-selector.scss',
})
export class RatingSelectorComponent {
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  onRatingChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = parseInt(target.value, 10);
    this.rating = isNaN(value) ? 0 : value;
    this.ratingChange.emit(this.rating);
  }
}

