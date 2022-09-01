ALTER TABLE "siswa" ADD FOREIGN KEY ("id_sekolah") REFERENCES "sekolah" ("id");

ALTER TABLE "ref_kelas" ADD FOREIGN KEY ("id_guru") REFERENCES "guru" ("id");

ALTER TABLE "ref_kelas" ADD FOREIGN KEY ("id_kelas") REFERENCES "kelas" ("id");

ALTER TABLE "kelas" ADD FOREIGN KEY ("id_sekolah") REFERENCES "sekolah" ("id");

ALTER TABLE "guru" ADD FOREIGN KEY ("id") REFERENCES "kelas" ("id_walikelas");

ALTER TABLE "score" ADD FOREIGN KEY ("id_siswa") REFERENCES "siswa" ("id");

ALTER TABLE "score" ADD FOREIGN KEY ("id_subject") REFERENCES "subject" ("id");

ALTER TABLE "price" ADD FOREIGN KEY ("id") REFERENCES "transaction" ("id_price");

ALTER TABLE "siswa" ADD FOREIGN KEY ("id") REFERENCES "transaction" ("id_siswa");

ALTER TABLE "guru" ADD FOREIGN KEY ("id") REFERENCES "attendance" ("id_guru");

ALTER TABLE "siswa" ADD FOREIGN KEY ("id") REFERENCES "attendance" ("id_siswa");
