import test from 'node:test';
import assert from 'node:assert/strict';
import { formatSats, formatUsd, formatWholeUsd, satsToUsd, usdToSats } from '../src/lib/format.js';
import { yearlyPlan } from '../src/lib/dca.js';
import { pressKey, MAX_DIGITS } from '../src/lib/keypad.js';
import { bandFor } from '../src/lib/trust.js';
import { routeFrom } from '../src/lib/route.js';

test('formats amounts', () => {
  assert.equal(formatSats(1284500), '1,284,500');
  assert.equal(formatUsd(13.75), '$13.75');
  assert.equal(formatWholeUsd(1300), '$1,300');
});

test('converts between sats and dollars', () => {
  assert.equal(satsToUsd(1284500, 110000).toFixed(2), '1412.95');
  assert.equal(Math.round(usdToSats(1300, 110000)), 1181818);
});

test('works out one year of buys', () => {
  const plan = yearlyPlan({ amountUsd: 25, buysPerYear: 52, btcPriceUsd: 110000 });
  assert.equal(plan.totalUsd, 1300);
  assert.equal(Math.round(plan.totalSats), 1181818);
});

test('keypad builds and deletes amounts', () => {
  assert.equal(pressKey(0, '5'), 5);
  assert.equal(pressKey(5, '000'), 5000);
  assert.equal(pressKey(0, '0'), 0);
  assert.equal(pressKey(0, '000'), 0);
  assert.equal(pressKey(125, 'delete'), 12);
  assert.equal(pressKey(0, 'delete'), 0);
});

test('keypad stops at the digit limit and ignores unknown keys', () => {
  const full = Number('9'.repeat(MAX_DIGITS));
  assert.equal(pressKey(full, '1'), full);
  assert.equal(pressKey(full, '000'), full);
  assert.equal(pressKey(42, 'x'), 42);
});

test('trust bands match the app', () => {
  assert.equal(bandFor(0.91).name, 'Trusted');
  assert.equal(bandFor(0.85).name, 'Trusted');
  assert.equal(bandFor(0.72).name, 'Established');
  assert.equal(bandFor(0.35).name, 'Known');
  assert.equal(bandFor(0).name, 'New');
  assert.equal(bandFor(-0.1).name, 'Flagged');
});

test('routes to the media page by path or hash', () => {
  assert.equal(routeFrom('/media', '', false), 'media');
  assert.equal(routeFrom('/media/', '', false), 'media');
  assert.equal(routeFrom('/', '#media', false), 'home');
  assert.equal(routeFrom('/mediax', '', false), 'home');
  assert.equal(routeFrom('/', '#media', true), 'media');
  assert.equal(routeFrom('/', '#wallet', true), 'home');
});
