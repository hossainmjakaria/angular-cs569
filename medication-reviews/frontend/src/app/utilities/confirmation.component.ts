import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  template: `
    <div class="modal fade" [class.show]="isVisible" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmation</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this post?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="cancel()">Cancel</button>
            <button type="button" class="btn btn-danger" (click)="confirm()">Confirm</button>
          </div>
        </div>
      </div>
    </div>

  `,
  styles: [
  ]
})
export class ConfirmationComponent {
  @Input() isVisible: boolean=false;
  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  confirm(): void {
    this.confirmed.emit(true);
  }

  cancel(): void {
    this.confirmed.emit(false);
  }
}
