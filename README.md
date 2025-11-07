# ChannelTalk Frontend

Collaborative frontend workspace for the ChannelTalk project. This repository contains the shared UI code, prompt assets, and integration layer for the ChannelTalk experience.

## Tech Stack
- React 18 + TypeScript
- Vite build tool
- CSS Modules with global baseline styles
- Axios for API requests

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment defaults:
   ```bash
   cp env.example .env
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```

## Available Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview production build locally
- `npm run lint` – run ESLint

## A/B 실험 파이프라인 개요
- **프롬프트 실험 설정 (`/`)**: 실험 이름, 기본 프롬프트, 변형별 프롬프트와 트래픽 비율을 입력합니다. 제출 시 백엔드 LLM이 워크플로우를 생성하여 프리뷰 섹션에 표시합니다.
- **테스트 채팅 인터페이스 (`/testbed?experiment=exp-id&variation=var-id`)**: 생성된 챗봇을 실제 사용자 여정과 동일하게 체험하며 메시지를 전송합니다. 쿼리 파라미터로 실험/변형을 선택해 백엔드 세션과 연동할 수 있습니다.
- **분석 대시보드 (`/analytics`)**: 실험별 트래픽, 참여, 전환율 및 시간대별 추이를 확인합니다. 우수 변형과 핵심 메트릭을 상단 카드로 제공하고, 추이 차트로 변화를 시각화합니다.

백엔드 엔드포인트는 `env.example`의 값을 참고해 `.env` 파일을 구성하세요. 프론트엔드에서 사용하는 주요 REST 엔드포인트는 다음과 같습니다.

- `POST /experiments/generate-workflow` – 실험 워크플로우 생성
- `GET /experiments/` – 실험 목록 조회
- `GET /experiments/:id/workflow` – 특정 실험 워크플로우 조회
- `GET /experiments/:id/analytics` – 실험별 분석 데이터 조회

## Project Structure
```
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI widgets
│   ├── constants/         # Prompt and copy resources
│   ├── hooks/             # Shared logic
│   ├── pages/             # Route-level components
│   ├── services/          # API clients
│   ├── styles/            # Global and modular styles
│   └── types/             # Shared TypeScript types
├── env.example            # Template for environment variables
├── package.json
└── README.md
```

## Collaboration Guidelines
- Create feature branches from `main` using the `feat/*`, `fix/*`, or `chore/*` naming convention.
- Keep prompt and locale text in `src/constants` rather than hardcoding in components.
- Run `npm run lint` before opening pull requests.
- Use clear, conventional commits (e.g., `feat: add chat composer`).

## Prompt Management
Shared prompt copy lives in `src/constants/prompts.json`. Update this file for content changes and import via `src/constants/index.ts`. Coordinate with backend prompt owners before modifying server-driven prompts.

## License
This project is private for the ChannelTalk team.
