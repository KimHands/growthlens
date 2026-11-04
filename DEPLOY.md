# GrowthLens 배포 가이드

프론트 = **Vercel** (Next.js), 백엔드 = **Render** (FastAPI, Free 플랜).
저장소는 monorepo: `/` = 프론트, `/backend` = 백엔드.

---

## 0. 준비

```bash
git init
git add .
git commit -m "initial"
gh repo create growthlens --public --source=. --push
```

(GitHub repo URL: `https://github.com/<you>/growthlens`)

---

## 1. 백엔드 (Render)

### 1-1. Render에 연결
1. https://dashboard.render.com → **New** → **Blueprint**
2. GitHub repo 선택 → `backend/render.yaml` 자동 인식
3. **Apply** → 빌드 시작 (3~5분)

### 1-2. CORS 환경변수
빌드 후 서비스 → **Environment** → 추가:

| Key | Value |
|---|---|
| `CORS_ALLOW_ORIGINS` | `https://growthlens.vercel.app,http://localhost:3000` |

(Vercel 프로젝트 만든 다음에 실제 도메인으로 교체)

### 1-3. 검증
배포 완료 후:
```
https://<your-service>.onrender.com/health   → {"status":"ok"}
https://<your-service>.onrender.com/api/home → JSON
```

> ⚠️ Render Free 플랜은 15분 idle 후 잠들어요. 첫 요청은 cold-start로 ~30초 걸립니다.
> 이 데이터는 in-memory라 잠들었다가 깨어나면 seed 14일치로 리셋됩니다.

---

## 2. 프론트 (Vercel)

### 2-1. Vercel에 연결
1. https://vercel.com/new → GitHub repo 선택
2. **Framework Preset**: Next.js (자동 감지)
3. **Root Directory**: `./` (기본)
4. **Environment Variables** 추가:

| Key | Value |
|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `https://<your-service>.onrender.com` |

5. **Deploy**

### 2-2. 백엔드 CORS 갱신
배포가 끝나면 Vercel이 실제 도메인을 발급합니다 (예: `growthlens-xxx.vercel.app`).
Render 대시보드의 `CORS_ALLOW_ORIGINS`에 그 도메인을 추가하고 재배포.

---

## 3. PWA 동작 확인

배포된 Vercel URL을 모바일에서 열기:
- **Chrome Android**: 우상단 ⋮ → "앱 설치"
- **iOS Safari**: 공유 → "홈 화면에 추가"

theme color `#007F5F`, standalone 모드, GrowthLens 아이콘으로 떠야 정상.

---

## 4. 로컬 개발

```bash
# 백엔드 (터미널 1)
cd backend
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

# 프론트 (터미널 2)
npm install
cp .env.example .env.local  # 이미 만들어져 있음
npm run dev
```

프론트: http://localhost:3000 / 백엔드: http://localhost:8000/docs (Swagger UI)

---

## 5. 변경 푸시

```bash
git add . && git commit -m "..." && git push
```

푸시하면 Vercel + Render 둘 다 자동 재배포 (`autoDeploy: true`).
