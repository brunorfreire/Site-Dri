import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function saveImageDevPlugin(): Plugin {
  return {
    name: 'save-image-dev-plugin',
    configureServer(server) {
      server.middlewares.use('/api/save-image', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { fileName, dataBase64 } = JSON.parse(body);
              if (!fileName || !dataBase64) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing fileName or dataBase64' }));
                return;
              }
              const safeFileName = path.basename(fileName);
              const targetDir = path.resolve(__dirname, 'src/assets/images');
              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
              }
              const base64Data = dataBase64.replace(/^data:image\/\w+;base64,/, '');
              const buffer = Buffer.from(base64Data, 'base64');
              const targetPath = path.resolve(targetDir, safeFileName);
              fs.writeFileSync(targetPath, buffer);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, fileName: safeFileName }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        } else {
          res.statusCode = 405;
          res.end();
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      saveImageDevPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

