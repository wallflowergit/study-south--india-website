import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Header } from "./components/header/header";
import { MessageService } from 'primeng/api';
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    ToastModule,
    ConfirmDialog, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
