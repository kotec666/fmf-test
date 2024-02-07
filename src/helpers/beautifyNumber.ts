export const beautifyNumber = (n: number) => {
    if (Math.abs(n) >= 1000000) {
        return (n / 1000000).toFixed() + " млн.";
    } else if (Math.abs(n) >= 1000) {
        return (n / 1000).toFixed() + " тыс.";
    } else {
        return n?.toString();
    }
}