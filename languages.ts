export type LangCode =
  | "en" | "es" | "fr" | "de" | "pt" | "it" | "nl" | "ja" | "ko" | "zh"
  | "ar" | "hi" | "ru" | "tr" | "pl" | "sv" | "da" | "no" | "fi" | "cs"
  | "el" | "he" | "th" | "vi" | "id" | "uk" | "ro" | "hu" | "fa" | "ur"
  | "bn" | "ta" | "ms" | "tl" | "sw" | "af";

export interface Language {
  code: LangCode;
  label: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "da", label: "Dansk", flag: "🇩🇰" },
  { code: "no", label: "Norsk", flag: "🇳🇴" },
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "fi", label: "Suomi", flag: "🇫🇮" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "cs", label: "Čeština", flag: "🇨🇿" },
  { code: "hu", label: "Magyar", flag: "🇭🇺" },
  { code: "ro", label: "Română", flag: "🇷🇴" },
  { code: "el", label: "Ελληνικά", flag: "🇬🇷" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "uk", label: "Українська", flag: "🇺🇦" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "he", label: "עברית", flag: "🇮🇱" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "fa", label: "فارسی", flag: "🇮🇷" },
  { code: "ur", label: "اردو", flag: "🇵🇰" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", label: "বাংলা", flag: "🇧🇩" },
  { code: "ta", label: "தமிழ்", flag: "🇱🇰" },
  { code: "th", label: "ไทย", flag: "🇹🇭" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "id", label: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "ms", label: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "tl", label: "Filipino", flag: "🇵🇭" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "sw", label: "Kiswahili", flag: "🇰🇪" },
  { code: "af", label: "Afrikaans", flag: "🇿🇦" },
];