'use client';
import {useEffect,useState} from 'react';

const apps=[['💬','聊天'],['👥','联系人'],['🧠','记忆'],['📔','日记'],['🗓️','日历'],['✨','动态'],['🎨','主题'],['⚙️','设置']];
export default function Home(){
 const [time,setTime]=useState('');
 useEffect(()=>{const f=()=>setTime(new Intl.DateTimeFormat('zh-CN',{hour:'2-digit',minute:'2-digit'}).format(new Date()));f();const t=setInterval(f,1000);return()=>clearInterval(t)},[]);
 return <main className="phone"><section className="screen"><div className="status"><span>{time}</span><span>▮▮▮ ᯤ ▰</span></div><div className="header glass"><div className="title">M叽</div><div className="sub">你的 AI 小手机 · iOS Web</div></div><div className="apps">{apps.map(([icon,name])=><button className="app" key={name} onClick={()=>alert(`${name} 模块正在移植中`)}><span className="icon">{icon}</span><span>{name}</span></button>)}</div><div className="hint">Safari 打开后可添加到主屏幕，体验接近原生 App</div><div className="dock glass"><button>☎︎</button><button>💬</button><button>🌐</button><button>⚙︎</button></div></section></main>
}
