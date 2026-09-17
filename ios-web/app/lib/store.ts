export type Role = 'user' | 'assistant' | 'system';
export type Message = { id: string; role: 'user' | 'assistant'; content: string; time: number; image?: string };
export type Character = { id: string; name: string; avatar: string; system: string; status: string; createdAt: number };
export type Diary = { id: string; title: string; content: string; date: string; mood: string };
export type Moment = { id: string; content: string; date: string; likes: number };
export type EventItem = { id: string; title: string; date: string; time: string; note: string };

const KEY = 'mji-ios-v1';
type State = { settings: { baseUrl: string; apiKey: string; model: string; temperature: number; maxTokens: number }; characters: Character[]; messages: Record<string, Message[]>; memories: Record<string, string[]>; diaries: Diary[]; moments: Moment[]; events: EventItem[]; theme: 'light'|'dark'|'system' };
const defaults: State = { settings:{baseUrl:'',apiKey:'',model:'',temperature:.8,maxTokens:2000},characters:[],messages:{},memories:{},diaries:[],moments:[],events:[],theme:'system'};

export function loadState(): State { if (typeof window === 'undefined') return defaults; try { return {...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}; } catch { return defaults; } }
export function saveState(s: State) { if (typeof window !== 'undefined') localStorage.setItem(KEY, JSON.stringify(s)); }
export function uid(){ return `${Date.now()}-${Math.random().toString(36).slice(2,8)}`; }
export function ensureCharacter(s: State): State { if (s.characters.length) return s; const c: Character={id:uid(),name:'M叽',avatar:'🌙',system:'你是一个自然、细腻、有长期记忆的 AI 角色。保持连贯的人格，不要自称模型或程序。用自然的中文聊天，避免机械、模板化回答。',status:'在线',createdAt:Date.now()}; return {...s,characters:[c],messages:{[c.id]:[]},memories:{[c.id]:[]}}; }
export type { State };
