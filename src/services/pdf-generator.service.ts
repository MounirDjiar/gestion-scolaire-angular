import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  generatePDF(data: any[], headers: string[], fileName: string) {
    const doc = new jsPDF();

    // Add table headers
    headers.forEach((header, index) => {
      doc.text(header, 10 + (index * 50), 20);
    });

    // Add table rows
    data.forEach((rowData, rowIndex) => {
      Object.values(rowData).forEach((value, columnIndex) => {
        if (typeof value === 'string' || typeof value === 'number' || typeof value ==='object')
        doc.text(value!.toString(), 10 + (columnIndex * 50), 30 + (rowIndex * 10));
      });
    });

    doc.save(`${fileName}.pdf`);
  }
}

