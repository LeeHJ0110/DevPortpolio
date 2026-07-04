# 이현진 개발자 포트폴리오

Vite + React로 만든 개발자 포트폴리오 사이트입니다.

## 로컬에서 실행하기

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## GitHub Pages 배포하기

### 1) base 경로 설정 (필수)

`vite.config.js`를 열어 `base` 값을 본인 저장소 이름에 맞게 수정하세요.

- 저장소 주소가 `github.com/아이디/my-portfolio` 라면 → `base: "/my-portfolio/"`
- 저장소 이름이 `아이디.github.io` (유저 페이지)라면 → `base: "/"`

### 2) GitHub에 저장소 만들고 push

```bash
git init
git add .
git commit -m "portfolio init"
git branch -M main
git remote add origin https://github.com/아이디/저장소이름.git
git push -u origin main
```

### 3) 배포 방법 — 방법 A: GitHub Actions (권장, 자동 배포)

이 프로젝트에는 `.github/workflows/deploy.yml`이 이미 포함되어 있어서,
`main` 브랜치에 push 하면 자동으로 빌드 후 GitHub Pages에 배포됩니다.

1. GitHub 저장소 → **Settings → Pages**
2. **Source**를 `GitHub Actions`로 설정
3. `main`에 push 하면 `Actions` 탭에서 배포 진행 상황 확인 가능
4. 완료 후 `https://아이디.github.io/저장소이름/` 에서 확인

### 3) 배포 방법 — 방법 B: gh-pages 패키지로 수동 배포

```bash
npm run deploy
```

- 이 명령은 `dist` 폴더를 빌드해 `gh-pages` 브랜치로 push합니다.
- 저장소 **Settings → Pages → Source**에서 브랜치를 `gh-pages`로 지정해주세요.

## 내용 수정하기

`src/App.jsx` 상단의 `PERSONAL`, `SKILLS`, `PROJECTS` 객체 값만 바꾸면
이름, 자기소개, 스킬, 프로젝트 내용을 자유롭게 수정할 수 있습니다.
