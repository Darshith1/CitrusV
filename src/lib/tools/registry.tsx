"use client";

import type { ComponentType } from "react";
import { getToolBySlug } from "@/content/tools-manifest";
import { ComingSoonTool } from "@/components/tools/ComingSoonTool";
import {
  WordCounter,
  CaseConvert,
  LineBreakRemover,
  TextCompare,
  QuickNote,
} from "@/components/tools/apps/TextTools";
import {
  JsonFormatter,
  JsonDiff,
  Base64Tool,
  UuidGenerator,
  HashGenerator,
  RegexTester,
  JwtDecoder,
  CodeFormatter,
} from "@/components/tools/apps/DevTools";
import {
  PasswordGenerator,
  PasswordStrength,
  HashCompare,
  FakeDataGenerator,
} from "@/components/tools/apps/SecurityTools";
import {
  UtmBuilder,
  UrlEncoder,
  LinkPreview,
  RedirectChecker,
} from "@/components/tools/apps/UrlTools";
import {
  PercentageCalculator,
  BmiCalculator,
  AgeCalculator,
  DateDifference,
  SmartCalculator,
  LoanCalculator,
} from "@/components/tools/apps/CalcTools";
import {
  PomodoroTimer,
  Stopwatch,
  CountdownTimer,
} from "@/components/tools/apps/ProductivityTools";
import { CssGradientGenerator } from "@/components/tools/apps/DesignTools";
import { CsvToJson, XmlFormatter } from "@/components/tools/apps/DataTools";
import { QrCodeGenerator } from "@/components/tools/apps/QrTools";
import {
  TemperatureConverter,
  UnitConverter,
  TimezoneConverter,
} from "@/components/tools/apps/UtilityTools";
import {
  AiRephraser,
  AiCaptionGenerator,
  HashtagGenerator,
  SocialBioCreator,
} from "@/components/tools/apps/AiTools";

const toolRegistry: Record<string, ComponentType> = {
  "word-counter": WordCounter,
  "case-convert": CaseConvert,
  "line-break-remover": LineBreakRemover,
  "text-compare": TextCompare,
  quicknote: QuickNote,
  "ai-rephraser": AiRephraser,
  "json-formatter": JsonFormatter,
  "json-diff": JsonDiff,
  base64: Base64Tool,
  "uuid-generator": UuidGenerator,
  "hash-generator": HashGenerator,
  "regex-tester": RegexTester,
  "jwt-decoder": JwtDecoder,
  "code-formatter": CodeFormatter,
  "password-generator": PasswordGenerator,
  "password-strength": PasswordStrength,
  "hash-compare": HashCompare,
  "fake-data-generator": FakeDataGenerator,
  "utm-builder": UtmBuilder,
  "url-encoder": UrlEncoder,
  "link-preview": LinkPreview,
  "redirect-checker": RedirectChecker,
  "percentage-calculator": PercentageCalculator,
  "bmi-calculator": BmiCalculator,
  "age-calculator": AgeCalculator,
  "date-difference": DateDifference,
  "smart-calculator": SmartCalculator,
  "loan-calculator": LoanCalculator,
  "pomodoro-timer": PomodoroTimer,
  "online-stopwatch": Stopwatch,
  "countdown-timer": CountdownTimer,
  "css-gradient-generator": CssGradientGenerator,
  "csv-to-json": CsvToJson,
  "xml-formatter": XmlFormatter,
  "qr-code-generator": QrCodeGenerator,
  "temperature-converter": TemperatureConverter,
  "unit-converter": UnitConverter,
  "timezone-converter": TimezoneConverter,
  "ai-caption-generator": AiCaptionGenerator,
  "hashtag-generator": HashtagGenerator,
  "social-bio-creator": SocialBioCreator,
};

export type ToolRendererProps = {
  slug: string;
};

export function ToolRenderer({ slug }: ToolRendererProps) {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <ComingSoonTool
        tool={{
          slug,
          title: slug,
          description: "This tool is not in our catalog yet.",
          categoryId: "utility",
          status: "comingSoon",
        }}
      />
    );
  }

  if (tool.status === "comingSoon") {
    return <ComingSoonTool tool={tool} />;
  }

  const Component = toolRegistry[slug];
  if (!Component) {
    return <ComingSoonTool tool={tool} />;
  }

  return <Component />;
}

export function getRegisteredToolSlugs(): string[] {
  return Object.keys(toolRegistry);
}

export { toolRegistry };
