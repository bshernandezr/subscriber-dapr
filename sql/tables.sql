DROP TABLE IF EXISTS "CLM"."TICKET";
DROP TABLE IF EXISTS "CLM"."TICKET_HIST";

CREATE TABLE "CLM"."TICKET" (
	customer_id SERIAL NOT NULL PRIMARY KEY,
	customer_name VARCHAR,
	age INT,
	creationDate DATE not null default CURRENT_DATE,
	ticketType VARCHAR,
	ticketStatus VARCHAR
);

CREATE TABLE "CLM"."TICKET_HIST" (
	history_id SERIAL NOT NULL PRIMARY KEY,
	ticketId INT,
	creationDate DATE not null default CURRENT_DATE,
	ticketType VARCHAR,
	ticketStatus VARCHAR,
	FOREIGN KEY(ticketId) REFERENCES "CLM"."TICKET"(customer_id)
)