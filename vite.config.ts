import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'save-images-middleware',
        configureServer(server) {
          const handleSave = (req: any, res: any) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk: any) => { body += chunk; });
              req.on('end', () => {
                try {
                  const { id, base64Data } = JSON.parse(body);
                  if (base64Data) {
                    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
                    const buffer = Buffer.from(cleanBase64, 'base64');
                    const targetDir = path.resolve(__dirname, 'src/assets/images');
                    if (!fs.existsSync(targetDir)) {
                      fs.mkdirSync(targetDir, { recursive: true });
                    }
                    if (buffer.length > 1024) {
                      const cleanId = id ? id.replace(/[^a-zA-Z0-9_-]/g, '_') : 'custom';
                      const filename = `custom_${cleanId}.jpg`;
                      fs.writeFileSync(path.resolve(targetDir, filename), buffer);

                      if (cleanId === 'hero' || cleanId === 'dra_adriana_hero') {
                        fs.writeFileSync(path.resolve(targetDir, 'dra_adriana_hero_1789567477809.jpg'), buffer);
                      }

                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify({ success: true, path: `/src/assets/images/${filename}` }));
                      return;
                    }
                  }
                } catch (e) {
                  console.error('Error saving image:', e);
                }
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid payload' }));
              });
            } else {
              res.writeHead(405);
              res.end();
            }
          };

          server.middlewares.use('/api/save-hero-image', handleSave);
          server.middlewares.use('/api/save-image', handleSave);
        }
      }
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
