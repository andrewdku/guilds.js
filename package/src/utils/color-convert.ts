export function colorIntToHex(
    color: number | null,
    addHashSymbol = false
): string | null {
    if (color == null || !Number.isFinite(color)) {
        return null;
    }

    const hex = ((color >>> 0) & 0xffffff).toString(16).padStart(6, "0");
    return addHashSymbol ? `#${hex}` : hex;
}

export function hexToColorInt(hex: string | null): number | null {
    if (!hex) {
        return null;
    }

    hex = hex.trim().replace(/^#/, "");
    hex =
        hex.length === 3
            ? hex
                  .split("")
                  .map((c) => c + c)
                  .join("")
            : hex;

    if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
        return null;
    }

    return parseInt(hex, 16);
}
