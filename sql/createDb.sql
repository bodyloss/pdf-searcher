CREATE VIRTUAL TABLE pages USING fts3(
    documentId INT, 
    pageNum INT, 
    body TEXT
);

CREATE TABLE documents(
    id INT primary key, 
    name TEXT
);
