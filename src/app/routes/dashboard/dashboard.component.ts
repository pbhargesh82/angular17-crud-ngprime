import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { storeName } from '@config/db.config';
import { Person } from '@config/model';
import { peopleTableConfig } from '@config/table.config';
import { generatedData } from '@db/db';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule, FormsModule, ToastModule, AvatarModule],
  providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private dbService = inject(NgxIndexedDBService);
  private messageService = inject(MessageService);
  people: Person[] = [];
  tableConfig: any = peopleTableConfig;
  searchValue: string = '';

  constructor() { }

  ngOnInit() {
    this.initializeDatabase();
  }

  initializeDatabase() {
    this.dbService.clear(storeName).subscribe((successDeleted) => {
      console.log('success? ', successDeleted);
    });

    this.dbService.bulkAdd(storeName, generatedData);
    // .subscribe({
    //   next: (result) => {
    //     console.log('result: ', result);
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //   }
    // });

    this.getUsers();
  }

  getUsers() {
    this.dbService.getAll(storeName).subscribe((result: any) => {
      this.people = result;
      this.people.forEach((person: any) => {
        person.action = [
          { action: 'edit', iconClass: 'pi pi-pencil', tooltip: 'Edit', styleClass: 'text-blue-500' },
          { action: 'delete', iconClass: 'pi pi-trash', tooltip: 'Delete', styleClass: 'text-red-500' },
        ];
      });
      console.log('result: ', this.people);
    });
  }

  addRecord() {
    const person = { name: 'John', email: 'a@b.com' };
    this.dbService.add(storeName, person).subscribe({
      next: () => {
        console.log('Record added successfully.');
        this.getUsers();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  onActionClick(person: Person, action: string): void {
    console.log(action);
    console.log(person);
    // this.selectedPerson = person;

    switch (action) {
      case 'edit':
        // this.isEdit = true;
        // this.showAddEditForm = true;
        // this.selectedPerson = person;
        break;
      case 'delete':
        this.onDelete(person);
        break;
    }
  }

  onDelete(person: Person) {
    if (!person.id) return;
    this.dbService.delete(storeName, person.id).subscribe({
      next: (allPeople) => {
        console.log('Record deleted successfully.');
        this.getUsers();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record deleted successfully.' });
      },
      error: (err: any) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
      }
    });
  }

}
