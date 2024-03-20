// 第二個字替換成 * 號
export function replaceSecondCharWithAsterisk(str?: string): string {
    if (!str) return "";
    return str.replace(str[1], '*');
}
