import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// FIX 1: Safely define __dirname for ES Modules (Vite's default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  // FIX 2: Updated for Netlify
  // Netlify serves from the root domain, not a sub-folder like GitHub pages.
  base: '/', 
  
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
