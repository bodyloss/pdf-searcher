const path = require('path');
const extract = require('pdf-text-extract');

module.exports = class PdfInserter {
    
    constructor(sqliteConnection, filePath) {
        this.conn = sqliteConnection;
        this.filePath = filePath;
    }

    extract() {
        const self = this;
        return new Promise((resolve, reject) => {
            extract(self.filePath, (err, pages) {
                if (err) {
                    reject(err);
                    return;
                }
                console.dir(pages);
                resolve();
            });
        });
    }

}
