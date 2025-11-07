import prompts from './prompts.json';

export const PROMPTS = prompts;

export const MESSAGE_STATUS_COPY = {
  pending: '전송 중',
  sent: '전송 완료',
  error: '전송 실패'
} as const;
