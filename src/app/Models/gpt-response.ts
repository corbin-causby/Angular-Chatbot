export interface ResponseModel {
  choices: { message: { content: string } }[];
}

export interface ChatMessage {
  text: string;
  user: boolean;
}

export interface Choice {
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
  index: number;
}

export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
}

// test
