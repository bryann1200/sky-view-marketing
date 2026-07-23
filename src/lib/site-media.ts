// Client for the Vantage Aerial media backend (Supabase).
// Public reads are open; writes only happen through the admin-media edge
// function, which checks a password server-side before touching anything.

const SUPABASE_URL = "https://zxbnfaggikmpizkdnlqp.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4Ym5mYWdnaWttcGl6a2RubHFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2OTMzMTUsImV4cCI6MjEwMDI2OTMxNX0.FxCW8XWmfqTQNp7VsS9QupVaktp-peNT6NY3cxFhmmE";

export type SiteMediaItem = {
  slot: string;
  url: string;
  kind: "image" | "video";
  title: string | null;
  location: string | null;
  updated_at: string;
};

export type SiteTextItem = {
  slot: string;
  value: string;
};

/** Public, read-only fetch of all current media overrides. */
export async function fetchSiteMedia(): Promise<Record<string, SiteMediaItem>> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/site_media?select=*`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    );
    if (!res.ok) return {};
    const rows: SiteMediaItem[] = await res.json();
    const bySlot: Record<string, SiteMediaItem> = {};
    for (const row of rows) bySlot[row.slot] = row;
    return bySlot;
  } catch {
    return {};
  }
}

/** Public, read-only fetch of all current text overrides. */
export async function fetchSiteText(): Promise<Record<string, string>> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/site_text?select=*`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    );
    if (!res.ok) return {};
    const rows: SiteTextItem[] = await res.json();
    const bySlot: Record<string, string> = {};
    for (const row of rows) bySlot[row.slot] = row.value;
    return bySlot;
  } catch {
    return {};
  }
}

const EDGE_FN_URL = `${SUPABASE_URL}/functions/v1/admin-media`;

async function callAdmin(body: Record<string, unknown>) {
  const res = await fetch(EDGE_FN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Request failed");
  return json;
}

export function adminList(password: string) {
  return callAdmin({ password, action: "list" }) as Promise<{ items: SiteMediaItem[] }>;
}

export function adminListText(password: string) {
  return callAdmin({ password, action: "listText" }) as Promise<{ items: SiteTextItem[] }>;
}

export function adminSetText(password: string, slot: string, value: string) {
  return callAdmin({ password, action: "setText", slot, value }) as Promise<{ ok: true }>;
}

export function adminUpload(params: {
  password: string;
  slot: string;
  file: File;
  kind: "image" | "video";
  title?: string;
  location?: string;
}) {
  return new Promise<{ ok: true; url: string }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.onload = async () => {
      try {
        const dataUrl = reader.result as string;
        const fileBase64 = dataUrl.split(",")[1];
        const result = await callAdmin({
          password: params.password,
          action: "upload",
          slot: params.slot,
          fileBase64,
          contentType: params.file.type,
          kind: params.kind,
          title: params.title,
          location: params.location,
        });
        resolve(result);
      } catch (e) {
        reject(e);
      }
    };
    reader.readAsDataURL(params.file);
  });
}

export function adminDelete(password: string, slot: string) {
  return callAdmin({ password, action: "delete", slot }) as Promise<{ ok: true }>;
}
