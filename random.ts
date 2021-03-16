/**
 * Get an item of an array randomly
 */
export function getOneRandomly<T>(arr: T[]): T {
    const randomId = Math.floor(Math.random() * arr.length);
    return arr[randomId];
}
