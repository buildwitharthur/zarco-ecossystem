import { createApp } from './app.js';
import { loadEnv } from './config/env.js';

const { PORT } = loadEnv();

createApp().listen(PORT, () => {
  console.log(`API is running on port ${PORT}`);
});
