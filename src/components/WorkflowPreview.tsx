import styles from '../styles/WorkflowPreview.module.css';
import type { ExperimentWorkflow } from '@types/experiment';

interface WorkflowPreviewProps {
  workflow: ExperimentWorkflow | null;
  isLoading: boolean;
}

const WorkflowPreview = ({ workflow, isLoading }: WorkflowPreviewProps) => {
  if (isLoading) {
    return <div className={styles.placeholder}>워크플로우를 생성 중입니다...</div>;
  }

  if (!workflow) {
    return (
      <div className={styles.placeholder}>
        프롬프트를 제출하면 LLM이 제안하는 실험 워크플로우가 이곳에 표시됩니다.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>{workflow.title}</h2>
        <p>{workflow.description}</p>
      </header>

      <section className={styles.section}>
        <h3>실험 변형 ({workflow.variations.length})</h3>
        <div className={styles.variationsGrid}>
          {workflow.variations.map((variation) => (
            <article key={variation.id} className={styles.card}>
              <header>
                <span className={styles.cardTitle}>{variation.name}</span>
                <span className={styles.badge}>{variation.trafficAllocation}%</span>
              </header>
              <p>{variation.prompt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3>사용자 흐름</h3>
        <ol className={styles.steps}>
          {workflow.steps.map((step) => (
            <li key={step.id}>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default WorkflowPreview;
