# SUNFUME PROJECT (Front)

## 🧴 프로젝트 소개

- 향수, 바디워시 쇼핑몰 앱 제작 프로젝트
- [Backend Repository](https://github.com/kimnamsun/sunfume_backend)

<br>

## 📅 프로젝트 기간

- 2021.05.10 ~ 2021.06.03

<br>

## 🎥 프로젝트 시연영상

https://vimeo.com/559350084

<br>

## 🛠 Skills

### 🔜 Frontend

- HTML5
- Javascript (ES+6)
- React
- Typescript
- Framework7
- Formik & Yup
- Tailwind.css
- React query
- Recoil

### 🔙 Backend

- Ruby on rails
- Redis
- Postgresql

<br>

## ✨구현 기능

### 🔜 Frontend

- api config를 활용해 api요청 관리
- react query를 이용한 서버 상태 관리
- Typescript를 이용해 타입 강제
- Recoil를 이용한 전역 상태 관리
- Formik & Yup을 이용한 로그인 / 로그아웃
- Formik & Yup을 이용한 회원가입
- 마이페이지
  - 회원정보 수정
  - 주문 내역 조회
- 상품 리스트
  - 상품 정보
  - 인피니트 스크롤
- 상품 상세
  - 상품 정보 조회
  - 옵션 선택 후 장바구니 담기
  - 찜하기
  - 해당 상품에 달린 리뷰 조회
- 카테고리
  - 카테고리 리스트
  - 카테고리별 상품 모아보기
  - 최신순, 가격 낮은 순, 가격 높은 순 필터링
- 찜목록
  - 찜한 상품 리스트
- 장바구니
  - 장바구니에 담은 상품 리스트
  - Recoil atom과 selector를 이용한 수량 조절 및 주문 금액 표시 기능
  - 장바구니 상품 삭제 기능
- 주문
  - 다음 주소 api를 이용한 주문서 작성 기능
  - 주문 버튼 클릭 시 결제 및 주문 완료 처리

### 🔙 Backend

- 데이터베이스 모델링

- 상품 리스트 조회
- 상품 상세
  - 상품 상세 정보 조회
  - 옵션 선택 후 장바구니 담기
  - 상품 찜하기, 찜삭제
  - 해당 상품에 달린 리뷰 조회
- 카테고리
  - 카테고리 리스트
  - 카테고리별 상품 모아보기
  - Ransack과 Ransacker를 이용한 최신순, 가격 낮은 순, 가격 높은 순 필터링
- 장바구니
  - 장바구니에 담은 상품 리스트 조회
  - 장바구니에서 수량 조절 시 lineItem update
  - 장바구니 상품 삭제 기능
- 회원정보 조회 및 수정
- 주문 내역 조회
- 찜한 상품 리스트 조회
- 주문
  - enum을 이용한 order의 상태관리 (주문중: pending, 주문완료: active, 주문취소: disabled)

<br>

## 💻 View

- 회원가입
  <br>
  ![](https://images.velog.io/images/nsunny0908/post/47baaa94-d07b-4c78-84ef-bf796890f870/Jun-05-2021%2020-41-45.gif)
- 메인
  - 메인 슬라이드
  - 인피니티 스크롤  
    <br>
    ![](https://images.velog.io/images/nsunny0908/post/a67bac5a-0b82-43ca-b087-27d017438e75/Jun-05-2021%2020-44-26.gif)
- 카테고리 상품 리스트 및 필터링
  <br>
  ![](https://images.velog.io/images/nsunny0908/post/f55ac019-03c3-4193-937d-b94ec8ca836d/Jun-05-2021%2020-48-47.gif)
- 상품 상세
  - 리뷰 조회
  - 옵션 선택 및 장바구니 담기
    <br>
    ![](https://images.velog.io/images/nsunny0908/post/c2cbbc95-7ddd-43ad-adad-da7a46320265/Jun-05-2021%2020-51-46.gif)
- 장바구니
  <br>
  ![](https://images.velog.io/images/nsunny0908/post/fc258c6c-ec2b-46fe-a589-042b48959030/Jun-02-2021%2013-35-25.gif)

- 주문
  <br>
  ![](https://images.velog.io/images/nsunny0908/post/1c723a5a-6149-46d7-b403-3bcf3105ec70/Jun-05-2021%2021-09-57.gif)
- 찜하기
  - 찜목록
    <br>
    ![](https://images.velog.io/images/nsunny0908/post/d1c370d9-effb-4d67-8cd3-2dd3c79c1f86/Jun-05-2021%2021-02-44.gif)
- 마이페이지

  - 회원정보 수정
    <br>
    ![](https://images.velog.io/images/nsunny0908/post/bdf81484-1945-4d47-8760-39c78404d794/Jun-05-2021%2021-04-47.gif)
  - 주문 목록 조회
    <br>
    ![](https://images.velog.io/images/nsunny0908/post/3ad487a1-e197-4b2f-8579-04a2bc8b63bc/Jun-05-2021%2021-06-57.gif)
  - 리뷰 목록 조회
    <br>
    ![](https://images.velog.io/images/nsunny0908/post/d531fffd-7503-4ed1-924d-151b4ff3f99e/Jun-05-2021%2021-07-52.gif)

  <br>

## ❗️ 레퍼런스

이 프로젝트는 인썸니아에서 학습목적으로 만들었습니다. 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
