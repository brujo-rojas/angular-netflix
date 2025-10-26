import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', loadComponent: () => import('./features/movie-search/movie-search').then(m => m.MovieSearchComponent) },
  { path: 'watchlist', loadComponent: () => import('./features/watchlist/watchlist').then(m => m.WatchlistComponent) },
  { path: 'movie/:id', loadComponent: () => import('./features/movie-detail/movie-detail').then(m => m.MovieDetailComponent) },
  { path: '**', redirectTo: '/search' }
];
