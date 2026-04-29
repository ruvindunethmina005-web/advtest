import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // CRITICAL FIX: Ensures all links and assets use relative paths.
  // This prevents 404 errors when deployed to GitHub Pages or sub-folders.
  base: './', 
  
  build: {
    rollupOptions: {
      input: {
        // Main Dashboard
        main: resolve(__dirname, 'index.html'),
        
        // Individual Enterprise Modules
        attendance: resolve(__dirname, 'attendance.html'),
        canteencounter: resolve(__dirname, 'canteencounter.html'),
        mealplan: resolve(__dirname, 'mealplan.html'),
        roster: resolve(__dirname, 'roster.html'),
        log: resolve(__dirname, 'log.html'),
        report: resolve(__dirname, 'report.html')
      }
    }
  }
});
