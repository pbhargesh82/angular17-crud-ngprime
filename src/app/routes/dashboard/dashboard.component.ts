import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { storeName } from '@config/db.config';
import { Person } from '@config/model';
import { peopleTableConfig } from '@config/table.config';
import { generatedData } from '@db/db';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { format } from 'date-fns';
import { CapitalizePipe } from '@pipes/captalize.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, TooltipModule, FormsModule, ToastModule, AvatarModule, TagModule, ConfirmDialogModule, CapitalizePipe],
  providers: [MessageService, ConfirmationService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private dbService = inject(NgxIndexedDBService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  people: Person[] = [];
  tableConfig: any = peopleTableConfig;
  searchValue: string = '';

  constructor() { }

  ngOnInit() {
    this.initializeDatabase();
  }

  initializeDatabase() {
    this.dbService.count(storeName).subscribe((recordCount) => {
      if (recordCount > 0) {
        console.log('Database already initialized.');
        this.getUsers(); // Fetch the existing users
      } else {
        console.log('Initializing database with sample data...');
        this.dbService.bulkAdd(storeName, generatedData).subscribe({
          next: () => {
            console.log('Sample data added to database.');
            this.getUsers(); // Fetch the newly added users
          },
          error: (err) => {
            console.error('Error initializing database:', err);
          }
        });
      }
    });
  }

  getUsers() {
    this.dbService.getAll(storeName).subscribe((result: any) => {
      this.people = result;
      this.people.forEach((person: Person) => {
        person.fullName = this.getFullName(person);
        person.birthdate = person.birthdate ? format(person.birthdate, 'yyyy-MM-dd') : '';
        person.action = [
          { action: 'edit', iconClass: 'pi pi-pencil', tooltip: 'Edit', styleClass: 'text-blue-500' },
          { action: 'delete', iconClass: 'pi pi-trash', tooltip: 'Delete', styleClass: 'text-red-500' },
        ];
      });
      this.people = [...this.people.reverse()];
      console.log('result: ', this.people);
    });
  }

  getFullName(person: Person): string {
    return `${person.firstName ? person.firstName : ''} ${person.middleName ? person.middleName : ''} ${person.lastName ? person.lastName : ''}`.trim();
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
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete user ${person.fullName}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        if (!person.id) return;
        this.dbService.delete(storeName, person.id).subscribe({
          next: () => {
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
    });
  }

}
