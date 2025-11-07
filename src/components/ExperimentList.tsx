import styles from '../styles/ExperimentList.module.css';
import type { ExperimentSummary } from '@types/experiment';
import { format } from 'date-fns';

interface ExperimentListProps {
  experiments: ExperimentSummary[];
  onSelect: (experimentId: string) => void;
  selectedExperimentId?: string;
}

const ExperimentList = ({ experiments, onSelect, selectedExperimentId }: ExperimentListProps) => {
  if (!experiments.length) {
    return <div className={styles.empty}>등록된 실험이 없습니다.</div>;
  }

  return (
    <ul className={styles.list}>
      {experiments.map((experiment) => (
        <li key={experiment.id}>
          <button
            type="button"
            onClick={() => onSelect(experiment.id)}
            className={
              experiment.id === selectedExperimentId
                ? `${styles.card} ${styles.active}`
                : styles.card
            }
          >
            <div className={styles.cardHeader}>
              <span className={styles.name}>{experiment.name}</span>
              <span className={styles.status} data-status={experiment.status}>
                {experiment.status}
              </span>
            </div>
            <p className={styles.meta}>
              생성 {format(new Date(experiment.createdAt), 'yyyy.MM.dd HH:mm')} · 업데이트{' '}
              {format(new Date(experiment.updatedAt), 'yyyy.MM.dd HH:mm')}
            </p>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ExperimentList;
