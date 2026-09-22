# und club

여러 사람이 같은 방에 들어와 대화할 수 있는 온라인 공간입니다.

## 실행

Node.js 18 이상이 필요합니다.

```bash
npm install
npm start
```

브라우저에서 `http://localhost:3000`을 엽니다. 서버가 실행되면 같은 주소에 접속한 브라우저들이 사이버 초밥집, 사이버 흡연장, 사이버 말랑이 방에서 서로 보이고 채팅할 수 있습니다.

다른 사람도 접속하려면 이 프로젝트를 Render, Railway, Fly.io 같은 Node.js 호스팅 서비스에 배포하고 생성된 HTTPS 주소를 공유하면 됩니다. WebSocket을 사용하므로 배포 서비스가 WebSocket 연결을 지원해야 합니다.