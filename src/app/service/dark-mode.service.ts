import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  darkModeSignal = signal<boolean>(false);

  // updateDarkMode() {
  //   // this.darkModeSignal.update((value) => (value === "dark" ? "null" : "dark"));

  //   console.log(this.darkModeSignal());
  //   // toggleDarkMode() {
  //   //   this.isDarkMode = !this.isDarkMode;
  //   // if (this.isDarkMode) {
  //   document.documentElement.classList.add('dark');
  //   localStorage.setItem('darkMode', 'true');
  //   // } else {
  //   // document.documentElement.classList.remove('dark');
  //   // localStorage.setItem('darkMode', 'false');
  //   // }
  //   // }

  // }

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

  constructor() { }
}
