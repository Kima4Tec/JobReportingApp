import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JobService } from '../job.service';

@Component({
  selector: 'app-job-reports',
  imports: [FormsModule, CommonModule],
  templateUrl: './job-reports.component.html',
  styleUrl: './job-reports.component.css'
})
export class JobReportsComponent implements OnInit {

  company: any = this.getEmptyCompany();
  companies: any[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.jobService.getCompanies().subscribe((data: any[]) => {
      this.companies = data.map(company => {
        return company;
      });
    });
  }
  createCompany(): void {
    console.log('Sending company:', this.company);
    this.jobService.createCompany(this.company).subscribe((newCompany: any) => {
      console.log('Response:', newCompany);
      this.companies.push(newCompany);
      this.resetCompany();
    });
  }



  deleteCompany(id: number): void {
    this.jobService.deleteCompany(id).subscribe(() => {
      this.companies = this.companies.filter(c => c.id !== id);
    });
  }

  editCompany(company: any): void {
    this.company = { ...company };
    console.log('Editing company:', this.company);
  }


  updateCompany(): void {
    console.log('Trying to update:', this.company);

    if (this.company.id) {
      this.jobService.updateCompany(this.company.id, this.company).subscribe(
        (updatedCompany: any) => {
          console.log('Update response:', updatedCompany);

          const index = this.companies.findIndex(c => c.id === updatedCompany.id);
          if (index !== -1) {
            this.companies[index] = updatedCompany;
          }
          this.resetCompany();
          window.location.reload();
        },
        (error) => {
          console.error('Update failed:', error);
        }
      );
    }
  }


  private resetCompany(): void {
    this.company = this.getEmptyCompany();
  }

  private getEmptyCompany(): any {
    return {
      id: undefined,
      name: '',
      location: '',
      companySize: null,
      creating: '',
      facts: '',
      offering: '',
      companyoffer: '',
      motivation: '',
      notes: ''
    };
  }
}