# 프로젝트 설명
파일명: react-todoSpring-app<br>
설명: 할 일을 계획해 CRUD기능을 구현한 플래너입니다.

# 프로젝트 버전
Node.js 버전: 11.6.2<br>
빌드 도구: Gradle

# 시작 가이드
npm intall<br>
npm run start       // localhost:5173

# 프로젝트 구조
src/<br>
 ├── App/    # 메인 페이지<br>
 ├── TodoForm/      # 할 일 입력<br>
 ├── TodoList/         # 할 일(전체, id) 조회<br>
 └── TodoItem/         # 할 일 렌더링<br>

 # 주요 기능
1. 할 일 생성하기 Create
2. 전체 할 일 조회하기 Get
3. id로 특정 할 일 조회하기 Get
4. 완료여부 체크하기 Put
5. 할 일 삭제하기 Delete