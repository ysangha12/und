# und club

여러 사람이 같은 방에 들어와 대화할 수 있는 온라인 공간입니다.

## 실행

Node.js 18 이상이 필요합니다.

```bash
npm install
npm start
```

브라우저에서 `http://localhost:3000`을 엽니다. 서버가 실행되면 같은 주소에 접속한 브라우저들이 사이버 초밥집, 사이버 흡연장, 사이버 말랑이 방에서 서로 보이고 채팅할 수 있습니다.

## Render에 공개 배포

저장소에 포함된 `render.yaml`을 사용하면 Render가 Node.js 웹 서비스를 설정합니다.

1. 변경사항을 GitHub 저장소 `ysangha12/und`에 푸시합니다.
2. Render에서 **New + → Blueprint**를 선택하고 GitHub 저장소 `und`를 연결합니다.
3. `render.yaml` 설정을 확인하고 **Apply**를 누릅니다.
4. 배포가 끝나면 Render가 만든 `https://...onrender.com` 주소를 친구에게 공유합니다.

이 서비스는 같은 공개 주소로 웹페이지와 WebSocket을 제공하므로 같은 방의 접속자 및 채팅을 공유합니다. 로컬 테스트에는 Node.js 18 이상에서 `npm install`과 `npm start`를 실행하면 됩니다.