export interface IJobDefination {
    id: string
    name: string,
    cron_expression: string,
    job_type: string,
    default_payload: any,
    is_active: boolean,
    created_at: string,
    updated_at: string,
    created_by: string,
    updated_by: string
}

export type ICreateJobDefination = Omit<IJobDefination, 'id' | 'is_active' | 'created_at' | 'updated_at' | 'created_by' | 'updated_by'>;
export type IUpdateJobDefination = Partial<ICreateJobDefination> & { id: string };
