function parseCSV(csvString: string, hasHeaders: boolean = true): object[] {
    const rows: string[] = csvString.trim().split(/\n|\r\n/); // Splitting by newline
    const parsedData: (string | number)[][] = rows.map(row => row.split(/[,;]/).map(field => {
        const trimmedField: string = field.trim();

        return !isNaN(Number(trimmedField)) && trimmedField !== '' ? Number(trimmedField) : trimmedField;
    }));

    if (hasHeaders) {
        const headers: string[] = parsedData.shift() as string[];
        return parsedData.map(row => {
            return headers.reduce((obj: { [key: string]: string | number }, header, index) => {
                obj[header] = row[index];
                return obj;
            }, {});
        });
    } else {
        return parsedData;
    }
}

export default parseCSV;
