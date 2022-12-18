import { Injectable } from '@angular/core';

export interface ColorHSL {
    h: number;
    s: number;
    l: number;
}

export interface ColorRGB {
    r: number;
    g: number;
    b: number;
}

@Injectable()
export class ColorConverterService {
    rbgToHsl(rgb: ColorRGB): ColorHSL {
        let r = rgb.r / 255;
        let g = rgb.g / 255;
        let b = rgb.b / 255;

        const l = Math.max(r, g, b);
        const s = l - Math.min(r, g, b);
        const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0;

        return {
            h: Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
            s: Math.round(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)),
            l: Math.round((100 * (2 * l - s)) / 2)
        };
    }

    hslToRgb(hsl: ColorHSL): ColorRGB {
        let h = hsl.h;
        let s = hsl.s / 100;
        let l = hsl.l / 100;

        const k = (n: number) => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

        return {
            r: Math.round(255 * f(0)),
            g: Math.round(255 * f(8)),
            b: Math.round(255 * f(4))
        };
    }

    rgbToHex(rgb: ColorRGB): string {
        const hexR = rgb.r.toString(16).padStart(2, '0');
        const hexG = rgb.g.toString(16).padStart(2, '0');
        const hexB = rgb.b.toString(16).padStart(2, '0');
        return `${hexR}${hexG}${hexB}`;
    }
}
