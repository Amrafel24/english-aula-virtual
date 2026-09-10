(function(root){
  'use strict';
  root.createAulaVideo=function({api,icon,esc,onError,onEnded}){
    let active=false,joining=false,stream=null,conference=null,peerId=null,container=null,lobby=null,timer=null,generation=0,after=0,ice=[],failures=0,renewIceAt=0;
    const connections=new Map();
    function stopTracks(){stream?.getTracks().forEach(t=>t.stop());stream=null;}
    async function leave(){
      generation++;joining=false;active=false;clearTimeout(timer);stopTracks();
      for(const state of connections.values())state.pc.close();connections.clear();
      const oldConference=conference,oldPeer=peerId;conference=null;peerId=null;
      if(container){container.removeEventListener('click',controls);container.innerHTML='';container.hidden=true;}
      if(lobby)lobby.hidden=false;
      if(oldConference&&oldPeer)try{await api(`conferences/${oldConference}/leave`,'POST',{peerId:oldPeer});}catch{}
    }
    function tile(id,name,local=false){
      const element=document.createElement('div');element.className='aula-video-tile';element.dataset.peer=id;
      element.innerHTML=`<video autoplay playsinline ${local?'muted':''} aria-label="Video de ${esc(name)}"></video><div class="aula-video-label"><strong>${esc(name)}${local?' (tú)':''}</strong><span>${local?'Conectado':'Conectando…'}</span></div>`;
      container.querySelector('.aula-video-grid').append(element);return element;
    }
    function send(state,body){
      const c=conference,local=peerId,version=generation;
      state.outbox=state.outbox.then(async()=>{if(active&&version===generation)await api(`conferences/${c}/signals`,'POST',{sender:local,receiver:state.id,body});}).catch(e=>{if(active&&e.status!==404)onError(e.message);});
      return state.outbox;
    }
    function connect(peer){
      if(connections.has(peer.id))return connections.get(peer.id);
      const pc=new RTCPeerConnection({iceServers:ice});const element=tile(peer.id,peer.name);
      const state={id:peer.id,pc,element,polite:peerId>peer.id,makingOffer:false,ignoreOffer:false,settingAnswer:false,candidates:[],outbox:Promise.resolve()};
      connections.set(peer.id,state);
      for(const track of stream.getTracks())pc.addTrack(track,stream);
      pc.ontrack=event=>{const video=element.querySelector('video');video.srcObject=event.streams[0]||new MediaStream([event.track]);video.play().catch(()=>{element.querySelector('.aula-video-label span').textContent='Toca «Reproducir audio»';});};
      pc.onicecandidate=({candidate})=>{if(candidate)send(state,{type:'candidate',candidate:candidate.toJSON()});};
      pc.onnegotiationneeded=async()=>{
        try{state.makingOffer=true;await pc.setLocalDescription();await send(state,{type:'description',description:pc.localDescription.toJSON()});}
        catch(e){if(active&&pc.signalingState!=='closed')onError('No se pudo negociar la conexión. Sal de la sala y vuelve a entrar.');}
        finally{state.makingOffer=false;}
      };
      pc.onconnectionstatechange=()=>{
        const label=element.querySelector('.aula-video-label span');
        const labels={new:'Conectando…',connecting:'Conectando…',connected:'En directo',disconnected:'Reconectando…',failed:'No se pudo conectar',closed:'Salió de la sala'};
        label.textContent=labels[pc.connectionState]||'Conectando…';
        if(pc.connectionState==='failed')onError(`No se pudo conectar con ${peer.name}. Revisa la conexión o avisa al profesor.`);
      };
      return state;
    }
    async function signal(state,body){
      const pc=state.pc;
      if(body.type==='description'){
        const description=body.description;
        if(!description||!['offer','answer'].includes(description.type)||typeof description.sdp!=='string')return;
        const ready=!state.makingOffer&&(pc.signalingState==='stable'||state.settingAnswer);
        const collision=description.type==='offer'&&!ready;
        state.ignoreOffer=!state.polite&&collision;if(state.ignoreOffer)return;
        state.settingAnswer=description.type==='answer';
        try{await pc.setRemoteDescription(description);}finally{state.settingAnswer=false;}
        for(const candidate of state.candidates.splice(0))await pc.addIceCandidate(candidate);
        if(description.type==='offer'){await pc.setLocalDescription();await send(state,{type:'description',description:pc.localDescription.toJSON()});}
      }else if(body.type==='candidate'&&body.candidate){
        if(state.ignoreOffer)return;
        if(!pc.remoteDescription)state.candidates.push(body.candidate);else await pc.addIceCandidate(body.candidate);
      }
    }
    async function poll(version){
      if(!active||version!==generation)return;
      try{
        const response=await api(`conferences/${conference}/poll?peer=${peerId}&after=${after}`);
        if(!active||version!==generation)return;failures=0;
        if(Date.now()>=renewIceAt){
          const renewed=await api(`conferences/${conference}/ice?peer=${peerId}`);
          if(!active||version!==generation)return;
          ice=renewed.iceServers;renewIceAt=Date.now()+30*60*1000;
          for(const state of connections.values()){state.pc.setConfiguration({iceServers:ice});state.pc.restartIce();}
        }
        const peerIds=new Set(response.peers.map(p=>p.id));
        for(const [id,state]of connections){if(!peerIds.has(id)){state.pc.close();state.element.remove();connections.delete(id);}}
        for(const peer of response.peers)if(peer.id!==peerId)connect(peer);
        for(const entry of response.signals){
          const state=connections.get(entry.sender);
          if(state)try{await signal(state,entry.body);}catch(e){if(!state.ignoreOffer&&active)onError('Se interrumpió una conexión de video. Si no se recupera, vuelve a entrar a la sala.');}
          after=Math.max(after,entry.id);
        }
        const count=container.querySelector('#aula-call-count');if(count)count.textContent=`${response.peers.length} / 6 participantes`;
      }catch(e){
        if(!active||version!==generation)return;
        if([401,403,404,409].includes(e.status)){await leave();onError(e.message);await onEnded();return;}
        failures++;if(failures>=10){await leave();onError('Se perdió la conexión con el aula. Vuelve a entrar cuando recuperes la conexión.');await onEnded();return;}
        onError('La conexión se ha interrumpido. Intentando reconectar…');
      }
      if(active&&version===generation)timer=setTimeout(()=>poll(version),1200);
    }
    async function controls(event){
      const button=event.target.closest('[data-call-action]');if(!button)return;
      if(button.dataset.callAction==='leave'){await leave();return;}
      if(button.dataset.callAction==='play'){container.querySelectorAll('video').forEach(v=>v.play().catch(()=>{}));return;}
      const kind=button.dataset.callAction;const tracks=kind==='mic'?stream?.getAudioTracks():stream?.getVideoTracks();
      if(!tracks?.length)return;const enabled=!tracks[0].enabled;tracks.forEach(t=>t.enabled=enabled);
      button.setAttribute('aria-pressed',String(enabled));button.innerHTML=icon(kind==='mic'?'mic':'video')+' '+(kind==='mic'?(enabled?'Silenciar':'Activar micrófono'):(enabled?'Apagar cámara':'Encender cámara'));
    }
    async function join(id,target,waiting,user){
      if(joining||active)return;
      if(!window.isSecureContext||!navigator.mediaDevices?.getUserMedia)throw new Error('Abre English por HTTPS o en localhost para usar la cámara y el micrófono.');
      if(!('RTCPeerConnection' in window))throw new Error('Tu navegador no admite videoconferencias. Actualiza el navegador.');
      joining=true;const version=++generation;container=target;lobby=waiting;container.hidden=false;
      container.innerHTML='<p class="aula-call-status" role="status">Permite el uso de tu cámara y micrófono para entrar…</p>';
      let acquired;
      try{
        acquired=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:360}},audio:{echoCancellation:true,noiseSuppression:true}});
        if(version!==generation){acquired.getTracks().forEach(t=>t.stop());return;}
        stream=acquired;conference=id;peerId=crypto.randomUUID();after=0;failures=0;
        const joiningConference=conference,joiningPeer=peerId;
        const joined=await api(`conferences/${joiningConference}/join`,'POST',{peerId:joiningPeer});
        if(version!==generation){acquired.getTracks().forEach(t=>t.stop());try{await api(`conferences/${joiningConference}/leave`,'POST',{peerId:joiningPeer});}catch{}return;}
        ice=joined.iceServers;renewIceAt=Date.now()+30*60*1000;active=true;joining=false;lobby.hidden=true;
        container.innerHTML=`<div class="aula-call-header"><span><i class="aula-live-dot"></i> En directo</span><span id="aula-call-count">Entrando…</span></div><div class="aula-video-grid"></div><div class="aula-call-controls"><button type="button" class="aula-btn" data-call-action="mic" aria-pressed="true">${icon('mic')} Silenciar</button><button type="button" class="aula-btn" data-call-action="camera" aria-pressed="true">${icon('video')} Apagar cámara</button><button type="button" class="aula-btn" data-call-action="play">${icon('volume-2')} Reproducir audio</button><button type="button" class="aula-btn aula-danger" data-call-action="leave">Salir de la sala</button></div>${ice.length?'':'<p class="aula-call-status">Por ahora, esta sala está preparada para participantes en la misma red. El administrador debe habilitar la conexión entre redes.</p>'}`;
        container.addEventListener('click',controls);const local=tile(peerId,user.name,true).querySelector('video');local.muted=true;local.srcObject=stream;
        await poll(version);
      }catch(e){acquired?.getTracks().forEach(t=>t.stop());await leave();if(e.name==='NotAllowedError')throw new Error('Permite la cámara y el micrófono en tu navegador para entrar.');if(e.name==='NotFoundError')throw new Error('No se encontró una cámara o un micrófono. Conéctalos y vuelve a intentarlo.');throw e;}
    }
    window.addEventListener('pagehide',()=>{stopTracks();leave();});
    return {join,leave,get active(){return active||joining;}};
  };
})(globalThis);
