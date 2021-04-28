// eslint-disable-next-line import/no-extraneous-dependencies
const { test, expect } = require('@jest/globals');
const D = require('../src/index');

const date = new Date();
const d = new D(date);
const bday = new D('Nov 8, 2002 06:05:09');

// --- Year --- //
test('Test year', () => {
  expect(d.year).toBe(date.getFullYear());
});

test('Test set year', () => {
  const e = new D(d);
  const someYear = 1983;
  e.year = 1983;
  expect(e.year).toBe(someYear);
  expect(e.yr).toBe(someYear % 100);
});

test('Test yr', () => {
  expect(d.yr).toBe(date.getFullYear() % 100);
});

// --- Month --- //
test('Test month', () => {
  expect(bday.month).toBe('November');
});

test('Test mth', () => {
  expect(bday.mth).toBe('Nov');
});

// --- Date --- //
test('Test date', () => {
  expect(d.date).toBe(date.getDate());
});

test('Test dt', () => {
  expect(bday.dt).toBe(8);
});

// --- Hour --- //
test('Test hour', () => {
  expect(d.hour).toBe(date.getHours());
});

test('Test hr', () => {
  expect(bday.hr).toBe(6);
});

// --- Minute --- //
test('Test minute', () => {
  expect(bday.minute).toBe('05');
});

test('Test min', () => {
  expect(d.min).toBe(date.getMinutes());
});

// --- Second --- //
test('Test second', () => {
  expect(bday.second).toBe('09');
});

test('Test sec', () => {
  expect(d.sec).toBe(date.getSeconds());
});

// --- Format --- //
test('Test format', () => {
  expect(bday.format('----Y----')).toBe('----2002----');
  expect(bday.format('----y----')).toBe('----2----');
  expect(bday.format('....M....')).toBe('....November....');
  expect(bday.format('....m....')).toBe('....Nov....');
  expect(bday.format(',,,,D,,,,')).toBe(',,,,08,,,,');
  expect(bday.format(',,,,d,,,,')).toBe(',,,,8,,,,');
  expect(bday.format('````H````')).toBe('````06````');
  expect(bday.format('````h````')).toBe('````6````');
  expect(bday.format('____I____')).toBe('____05____');
  expect(bday.format('____i____')).toBe('____5____');
  expect(bday.format('____S____')).toBe('____09____');
  expect(bday.format('____s____')).toBe('____9____');
});

// --- When --- //
test('Test when', () => {
  const now = new Date();

  const nowMinusOneDay = new Date().setDate(now.getDate() - 1);
  const yesterday = new D(nowMinusOneDay);
  expect(yesterday.when()).toBe('1 day ago');

  const nowMinusOneYear = new Date().setFullYear(now.getFullYear() - 1);
  const lastYear = new D(nowMinusOneYear);
  expect(lastYear.when()).toBe('1 year ago');

  const nowMinusOneMonth = new Date().setMonth(now.getMonth() - 1);
  const lastMonth = new D(nowMinusOneMonth);
  expect(lastMonth.when()).toBe('1 month ago');

  now.setDate(now.getDate() + 2);
  const twoDaysFromNow = new D(now);
  expect(twoDaysFromNow.when()).toBe('2 days from now');

  now.setMonth(now.getMonth() + 3);
  const threeMonthsFromNow = new D(now);
  expect(threeMonthsFromNow.when()).toBe('3 months from now');

  now.setFullYear(now.getFullYear() + 4);
  const fourYearsFromNow = new D(now);
  expect(fourYearsFromNow.when()).toBe('4 years from now');
});
