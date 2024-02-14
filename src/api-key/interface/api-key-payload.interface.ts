export interface GeneratedApiKeyPayload {
  // ⚠️ note ideally this should be its own file, putting it here just for brevity
  apiKey: string;
  hashedKey: string;
}
