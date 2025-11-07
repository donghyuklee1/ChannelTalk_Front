import { FormEvent, useState } from 'react';
import styles from '../styles/ExperimentPromptForm.module.css';

export interface VariationDraft {
  id: string;
  name: string;
  prompt: string;
  trafficAllocation: number;
}

interface ExperimentPromptFormProps {
  isSubmitting: boolean;
  onSubmit: (payload: {
    name: string;
    basePrompt: string;
    variations: VariationDraft[];
  }) => Promise<void>;
}

const createEmptyVariation = (index: number): VariationDraft => ({
  id: `variation-${index}`,
  name: `Variation ${index + 1}`,
  prompt: '',
  trafficAllocation: index === 0 ? 50 : 50
});

const ExperimentPromptForm = ({ isSubmitting, onSubmit }: ExperimentPromptFormProps) => {
  const [experimentName, setExperimentName] = useState('봇 온보딩 A/B 테스트');
  const [basePrompt, setBasePrompt] = useState('고객 온보딩을 돕는 기본 프롬프트를 입력하세요.');
  const [variations, setVariations] = useState<VariationDraft[]>([
    createEmptyVariation(0),
    createEmptyVariation(1)
  ]);

  const handleVariationChange = (id: string, field: keyof VariationDraft, value: string) => {
    setVariations((prev) =>
      prev.map((variation) =>
        variation.id === id
          ? {
              ...variation,
              [field]: field === 'trafficAllocation' ? Number(value) : value
            }
          : variation
      )
    );
  };

  const handleAddVariation = () => {
    setVariations((prev) => [...prev, createEmptyVariation(prev.length)]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const totalAllocation = variations.reduce((sum, variation) => sum + variation.trafficAllocation, 0);
    if (totalAllocation !== 100) {
      alert('트래픽 비율의 합은 100이어야 합니다.');
      return;
    }

    await onSubmit({
      name: experimentName.trim(),
      basePrompt: basePrompt.trim(),
      variations
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="experimentName">실험 이름</label>
        <input
          id="experimentName"
          value={experimentName}
          onChange={(event) => setExperimentName(event.target.value)}
          placeholder="예) 온보딩 응답율 개선 실험"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="basePrompt">기본 프롬프트</label>
        <textarea
          id="basePrompt"
          value={basePrompt}
          onChange={(event) => setBasePrompt(event.target.value)}
          placeholder="테스트할 기본 프롬프트를 입력하세요."
          rows={6}
          required
        />
      </div>

      <section className={styles.variationsSection}>
        <div className={styles.sectionHeader}>
          <h3>실험 변형</h3>
          <button type="button" onClick={handleAddVariation} className={styles.addButton}>
            + 변형 추가
          </button>
        </div>

        {variations.map((variation) => (
          <div key={variation.id} className={styles.variationCard}>
            <div className={styles.row}>
              <label htmlFor={`${variation.id}-name`}>이름</label>
              <input
                id={`${variation.id}-name`}
                value={variation.name}
                onChange={(event) => handleVariationChange(variation.id, 'name', event.target.value)}
                required
              />
            </div>
            <div className={styles.row}>
              <label htmlFor={`${variation.id}-prompt`}>프롬프트</label>
              <textarea
                id={`${variation.id}-prompt`}
                value={variation.prompt}
                onChange={(event) => handleVariationChange(variation.id, 'prompt', event.target.value)}
                placeholder="해당 변형의 프롬프트 설정"
                rows={4}
                required
              />
            </div>
            <div className={styles.row}>
              <label htmlFor={`${variation.id}-traffic`}>트래픽 비율 (%)</label>
              <input
                id={`${variation.id}-traffic`}
                type="number"
                min={0}
                max={100}
                value={variation.trafficAllocation}
                onChange={(event) => handleVariationChange(variation.id, 'trafficAllocation', event.target.value)}
                required
              />
            </div>
          </div>
        ))}
      </section>

      <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
        {isSubmitting ? '워크플로우 생성 중...' : '워크플로우 생성하기'}
      </button>
    </form>
  );
};

export default ExperimentPromptForm;
