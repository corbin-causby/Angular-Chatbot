import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = 'https://api.openai.com/v1/completions'; // Example endpoint
  private apiKey = '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'; // Replace with your OpenAI API key
    static apiKey: any;

  constructor(private http: HttpClient) { }

  generateText(prompt: string): Observable<any>  {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    const body = {
      prompt,
      max_tokens: 100,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }


}
