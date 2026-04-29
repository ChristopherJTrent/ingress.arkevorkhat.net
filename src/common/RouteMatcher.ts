import {match} from "path-to-regexp"
export function matchRoute(path: string, input: string): boolean {
	if (path == input) {
		return true;
	}
	const result = match(path)(input)
	return result == false
}