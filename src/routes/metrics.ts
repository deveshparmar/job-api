import { Router } from 'express';
import { JobController } from '../controllers/jobController.js';
import { register } from '../metrics/metrics.js';

const metricsRouter = Router();

metricsRouter.get('/', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});
export default metricsRouter;