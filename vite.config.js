import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Safely define __dirname for ES Modules (Vite's default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Custom Plugin: Removes .html from links and handles local dev routing
const cleanUrlsPlugin = () => ({
  name: 'clean-urls',
  // 1. Rewrite local dev server requests (e.g., /log -> /log.html)
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // If the URL has no extension and isn't the root, append .html internally
      if (req.url && !req.url.includes('.') && req.url !== '/') {
        req.url += '.html';
      }
      next();
    });
  },
  // 2. Transform HTML files to dynamically remove .html from <a> tags
  transformIndexHtml(html) {
    // Matches href="page.html", href="./page.html", or href="/page.html"
    return html.replace(/href="(?:\.\/|\/)?([a-zA-Z0-9_-]+)\.html"/g, (match, pageName) => {
      // Direct 'index.html' back to the root '/'
      if (pageName === 'index') return 'href="/"';
      // Rewrite others to clean absolute paths
      return `href="/${pageName}"`;
    });
  }
});

export default defineConfig({
  // Netlify serves from the root domain
  base: '/', 
  
  // Register the custom plugin we created above
  plugins: [
    cleanUrlsPlugin()
  ],
  
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
