import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importér FormsModule
import { CommonModule } from '@angular/common';
import { JobService } from '../job.service';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs as saveFile } from 'file-saver'


@Component({
  selector: 'app-show-report',
  standalone: true, // Sikrer, at den er standalone
  imports: [CommonModule, FormsModule], // Importér FormsModule her
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.css']
})
export class ShowReportComponent implements OnInit {
  companies: any[] = [];
  selectedCompany: any = null;

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.jobService.getCompanies().subscribe((data: any[]) => {
      this.companies = data;
    });
  }

  copyToClipboard(): void {
    if (!this.selectedCompany) return;

    const reportText = `
    Virksomhedsrapport
    -------------------
    Navn: ${this.selectedCompany.name}
    Placering: ${this.selectedCompany.location}
    Firmastørrelse: ${this.selectedCompany.companySize}
    Hvad laver de?: ${this.selectedCompany.creating}
    Interessante fakta: ${this.selectedCompany.facts}
    Hvad kan jeg tilbyde?: ${this.selectedCompany.offering}
    Hvad kan de tilbyde?: ${this.selectedCompany.companyOffer}
    Motivation for at søge: ${this.selectedCompany.motivation}
    Noter: ${this.selectedCompany.notes}
    `;

    navigator.clipboard.writeText(reportText).then(() => {
      alert('Rapporten er kopieret til udklipsholderen!');
    });
  }
  exportToWord(): void {
    if (!this.selectedCompany) return;

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun({ text: "Virksomhedsrapport", bold: true, size: 32, font: "Verdana" })],
            }),
            new Paragraph("\n"),

            new Paragraph({
              children: [
                new TextRun({ text: "Navn: ", bold: true, font: "Verdana" }),
                new TextRun({ text: this.selectedCompany.name, font: "Verdana" }),
              ],
            }),
            new Paragraph("\n"),
            new Paragraph({
              children: [
                new TextRun({ text: "Placering: ", bold: true, font: "Verdana" }),
                new TextRun({ text: this.selectedCompany.location, font: "Verdana" }),
              ],
            }),
            new Paragraph("\n"),
            new Paragraph({
              children: [
                new TextRun({ text: "Firmastørrelse: ", bold: true, font: "Verdana" }),
                new TextRun({ text: this.selectedCompany.companySize.toString(), font: "Verdana" }),
              ],
            }),
            new Paragraph("\n"),
            new Paragraph({
              children: [
                new TextRun({ text: "Hvad laver de?: ", bold: true, font: "Verdana" }),
                new TextRun({ text: this.selectedCompany.creating, font: "Verdana" }),
              ],
            }),
            new Paragraph("\n"),
            new Paragraph({
              children: [
                new TextRun({ text: "Interessante fakta: ", bold: true, font: "Verdana" }),
                new TextRun({ text: this.selectedCompany.facts, font: "Verdana" }),
              ],
            }),
            new Paragraph("\n"),
            new Paragraph({
              children: [
                new TextRun({ text: "Hvad kan jeg tilbyde?: ", bold: true, font: "Verdana" }),
                new TextRun({ text: this.selectedCompany.offering, font: "Verdana" }),
              ],
            }),
            new Paragraph("\n"),
            new Paragraph({
              children: [
                new TextRun({ text: "Hvad kan de tilbyde?: ", bold: true, font: "Verdana" }),
                new TextRun({ text: this.selectedCompany.companyOffer, font: "Verdana" }),
              ],
            }),
            new Paragraph("\n"),
            new Paragraph({
              children: [
                new TextRun({ text: "Motivation for at søge: ", bold: true, font: "Verdana" }),
                new TextRun({ text: this.selectedCompany.motivation, font: "Verdana" }),
              ],
            }),
            new Paragraph("\n"),
            new Paragraph({
              children: [
                new TextRun({ text: "Noter: ", bold: true, font: "Verdana" }),
                new TextRun({ text: this.selectedCompany.notes, font: "Verdana" }),
              ],
            }),

          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveFile(blob, 'virksomhedsrapport.docx');
    });
  }
}
function saveAs(blob: Blob, arg1: string) {
  throw new Error('Function not implemented.');
}

