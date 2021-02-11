import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(todos: any[], searchText: string): any[] {
    if (!todos) return [];
    if (!searchText) return todos;

    searchText = searchText.toLowerCase();
    return todos.filter((todos) => {
      return todos.description.toLowerCase().includes(searchText);
    });
  }
}
