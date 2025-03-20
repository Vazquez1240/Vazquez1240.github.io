import jsPdf from "jsPDF";
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';



export default async function GeneradorPDF(tramites:any){
  const doc = new jsPDF();

  autoTable(doc, {
    body: [
      [
        {
          content: '',
          styles: {
            halign: 'left',
            fontSize: 18,
            textColor: '#ffffff'
          }
        }
      ]
    ],
    theme: 'plain',
    styles: {
      fillColor: '#3366ff'
    }
  });
  return doc.save('test.pdf')
}
