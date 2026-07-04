import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 아래 REPO_NAME을 본인의 GitHub 저장소 이름으로 바꿔주세요.
// 예: 저장소 주소가 github.com/LeeHJ0110/my-portfolio 라면
//     -> base: "/my-portfolio/"
// 단, 저장소 이름이 "본인아이디.github.io" 형태(유저 페이지)라면
//     -> base: "/" 로 설정하세요.
export default defineConfig({
  plugins: [react()],
  base: "",
});
