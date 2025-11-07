import { useCallback, useEffect, useState } from 'react';
import AnalyticsSummary from '@components/AnalyticsSummary';
import ExperimentList from '@components/ExperimentList';
import { fetchExperimentAnalytics, fetchExperiments } from '@services/experimentsApi';
import type { ExperimentAnalytics, ExperimentSummary } from '@types/experiment';
import styles from '../styles/AnalyticsPage.module.css';

const AnalyticsPage = () => {
  const [experiments, setExperiments] = useState<ExperimentSummary[]>([]);
  const [selectedExperimentId, setSelectedExperimentId] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<ExperimentAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const refreshInterval = Number(import.meta.env.VITE_ANALYTICS_REFRESH_INTERVAL_MS ?? 60_000);

  const loadAnalytics = useCallback(async (experimentId: string, { showLoader } = { showLoader: true }) => {
    if (showLoader) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const data = await fetchExperimentAnalytics(experimentId);
      setAnalytics(data);
    } catch (err) {
      setError('분석 데이터를 가져오지 못했습니다.');
    } finally {
      if (showLoader) {
        setIsLoading(false);
      }
    }
  }, []);

  const handleSelectExperiment = useCallback(async (experimentId: string) => {
    setSelectedExperimentId(experimentId);
    await loadAnalytics(experimentId);
  }, [loadAnalytics]);

  const loadExperimentList = useCallback(async () => {
    try {
      const data = await fetchExperiments();
      setExperiments(data);
      if (data.length > 0) {
        void handleSelectExperiment(data[0].id);
      }
    } catch (err) {
      setError('실험 목록을 불러오지 못했습니다.');
    }
  }, [handleSelectExperiment]);

  useEffect(() => {
    void loadExperimentList();
  }, [loadExperimentList]);

  useEffect(() => {
    if (!selectedExperimentId || refreshInterval <= 0) {
      return;
    }

    const timerId = window.setInterval(() => {
      void loadAnalytics(selectedExperimentId, { showLoader: false });
    }, refreshInterval);

    return () => {
      window.clearInterval(timerId);
    };
  }, [selectedExperimentId, refreshInterval, loadAnalytics]);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2>실험 목록</h2>
        <ExperimentList
          experiments={experiments}
          selectedExperimentId={selectedExperimentId ?? undefined}
          onSelect={handleSelectExperiment}
        />
      </aside>
      <section className={styles.content}>
        <h2>실험 리포트</h2>
        {error ? <p className={styles.error}>{error}</p> : null}
        <AnalyticsSummary analytics={analytics} isLoading={isLoading} />
      </section>
    </div>
  );
};

export default AnalyticsPage;
