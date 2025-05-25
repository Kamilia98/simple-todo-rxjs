import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Item } from '../models/item.model';
const INIT_ITEMS = [
  { id: 1, name: 'Item 1', description: 'Description 1', completed: false },
  { id: 2, name: 'Item 2', description: 'Description 2', completed: true },
];
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items: Item[] = INIT_ITEMS;
  private itemsSubject = new BehaviorSubject<Item[]>(INIT_ITEMS);

  private searchTermSubject = new BehaviorSubject<string>('');
  private filterCategorySubject = new BehaviorSubject<string>('all');

  // Observables
  getFilteredItems(): Observable<Item[]> {
    return combineLatest([
      this.itemsSubject,
      this.searchTermSubject,
      this.filterCategorySubject,
    ]).pipe(
      map(([items, searchTerm, filter]) => {
        return items.filter((item) => {
          const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());

          const matchesFilter =
            filter === 'all' ||
            (filter === 'todo' && !item.completed) ||
            (filter === 'done' && item.completed);

          return matchesSearch && matchesFilter;
        });
      })
    );
  }

  setSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
  }

  setFilterCategory(category: string): void {
    this.filterCategorySubject.next(category);
  }

  // CRUD operations
  addItem(item: Omit<Item, 'id'>): void {
    const newItem: Item = {
      ...item,
      id:
        this.items.length > 0
          ? Math.max(...this.items.map((i) => i.id)) + 1
          : 1,
    };
    this.items.push(newItem);
    this.itemsSubject.next([...this.items]);
  }

  updateItem(updatedItem: Item): void {
    console.log(updatedItem);
    const index = this.items.findIndex((item) => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem;
      this.itemsSubject.next([...this.items]);
    }
  }

  deleteItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.itemsSubject.next([...this.items]);
  }

  getItemById(id: number): Item | undefined {
    return this.items.find((item) => item.id === id);
  }
}
