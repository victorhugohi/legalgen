const STORAGE_KEY = "legalgen_usage";
const ADMIN_KEY = "legalgen_admin";

// Admin emails that bypass all restrictions
const ADMIN_EMAILS = ["admin@legalgen.bo", "victor@legalgen.bo"];

// Admin secret code for unrestricted access
const ADMIN_CODE = "LEGALGEN-ADMIN-2026";

interface UsageData {
  email: string;
  weekStart: string; // ISO date of the week start (Monday)
  basicCount: number; // contracts without watermark
  watermarkCount: number; // contracts with watermark
}

function getWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split("T")[0];
}

function getUsageData(): UsageData | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveUsageData(data: UsageData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  const adminData = localStorage.getItem(ADMIN_KEY);
  if (!adminData) return false;
  try {
    const parsed = JSON.parse(adminData);
    return parsed.isAdmin === true;
  } catch {
    return false;
  }
}

export function activateAdmin(code: string): boolean {
  if (code === ADMIN_CODE) {
    localStorage.setItem(ADMIN_KEY, JSON.stringify({ isAdmin: true, activatedAt: new Date().toISOString() }));
    return true;
  }
  return false;
}

export function deactivateAdmin(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_KEY);
}

export function setUserEmail(email: string): void {
  const weekStart = getWeekStart();
  const existing = getUsageData();

  if (existing && existing.email === email && existing.weekStart === weekStart) {
    return; // same user, same week
  }

  // New user or new week — reset counters
  saveUsageData({
    email,
    weekStart,
    basicCount: existing?.email === email && existing?.weekStart === weekStart ? existing.basicCount : 0,
    watermarkCount: existing?.email === email && existing?.weekStart === weekStart ? existing.watermarkCount : 0,
  });
}

export function getUserEmail(): string | null {
  const data = getUsageData();
  return data?.email || null;
}

export interface UsageLimits {
  basicRemaining: number;
  watermarkRemaining: number;
  totalUsed: number;
  isAdmin: boolean;
  weekStart: string;
}

export function getUsageLimits(): UsageLimits {
  const admin = isAdmin();
  const weekStart = getWeekStart();
  const data = getUsageData();

  if (admin) {
    return {
      basicRemaining: 999,
      watermarkRemaining: 999,
      totalUsed: data?.basicCount ?? 0 + (data?.watermarkCount ?? 0),
      isAdmin: true,
      weekStart,
    };
  }

  if (!data || data.weekStart !== weekStart) {
    return {
      basicRemaining: 3,
      watermarkRemaining: 3,
      totalUsed: 0,
      isAdmin: false,
      weekStart,
    };
  }

  return {
    basicRemaining: Math.max(0, 3 - data.basicCount),
    watermarkRemaining: Math.max(0, 3 - data.watermarkCount),
    totalUsed: data.basicCount + data.watermarkCount,
    isAdmin: false,
    weekStart,
  };
}

export type DownloadType = "basic" | "watermark";

export function canDownload(type: DownloadType): boolean {
  if (isAdmin()) return true;
  const limits = getUsageLimits();
  return type === "basic" ? limits.basicRemaining > 0 : limits.watermarkRemaining > 0;
}

export function recordDownload(type: DownloadType): boolean {
  if (isAdmin()) return true;

  const weekStart = getWeekStart();
  const data = getUsageData();

  if (!data) return false;

  // Reset if new week
  if (data.weekStart !== weekStart) {
    data.weekStart = weekStart;
    data.basicCount = 0;
    data.watermarkCount = 0;
  }

  if (type === "basic") {
    if (data.basicCount >= 3) return false;
    data.basicCount++;
  } else {
    if (data.watermarkCount >= 3) return false;
    data.watermarkCount++;
  }

  saveUsageData(data);
  return true;
}
