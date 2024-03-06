import ExcelJS from 'exceljs';
const workbook = new ExcelJS.Workbook();
const data = await workbook.csv.readFile('path/to/file.xlsx')