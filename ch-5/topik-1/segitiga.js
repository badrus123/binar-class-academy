class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  getName() {
    return this.name
  }
  getAge() {
    return this.age
  }
  luasSegitiga(a, b, c) {
    console.log(a, b, c)
    if (a === b && b === c) {
      return 'segitiga sama sisi'
    } else if (a === b || b === c || a === c) {
      return 'segitiga sama kaki'
    } else {
      return 'segitiga berbeda'
    }
  }
  luasLingkaran(a, b, c) {
    if (a === b && b === c) {
      return 'segitiga sama sisi'
    } else if (a === b || b === c || a === c) {
      return 'segitiga sama kaki'
    } else {
      return 'segitiga berbeda'
    }
  }
}

module.exports = Person
