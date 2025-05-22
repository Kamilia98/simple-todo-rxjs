import { CommonModule } from '@angular/common';
import { Item } from '../../models/item.model';
import { ItemService } from './../../services/item.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-item-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-item-form.component.html',
})
export class AddItemFormComponent {
  newItem: Omit<Item, 'id'> = {
    name: '',
    description: '',
    completed: false,
  };

  constructor(private itemService: ItemService) {}

  addItem(): void {
    if (this.newItem.name && this.newItem.description) {
      this.itemService.addItem(this.newItem);
      this.newItem = { name: '', description: '', completed: false };
    }
  }
}
