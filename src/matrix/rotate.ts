import { clone } from "../clone.ts";

/**
 * Given a 3D array, rotate it in 90 degrees
 *
 * ```ts
 * // the following matrix:
 * [
 * [1, 1, 1],
 * [2, 2, 2],
 * [3, 3, 3]
 * ]
 *
 * // will become:
 * [
 * [3, 2, 1],
 * [3, 2, 1],
 * [3, 2, 1]
 * ]
 * ```
 */
export function rotateMatrix90<T>(matrix: any[][]): T[][] {
    const yLength = matrix.length;
    const xLength = matrix.reduce((result, row) => {
        return row.length > result ? row.length : result;
    }, 0);
    const N = (yLength > xLength ? yLength : xLength) - 1;

    let result = clone(matrix);
    for (let y = 0; y <= N; y++) {
        for (let x = 0; x <= N; x++) {
            // result x,y
            const yr: number = x;
            const xr = y;

            // matrix x,y
            const ym: number = N - y;
            const xm: number = x;

            if (!matrix[ym]) {
                delete result[yr];
                break;
            }
            if (!result[yr]) {
                result[yr] = [];
            }

            result[yr][xr] = matrix[ym][xm];
        }
    }

    // Clean and normalize
    result = result.map(row => row.flat());
    const l = result[0].length;
    return result
        .map(row => {
            row = row.reverse()
            row.length = l;
            return row.reverse();
        })
        .filter(row => row.some(v => v !== undefined));
}
