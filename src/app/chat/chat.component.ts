import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatMessage, OpenAIResponse } from '../Models/gpt-response';




@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ HttpClientModule, FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messages: ChatMessage[] = [];
  userInput = '';


  loading: boolean = false;
  error: string | null = null;

  formattedResponse: SafeHtml = '';
  customErrorMessage: string | null = null;

  isLoading: boolean = false;
  errorOccurred: boolean = false;

  private apiUrl; // Example endpoint
  private apiKey;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
    this.apiKey = '';
  }

  ngOnInit(): void {
    this.messages.push({ text: "Hi, I'm Fred! I will be your health care professional today?", user: false });
  }

  ngAfterViewChecked() {
    // Calls scrollToBottom to scroll the chat to the latest message.
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight; // Scroll to the bottom of the chat.
    } catch (err) { /* Error handling is ignored for simplicity. */ }
  }

  autoGrow(event: any): void {
    event.target.style.height = "auto";
    event.target.style.height = (event.target.scrollHeight) + "px";
  }
 
  async getApiKey(): Promise<string> {
    if (this.apiKey) {
      return this.apiKey;
    }

    try {
      if (!this.apiUrl) {
        console.error('API URL is not set!');
        return '';  // Return empty string or handle it as per your logic
      }


      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.apiUrl}`
      });

      console.log('Requesting API Key from URL:', this.apiUrl);

      const response = this.http.get<{ apiKey: string }>(this.apiUrl + '/getApiKey', { headers });
      const data = await lastValueFrom(response);
      return data.apiKey || '';
    } catch (error) {
      console.error('Error fetching API key:', error);
      return '';
    }
  }

  async sendMessage(){

    if (!this.apiUrl) {
      console.error('API URL is not set!');
      this.handleError('API URL is missing.');
      return;  // Exit early if the API URL is missing
    }

    if (this.userInput.trim() === '') return;

    this.messages.push({ text: this.userInput, user: true });

    const userMessage = this.userInput;
    const apiKey = await this.getApiKey(); // Retrieve the API key and assign this to variable

    if (!apiKey) {
      this.handleError('Failed to retrieve API key.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const conversation = [
      { role: 'system', content: 'You are an assistant that assists in health care and can answer questions about health care completely within 100 tokens.' },
      ...this.messages.map(msg => ({
        role: msg.user ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: userMessage }  // Add the latest user message
    ];

    const body = ({
      model: 'gpt-3.5-turbo', // examples: gpt-3.5-turbo
      messages: conversation,
      // prompt: this.userInput,
      max_tokens: 100,
    });

    this.isLoading = true;
    this.errorOccurred = false;
    this.customErrorMessage = '';

    try {
      const response = await lastValueFrom(this.http.post<OpenAIResponse>(this.apiUrl, body, { headers }));

      if (response?.choices?.length > 0) {
        const botResponse = response['choices'][0].message.content;
        this.messages.push({ text: botResponse, user: false });
      } else {
        this.handleError("Invalid or empty response from the API.");
      }
    } catch (error) {
      this.handleError("I'm experiencing technical difficulties at the moment. Please try again later.");
      console.error(error);
    } finally {
      this.isLoading = false;
    }
    this.userInput = ''; // Clear the input field
  }

  handleError(errorMessage: string): void {
    this.customErrorMessage = errorMessage;
    this.errorOccurred = true; // Set error flag to true
  }

  formatCodeBlock(code: string): SafeHtml {
    const formattedCode = this.sanitizer.bypassSecurityTrustHtml(`<pre><code>${code}</code></pre>`);
    return formattedCode;
  }
}
 
