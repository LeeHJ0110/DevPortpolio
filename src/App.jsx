import React, { useState, useEffect, useRef } from "react";
import { Mail, Github, ArrowLeft, ArrowUpRight, Users, GitBranch, Terminal } from "lucide-react";

/* =========================================================
   DATA — 아래 값들을 본인 정보로 자유롭게 수정하세요.
   ========================================================= */

const PERSONAL = {
  name: "이현진",
  nameEn: "Lee Hyun Jin",
  role: "Full Stack & DevOps",
  tagline: "호기심을 분석과 구현으로 이어가는 개발자, 이현진입니다",
  email: "rmflslekd@naver.com",
  github: "https://github.com/LeeHJ0110",
  intro:
    "문제를 구조적으로 분석하고 끝까지 해결하는 과정을 즐기는 개발자입니다. 궁금한 점이 생기면 직접 구현하고 원인을 분석하며 이해할 때까지 탐구하는 성향을 가지고 있습니다. 프로젝트를 진행하며 동료들과 적극적으로 소통하고 협업하는 경험을 쌓아왔으며, 함께 문제를 해결하고 성장하는 협업의 가치를 중요하게 생각합니다.",
  education: ["경기과학기술대 컴퓨터모바일융합과 졸업 (2026)"],
  certificates: ["정보처리산업기사", "운전면허 1종 보통"],
  closing: "성장하며 늘 협업을 고민하고, 가치 있는 기술로 소통하겠습니다.",
};

const SKILLS = [
  { label: "Language", items: ["Java", "JavaScript", "JSP", "C#", "Python"] },
  { label: "Framework / Library", items: ["Spring Boot", "MyBatis", "React", "JPA"] },
  { label: "WAS", items: ["Tomcat", "AWS"] },
  { label: "DB", items: ["Oracle", "PostgreSQL"] },
  {
    label: "IDE / Tool",
    items: ["SQL Developer", "IntelliJ", "Eclipse", "VSCode", "Postman", "pgAdmin", "Visual Studio"],
  },
];

const PROJECTS = [
  {
    id: "pet-and-i-for",
    index: "01",
    title: "Pet&I For",
    subtitle: "반려동물 건강관리 사이트",
    period: "Team Project",
    team: "5인",
    stack: ["React", "Spring", "JPA", "PostgreSQL", "AWS"],
    description:
      "유저의 반려동물을 등록하고 건강 상태를 확인하기 편하도록 만든 사이트입니다. 수의사가 유저들의 진단 신청을 처리하는 서비스, 반려동물 건강에 맞춘 스토어, 정보 공유를 위한 커뮤니티가 있습니다.",
    role: ["형상관리자", "수의사의 진단결과 처리", "일정표 서비스", "건강관리 홈페이지"],
    features: [
      {
        tag: "1 / 3",
        title: "진단 결과 페이지",
        caption: "수의사가 작성한 진단 결과를 유저에게 보여주는 페이지입니다.",
        points: [
          "수의사가 판단한 각 부위별 점수를 한눈에 볼 수 있는 카테고리별 점수",
          "과거의 평균 점수(건강 점수)와 비교할 수 있는 그래프",
          "해당 반려동물과 품종의 평균, 동물 종류의 평균과의 비교",
          "가장 낮은 점수 기준으로 스토어에 있는 상품들 추천",
        ],
      },
      {
        tag: "2 / 3",
        title: "일정 관리 페이지",
        caption: "유저들의 반려동물 관련 일정을 관리하기 편하게 만든 페이지입니다.",
        points: [
          "기본적인 일정 작성 서비스",
          "날짜 숫자를 길게 눌러 일정 기간을 길게 설정 가능",
          "오늘의 일정은 따로 모아서 시간과 내용을 볼 수 있도록 처리",
          "하루 반려동물과의 운동량을 기록하기 위한 훈련일기 서비스 제공",
          "날짜 숫자에 있는 발바닥을 눌러 훈련일기 조회 가능",
          "훈련일기 작성 시 스토어에서 사용 가능한 포인트 지급",
        ],
      },
      {
        tag: "3 / 3",
        title: "건강관리 홈페이지",
        caption: "건강관리 관련 서비스를 한눈에 볼 수 있도록 모아둔 홈페이지입니다.",
        points: [
          "등록된 반려동물마다의 각 건강 점수, 점수 추이, 점수 비교를 확인 가능",
          "일정은 조회 기능만 제공",
          "일정표는 일정 페이지로 이동",
        ],
      },
    ],
    troubleshooting: [
      "토큰 만료 시간을 실제 서비스 수준으로 단축하는 과정에서, 만료된 토큰임에도 로그아웃 처리가 되지 않는 문제가 발생했습니다. 프론트엔드의 Interceptor와 인증 필터가 정상 동작하지 않는 것으로 보였고, 사용자는 토큰이 만료된 상태에서도 일부 페이지를 계속 사용할 수 있었습니다.",
      "초기에는 Interceptor 로직에 문제가 있다고 판단하여 토큰 만료 감지 과정을 확인했습니다. 임시로 Header 컴포넌트에서 토큰 상태를 확인하도록 수정하여 문제를 우회해 해결했지만, AWS 배포 환경에서 동일한 문제가 재발했습니다. 이 과정에서 프론트엔드에만 집중하고 있다는 점을 깨닫고 인증 처리 전체 흐름을 다시 추적하기 시작했습니다.",
      "최종적으로 백엔드 인증 필터를 분석한 결과, 토큰 만료 예외가 발생하더라도 예외 처리가 수행되지 않고 다음 필터 체인으로 그대로 전달되는 문제가 있었습니다. 이로 인해 프론트엔드에서는 정상적인 인증 오류를 전달받지 못했고, 토큰 만료 상태를 올바르게 처리할 수 없었습니다.",
      "토큰 만료 시 적절한 예외 응답이 반환되도록 수정하였고, 프론트엔드에서는 해당 응답을 기반으로 로그아웃 및 재인증 처리가 정상적으로 수행되도록 개선했습니다. 특정 영역에만 집중하지 않고 전체 요청 흐름을 함께 살펴보는 것이 중요하다는 점, 그리고 가설을 세우고 검증하는 과정의 중요성을 배울 수 있었습니다.",
    ],
    retrospective:
      "계획 단계에서 건강관리 파트의 분량이 많아 팀원과 작업을 둘로 나누기로 했으나, 진행 과정에서 소통이 원활하지 않아 담당 영역이 조금씩 줄어들었고 최종적으로는 진단 결과 처리, 일정, 홈 화면 구현만을 맡게 되었습니다. 맡은 범위가 작아진 만큼 주어진 작업만큼은 최선을 다하자는 마음으로 임했고, 전체 작업량이 줄어든 덕분에 평소라면 넘어갔을 사소한 디테일까지 직접 챙기고 담당 라이브러리를 더 깊이 파고들어 커스터마이징해보는 경험도 쌓을 수 있었습니다. 단순 구현에 그치지 않고 유지보수까지 고려하며 개발하는 시야를 갖게 된 것이 이번 프로젝트의 가장 큰 수확이었습니다.",
  },
  {
    id: "telecomp",
    index: "02",
    title: "Telecomp",
    subtitle: "통신사 ERP 사이트",
    period: "Team Project",
    team: "6인",
    stack: ["React", "Spring", "MyBatis", "Oracle"],
    description:
      "요금제와 부가서비스를 지원하는 통신사 사이트입니다. 유저의 신청 사항을 한 페이지 안에서 처리하고 결제 사항을 조회할 수 있습니다.",
    role: ["DB 관리자", "부가서비스 신청, 처리", "청구 페이지 개발"],
    features: [
      {
        tag: "1 / 2",
        title: "부가서비스 승인 페이지",
        caption: "관리자가 유저의 부가서비스 신청을 처리하는 페이지입니다.",
        points: [
          "유저가 부가서비스를 신청하면 관리자가 승인해야 적용되는 방식",
          "드롭박스 방식과 클릭으로 간편하게 처리 가능",
        ],
      },
      {
        tag: "2 / 2",
        title: "청구서 조회 페이지",
        caption: "유저가 월별, 번호별 청구 내역을 확인할 수 있는 페이지입니다.",
        points: [
          "어떤 달의 청구서를 확인할 것인지 선택",
          "어떤 전화번호의 청구서를 확인할 것인지 선택",
          "납부 금액은 요금제 + 부가서비스",
          "추가 청구 금액은 요금제 해지 시 위약금 등의 금액을 포함",
        ],
      },
    ],
    troubleshooting: [
      "프로젝트 초기에 팀원들과 논의한 결과, 사용자 정보는 하나의 세션만 사용하여 관리하기로 결정했습니다. 이후 관리자가 회원 정보를 조회하고 수정하는 기능을 구현하던 중, 현재 로그인한 관리자 정보만 세션에 저장되어 있는데 조회 대상 회원은 어떻게 구분할 것인가라는 문제가 발생했습니다.",
      "당시 사용 가능한 데이터 저장 방식을 정리해 보았습니다. URL Parameter로 회원 정보를 전달하는 방법은 구현이 간단했지만 사용자가 값을 직접 확인하거나 수정할 수 있어 보안상 적절하지 않다고 판단했습니다. Local Storage 역시 브라우저에서 쉽게 접근할 수 있어 민감한 정보를 저장하기에는 위험 요소가 있었습니다. 결국 보안성과 관리 편의성을 고려했을 때 세션을 활용하는 방식이 가장 적합하다고 결론 내렸습니다.",
      "문제는 프로젝트 초기에 '세션은 하나만 사용한다'는 규칙을 정해두었다는 점이었습니다. 혼자 결정하기보다 팀원들과 다시 논의하는 과정을 거쳤고, 로그인한 사용자 정보를 저장하는 세션과 관리 대상 사용자의 정보를 저장하는 세션을 분리하는 방안을 제안했습니다. 토론 끝에 세션을 두 개로 확장하는 방향으로 결정했습니다.",
      "이후 관리자 기능을 안정적으로 구현할 수 있었고 기존 기능에도 영향을 주지 않았습니다. 기술적인 문제 해결뿐 아니라, 설계 변경이 필요한 상황에서 팀원과의 충분한 소통과 합의가 중요하다는 점을 배울 수 있었습니다.",
    ],
    retrospective:
      "이번 프로젝트는 첫 본격적인 팀 프로젝트였습니다. 시작 전에는 결국 한 사람이 대부분의 작업을 맡게 되지 않을까 걱정이 많았지만, 실제로는 모든 팀원이 맡은 역할에 책임감을 가지고 적극적으로 참여했습니다. 분업의 중요성과 효율성을 직접 경험할 수 있었고, 혼자서는 구현하기 어려운 규모의 기능도 제한된 기간 안에 완성할 수 있었습니다. 다만 마지막에 디테일을 놓쳐 개선 사항이 예상보다 많이 발견되었고 후반부에 작업이 몰리는 아쉬움도 있었습니다. 이를 통해 개발 역량뿐 아니라 일정 관리와 우선순위 설정 역시 프로젝트 성공에 중요한 요소라는 점을 깨달았습니다.",
  },
];

/* =========================================================
   STYLES
   ========================================================= */

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css');

    :root{
      --bg:#12100C;
      --bg-soft:#181510;
      --surface:#1D1912;
      --surface-hover:#241F17;
      --border:#332C1F;
      --text:#F3EEE3;
      --text-muted:#9C9382;
      --text-faint:#6B6455;
      --amber:#F5A623;
      --amber-soft:rgba(245,166,35,0.12);
      --mint:#7FDBB6;
      --mint-soft:rgba(127,219,182,0.12);
    }

    .lhj-root{
      background:var(--bg);
      color:var(--text);
      font-family:'Pretendard Variable','Pretendard',-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;
      min-height:100vh;
      line-height:1.6;
    }
    .lhj-root *{ box-sizing:border-box; }
    .mono{ font-family:'JetBrains Mono',ui-monospace,monospace; }

    .lhj-container{ max-width:1080px; margin:0 auto; padding:0 28px; }

    /* ---------- nav ---------- */
    .lhj-nav{
      position:sticky; top:0; z-index:40;
      backdrop-filter:blur(10px);
      background:rgba(18,16,12,0.82);
      border-bottom:1px solid var(--border);
    }
    .lhj-nav-inner{
      max-width:1080px; margin:0 auto; padding:16px 28px;
      display:flex; align-items:center; justify-content:space-between;
    }
    .lhj-logo{ display:flex; align-items:center; gap:8px; cursor:pointer; background:none; border:none; padding:0; }
    .lhj-logo-dot{ width:9px; height:9px; border-radius:50%; background:var(--mint); box-shadow:0 0 8px var(--mint); }
    .lhj-logo-text{ font-size:14px; letter-spacing:0.02em; color:var(--text); }
    .lhj-nav-links{ display:flex; gap:28px; }
    .lhj-nav-links a{
      color:var(--text-muted); text-decoration:none; font-size:13px; letter-spacing:0.02em;
      transition:color .15s ease;
    }
    .lhj-nav-links a:hover, .lhj-nav-links a:focus-visible{ color:var(--amber); }

    /* ---------- hero ---------- */
    .lhj-hero{
      padding:96px 0 80px;
      display:grid; grid-template-columns:1.1fr 0.9fr; gap:56px; align-items:center;
    }
    .lhj-eyebrow{
      color:var(--amber); font-size:13px; letter-spacing:0.06em; margin-bottom:18px;
      display:flex; align-items:center; gap:10px;
    }
    .lhj-cursor{
      display:inline-block; width:8px; height:15px; background:var(--amber);
      animation:blink 1.1s steps(1) infinite;
    }
    @keyframes blink{ 50%{ opacity:0; } }

    .lhj-h1{
      font-size:52px; font-weight:700; line-height:1.15; letter-spacing:-0.01em;
      margin:0 0 20px;
    }
    .lhj-h1 span{ color:var(--amber); }
    .lhj-tagline{ font-size:17px; color:var(--text-muted); max-width:520px; margin:0 0 28px; }

    .lhj-badges{ display:flex; gap:8px; margin-bottom:32px; flex-wrap:wrap; }
    .lhj-badge{
      font-family:'JetBrains Mono',monospace; font-size:12px; padding:6px 12px;
      border:1px solid var(--border); border-radius:20px; color:var(--text-muted);
    }

    .lhj-cta-row{ display:flex; gap:12px; flex-wrap:wrap; }
    .lhj-btn{
      display:inline-flex; align-items:center; gap:8px;
      padding:11px 18px; border-radius:8px; font-size:14px; font-weight:600;
      text-decoration:none; cursor:pointer; border:1px solid transparent;
      transition:transform .15s ease, background .15s ease, border-color .15s ease;
    }
    .lhj-btn:active{ transform:translateY(1px); }
    .lhj-btn-primary{ background:var(--amber); color:#1a1400; }
    .lhj-btn-primary:hover{ background:#ffb940; }
    .lhj-btn-ghost{ background:transparent; color:var(--text); border-color:var(--border); }
    .lhj-btn-ghost:hover{ border-color:var(--text-muted); background:var(--surface); }

    /* terminal panel */
    .lhj-term{
      background:var(--surface); border:1px solid var(--border); border-radius:12px;
      overflow:hidden; box-shadow:0 20px 60px -20px rgba(0,0,0,0.6);
    }
    .lhj-term-bar{
      display:flex; align-items:center; gap:8px; padding:11px 14px;
      border-bottom:1px solid var(--border); background:var(--bg-soft);
    }
    .lhj-term-dot{ width:9px; height:9px; border-radius:50%; }
    .lhj-term-body{ padding:20px 18px; font-family:'JetBrains Mono',monospace; font-size:12.5px; }
    .lhj-term-line{ color:var(--text-muted); margin-bottom:10px; }
    .lhj-term-prompt{ color:var(--mint); }
    .lhj-term-cat{ color:var(--amber); margin:14px 0 6px; }
    .lhj-term-items{ color:var(--text); margin:0 0 4px; padding-left:2px; }

    /* ---------- section shared ---------- */
    .lhj-section{ padding:64px 0; border-top:1px solid var(--border); }
    .lhj-section-head{ display:flex; align-items:baseline; gap:14px; margin-bottom:36px; }
    .lhj-section-num{ font-family:'JetBrains Mono',monospace; color:var(--amber); font-size:13px; }
    .lhj-section-title{ font-size:26px; font-weight:700; margin:0; }

    /* about */
    .lhj-about-grid{ display:grid; grid-template-columns:1.3fr 1fr; gap:48px; }
    .lhj-about-text{ color:var(--text); font-size:15.5px; margin-bottom:28px; }
    .lhj-meta-block{ margin-bottom:20px; }
    .lhj-meta-label{ font-family:'JetBrains Mono',monospace; font-size:11.5px; color:var(--text-faint); letter-spacing:0.05em; margin-bottom:8px; }
    .lhj-meta-list{ list-style:none; padding:0; margin:0; color:var(--text-muted); font-size:14px; }
    .lhj-meta-list li{ margin-bottom:4px; }
    .lhj-meta-list li::before{ content:'· '; color:var(--amber); }

    .lhj-skill-group{ margin-bottom:18px; }
    .lhj-skill-label{ font-family:'JetBrains Mono',monospace; font-size:11.5px; color:var(--mint); margin-bottom:8px; letter-spacing:0.03em; }
    .lhj-pill-row{ display:flex; flex-wrap:wrap; gap:6px; }
    .lhj-pill{
      font-family:'JetBrains Mono',monospace; font-size:12px; padding:5px 10px;
      background:var(--surface); border:1px solid var(--border); border-radius:6px; color:var(--text-muted);
    }

    /* projects grid */
    .lhj-proj-grid{ display:grid; grid-template-columns:1fr 1fr; gap:20px; }
    .lhj-card{
      background:var(--surface); border:1px solid var(--border); border-radius:14px;
      padding:28px; cursor:pointer; text-align:left; color:inherit;
      transition:border-color .18s ease, transform .18s ease, background .18s ease;
      display:flex; flex-direction:column; gap:14px;
    }
    .lhj-card:hover, .lhj-card:focus-visible{
      border-color:var(--amber); transform:translateY(-3px); background:var(--surface-hover);
      outline:none;
    }
    .lhj-card-top{ display:flex; align-items:center; justify-content:space-between; }
    .lhj-card-index{ font-family:'JetBrains Mono',monospace; color:var(--text-faint); font-size:13px; }
    .lhj-card-team{ display:flex; align-items:center; gap:5px; color:var(--text-faint); font-size:12px; font-family:'JetBrains Mono',monospace; }
    .lhj-card-title{ font-size:22px; font-weight:700; margin:0; }
    .lhj-card-subtitle{ color:var(--amber); font-size:13px; margin:0; font-family:'JetBrains Mono',monospace; }
    .lhj-card-desc{ color:var(--text-muted); font-size:14px; margin:0; flex:1; }
    .lhj-card-stack{ display:flex; flex-wrap:wrap; gap:6px; }
    .lhj-card-more{ display:flex; align-items:center; gap:6px; color:var(--text); font-size:13.5px; font-weight:600; margin-top:4px; }

    /* footer */
    .lhj-footer{ padding:56px 0 64px; border-top:1px solid var(--border); }
    .lhj-footer-inner{ display:flex; align-items:flex-end; justify-content:space-between; flex-wrap:wrap; gap:20px; }
    .lhj-footer-quote{ color:var(--text-muted); font-size:15px; max-width:440px; }
    .lhj-footer-links{ display:flex; gap:14px; }
    .lhj-icon-btn{
      display:flex; align-items:center; justify-content:center; width:40px; height:40px;
      border-radius:8px; border:1px solid var(--border); color:var(--text-muted);
      transition:border-color .15s ease, color .15s ease;
    }
    .lhj-icon-btn:hover{ border-color:var(--amber); color:var(--amber); }

    /* ---------- detail view ---------- */
    .lhj-detail{ padding:40px 0 80px; }
    .lhj-back{
      display:inline-flex; align-items:center; gap:6px; background:none; border:none; cursor:pointer;
      color:var(--text-muted); font-size:13px; font-family:'JetBrains Mono',monospace; padding:8px 0; margin-bottom:28px;
      transition:color .15s ease;
    }
    .lhj-back:hover{ color:var(--amber); }

    .lhj-detail-head{ margin-bottom:36px; }
    .lhj-detail-eyebrow{ font-family:'JetBrains Mono',monospace; color:var(--amber); font-size:13px; margin-bottom:10px; }
    .lhj-detail-title{ font-size:38px; font-weight:700; margin:0 0 8px; }
    .lhj-detail-subtitle{ font-size:16px; color:var(--text-muted); margin:0 0 22px; }
    .lhj-detail-desc{ font-size:15.5px; color:var(--text); max-width:720px; margin:0 0 24px; }

    .lhj-meta-row{ display:flex; gap:36px; flex-wrap:wrap; padding:20px 0; border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
    .lhj-meta-col-label{ font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--text-faint); margin-bottom:8px; letter-spacing:0.05em; }

    .lhj-feature-block{ margin-bottom:30px; padding:24px; background:var(--surface); border:1px solid var(--border); border-radius:12px; }
    .lhj-feature-tag{ font-family:'JetBrains Mono',monospace; color:var(--mint); font-size:12px; margin-bottom:10px; }
    .lhj-feature-title{ font-size:19px; font-weight:700; margin:0 0 6px; }
    .lhj-feature-caption{ color:var(--text-muted); font-size:13.5px; margin:0 0 16px; }
    .lhj-feature-points{ list-style:none; padding:0; margin:0; }
    .lhj-feature-points li{
      position:relative; padding-left:18px; margin-bottom:9px; font-size:14.5px; color:var(--text);
    }
    .lhj-feature-points li::before{ content:'▸'; position:absolute; left:0; color:var(--amber); }

    .lhj-log{ position:relative; padding-left:28px; }
    .lhj-log::before{ content:''; position:absolute; left:6px; top:6px; bottom:6px; width:1px; background:var(--border); }
    .lhj-log-item{ position:relative; margin-bottom:26px; }
    .lhj-log-item:last-child{ margin-bottom:0; }
    .lhj-log-dot{
      position:absolute; left:-28px; top:4px; width:11px; height:11px; border-radius:50%;
      background:var(--bg); border:2px solid var(--amber);
    }
    .lhj-log-hash{ font-family:'JetBrains Mono',monospace; font-size:11.5px; color:var(--text-faint); margin-bottom:6px; }
    .lhj-log-text{ font-size:14.5px; color:var(--text); margin:0; }

    .lhj-retro{ background:var(--mint-soft); border:1px solid rgba(127,219,182,0.3); border-radius:12px; padding:24px; font-size:14.5px; color:var(--text); margin-top:8px; }

    .lhj-detail-nav{ display:flex; justify-content:space-between; margin-top:48px; padding-top:28px; border-top:1px solid var(--border); }

    @media (max-width: 860px){
      .lhj-hero{ grid-template-columns:1fr; padding:64px 0 48px; }
      .lhj-h1{ font-size:38px; }
      .lhj-about-grid{ grid-template-columns:1fr; }
      .lhj-proj-grid{ grid-template-columns:1fr; }
      .lhj-nav-links{ display:none; }
      .lhj-meta-row{ gap:20px; }
      .lhj-detail-title{ font-size:28px; }
    }
  `}</style>
);

/* =========================================================
   COMPONENTS
   ========================================================= */

function Nav({ onHome }) {
  return (
    <div className="lhj-nav">
      <div className="lhj-nav-inner">
        <button className="lhj-logo" onClick={onHome} aria-label="홈으로">
          <span className="lhj-logo-dot" />
          <span className="lhj-logo-text mono">{PERSONAL.nameEn.replace(/\s/g, "").toLowerCase()}.dev</span>
        </button>
        <div className="lhj-nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="lhj-hero lhj-container">
      <div>
        <div className="lhj-eyebrow mono">
          $ whoami <span className="lhj-cursor" />
        </div>
        <h1 className="lhj-h1">
          {PERSONAL.name} <span>/</span> {PERSONAL.role}
        </h1>
        <p className="lhj-tagline">{PERSONAL.tagline}</p>
        <div className="lhj-badges">
          <span className="lhj-badge">Full Stack</span>
          <span className="lhj-badge">DevOps</span>
          <span className="lhj-badge">Spring · React</span>
        </div>
        <div className="lhj-cta-row">
          <a className="lhj-btn lhj-btn-primary" href={`mailto:${PERSONAL.email}`}>
            <Mail size={16} /> Email
          </a>
          <a className="lhj-btn lhj-btn-ghost" href={PERSONAL.github} target="_blank" rel="noreferrer">
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>

      <div className="lhj-term">
        <div className="lhj-term-bar">
          <span className="lhj-term-dot" style={{ background: "#F5A623" }} />
          <span className="lhj-term-dot" style={{ background: "#7FDBB6" }} />
          <span className="lhj-term-dot" style={{ background: "#4A4335" }} />
          <span className="mono" style={{ marginLeft: 8, fontSize: 12, color: "var(--text-faint)" }}>
            skills.json
          </span>
        </div>
        <div className="lhj-term-body">
          <div className="lhj-term-line">
            <span className="lhj-term-prompt">➜</span> cat skills.json
          </div>
          {SKILLS.map((group) => (
            <div key={group.label}>
              <div className="lhj-term-cat">// {group.label}</div>
              <div className="lhj-term-items">{group.items.join(", ")}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="lhj-section lhj-container">
      <div className="lhj-section-head">
        <span className="lhj-section-num">01_ABOUT</span>
        <h2 className="lhj-section-title">자기소개</h2>
      </div>

      <div className="lhj-about-grid">
        <div>
          <p className="lhj-about-text">{PERSONAL.intro}</p>

          <div className="lhj-meta-block">
            <div className="lhj-meta-label mono">EDUCATION</div>
            <ul className="lhj-meta-list">
              {PERSONAL.education.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>

          <div className="lhj-meta-block">
            <div className="lhj-meta-label mono">CERTIFICATES</div>
            <ul className="lhj-meta-list">
              {PERSONAL.certificates.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <div id="skills">
          {SKILLS.map((group) => (
            <div className="lhj-skill-group" key={group.label}>
              <div className="lhj-skill-label mono">{group.label}</div>
              <div className="lhj-pill-row">
                {group.items.map((item) => (
                  <span className="lhj-pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <button className="lhj-card" onClick={() => onOpen(project.id)}>
      <div className="lhj-card-top">
        <span className="lhj-card-index mono">{project.index}</span>
        <span className="lhj-card-team">
          <Users size={13} /> {project.team}
        </span>
      </div>
      <div>
        <h3 className="lhj-card-title">{project.title}</h3>
        <p className="lhj-card-subtitle">{project.subtitle}</p>
      </div>
      <p className="lhj-card-desc">{project.description}</p>
      <div className="lhj-card-stack">
        {project.stack.map((s) => (
          <span className="lhj-pill" key={s}>
            {s}
          </span>
        ))}
      </div>
      <div className="lhj-card-more">
        자세히 보기 <ArrowUpRight size={15} />
      </div>
    </button>
  );
}

function Projects({ onOpen }) {
  return (
    <section id="projects" className="lhj-section lhj-container">
      <div className="lhj-section-head">
        <span className="lhj-section-num">02_PROJECTS</span>
        <h2 className="lhj-section-title">Projects</h2>
      </div>
      <div className="lhj-proj-grid">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="lhj-footer lhj-container">
      <div className="lhj-footer-inner">
        <p className="lhj-footer-quote">{PERSONAL.closing}</p>
        <div className="lhj-footer-links">
          <a className="lhj-icon-btn" href={`mailto:${PERSONAL.email}`} aria-label="이메일">
            <Mail size={17} />
          </a>
          <a className="lhj-icon-btn" href={PERSONAL.github} target="_blank" rel="noreferrer" aria-label="깃허브">
            <Github size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FeatureBlock({ f }) {
  return (
    <div className="lhj-feature-block">
      <div className="lhj-feature-tag mono">FEATURE {f.tag}</div>
      <h4 className="lhj-feature-title">{f.title}</h4>
      <p className="lhj-feature-caption">{f.caption}</p>
      <ul className="lhj-feature-points">
        {f.points.map((pt, i) => (
          <li key={i}>{pt}</li>
        ))}
      </ul>
    </div>
  );
}

function ProjectDetail({ project, onBack, onOpen }) {
  const topRef = useRef(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [project.id]);

  const currentIdx = PROJECTS.findIndex((p) => p.id === project.id);
  const next = PROJECTS[(currentIdx + 1) % PROJECTS.length];

  return (
    <div className="lhj-detail lhj-container" ref={topRef}>
      <button className="lhj-back" onClick={onBack}>
        <ArrowLeft size={14} /> ~/portfolio 로 돌아가기
      </button>

      <div className="lhj-detail-head">
        <div className="lhj-detail-eyebrow mono">
          PROJECT {project.index} <Terminal size={12} style={{ verticalAlign: "-2px", marginLeft: 4 }} />
        </div>
        <h1 className="lhj-detail-title">{project.title}</h1>
        <p className="lhj-detail-subtitle">{project.subtitle}</p>
        <p className="lhj-detail-desc">{project.description}</p>

        <div className="lhj-meta-row">
          <div>
            <div className="lhj-meta-col-label mono">TEAM</div>
            <div>{project.team}</div>
          </div>
          <div>
            <div className="lhj-meta-col-label mono">담당파트</div>
            <ul className="lhj-meta-list">
              {project.role.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="lhj-meta-col-label mono">STACK</div>
            <div className="lhj-pill-row">
              {project.stack.map((s) => (
                <span className="lhj-pill" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 44 }}>
        <div className="lhj-section-head">
          <span className="lhj-section-num">구현 기능</span>
        </div>
        {project.features.map((f) => (
          <FeatureBlock key={f.tag} f={f} />
        ))}
      </div>

      <div style={{ marginBottom: 44 }}>
        <div className="lhj-section-head">
          <span className="lhj-section-num mono">
            <GitBranch size={13} style={{ verticalAlign: "-2px", marginRight: 4 }} />
            TROUBLESHOOTING
          </span>
        </div>
        <div className="lhj-log">
          {project.troubleshooting.map((t, i) => (
            <div className="lhj-log-item" key={i}>
              <span className="lhj-log-dot" />
              <div className="lhj-log-hash mono">
                {["issue", "investigate", "root cause", "fix"][i] || `step ${i + 1}`}
              </div>
              <p className="lhj-log-text">{t}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="lhj-section-head">
          <span className="lhj-section-num">프로젝트 회고</span>
        </div>
        <div className="lhj-retro">{project.retrospective}</div>
      </div>

      <div className="lhj-detail-nav">
        <button className="lhj-btn lhj-btn-ghost" onClick={onBack}>
          <ArrowLeft size={15} /> 전체 프로젝트
        </button>
        <button className="lhj-btn lhj-btn-primary" onClick={() => onOpen(next.id)}>
          다음 프로젝트 · {next.title} <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   APP
   ========================================================= */

export default function App() {
  const [view, setView] = useState("home"); // 'home' | project.id

  const openProject = (id) => setView(id);
  const goHome = () => {
    setView("home");
    window.scrollTo({ top: 0 });
  };

  const activeProject = PROJECTS.find((p) => p.id === view);

  return (
    <div className="lhj-root">
      <GlobalStyle />
      <Nav onHome={goHome} />

      {activeProject ? (
        <ProjectDetail project={activeProject} onBack={goHome} onOpen={openProject} />
      ) : (
        <>
          <Hero />
          <About />
          <Projects onOpen={openProject} />
          <Footer />
        </>
      )}
    </div>
  );
}
