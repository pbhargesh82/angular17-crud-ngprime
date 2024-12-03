import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  darkModeSignal = signal<boolean>(false);

  updateDarkMode(): void {
    this.darkModeSignal.set(!this.darkModeSignal());
    if (this.darkModeSignal()) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }

}
