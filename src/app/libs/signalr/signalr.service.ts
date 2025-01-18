import { Injectable } from '@angular/core'
import { HubConnectionBuilder } from '@microsoft/signalr'

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private readonly connection = new HubConnectionBuilder()
    .withUrl('http://localhost:5000/hub')
    .withAutomaticReconnect()
    .build()

  connect(): void {
    this.connection.start()
  }

  disconnect(): void {
    this.connection.stop()
  }

  register(method: string, action: () => unknown): void {
    this.connection.on(method, action)
  }
}
