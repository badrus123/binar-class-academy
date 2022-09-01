CREATE TABLE "sekolah" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" varchar(50) DEFAULT NULL,
  "alamat" varchar(50) DEFAULT NULL
);

CREATE TABLE "guru" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" varchar(50) DEFAULT NULL,
  "alamat" varchar(50) DEFAULT NULL,
  "no_hp" varchar(50) DEFAULT NULL
);

CREATE TABLE "subject" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" varchar(50) DEFAULT NULL
);

CREATE TABLE "price" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" varchar(50) DEFAULT NULL,
  "price" bigint DEFAULT NULL
);

CREATE TABLE "siswa" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" varchar(50) DEFAULT NULL,
  "alamat" varchar(50) DEFAULT NULL,
  "id_sekolah" uuid NULL REFERENCES "sekolah" ("id")
);

CREATE TABLE "kelas" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" varchar(50) DEFAULT NULL,
  "id_sekolah" uuid  NULL REFERENCES "sekolah" ("id"),
  "id_walikelas" uuid  NULL REFERENCES "guru" ("id")
);

CREATE TABLE "ref_kelas" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "id_kelas" uuid  NULL REFERENCES "kelas" ("id"),
  "id_guru" uuid  NULL REFERENCES "guru" ("id")
);

CREATE TABLE "score" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "score" float8 DEFAULT NULL,
  "semester" int8 DEFAULT NULL,
  "id_siswa" uuid  NULL REFERENCES "siswa" ("id"),
  "id_subject" uuid  NULL REFERENCES "subject" ("id")
);


CREATE TABLE "transaction" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "total_price" bigint DEFAULT NULL,
  "id_siswa" uuid  NULL REFERENCES "siswa" ("id"),
  "id_price" uuid  NULL REFERENCES "price" ("id")
);

CREATE TABLE "attendance" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "time_attendance" timestamp DEFAULT NULL,
  "id_siswa" uuid  NULL REFERENCES "siswa" ("id"),
  "id_guru" uuid  NULL REFERENCES "guru" ("id")
);