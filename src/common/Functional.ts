export type Nullary<T = boolean> = () => T

export function or(left: Nullary, right: Nullary) {
	return left() || right()
}
export function and(left: Nullary, right: Nullary) {
	return left() && right()
}
/**
 * Check if other is a subset of self
 * @param self 
 * @param other 
 * @returns 
 */
export function isSubset<T>(self: Array<T>, other: Array<T>): boolean {
	return other.every((v, i) => self[i] == v)
}