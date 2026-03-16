import { Router } from 'express';
import { JobController } from '../controllers/jobController.js';

const jobRouter = Router();
const jobController = new JobController();
jobRouter.post('/', jobController.createJob);
jobRouter.put('/:id', jobController.updateJob);
jobRouter.get('/all', jobController.getAllJobs);
jobRouter.get('/:id', jobController.getJob);
export default jobRouter;