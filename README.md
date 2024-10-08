## 레트로 감성 투두리스트(Retro Todo List)
![title](https://velog.velcdn.com/images/changwoo/post/7055bc99-d203-4a12-86da-8b5e8210358b/image.png)   

* 🗓️ 프로젝트 기간 : 2024-04-02 ~ 2024-04-13 ( 11일 )
* 1인 개발

아이디/비밀번호를 입력받아 서버로 데이터를 저장하는 레트로 감성 투두 리스트입니다. 리액트적 사고를 기반으로 한 컴포넌트 설계 및 이를 바탕으로 한 CRUD 기능을 목적으로 구현하였습니다.

## 구현목표
> * 기본적인 CRUD 기능의 구현
> * 데이터베이스 연동을 통한 데이터 저장
> * 리액트적 사고를 기반으로 한 컴포넌트 설계
> * JWT 토큰/쿠키를 활용한 통신구조

## 기술스택
* FE : React
* BE : Node (Express), MySQL

## 기능 소개
### 사용자 로그인 및 회원가입
![title](https://velog.velcdn.com/images/changwoo/post/50f44967-6103-4f3c-b0bf-e9317fcb2a63/image.gif)  
* 디바운싱을 활용하여 실시간 아이디 중복 검사가 동작합니다.
* 아이디의 중복검사, 비밀번호와 비밀번호 확인이 일치하지 않으면 경고 문구가 나타납니다

### TodoList CRUD
![title](https://velog.velcdn.com/images/changwoo/post/765521fb-820d-4e7e-b95c-4054b93b06bb/image.gif) 
* 저장된 할 일이 리스트로서 출력되어집니다.
* 할일은 체크를 통해 구분 할 수 있으며 등록, 수정, 삭제가 가능합니다.
* 할일 등록시 DB 데이터 생성, 수정시 DB 데이터 수정, 삭제시 DB 데이터가 삭제되어집니다.

구체적인 트러블 슈팅 및 설계/구현 과정은 <a href="https://velog.io/@changwoo/Todo-List-%EB%A7%8C%EB%93%A4%EA%B8%B0-retro-todo-list">당신의 순발력을 평가해드립니다, 삼행시의 왕</a> 에서 확인 하실 수 있습니다.
