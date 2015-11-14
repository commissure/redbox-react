import test from 'tape'
import {
  filenameWithoutLoaders,
  filenameHasLoaders,
  isFilenameAbsolute,
  filenameHasSchema,
  makeUrl,
  makeLinkText
} from '../src/lib'

test('filenameWithoutLoaders', t => {
  t.plan(3)
  t.equal(
    filenameWithoutLoaders('/webpack-loader!/filename'),
    '/filename',
    'Should handle webpack loader'
  )
  t.equal(
    filenameWithoutLoaders('/filename'),
    '/filename',
    'Should handle no loader'
  )
  t.equal(
    filenameWithoutLoaders('http://doman/path'),
    'http://doman/path',
    'Should handle URL'
  )
})

test('filenameHasLoaders', t => {
  t.plan(3)
  t.true(
    filenameHasLoaders('/webpack-loader!/filename'),
    'Should handle webpack loader'
  )
  t.false(
    filenameHasLoaders('/filename'),
    'Should handle no loader'
  )
  t.false(
    filenameHasLoaders('http://doman/path'),
    'Should handle URL'
  )
})

test('isFilenameAbsolute', t => {
  t.plan(4)
  t.false(
    isFilenameAbsolute('webpack://filename'),
    'webpack://filename is not absolute'
  )
  t.false(
    isFilenameAbsolute('./filename'),
    './filename is not absolute'
  )
  t.true(
    isFilenameAbsolute('/filename'),
    '/filename is absolute'
  )
  t.true(
    isFilenameAbsolute('loader!/filename'),
    'loader!/filename is absolute'
  )
})

test('filenameHasSchema', t => {
  t.plan(3)
  t.false(
    filenameHasSchema('/filename'),
    '/filename has no schema'
  )
  t.true(
    filenameHasSchema('http://filename'),
    'http://filename has a schema'
  )
  t.true(
    filenameHasSchema('webpack:filename'),
    'webpack:filename has a schema'
  )
})

test('makeUrl', t => {
  t.plan(7)
  t.equal(
    makeUrl('/filename'),
    'file:///filename',
    'Should handle local file'
  )
  t.equal(
    makeUrl('http://filename'),
    'http://filename',
    'Should handle URL'
  )
  t.equal(
    makeUrl('/filename', 'subl'),
    'subl://open?url=file:///filename',
    'Should handle local file with scheme'
  )
  t.equal(
    makeUrl('/filename', 'subl', 10),
    'subl://open?url=file:///filename&line=10',
    'Should handle local file with scheme and line'
  )
  t.equal(
    makeUrl('/filename', 'subl', 10, 3),
    'subl://open?url=file:///filename&line=10&column=3',
    'Should handle local file with scheme, kine and column'
  )
  t.equal(
    makeUrl('http://filename', 'subl'),
    'http://filename',
    'Should handle URL with scheme'
  )
  t.equal(
    makeUrl('/loader!/filename', 'subl', 10),
    'subl://open?url=file:///filename',
    'Should handle webpack loader with line'
  )
})

test('makeLinkText', t => {
  t.plan(4)
  t.equal(
    makeLinkText('/filename'),
    '/filename',
    'Should handle filename'
  )
  t.equal(
    makeLinkText('/filename', 10),
    '/filename:10',
    'Should handle filename and line'
  )
  t.equal(
    makeLinkText('/filename', 10, 3),
    '/filename:10:3',
    'Should handle filename, line and column'
  )
  t.equal(
    makeLinkText('/loader!/filename', 10),
    '/filename',
    'Should handle filename with webpack loader and line'
  )
})
