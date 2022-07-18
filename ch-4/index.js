class Orangtua {
  constructor(sifat, keuangan, fisik) {
    // ini adalah
    this.sifat = sifat
    this.keuangan = keuangan
    this.fisik = fisik
  }
  // instance method
  bayarSekolah() {
    if (this.keuangan <= 1500000) {
      this.sifat = 'jahat'
      return `gak bisa nyekolahin anak dan orangtua ${this.sifat}`
    } else {
      this.sifat = 'tanggung jawab'
      return `bisa bayar sekolah dan orang tua ${this.sifat}`
    }
  }
  penguranganUang(duit) {
    return (this.keuangan = duit < 1 ? 0 : this.keuangan - duit)
  }
  static keadaanKendaraan(kondisiMobil) {
    if (kondisiMobil === 'rusak') {
      return 'mobil gak bisa jalan'
    } else {
      return 'mobil bisa jalan'
    }
  }
}

class Anak extends Orangtua {
  constructor(sifat, keuangan, fisik, sifatAnak, keuanganAnak) {
    super(sifat, keuangan, fisik)
    this.sifatAnak = sifatAnak
    this.keuanganAnak = keuanganAnak
  }
  boros(harga) {
    if (this.keuangan < harga) {
      if (this.keuangan + this.keuanganAnak > harga) {
        this.keuanganAnak = this.keuanganAnak + this.keuangan - harga
        super.penguranganUang(0)
        return `sisa duit ortu ${this.keuangan} dan anak ${this.keuanganAnak}`
      }
    } else {
      super.penguranganUang(harga)
      return `bisa beli dengan harga ${harga} dan juga sisa uang orangtua ${this.keuangan} dan anak ${this.keuanganAnak}`
    }
  }
}
const badrus = new Orangtua('nakal', 2000000, 'gendut')
const mirza = new Anak('nakal', 2000000, 'gendut', 'rajin sedekah', 200000)
console.log(mirza.boros(1000000))
