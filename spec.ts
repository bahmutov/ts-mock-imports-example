// "compute" imports "add" from "./math" using named import
import { compute } from './user'
import { ImportMock } from 'ts-mock-imports'
import test from 'ava'
// we can import "add" directly to test the original function works
import {add} from './math'
// to mock "./math add" export need to import entire module
import * as math from './math'

// this will keep our math mocks
let mocks

// removes any mocks from previous tests
test.beforeEach(() => {
  if (mocks) {
    mocks.restore()
    mocks = null
  }
})

test('adds unmocked', t => {
  // testing the original function
  t.deepEqual(add(2, 3), 5)
})

test('adds using mock', t => {
  mocks = ImportMock.mockFunction(math, 'add', 20)
  t.deepEqual(math.add(2, 3), 20)
})

test('adds using mock inside another module', t => {
  // function "compute" is calling "./math add" inside
  // and it imports "add" as a named import
  mocks = ImportMock.mockFunction(math, 'add', 30)
  t.deepEqual(compute(2, 3), 30)
})
