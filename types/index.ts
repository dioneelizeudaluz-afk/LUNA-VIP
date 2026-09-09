export interface User {
  id: number;
  telegramId: number;
  username: string;
  firstName: string;
  firstInteraction: string;
  lastInteraction: string;
  status: 'active' | 'inactive';
}

export interface Message {
  id: number;
  command: string;
  title: string;
  text: string;
  active: boolean;
  buttons: string[];
}

export interface Button {
  id: number;
  name: string;
  text: string;
  action: 'mensagem' | 'url' | 'conteudo' | 'suporte';
  target: string;
  order: number;
  active: boolean;
}

export interface Content {
  id: number;
  title: string;
  description: string;
  type: 'texto' | 'imagem' | 'video' | 'audio';
  content: string;
  active: boolean;
  createdAt: string;
}