import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-by-text',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-by-text.component.html',
})
export class SearchByTextComponent {
  @Input() searchText: string = '';
  @Output() searchTextChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<void>();

}
