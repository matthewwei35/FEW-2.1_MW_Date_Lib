const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const daysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

class D {
  constructor( ... args ) {
    this._date = new Date(...args)
  }

  add_padding(num) {
    if (num < 10) {
      num = '0' + num.toString()
    }
    return num
  }

  // --- Year --- //
  get year() {
    return this._date.getFullYear()
  }

  set year(year) {
    this._date.setFullYear(year)
  }

  get yr() {
    return this._date.getFullYear() % 100
  }

  // --- Month --- //
  get month() {
    return months[this._date.getMonth()]
  }

  get mth() {
    return monthsShort[this._date.getMonth()]
  }

  // --- Date --- //
  get date() {
    return this.add_padding(this._date.getDate())
  }

  get dt() {
    return this._date.getDate()
  }

  // --- Hour --- //
  get hour() {
    return this.add_padding(this._date.getHours())
  }

  get hr() {
    return this._date.getHours()
  }

  // --- Minute --- //
  get minute() {
    return this.add_padding(this._date.getMinutes())
  }

  get min() {
    return this._date.getMinutes()
  }

  // --- Second --- //
  get second() {
    return this.add_padding(this._date.getSeconds())
  }

  get sec() {
    return this._date.getSeconds()
  }

  format(mask = '') {
		let dateStr = ''
      const special = {
        Y: this.year,
        y: this.yr,
        M: this.month,
        m: this.mth,
        D: this.date,
        d: this.dt,
        H: this.hour,
        h: this.hr,
        I: this.minute,
        i: this.min,
        S: this.second,
        s: this.sec
      }
      for (let i = 0; i < mask.length; i += 1) {
        if ( special[mask[i]] !== undefined ) {
          dateStr += special[mask[i]]
        } else {
          dateStr += mask[i]
        }
      }
		return dateStr
	}

  when() {
    const now = new Date()
    const dy = this._date.getFullYear() - now.getFullYear()
    const dm = this._date.getMonth() - now.getMonth()
    const totalMonths = dy * 12 + dm
    const dd = Math.ceil((this._date - now) / 86400 / 1000)

    if (Math.abs(dd) < 7) {
      return `${Math.abs(dd)} day${Math.abs(dd) > 1 ? 's' : ''} ${dd < 0 ? 'ago' : 'from now'}`
    } else if (Math.abs(totalMonths) < 12) {
      return `${Math.abs(dm)} month${Math.abs(dm) > 1 ? 's' : ''} ${dm < 0 ? 'ago' : 'from now'}`
    } else if (Math.abs(dy) >= 1) {
      return `${Math.abs(dy)} year${Math.abs(dy) > 1 ? 's' : ''} ${dy < 0 ? 'ago' : 'from now'}`
    }
  }
}

module.exports = D
