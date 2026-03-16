import { Router } from 'express';
import { JobController } from '../controllers/jobController.js';

const jobDefinitionRouter = Router();
const jobController = new JobController();
jobDefinitionRouter.post('/', jobController.createJobDefinition);
jobDefinitionRouter.put('/:id', jobController.updateJobDefinition);
jobDefinitionRouter.get('/all', jobController.getAllJobDefinations);
jobDefinitionRouter.get('/:id', jobController.getJobDefinition);
export default jobDefinitionRouter;