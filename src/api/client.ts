import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8088";

const api = axios.create({
  baseURL: BASE_URL,
});

export interface Session {
  id: string;
  name: string;
  created_at: string;
  ended_at: string | null;
}

export interface ApiRequest {
  id: string;
  session_id: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
  status_code: number;
  response: string;
  latency_ms: number;
  timestamp: string;
}

export interface ReplayResult {
  request_id: string;
  method: string;
  url: string;
  status_code: number;
  latency_ms: number;
  response: string;
}

export const createSession = (name: string, target: string) =>
  api.post<Session>("/api/sessions", { name, target });

export const endSession = (id: string) => api.post(`/api/sessions/${id}/end`);

export const listSessions = () => api.get<Session[]>("/api/sessions");

export const getSessionRequests = (id: string) =>
  api.get<ApiRequest[]>(`/api/sessions/${id}/requests`);

export const replaySession = (id: string, speed: number = 1) =>
  api.post<ReplayResult[]>(`/api/sessions/${id}/replay?speed=${speed}`);

export const deleteSession = (id: string) => api.delete(`/api/sessions/${id}`);
