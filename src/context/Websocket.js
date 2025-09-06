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

    // 1. 소켓 객체 생성
    // 전송 계층(실제 네트워크 연결/해제)
    const socket = new SockJS(`${import.meta.env.VITE_API_URL}`);
    
    // 2. STOMP 클라이언트 설정
    // 소켓 위에서 메시징 규칙을 정의
    // 메시징 프로토콜(토픽, 구독, 발행)
    const stompClient = new Client({
      webSocketFactory: () => socket, // stomp 클라이언트에게 어떤 소켓을 사용할 것인지 알려줌
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
      onConnect: () => {
        console.log('WebSocket 연결 성공');
        set({ isConnected: true });
      },
      onStompError: (frame) => {
        console.error('STOMP 에러:', frame);
        set({ isConnected: false });
      },
      onWebSocketClose: () => {
        console.log('WebSocket 연결 종료');
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
    
    if (client && client.connected) {
      const subscription = client.subscribe(topic, (message) => {
        try {
          const data = JSON.parse(message.body);
          console.log('로비 데이터 수신:', data);
          onMessage(data);
        } catch (error) {
          console.error('로비 데이터 파싱 에러:', error);
        }
      });
      
      subscriptions.set(topic, subscription);
    }
  },

  // 팀 로비 구독
  subscribeToTeamLobby: (roomId, teamId, onMessage) => {
    const { client, subscriptions } = get();
    const topic = `/topic/room/${roomId}/team/${teamId}`;
    
    if (client && client.connected) {
      const subscription = client.subscribe(topic, (message) => {
        try {
          const data = JSON.parse(message.body);
          console.log('팀 로비 데이터 수신:', data);
          onMessage(data);
        } catch (error) {
          console.error('팀 로비 데이터 파싱 에러:', error);
        }
      });
      
      subscriptions.set(topic, subscription);
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
    
    if (client && client.connected) {
      client.publish({
        destination,
        body: JSON.stringify(body)
      });
    } else {
      console.error('WebSocket이 연결되지 않았습니다.');
    }
  }
}));
