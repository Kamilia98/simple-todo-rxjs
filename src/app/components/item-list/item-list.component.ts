import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
import { AddItemFormComponent } from '../add-item-form/add-item-form.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AddItemFormComponent],
  templateUrl: './item-list.component.html',
})
export class ItemListComponent {
  items$!: Observable<Item[]>;

  editingItem: Item | null = null;

  constructor(private itemService: ItemService) {
    this.items$ = this.itemService.getFilteredItems();
  }

  startEditing(item: Item): void {
    this.editingItem = { ...item };
  }

  updateItem(): void {
    console.log(this.editingItem);
    if (this.editingItem) {
      this.itemService.updateItem(this.editingItem);
      this.editingItem = null;
    }
  }

  deleteItem(id: number): void {
    this.itemService.deleteItem(id);
  }

  toggleComplete(item: Item): void {
    const updatedItem = { ...item, completed: !item.completed };
    this.itemService.updateItem(updatedItem);
  }

  onSearch(term: string) {
    this.itemService.setSearchTerm(term);
  }

  onFilterChange(filter: string) {
    this.itemService.setFilterCategory(filter);
  }

  handleNameChange(name: string) {
    console.log(this.editingItem);
    console.log(name);
    this.editingItem && (this.editingItem.name = name);
  }
}
