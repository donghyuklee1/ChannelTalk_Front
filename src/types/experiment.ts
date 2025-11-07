export interface ExperimentVariation {
  id: string;
  name: string;
  prompt: string;
  trafficAllocation: number;
}

export interface ExperimentWorkflowStep {
  id: string;
  title: string;
  description: string;
}

export interface ExperimentWorkflow {
  experimentId: string;
  title: string;
  description: string;
  variations: ExperimentVariation[];
  steps: ExperimentWorkflowStep[];
}

export interface ExperimentSummary {
  id: string;
  name: string;
  status: 'draft' | 'running' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface ExperimentAnalyticsPoint {
  timestamp: string;
  conversionRate: number;
  retentionRate: number;
  avgHandleTime: number;
}

export interface ExperimentAnalytics {
  experimentId: string;
  summary: {
    totalSessions: number;
    engagedUsers: number;
    conversionRate: number;
    bestVariationId: string;
  };
  trend: ExperimentAnalyticsPoint[];
}
