export interface IJobExecution {
    id: string,
    job_instance_id: string,
    attempt_number: number,
    status: string,
    worker_id: string,
    started_at: string,
    ended_at: string,
    error_message: string,
    execution_time_ms: number,
    created_at: string
}
