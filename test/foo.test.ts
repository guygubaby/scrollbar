import { expect, test } from 'vitest'

test('foo', () => {
  expect('foo').toEqual('foo')
  expect('foo').toMatchSnapshot()
})
