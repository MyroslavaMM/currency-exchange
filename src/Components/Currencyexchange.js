import { ccyUSD, ccyEUR } from './Header';

export function exchange(input, ccy_code1, ccy_code2) {
    var out = 0;
    if (ccy_code1 == ccy_code2) {
        out = input;
    } else if (ccy_code1 == 'USD' && ccy_code2 == 'UAH') {
        out = input * ccyUSD.buyToday;
        out = Math.round(out * 100) / 100;
    } else if (ccy_code1 == 'USD' && ccy_code2 == 'EUR') {
        out = input * (ccyEUR.buyToday / ccyUSD.buyToday);
        out = Math.round(out * 100) / 100;
    } else if (ccy_code1 == 'EUR' && ccy_code2 == 'UAH') {
        out = input * ccyEUR.buyToday;
        out = Math.round(out * 100) / 100;
    } else if (ccy_code1 == 'EUR' && ccy_code2 == 'USD') {
        out = input * (ccyUSD.buyToday / ccyEUR.buyToday);
        out = Math.round(out * 100) / 100;
    } else if (ccy_code1 == 'UAH' && ccy_code2 == 'USD') {
        out = input / ccyUSD.buyToday;
        out = Math.round(out * 100) / 100;
    } else if (ccy_code1 == 'UAH' && ccy_code2 == 'EUR') {
        out = input / ccyEUR.buyToday;
        out = Math.round(out * 100) / 100;
    }
    return out;
}
