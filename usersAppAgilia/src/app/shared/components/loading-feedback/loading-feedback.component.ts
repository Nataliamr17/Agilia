import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-loading-feedback',
  templateUrl: './loading-feedback.component.html',
  styleUrls: ['./loading-feedback.component.scss'],
})
export class LoadingFeedbackComponent {
  @Input() state: string;

  @Output() retryPressed = new EventEmitter<void>();

  constructor() { }

  public emitRetryPressed(): void {

    this.retryPressed.emit(null);
  }
}
