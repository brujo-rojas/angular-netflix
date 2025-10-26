import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { WatchlistService } from './core/services/watchlist.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatTabsModule, MatIconModule, MatChipsModule, MatToolbarModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  selectedTab: number = 0;
  watchlistCount: number = 0;

  constructor(
    private router: Router,
    private watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    
    this.watchlistService.watchlist$.subscribe(movies => {
      this.watchlistCount = movies.length;
    });

    
    this.updateTabFromRoute();
    
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTabFromRoute();
    });
  }

  private updateTabFromRoute(): void {
    const url = this.router.url;
    if (url.includes('/watchlist')) {
      this.selectedTab = 1;
    } else if (url.includes('/search')) {
      this.selectedTab = 0;
    }
  }

  onTabChange(index: number): void {
    if (index === 0) {
      this.router.navigate(['/search']);
    } else if (index === 1) {
      this.router.navigate(['/watchlist']);
    }
  }
}
