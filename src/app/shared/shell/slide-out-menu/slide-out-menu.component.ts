import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';
import {
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-slide-out-menu',
  templateUrl: './slide-out-menu.component.html',
  styleUrls: ['./slide-out-menu.component.scss'],
})
export class SlideOutMenuComponent implements OnChanges {
  @Input()
  menuShown: boolean;

  @Output()
  closeMenu: EventEmitter<void>;

  icons = {
    close: faTimes,
  };

  constructor(private hostElementRef: ElementRef, private renderer: Renderer2) {
    this.menuShown = false;
    this.closeMenu = new EventEmitter<void>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { menuShown} = changes;
    if (menuShown) {
      if (menuShown.currentValue) {
        this.renderer.addClass(this.hostElementRef.nativeElement, 'shown');
      } else {
        this.renderer.removeClass(this.hostElementRef.nativeElement, 'shown');
      }
    }
  }
}
