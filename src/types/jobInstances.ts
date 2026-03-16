export interface IJobInstance {
   id: string,
   job_def_id: string,
   idempotency_key: string,
   status: string,
   retry_count: number,
   max_retries: number,
   payload: any,
   next_run_time: string,
   locked_at?: string | null,
   locked_by?: string | null,
   last_heartbeat?: string | null,
   updated_at: string,
   created_at: string
}


export type ICreateJobInstance = Omit<IJobInstance, 'id' | 'created_at' | 'updated_at'>;
