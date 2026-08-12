export type ToolStatus = "live" | "beta" | "comingSoon";

export type ToolCategory =
  | "text"
  | "pdf"
  | "image"
  | "video"
  | "audio"
  | "url-web"
  | "qr"
  | "social"
  | "developer"
  | "ai"
  | "productivity"
  | "calculators"
  | "security"
  | "design"
  | "finance"
  | "data"
  | "utility";

export type Tool = {
  slug: string;
  title: string;
  description: string;
  categoryId: ToolCategory;
  status: ToolStatus;
};

export type Category = {
  id: ToolCategory;
  name: string;
  description: string;
  icon: string;
};

export const categories: Category[] = [
  { id: "text", name: "Text Tools", description: "Edit, analyze, and transform text in your browser.", icon: "Type" },
  { id: "pdf", name: "PDF Tools", description: "Merge, split, extract, and convert PDF documents.", icon: "FileText" },
  { id: "image", name: "Image Tools", description: "Resize, crop, compress, and convert images.", icon: "Image" },
  { id: "video", name: "Video Tools", description: "Download, trim, compress, and convert video.", icon: "Video" },
  { id: "audio", name: "Audio Tools", description: "Convert and play audio without uploading to a server.", icon: "Music" },
  { id: "url-web", name: "URL & Web", description: "Shorten links, preview pages, and inspect URLs.", icon: "Link" },
  { id: "qr", name: "QR Codes", description: "Generate and scan QR codes instantly.", icon: "QrCode" },
  { id: "social", name: "Social Media", description: "Bios, hashtags, and link-in-bio helpers.", icon: "Share2" },
  { id: "developer", name: "Developer", description: "Format code, JSON, hashes, and more.", icon: "Code2" },
  { id: "ai", name: "AI Tools", description: "AI-powered writing and caption helpers.", icon: "Sparkles" },
  { id: "productivity", name: "Productivity", description: "Timers, planners, and daily workflow tools.", icon: "Timer" },
  { id: "calculators", name: "Calculators", description: "Math, BMI, loans, dates, and percentages.", icon: "Calculator" },
  { id: "security", name: "Security", description: "Passwords, JWT, hashing, and verification.", icon: "Shield" },
  { id: "design", name: "Design", description: "Colors, gradients, SVG, and thumbnails.", icon: "Palette" },
  { id: "finance", name: "Finance", description: "Currency and money utilities.", icon: "DollarSign" },
  { id: "data", name: "Data", description: "CSV, JSON, YAML, and XML converters.", icon: "Database" },
  { id: "utility", name: "Utility", description: "Files, units, temperature, and time zones.", icon: "Wrench" },
];

export const tools: Tool[] = [
  { slug: "online-clipboard", title: "Online Clipboard", description: "Online Clipboard — free browser-based tool in the Text Tools collection.", categoryId: "text", status: "beta" },
  { slug: "quicknote", title: "Quicknote", description: "Quicknote — free browser-based tool in the Text Tools collection.", categoryId: "text", status: "live" },
  { slug: "ai-rephraser", title: "AI Rephraser", description: "AI Rephraser — free browser-based tool in the Text Tools collection.", categoryId: "text", status: "live" },
  { slug: "word-counter", title: "Word Counter", description: "Word Counter — free browser-based tool in the Text Tools collection.", categoryId: "text", status: "live" },
  { slug: "text-compare", title: "Text Compare", description: "Text Compare — free browser-based tool in the Text Tools collection.", categoryId: "text", status: "live" },
  { slug: "case-convert", title: "Case Convert", description: "Case Convert — free browser-based tool in the Text Tools collection.", categoryId: "text", status: "live" },
  { slug: "line-break-remover", title: "Line Break Remover", description: "Line Break Remover — free browser-based tool in the Text Tools collection.", categoryId: "text", status: "live" },
  { slug: "pdf-merge", title: "PDF Merge", description: "PDF Merge — free browser-based tool in the PDF Tools collection.", categoryId: "pdf", status: "beta" },
  { slug: "split-pdf", title: "Split PDF", description: "Split PDF — free browser-based tool in the PDF Tools collection.", categoryId: "pdf", status: "beta" },
  { slug: "pdf-text-extractor", title: "PDF Text Extractor", description: "PDF Text Extractor — free browser-based tool in the PDF Tools collection.", categoryId: "pdf", status: "beta" },
  { slug: "esign-document", title: "eSign Document", description: "eSign Document — free browser-based tool in the PDF Tools collection.", categoryId: "pdf", status: "comingSoon" },
  { slug: "protect-pdf", title: "Protect PDF", description: "Protect PDF — free browser-based tool in the PDF Tools collection.", categoryId: "pdf", status: "comingSoon" },
  { slug: "pdf-to-image", title: "PDF to Image", description: "PDF to Image — free browser-based tool in the PDF Tools collection.", categoryId: "pdf", status: "comingSoon" },
  { slug: "pdf-to-word", title: "PDF to Word", description: "PDF to Word — free browser-based tool in the PDF Tools collection.", categoryId: "pdf", status: "comingSoon" },
  { slug: "image-to-text", title: "Image to Text", description: "Image to Text — free browser-based tool in the Image Tools collection.", categoryId: "image", status: "beta" },
  { slug: "image-resizer", title: "Image Resizer", description: "Image Resizer — free browser-based tool in the Image Tools collection.", categoryId: "image", status: "beta" },
  { slug: "crop-image", title: "Crop Image", description: "Crop Image — free browser-based tool in the Image Tools collection.", categoryId: "image", status: "beta" },
  { slug: "image-compressor", title: "Image Compressor", description: "Image Compressor — free browser-based tool in the Image Tools collection.", categoryId: "image", status: "beta" },
  { slug: "image-converter", title: "Image Converter", description: "Image Converter — free browser-based tool in the Image Tools collection.", categoryId: "image", status: "beta" },
  { slug: "background-remover", title: "Background Remover", description: "Background Remover — free browser-based tool in the Image Tools collection.", categoryId: "image", status: "comingSoon" },
  { slug: "add-watermark", title: "Add Watermark", description: "Add Watermark — free browser-based tool in the Image Tools collection.", categoryId: "image", status: "beta" },
  { slug: "youtube-downloader", title: "YouTube Downloader", description: "YouTube Downloader — free browser-based tool in the Video Tools collection.", categoryId: "video", status: "comingSoon" },
  { slug: "video-trimmer", title: "Video Trimmer", description: "Video Trimmer — free browser-based tool in the Video Tools collection.", categoryId: "video", status: "comingSoon" },
  { slug: "compress-video", title: "Compress Video", description: "Compress Video — free browser-based tool in the Video Tools collection.", categoryId: "video", status: "comingSoon" },
  { slug: "video-thumbnail-grabber", title: "Video Thumbnail Grabber", description: "Video Thumbnail Grabber — free browser-based tool in the Video Tools collection.", categoryId: "video", status: "live" },
  { slug: "video-to-gif", title: "Video to GIF", description: "Video to GIF — free browser-based tool in the Video Tools collection.", categoryId: "video", status: "comingSoon" },
  { slug: "youtube-to-mp3", title: "YouTube to MP3", description: "YouTube to MP3 — free browser-based tool in the Audio Tools collection.", categoryId: "audio", status: "comingSoon" },
  { slug: "focus-music", title: "Focus Music", description: "Focus Music — free browser-based tool in the Audio Tools collection.", categoryId: "audio", status: "beta" },
  { slug: "url-shortener", title: "URL Shortener", description: "URL Shortener — free browser-based tool in the URL & Web collection.", categoryId: "url-web", status: "comingSoon" },
  { slug: "link-preview", title: "Link Preview", description: "Link Preview — free browser-based tool in the URL & Web collection.", categoryId: "url-web", status: "live" },
  { slug: "code-share", title: "Code Share", description: "Code Share — free browser-based tool in the URL & Web collection.", categoryId: "url-web", status: "beta" },
  { slug: "safe-link-checker", title: "Safe Link Checker", description: "Safe Link Checker — free browser-based tool in the URL & Web collection.", categoryId: "url-web", status: "comingSoon" },
  { slug: "utm-builder", title: "UTM Builder", description: "UTM Builder — free browser-based tool in the URL & Web collection.", categoryId: "url-web", status: "live" },
  { slug: "url-encoder", title: "URL Encoder", description: "URL Encoder — free browser-based tool in the URL & Web collection.", categoryId: "url-web", status: "live" },
  { slug: "redirect-checker", title: "Redirect Checker", description: "Redirect Checker — free browser-based tool in the URL & Web collection.", categoryId: "url-web", status: "live" },
  { slug: "qr-code-generator", title: "QR Code Generator", description: "QR Code Generator — free browser-based tool in the QR Codes collection.", categoryId: "qr", status: "live" },
  { slug: "qr-code-scanner", title: "QR Code Scanner", description: "QR Code Scanner — free browser-based tool in the QR Codes collection.", categoryId: "qr", status: "beta" },
  { slug: "social-bio-creator", title: "Social Bio Creator", description: "Social Bio Creator — free browser-based tool in the Social Media collection.", categoryId: "social", status: "live" },
  { slug: "link-in-bio", title: "Link In Bio", description: "Link In Bio — free browser-based tool in the Social Media collection.", categoryId: "social", status: "comingSoon" },
  { slug: "code-formatter", title: "Code Formatter", description: "Code Formatter — free browser-based tool in the Developer collection.", categoryId: "developer", status: "live" },
  { slug: "json-formatter", title: "JSON Formatter", description: "JSON Formatter — free browser-based tool in the Developer collection.", categoryId: "developer", status: "live" },
  { slug: "json-generator", title: "JSON Generator", description: "JSON Generator — free browser-based tool in the Developer collection.", categoryId: "developer", status: "live" },
  { slug: "base64", title: "Base64", description: "Base64 — free browser-based tool in the Developer collection.", categoryId: "developer", status: "live" },
  { slug: "uuid-generator", title: "UUID Generator", description: "UUID Generator — free browser-based tool in the Developer collection.", categoryId: "developer", status: "live" },
  { slug: "hash-generator", title: "Hash Generator", description: "Hash Generator — free browser-based tool in the Developer collection.", categoryId: "developer", status: "live" },
  { slug: "regex-tester", title: "Regex Tester", description: "Regex Tester — free browser-based tool in the Developer collection.", categoryId: "developer", status: "live" },
  { slug: "ai-caption-generator", title: "AI Caption Generator", description: "AI Caption Generator — free browser-based tool in the AI Tools collection.", categoryId: "ai", status: "live" },
  { slug: "hashtag-generator", title: "Hashtag Generator", description: "Hashtag Generator — free browser-based tool in the AI Tools collection.", categoryId: "ai", status: "live" },
  { slug: "countdown-timer", title: "Countdown Timer", description: "Countdown Timer — free browser-based tool in the Productivity collection.", categoryId: "productivity", status: "live" },
  { slug: "online-stopwatch", title: "Online Stopwatch", description: "Online Stopwatch — free browser-based tool in the Productivity collection.", categoryId: "productivity", status: "live" },
  { slug: "pomodoro-timer", title: "Pomodoro Timer", description: "Pomodoro Timer — free browser-based tool in the Productivity collection.", categoryId: "productivity", status: "live" },
  { slug: "checklist-maker", title: "Checklist Maker", description: "Checklist Maker — free browser-based tool in the Productivity collection.", categoryId: "productivity", status: "beta" },
  { slug: "study-planner", title: "Study Planner", description: "Study Planner — free browser-based tool in the Productivity collection.", categoryId: "productivity", status: "beta" },
  { slug: "habit-tracker", title: "Habit Tracker", description: "Habit Tracker — free browser-based tool in the Productivity collection.", categoryId: "productivity", status: "beta" },
  { slug: "quick-reminder", title: "Quick Reminder", description: "Quick Reminder — free browser-based tool in the Productivity collection.", categoryId: "productivity", status: "beta" },
  { slug: "smart-calculator", title: "Smart Calculator", description: "Smart Calculator — free browser-based tool in the Calculators collection.", categoryId: "calculators", status: "live" },
  { slug: "bmi-calculator", title: "BMI Calculator", description: "BMI Calculator — free browser-based tool in the Calculators collection.", categoryId: "calculators", status: "live" },
  { slug: "loan-calculator", title: "Loan Calculator", description: "Loan Calculator — free browser-based tool in the Calculators collection.", categoryId: "calculators", status: "live" },
  { slug: "date-difference", title: "Date Difference", description: "Date Difference — free browser-based tool in the Calculators collection.", categoryId: "calculators", status: "live" },
  { slug: "age-calculator", title: "Age Calculator", description: "Age Calculator — free browser-based tool in the Calculators collection.", categoryId: "calculators", status: "live" },
  { slug: "percentage-calculator", title: "Percentage Calculator", description: "Percentage Calculator — free browser-based tool in the Calculators collection.", categoryId: "calculators", status: "live" },
  { slug: "password-generator", title: "Password Generator", description: "Password Generator — free browser-based tool in the Security collection.", categoryId: "security", status: "live" },
  { slug: "fake-data-generator", title: "Fake Data Generator", description: "Fake Data Generator — free browser-based tool in the Security collection.", categoryId: "security", status: "live" },
  { slug: "email-verifier", title: "Email Verifier", description: "Email Verifier — free browser-based tool in the Security collection.", categoryId: "security", status: "comingSoon" },
  { slug: "jwt-decoder", title: "JWT Decoder", description: "JWT Decoder — free browser-based tool in the Security collection.", categoryId: "security", status: "live" },
  { slug: "jwt-generator", title: "JWT Generator", description: "JWT Generator — free browser-based tool in the Security collection.", categoryId: "security", status: "comingSoon" },
  { slug: "password-strength", title: "Password Strength", description: "Password Strength — free browser-based tool in the Security collection.", categoryId: "security", status: "live" },
  { slug: "hash-compare", title: "Hash Compare", description: "Hash Compare — free browser-based tool in the Security collection.", categoryId: "security", status: "live" },
  { slug: "color-picker", title: "Color Picker", description: "Color Picker — free browser-based tool in the Design collection.", categoryId: "design", status: "beta" },
  { slug: "color-palette-generator", title: "Color Palette Generator", description: "Color Palette Generator — free browser-based tool in the Design collection.", categoryId: "design", status: "beta" },
  { slug: "thumbnail-text-designer", title: "Thumbnail Text Designer", description: "Thumbnail Text Designer — free browser-based tool in the Design collection.", categoryId: "design", status: "beta" },
  { slug: "svg-to-png", title: "SVG to PNG", description: "SVG to PNG — free browser-based tool in the Design collection.", categoryId: "design", status: "beta" },
  { slug: "css-gradient-generator", title: "CSS Gradient Generator", description: "CSS Gradient Generator — free browser-based tool in the Design collection.", categoryId: "design", status: "live" },
  { slug: "favicon-generator", title: "Favicon Generator", description: "Favicon Generator — free browser-based tool in the Design collection.", categoryId: "design", status: "beta" },
  { slug: "svg-optimizer", title: "SVG Optimizer", description: "SVG Optimizer — free browser-based tool in the Design collection.", categoryId: "design", status: "beta" },
  { slug: "currency-converter", title: "Currency Converter", description: "Currency Converter — free browser-based tool in the Finance collection.", categoryId: "finance", status: "comingSoon" },
  { slug: "csv-to-json", title: "CSV to JSON", description: "CSV to JSON — free browser-based tool in the Data collection.", categoryId: "data", status: "live" },
  { slug: "json-to-yaml", title: "JSON to YAML", description: "JSON to YAML — free browser-based tool in the Data collection.", categoryId: "data", status: "beta" },
  { slug: "yaml-to-json", title: "YAML to JSON", description: "YAML to JSON — free browser-based tool in the Data collection.", categoryId: "data", status: "beta" },
  { slug: "xml-formatter", title: "XML Formatter", description: "XML Formatter — free browser-based tool in the Data collection.", categoryId: "data", status: "live" },
  { slug: "xml-to-json", title: "XML to JSON", description: "XML to JSON — free browser-based tool in the Data collection.", categoryId: "data", status: "beta" },
  { slug: "json-diff", title: "JSON Diff", description: "JSON Diff — free browser-based tool in the Data collection.", categoryId: "data", status: "live" },
  { slug: "csv-viewer", title: "CSV Viewer", description: "CSV Viewer — free browser-based tool in the Data collection.", categoryId: "data", status: "beta" },
  { slug: "file-compress", title: "File Compress", description: "File Compress — free browser-based tool in the Utility collection.", categoryId: "utility", status: "comingSoon" },
  { slug: "file-share", title: "File Share", description: "File Share — free browser-based tool in the Utility collection.", categoryId: "utility", status: "comingSoon" },
  { slug: "temperature-converter", title: "Temperature Converter", description: "Temperature Converter — free browser-based tool in the Utility collection.", categoryId: "utility", status: "live" },
  { slug: "unit-converter", title: "Unit Converter", description: "Unit Converter — free browser-based tool in the Utility collection.", categoryId: "utility", status: "live" },
  { slug: "timezone-converter", title: "Timezone Converter", description: "Timezone Converter — free browser-based tool in the Utility collection.", categoryId: "utility", status: "live" },
];

export function getCategoryById(id: ToolCategory): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(categoryId: ToolCategory): Tool[] {
  return tools.filter((t) => t.categoryId === categoryId);
}

export function getLiveTools(): Tool[] {
  return tools.filter((t) => t.status === "live" || t.status === "beta");
}

export function getToolCount(): number {
  return tools.length;
}
