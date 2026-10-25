import { bonusRows, routeRows } from "../data/sheet";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function cell(value: string | number, href?: string) {
  const type = typeof value === "number" ? "Number" : "String";
  const link = href ? ` ss:HRef="${escapeXml(href)}"` : "";
  return `<Cell${link}><Data ss:Type="${type}">${escapeXml(String(value))}</Data></Cell>`;
}

function row(values: Array<string | number>, hrefs: Array<string | undefined> = []) {
  return `<Row>${values.map((value, index) => cell(value, hrefs[index])).join("")}</Row>`;
}

export function workbookXml() {
  const route = routeRows();
  const bonuses = bonusRows();
  const routeRowsXml = route
    .map((item) => row([item.level, item.where, item.who, item.step, item.way], [undefined, undefined, undefined, item.href, undefined]))
    .join("");
  const bonusRowsXml = bonuses
    .map((item) => row([item.name, item.effect, item.note], [item.href, undefined, undefined]))
    .join("");

  return `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Worksheet ss:Name="Route">
<Table>
<Row>${["Level", "Where", "Who", "Do", "Way"].map((label) => cell(label)).join("")}</Row>
${routeRowsXml}
</Table>
</Worksheet>
<Worksheet ss:Name="Bonuses">
<Table>
<Row>${["Bonus", "Effect", "Note"].map((label) => cell(label)).join("")}</Row>
${bonusRowsXml}
</Table>
</Worksheet>
</Workbook>`;
}

export function downloadWorkbook() {
  const blob = new Blob([workbookXml()], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Swedish Team Level Guide.xls";
  link.click();
  URL.revokeObjectURL(url);
}
