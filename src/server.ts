// src/server.ts
import app from './app';
import { HTTP_STATUS } from './constants/httpConstants';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (HTTP ${HTTP_STATUS.OK})`);
});