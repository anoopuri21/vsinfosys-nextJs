import assert from 'node:assert/strict';
import test from 'node:test';
import { ApiValidationError, assertContentInput } from './validation.ts';

const validInput = {
  contentType: 'page',
  slug: 'ecommerce-development',
  title: 'E-commerce development',
  summary: 'A conversion-focused commerce experience designed for a clear buying journey.',
  seoTitle: 'E-commerce development | VS Infosys',
  seoDescription: 'Conversion-focused e-commerce development for businesses that need a clearer, faster buying journey.',
  canonicalPath: '/services/ecommerce-development/',
  body: { sections: [{ type: 'hero', heading: 'Commerce', copy: 'Clear buying journeys', ctaUrl: '/start-a-project/' }] },
};

test('accepts a safe, structured CMS content payload', () => {
  assert.doesNotThrow(() => assertContentInput(validInput));
});

test('rejects unknown CMS section types', () => {
  assert.throws(() => assertContentInput({ ...validInput, body: { sections: [{ type: 'scriptInjection' }] } }), ApiValidationError);
});

test('rejects unsafe canonical paths and external CTAs', () => {
  assert.throws(() => assertContentInput({ ...validInput, canonicalPath: 'https://example.com/' }), ApiValidationError);
  assert.throws(() => assertContentInput({ ...validInput, body: { sections: [{ type: 'cta', ctaUrl: 'https://example.com/' }] } }), ApiValidationError);
});

test('rejects malformed root body and unsafe slugs', () => {
  assert.throws(() => assertContentInput({ ...validInput, slug: 'Unsafe Slug' }), ApiValidationError);
  assert.throws(() => assertContentInput({ ...validInput, body: [] }), ApiValidationError);
});
