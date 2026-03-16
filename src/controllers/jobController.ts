import type { NextFunction, Request, Response } from "express";
import { JobService } from "../services/jobService.js";
import { jobDefinitionSchema, jobInstanceSchema } from "../schema/job.js";

export class JobController {
    private service: JobService;

    constructor() {
        this.service = new JobService();
    }

    createJobDefinition = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, value } = jobDefinitionSchema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: `Validation Error: ${error.details[0]?.message || "Invalid input"}`
                });
            }

            const newJobDefination = await this.service.addJobDefination(value);

            return res.status(201).json({
                success: true,
                message: "Job Definition created successfully",
                data: newJobDefination
            });

        } catch (error: any) {
            next(error);
        }
    }

    getJobDefinition = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params["id"];
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid ID"
                });
            }
            const job = await this.service.getJobDefination(id as string);
            return res.status(200).json({
                success: true,
                data: job
            });
        } catch (error: any) {
            next(error);
        }
    }

    getAllJobDefinations = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const jobs = await this.service.getAllJobDefinations();
            return res.status(200).json({
                success: true,
                data: jobs
            });
        } catch (error: any) {
            next(error);
        }
    }

    updateJobDefinition = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params["id"];
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid ID"
                });
            }

            const job = await this.service.updateJobDefination({ ...req.body, id: id as string });
            return res.status(200).json({
                success: true,
                message: "Job Definition updated successfully",
                data: job
            });
        } catch (error: any) {
            next(error);
        }
    }

    createJob = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { error, value } = jobInstanceSchema.validate(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: `Validation Error: ${error.details[0]?.message || "Invalid input"}`
                });
            }

            const newJob = await this.service.addJobInstance(value);

            return res.status(201).json({
                success: true,
                message: "Job created successfully",
                data: newJob
            });

        } catch (error: any) {
            next(error);
        }
    }

    getJob = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params["id"];
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid ID"
                });
            }
            const job = await this.service.getJobInstance(id as string);
            return res.status(200).json({
                success: true,
                data: job
            });
        } catch (error: any) {
            next(error);
        }
    }

    getAllJobs = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const jobs = await this.service.getAllJobInstances();
            return res.status(200).json({
                success: true,
                data: jobs
            });
        } catch (error: any) {
            next(error);
        }
    }

    updateJob = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params["id"];
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid ID"
                });
            }

            const job = await this.service.updateJobInstance({ ...req.body, id: id as string });
            return res.status(200).json({
                success: true,
                message: "Job updated successfully",
                data: job
            });
        } catch (error: any) {
            next(error);
        }
    }

};