// test-cluster.ts

import cluster from 'cluster';
import { app } from '../index';
import os from 'os';
import { config } from 'dotenv';

config()
const PORT = process.env.PORT_NUM;

const numberCpu = os.cpus().length;
if (cluster.isPrimary) {
  for (let i = 0; i < numberCpu; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(PORT || 5000, () => {
    console.log(`Server ${process.pid} successfully listening on port ${PORT}`);
  });
}
