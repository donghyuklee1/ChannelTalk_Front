import axios from 'axios';
import type {
  ExperimentAnalytics,
  ExperimentSummary,
  ExperimentWorkflow
} from '@types/experiment';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/experiments`,
  timeout: 20_000
});

export interface CreateExperimentRequest {
  name: string;
  basePrompt: string;
  variations: Array<{
    name: string;
    prompt: string;
    trafficAllocation: number;
  }>;
}

export const createExperiment = async (
  payload: CreateExperimentRequest
): Promise<ExperimentWorkflow> => {
  const { data } = await api.post('/generate-workflow', payload);
  return data;
};

export const fetchExperiments = async (): Promise<ExperimentSummary[]> => {
  const { data } = await api.get('/');
  return data;
};

export const fetchExperimentWorkflow = async (
  experimentId: string
): Promise<ExperimentWorkflow> => {
  const { data } = await api.get(`/${experimentId}/workflow`);
  return data;
};

export const fetchExperimentAnalytics = async (
  experimentId: string
): Promise<ExperimentAnalytics> => {
  const { data } = await api.get(`/${experimentId}/analytics`);
  return data;
};
