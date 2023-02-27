import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  generatePDF(data: any[], headers: string[], fileName: string, title?: string) {
    const doc = new jsPDF({
      orientation: 'landscape'
    });

    // Définit la police pour le titre
    if (title) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text(title, doc.internal.pageSize.getWidth() / 2, 15, {align: 'center'});
    }

    // Définit la police pour les headers
    doc.setFont('helvetica', 'bold');

    // Ajoute les headers de table
    headers.forEach((header, index) => {
      doc.text(header, 10 + (index * 50), 30);
    });

    // Réinitialise la police pour les données
    doc.setFont('helvetica', 'normal');

    // Ajoute les données de table
    data.forEach((rowData, rowIndex) => {
      Object.values(rowData).forEach((value, columnIndex) => {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'object') {
          doc.text(value!.toString(), 10 + (columnIndex * 50), 40 + (rowIndex * 10));
        }
      });
    });

    doc.save(`${fileName}.pdf`);
  }
}
