import { expect, test } from 'vitest';
import { and, isSubset, or } from './Functional';

test.for([
	{left: () => true, right: () => true, expected: true},
	{left: () => true, right: () => false, expected: true},
	{left: () => false, right: () => true, expected: true},
	{left: () => false, right: () => false, expected: false},
])('or($left, $right) -> $expected', ({left, right, expected}) => {
	expect(or(left, right)).toBe(expected)
})

test.for([
	{left: () => true, right: () => true, expected: true},
	{left: () => true, right: () => false, expected: false},
	{left: () => false, right: () => true, expected: false},
	{left: () => false, right: () => false, expected: false},
])('and($left, $right) -> $expected', ({left, right, expected}) => {
	expect(and(left, right)).toBe(expected)
})

test.for([
	{self: ["a"], other: ["a"], expected: true},
	{self: ["a", "b"], other: ["a"], expected: true},
	{self: ["a"], other: ["a", "b"], expected: false},
])('isSubset($self, $other) -> $expected', ({self, other, expected}) => {
	expect(isSubset(self, other)).toBe(expected)
})