import { create } from "zustand";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const useWebsocketStore = create((set, get) => ({
  isConnected: false, // 웹소켓 연결 상태
  client: null, // 웹소켓 클라이언트
  subscriptions: new Map(), // 웹소켓 구독 목록

  // 연결 함수
  connect: () => {
    const { client, disconnect } = get();

    // 기존 연결 끊기
    if(client && client.connected) {
      disconnect();
    }

    // JWT 토큰 가져오기
    const raw = localStorage.getItem('userData');
    const token = raw ? (JSON.parse(raw).accessToken || JSON.parse(raw).token || JSON.parse(raw).jwt) : null;

    // 토큰이 없으면 연결하지 않음
    if (!token) {
      console.error('JWT 토큰이 없습니다. 로그인을 먼저 해주세요.');
      return;
    }

    console.log('웹소켓 연결 시도 중...');

    // 1. 소켓 객체 생성
    // 전송 계층(실제 네트워크 연결/해제)
    const socket = new SockJS(`${import.meta.env.VITE_API_URL}/connect`);
    
    // 2. STOMP 클라이언트 설정
    // 소켓 위에서 메시징 규칙을 정의
    // 메시징 프로토콜(토픽, 구독, 발행)
    const stompClient = new Client({
      webSocketFactory: () => socket, // stomp 클라이언트에게 어떤 소켓을 사용할 것인지 알려줌
      connectHeaders: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
      onConnect: (frame) => {
        console.log('✅ WebSocket 연결 성공');
        set({ isConnected: true });
      },
      onStompError: (frame) => {
        console.error('❌ STOMP 에러:', frame);
        set({ isConnected: false });
      },
      onWebSocketClose: (event) => {
        console.log('🔌 WebSocket 연결 종료:', event);
        set({ isConnected: false });
      },
      onWebSocketError: (error) => {
        console.error('❌ WebSocket 에러:', error);
        set({ isConnected: false });
      }
    });
    
    // 3. 활성화 시점에 STOMP가 내부적으로 호출
    stompClient.activate();
    set({ client: stompClient });
  },

  // 연결 해제
  disconnect: () => {
    const { client, subscriptions } = get();
    
    if (client) {
      // 모든 구독 해제
      subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
      subscriptions.clear();
      
      client.deactivate();
    }
    
    set({ 
      client: null, 
      isConnected: false,
      subscriptions: new Map()
    });
  },

  // 로비 구독
  subscribeToLobby: (roomId, onMessage) => {
    const { client, subscriptions } = get();
    const topic = `/topic/room/${roomId}/lobby`;
    
    // JWT 토큰 가져오기
    const raw = localStorage.getItem('userData');
    const token = raw ? (JSON.parse(raw).accessToken || JSON.parse(raw).token || JSON.parse(raw).jwt) : null;

    if (!token) {
      console.error('JWT 토큰이 없습니다. 로그인을 먼저 해주세요.');
      return;
    }

    // 이미 구독 중인지 확인
    if (subscriptions.has(topic)) {
      console.log('이미 구독 중인 토픽입니다:', topic);
      return;
    }

    if (client && client.connected) {
      console.log('🔔 로비 토픽 구독 시작:', topic);

      const subscription = client.subscribe(topic, (message) => {
        try {
          const data = JSON.parse(message.body);
          console.log('📨 로비 데이터 수신:', data);
          onMessage(data);
        } catch (error) {
          console.error('❌ 로비 데이터 파싱 에러:', error);
        }
      });
      
      subscriptions.set(topic, subscription);
      console.log('✅ 로비 구독 완료');
    } else {
      console.warn('웹소켓이 연결되지 않았습니다. 구독을 건너뜁니다.');
    }
  },

  // 팀 로비 구독
  subscribeToTeamLobby: (roomId, teamId, onMessage) => {
    const { client, subscriptions } = get();
    const topic = `/topic/room/${roomId}/team/${teamId}`;
    
    // JWT 토큰 가져오기
    const raw = localStorage.getItem('userData');
    const token = raw ? (JSON.parse(raw).accessToken || JSON.parse(raw).token || JSON.parse(raw).jwt) : null;

    if (!token) {
      console.error('JWT 토큰이 없습니다. 로그인을 먼저 해주세요.');
      return;
    }

    // 이미 구독 중인지 확인
    if (subscriptions.has(topic)) {
      console.log('이미 구독 중인 토픽입니다:', topic);
      return;
    }

    if (client && client.connected) {
      console.log('🔔 팀 로비 토픽 구독 시작:', topic);

      const subscription = client.subscribe(topic, (message) => {
        console.log('🔔 팀 로비 메시지 수신됨!', message);
        console.log('🔔 메시지 body:', message.body);
        try {
          const data = JSON.parse(message.body);
          console.log('📨 팀 로비 데이터 수신:', data);
          onMessage(data);
        } catch (error) {
          console.error('❌ 팀 로비 데이터 파싱 에러:', error);
          console.error('❌ 원본 메시지:', message.body);
        }
      });
      
      subscriptions.set(topic, subscription);
      console.log('✅ 팀 로비 구독 완료');
    } else {
      console.warn('웹소켓이 연결되지 않았습니다. 구독을 시도합니다...');
      // 연결이 안된 경우 잠시 후 재시도
      setTimeout(() => {
        const { client: retryClient, subscriptions: retrySubscriptions } = get();
        if (retryClient && retryClient.connected && !retrySubscriptions.has(topic)) {
          console.log('재시도: 팀 로비 토픽 구독 시작:', topic);
          const retrySubscription = retryClient.subscribe(topic, (message) => {
            console.log('🔔 팀 로비 메시지 수신됨! (재시도)', message);
            console.log('🔔 메시지 body (재시도):', message.body);
            try {
              const data = JSON.parse(message.body);
              console.log('📨 팀 로비 데이터 수신 (재시도):', data);
              onMessage(data);
            } catch (error) {
              console.error('❌ 팀 로비 데이터 파싱 에러 (재시도):', error);
              console.error('❌ 원본 메시지 (재시도):', message.body);
            }
          });
          retrySubscriptions.set(topic, retrySubscription);
          console.log('✅ 팀 로비 구독 완료 (재시도)');
        }
      }, 2000);
    }
  },

  // 특정 토픽 구독 해제
  unsubscribeFromTopic: (topic) => {
    const { subscriptions } = get();
    
    const subscription = subscriptions.get(topic);
    if (subscription) {
      subscription.unsubscribe();
      subscriptions.delete(topic);
    }
  },

  // 메시지 전송
  sendMessage: (destination, body) => {
    const { client } = get();
    
    // JWT 토큰 가져오기
    const raw = localStorage.getItem('userData');
    const token = raw ? (JSON.parse(raw).accessToken || JSON.parse(raw).token || JSON.parse(raw).jwt) : null;

    if (!token) {
      console.error('JWT 토큰이 없습니다. 로그인을 먼저 해주세요.');
      return;
    }

    if (client && client.connected) {
      client.publish({
        destination: `/publish/${roomId}`, 
        body: JSON.stringify(body),
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } 
    else {
      console.error('WebSocket이 연결되지 않았습니다.');
    }
  }
}));
