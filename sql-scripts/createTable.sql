CREATE TABLE "Passenger" (
	"ID" INTEGER NOT NULL ,
	"FirstName" VARCHAR(30),
	"LastName" VARCHAR(30),
	"EmailAddress" VARCHAR(30),
    "PhoneNumber" VARCHAR(12),
PRIMARY KEY (ID)
);

CREATE TABLE "Booking" (
	"ID" INTEGER NOT NULL ,
	"BookingStatus" VARCHAR(10),
    "BookingDate" TIMESTAMP,
	"FlightDate" TIMESTAMP,
	"FlightDestination" VARCHAR(20),
    "Passenger_ID" INTEGER NOT NULL,
PRIMARY KEY (ID),
FOREIGN KEY ("Passenger_ID") REFERENCES "Passenger" ON DELETE CASCADE
);

INSERT INTO "Passenger" VALUES('1','Ion', 'Popescu', 'popescu.ion@gmail.com', '0738111111');
INSERT INTO "Passenger" VALUES('2','Cristian', 'Borcea', 'borcea.cristian@gmail.com', '0738222222');
INSERT INTO "Passenger" VALUES('3','Gheorghe', 'Bobonete', 'gheorghe.bobonete@gmail.com', '0738333333');
INSERT INTO "Passenger" VALUES('4','Dumitru', 'Mutu', 'dumitru.mutu@gmail.com', '0738444444');
INSERT INTO "Passenger" VALUES('5','Anca', 'Popovici', 'anca.popovici@gmail.com', '0738555555');
INSERT INTO "Passenger" VALUES('6','Elena', 'Diaconescu', 'elene.diaconescu@gmail.com', '0738666666');

INSERT INTO "Booking" VALUES('1','active', '2022-07-12T12:00', '2022-07-12T12:00', 'London', '1');
INSERT INTO "Booking" VALUES('2','active', '2022-08-12T12:00', '2022-08-12T12:00', 'Paris', '2');
INSERT INTO "Booking" VALUES('3','active', '2022-09-12T12:00', '2022-09-12T12:00', 'Berlin', '3');
INSERT INTO "Booking" VALUES('4','active', '2022-10-12T12:00', '2022-10-12T12:00', 'Amsterdam', '4');
INSERT INTO "Booking" VALUES('5','active', '2022-11-12T12:00', '2022-11-12T12:00', 'Sofia', '5');
INSERT INTO "Booking" VALUES('6','active', '2022-12-12T12:00', '2022-12-12T12:00', 'Prague', '6');