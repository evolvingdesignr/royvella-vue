import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const contact = readFileSync(new URL('../app/pages/contact.vue', import.meta.url), 'utf8')
const staticForm = readFileSync(new URL('../public/__forms.html', import.meta.url), 'utf8')

test('Nuxt and Netlify forms register the same contact fields', () => {
  const names = source => [...source.matchAll(/<(?:input|textarea)\b[^>]*\bname="([^"]+)"/g)].map(match => match[1]).sort()
  assert.deepEqual(names(contact), ['bot-field', 'email', 'form-name', 'message', 'name'].sort())
  assert.deepEqual(names(staticForm), names(contact))
  for (const source of [contact, staticForm]) {
    assert.match(source, /<form\b[^>]*name="contact"/)
    assert.match(source, /data-netlify="true"/)
    assert.match(source, /netlify-honeypot="bot-field"/)
    assert.match(source, /name="form-name" value="contact"/)
  }
})

test('contact form submits URL-encoded data to the static Netlify endpoint', () => {
  assert.match(contact, /fetch\('\/__forms\.html',\s*\{/)
  assert.match(contact, /method:\s*'POST'/)
  assert.match(contact, /application\/x-www-form-urlencoded/)
  assert.match(contact, /new FormData\(form\)/)
  assert.match(contact, /form\.reportValidity\(\)/)
  assert.match(contact, /response\.ok/)
  assert.match(contact, /status\.value = 'error'/)
  assert.match(contact, /status\.value = 'success'/)
  assert.match(contact, /:disabled="status === 'sending'"/)
  assert.doesNotMatch(contact, /Sending is disabled/)
})
