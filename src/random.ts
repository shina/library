const {floor, random} = Math;

/**
 * Get an item of an array randomly
 */
export function getOneRandomly<T>(arr: T[]): T {
    const randomId = floor(random() * arr.length);
    return arr[randomId];
}

/**
 * Generates random strings
 * Most of the time used as ID
 */
export function randString(): string {
    return random().toString(36).substr(2, 11);
}
