import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TeamMember {
  id: number;
  name: string;
  age: number;
  department: string;
  available: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  teamMembers: TeamMember[] = [
    { id: 1, name: 'Esraa',  age: 24, department: 'Development', available: true  },
    { id: 2, name: 'Ahmed',  age: 28, department: 'Marketing',   available: false },
    { id: 3, name: 'Layla',  age: 31, department: 'Design',      available: true  },
    { id: 4, name: 'Omar',   age: 26, department: 'Development', available: true  },
    { id: 5, name: 'Sara',   age: 29, department: 'Design',      available: false },
  ];

  departments: string[] = ['Development', 'Marketing', 'Design'];
  selectedDepartment: string = 'All';
  viewMode: 'card' | 'list' = 'card';

  newMember = { name: '', age: null as number | null, department: '', available: true };
  formErrors = { name: '', age: '', department: '' };
  private nextId = 6;

  get filteredMembers(): TeamMember[] {
    if (this.selectedDepartment === 'All') return this.teamMembers;
    return this.teamMembers.filter(m => m.department === this.selectedDepartment);
  }

  get totalMembers()     { return this.teamMembers.length; }
  get availableCount()   { return this.teamMembers.filter(m => m.available).length; }
  get unavailableCount() { return this.totalMembers - this.availableCount; }

  getInitials(name: string): string {
    return name.trim().split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  addMember(): void {
    this.formErrors = { name: '', age: '', department: '' };
    let valid = true;
    if (!this.newMember.name.trim()) { this.formErrors.name = 'Name is required.'; valid = false; }
    const age = Number(this.newMember.age);
    if (!this.newMember.age || isNaN(age) || age < 18 || age > 99) { this.formErrors.age = 'Enter a valid age (18–99).'; valid = false; }
    if (!this.newMember.department) { this.formErrors.department = 'Please select a department.'; valid = false; }
    if (!valid) return;
    this.teamMembers.push({ id: this.nextId++, name: this.newMember.name.trim(), age, department: this.newMember.department, available: this.newMember.available });
    this.newMember = { name: '', age: null, department: '', available: true };
  }

  toggleAvailability(member: TeamMember): void { member.available = !member.available; }
  setViewMode(mode: 'card' | 'list'): void { this.viewMode = mode; }
}