Todo 앱 만들기 프로젝트 <br>

Spring boot와 연동<br>

React_파일명: react-todo-app<br>
Spring boot_파일명: spring-todo-app

프로젝트 설명: 할 일을 계획해 완료체크를 할 수 있는 플래너입니다.

npm --version 
11.6.2
빌드 도구
Gradle

# 시작 가이드
npm intall
npm run start       // localhost:5173

# 프로젝트 구조
src/
 ├── App/    # 메인 페이지
 ├── TodoForm/      # 할 일 입력
 ├── TodoList/         # 할 일(전체, id) 조회
 └── TodoItem/         # 할 일 렌더링

 # 주요 기능
1. 할 일 생성하기 Create
2. 전체 할 일 조회하기 Get
3. id로 특정 할 일 조회하기 Get
4. 완료여부 체크하기 Put
5. 할 일 삭제하기 Delete