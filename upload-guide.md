# JBKONE GitHub 업로드 가이드

## 방법 1: 웹에서 업로드
1. GitHub.com 접속 → 로그인
2. "New repository" 클릭
3. 저장소 이름: `jbkone-pet-shop`
4. Public 선택 (무료 배포를 위해)
5. "Create repository" 클릭
6. "uploading an existing file" 클릭
7. JBKONE 폴더의 모든 파일을 드래그 앤 드롭
8. "Commit changes" 클릭

## 방법 2: ZIP 파일 업로드
1. jbkone-deploy.zip 파일을 GitHub에 업로드
2. 압축 해제 후 파일들 정리

## 온라인 편집 방법
- 저장소에서 `.` (점) 키 누르기
- 또는 URL에서 github.com을 github.dev로 변경
- 예: github.dev/사용자명/jbkone-pet-shop

## 배포 방법
- Settings → Pages → Source: Deploy from a branch
- Branch: main, Folder: / (root)
- Save 클릭
- 몇 분 후 https://사용자명.github.io/jbkone-pet-shop 에서 접속 가능 