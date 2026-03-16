import { Router } from 'express';
import jobDefinitionRouter from './jobDefinitionRoutes.js';
import jobRouter from './jobRoute.js';
import metricsRouter from './metrics.js';

const router = Router();

router.use('/v1/job-definition', jobDefinitionRouter);
router.use('/v1/job', jobRouter);
router.use('/v1/metrics', metricsRouter);

export default router;