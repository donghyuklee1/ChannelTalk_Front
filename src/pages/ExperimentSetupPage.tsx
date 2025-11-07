import { useCallback, useEffect, useState } from 'react';
import ExperimentPromptForm, { VariationDraft } from '@components/ExperimentPromptForm';
import ExperimentList from '@components/ExperimentList';
import WorkflowPreview from '@components/WorkflowPreview';
import {
  createExperiment,
  fetchExperiments,
  fetchExperimentWorkflow
} from '@services/experimentsApi';
import type { ExperimentSummary, ExperimentWorkflow } from '@types/experiment';
import styles from '../styles/ExperimentSetupPage.module.css';

const ExperimentSetupPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [experiments, setExperiments] = useState<ExperimentSummary[]>([]);
  const [selectedExperimentId, setSelectedExperimentId] = useState<string | null>(null);
  const [workflow, setWorkflow] = useState<ExperimentWorkflow | null>(null);
  const [isLoadingWorkflow, setIsLoadingWorkflow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectExperiment = useCallback(async (experimentId: string) => {
    setSelectedExperimentId(experimentId);
    setIsLoadingWorkflow(true);
    setError(null);
    try {
      const data = await fetchExperimentWorkflow(experimentId);
      setWorkflow(data);
    } catch (err) {
      setError('선택한 실험의 워크플로우를 불러오지 못했습니다.');
    } finally {
      setIsLoadingWorkflow(false);
    }
  }, []);

  const loadExperiments = useCallback(async () => {
    try {
      const data = await fetchExperiments();
      setExperiments(data);
      if (!selectedExperimentId && data.length > 0) {
        void handleSelectExperiment(data[0].id);
      }
    } catch (err) {
      setError('실험 목록을 불러오는 데 실패했습니다.');
    }
  }, [handleSelectExperiment, selectedExperimentId]);

  useEffect(() => {
    void loadExperiments();
  }, [loadExperiments]);

  const handleSubmit = async ({
    name,
    basePrompt,
    variations
  }: {
    name: string;
    basePrompt: string;
    variations: VariationDraft[];
  }) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const payload = {
        name,
        basePrompt,
        variations: variations.map(({ id, ...rest }) => rest)
      };
      const generatedWorkflow = await createExperiment(payload);
      setWorkflow(generatedWorkflow);
      setSelectedExperimentId(generatedWorkflow.experimentId);
      await loadExperiments();
    } catch (err) {
      setError('워크플로우 생성에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.grid}>
      <section className={styles.leftPane}>
        <h2 className={styles.sectionTitle}>실험 프롬프트 구성</h2>
        <ExperimentPromptForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />
        {error ? <p className={styles.error}>{error}</p> : null}
        <div className={styles.divider} />
        <h3 className={styles.sectionTitle}>기존 실험</h3>
        <ExperimentList
          experiments={experiments}
          selectedExperimentId={selectedExperimentId ?? undefined}
          onSelect={(experimentId) => {
            void handleSelectExperiment(experimentId);
          }}
        />
      </section>
      <section className={styles.rightPane}>
        <WorkflowPreview workflow={workflow} isLoading={isLoadingWorkflow || isSubmitting} />
      </section>
    </div>
  );
};

export default ExperimentSetupPage;
