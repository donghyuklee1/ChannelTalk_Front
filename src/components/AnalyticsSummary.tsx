import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import styles from '../styles/AnalyticsSummary.module.css';
import type { ExperimentAnalytics } from '@types/experiment';

interface AnalyticsSummaryProps {
  analytics: ExperimentAnalytics | null;
  isLoading: boolean;
}

const AnalyticsSummary = ({ analytics, isLoading }: AnalyticsSummaryProps) => {
  if (isLoading) {
    return <div className={styles.placeholder}>분석 데이터를 불러오는 중입니다...</div>;
  }

  if (!analytics) {
    return <div className={styles.placeholder}>실험을 선택하면 분석 결과가 표시됩니다.</div>;
  }

  const {
    summary: { totalSessions, engagedUsers, conversionRate, bestVariationId },
    trend
  } = analytics;

  return (
    <div className={styles.container}>
      <section className={styles.metricsRow}>
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>총 세션 수</span>
          <strong className={styles.metricValue}>{totalSessions.toLocaleString()}</strong>
        </article>
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>참여 사용자</span>
          <strong className={styles.metricValue}>{engagedUsers.toLocaleString()}</strong>
        </article>
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>전환율</span>
          <strong className={styles.metricValue}>{(conversionRate * 100).toFixed(1)}%</strong>
        </article>
        <article className={styles.metricCard}>
          <span className={styles.metricLabel}>우수 변형</span>
          <strong className={styles.metricValue}>{bestVariationId}</strong>
        </article>
      </section>

      <section className={styles.chartSection}>
        <h3>전환율 추이</h3>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="colorConversion" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
              <Tooltip formatter={(value: number) => `${(value * 100).toFixed(2)}%`} />
              <Area
                type="monotone"
                dataKey="conversionRate"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorConversion)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsSummary;
