import React, { useState, useRef, useEffect } from 'react';
import { UNITS_DATA, Unit, Track } from './data/units';
import { usePWA } from './hooks/usePWA';
import {
  ChevronLeft,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export default function App() {
  const {
    showAndroidBanner,
    showIOSBanner,
    triggerInstall,
    dismissAndroidBanner,
    dismissIOSBanner,
  } = usePWA();

  // Navigation state: 'units' (View 1), 'tracks' (View 2), 'player' (View 3)
  const [currentView, setCurrentView] = useState<'units' | 'tracks' | 'player'>('units');
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [activeTrack, setActiveTrack] = useState<Track | null>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [mediaError, setMediaError] = useState<string | null>(null);

  // Media element references
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const screenScrollRef = useRef<HTMLDivElement | null>(null);

  // Get currently active HTML media element
  const getActiveMedia = (): HTMLMediaElement | null => {
    if (!activeTrack) return null;
    return activeTrack.type === 'video' ? videoRef.current : audioRef.current;
  };

  // Synchronize playback speed
  useEffect(() => {
    const media = getActiveMedia();
    if (media) {
      media.playbackRate = playbackRate;
    }
  }, [playbackRate, activeTrack]);

  // Handle Home Button: resets media and returns to Unit list
  const handleHome = () => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentView('units');
    if (screenScrollRef.current) {
      screenScrollRef.current.scrollTop = 0;
    }
  };

  // Open unit tracks
  const handleSelectUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setCurrentView('tracks');
    if (screenScrollRef.current) {
      screenScrollRef.current.scrollTop = 0;
    }
  };

  // Select and play a track
  const handleSelectTrack = (track: Track) => {
    setMediaError(null);
    const prevMedia = getActiveMedia();
    if (prevMedia) {
      prevMedia.pause();
    }

    setActiveTrack(track);
    setCurrentTime(0);
    setDuration(0);
    setCurrentView('player');
    setIsPlaying(true);

    setTimeout(() => {
      const media = track.type === 'video' ? videoRef.current : audioRef.current;
      if (media) {
        media.playbackRate = playbackRate;
        media.currentTime = 0;
        media.play().catch((err) => {
          console.warn('Playback request error:', err);
          setIsPlaying(false);
        });
      }
    }, 50);
  };

  // Central D-Pad Play/Pause toggle
  const togglePlay = () => {
    if (!activeTrack) {
      // If no track is loaded, load the first track of selected or Unit 1
      const defaultUnit = selectedUnit || UNITS_DATA[0];
      const defaultTrack = defaultUnit.lessons[0].tracks[0];
      handleSelectTrack(defaultTrack);
      return;
    }

    const media = getActiveMedia();
    if (!media) return;

    if (isPlaying) {
      media.pause();
      setIsPlaying(false);
    } else {
      media.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Playback play error:', err);
      });
    }
  };

  // Skip forward/back
  const handleSkip = (seconds: number) => {
    const media = getActiveMedia();
    if (!media) return;
    const newTime = Math.max(0, Math.min(media.duration || 0, media.currentTime + seconds));
    media.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Scrubbing progress
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    const media = getActiveMedia();
    if (media) {
      media.currentTime = seekTime;
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    const media = getActiveMedia();
    if (media) {
      media.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Format MM:SS
  const formatTime = (time: number): string => {
    if (isNaN(time) || time < 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Setup media listener callbacks
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLMediaElement>) => {
    const target = e.currentTarget;
    setCurrentTime(target.currentTime);
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLMediaElement>) => {
    const target = e.currentTarget;
    setDuration(target.duration);
    target.playbackRate = playbackRate;
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleMediaError = () => {
    setMediaError('Não foi possível carregar a mídia. Verifique a conexão.');
    setIsPlaying(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex justify-center items-center bg-[#0f172a]">
      {/* Background Cover Image with Glass Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://i.postimg.cc/hG6LXfjC/xp1-incon-app.png')` }}
      />
      <div className="glass-overlay" />

      {/* ANDROID PWA INSTALL BANNER */}
      {showAndroidBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[410px] bg-[#174887]/95 backdrop-blur-md border-2 border-[#f47851] rounded-2xl p-3 flex items-center justify-between shadow-2xl z-50 text-white animate-bounce-in">
          <div className="flex items-center gap-3">
            <img
              src="https://i.postimg.cc/hG6LXfjC/xp1-incon-app.png?v=3"
              alt="operapod icon"
              className="w-11 h-11 rounded-xl shadow-md border border-white/20 object-cover"
            />
            <div className="flex flex-col text-left">
              <strong className="text-sm font-extrabold flex items-center gap-1.5">
                Instalar operapod
                <Sparkles className="w-3.5 h-3.5 text-[#ffcd07]" />
              </strong>
              <span className="text-xs text-slate-200 font-medium">O seu player XP1 offline!</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={triggerInstall}
              className="bg-[#f47851] hover:bg-[#e0653d] active:scale-95 text-white font-black text-xs px-3.5 py-2 rounded-lg uppercase tracking-wider transition shadow-md cursor-pointer"
            >
              Instalar
            </button>
            <button
              onClick={dismissAndroidBanner}
              className="text-white/80 hover:text-white text-base font-bold p-1 cursor-pointer transition"
              aria-label="Fechar banner"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* IOS PWA INSTALL BANNER */}
      {showIOSBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[410px] bg-[#174887]/95 backdrop-blur-md border-2 border-[#ffcd07] rounded-2xl p-3 flex items-center justify-between shadow-2xl z-50 text-white">
          <div className="flex items-center gap-3">
            <img
              src="https://i.postimg.cc/hG6LXfjC/xp1-incon-app.png?v=3"
              alt="operapod icon"
              className="w-11 h-11 rounded-xl shadow-md border border-white/20 object-cover"
            />
            <div className="flex flex-col text-left">
              <strong className="text-sm font-extrabold">Instalar no iOS</strong>
              <span className="text-[11px] text-slate-200 leading-tight">
                Toque em <span className="bg-white/20 px-1.5 py-0.5 rounded font-bold text-[#ffcd07]">Compartilhar ⎋</span> e selecione <strong>Adicionar à Tela de Início</strong>.
              </span>
            </div>
          </div>
          <button
            onClick={dismissIOSBanner}
            className="text-white/80 hover:text-white text-base font-bold p-1 cursor-pointer transition ml-2"
            aria-label="Fechar banner"
          >
            ✕
          </button>
        </div>
      )}

      {/* ==============================================================
          MP3 PLAYER CASING (operapod Hardware Simulator)
         ============================================================== */}
      <main
        className="relative z-10 w-full max-w-[420px] h-[96vh] max-h-[850px] min-h-[580px] rounded-[38px] flex flex-col items-center justify-between p-4 sm:p-5 box-border select-none"
        style={{
          background: 'linear-gradient(155deg, #1f5cae 0%, #174887 45%, #0e2d56 100%)',
          boxShadow:
            'inset 0 2px 4px rgba(255,255,255,0.35), inset 0 -3px 6px rgba(0,0,0,0.5), 0 25px 60px rgba(0,0,0,0.7), 0 0 0 2px #0a1f3d',
        }}
      >
        {/* BRANDING TOP: Opera Logo + 'operapod' */}
        <header className="flex items-center justify-center gap-3 w-full pt-1 pb-3">
          <img
            src="https://i.postimg.cc/MGGygYGg/logo-opera-png.png"
            alt="Logo Opera"
            className="h-9 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          />
          <h1 className="text-white font-black text-2xl tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] m-0">
            operapod
          </h1>
        </header>

        {/* ==============================================================
            DEVICE SCREEN CONTAINER
           ============================================================== */}
        <section
          className="w-full flex-1 min-h-[360px] max-h-[470px] bg-[#0c1424] rounded-2xl p-2.5 shadow-[inset_0_0_20px_rgba(0,0,0,0.9),0_4px_12px_rgba(0,0,0,0.4)] border-2 border-[#091a33] flex flex-col overflow-hidden"
          aria-label="Tela do operapod"
        >
          {/* Internal LCD Display (White Background, Dark Text) */}
          <div
            ref={screenScrollRef}
            className="w-full h-full bg-[#FFFFFF] text-[#1A1A1A] rounded-lg overflow-y-auto overflow-x-hidden device-scrollbar relative flex flex-col"
          >
            {/* -----------------------------------------------------------
                VIEW 1: HOME (Unit List 1 to 7)
               ----------------------------------------------------------- */}
            {currentView === 'units' && (
              <div className="p-3.5 flex flex-col items-center screen-fade flex-1">
                <div className="w-full bg-[#ffcd07] text-[#1A1A1A] font-black text-sm uppercase py-2 px-4 rounded-xl mb-3.5 tracking-wider shadow-sm flex items-center justify-center gap-1.5">
                  <span>Músicas XP1</span>
                </div>

                <div className="w-full flex flex-col rounded-xl overflow-hidden border-2 border-[#e2e8f0] bg-white shadow-sm">
                  {UNITS_DATA.map((unit, idx) => (
                    <button
                      key={unit.id}
                      onClick={() => handleSelectUnit(unit)}
                      className={`w-full py-3.5 px-4 bg-white hover:bg-slate-50 active:bg-[#f47851] active:text-white transition-colors duration-150 flex items-center justify-between text-left font-extrabold text-[13.5px] text-[#174887] cursor-pointer outline-none ${
                        idx !== UNITS_DATA.length - 1 ? 'border-b border-[#e2e8f0]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#174887]/10 flex items-center justify-center text-xs font-black text-[#174887]">
                          {unit.number}
                        </span>
                        <span>{unit.title}</span>
                      </div>
                      <span className="text-sm font-black opacity-60">➔</span>
                    </button>
                  ))}
                </div>

                <div className="mt-auto pt-3 text-[11px] font-bold text-slate-400">
                  XP1 • Opera Idiomas
                </div>
              </div>
            )}

            {/* -----------------------------------------------------------
                VIEW 2: TRACKS (List of Lessons and Tracks for Chosen Unit)
               ----------------------------------------------------------- */}
            {currentView === 'tracks' && selectedUnit && (
              <div className="p-3.5 flex flex-col items-center screen-fade flex-1">
                {/* Header with Back Button and Unit Title */}
                <div className="w-full bg-[#ffcd07] text-[#1A1A1A] font-black text-sm uppercase py-1.5 px-3 rounded-xl mb-3 tracking-wider shadow-sm flex items-center justify-between">
                  <button
                    onClick={() => setCurrentView('units')}
                    className="flex items-center gap-1 text-xs font-black text-[#174887] hover:text-black cursor-pointer active:scale-95 transition"
                    title="Voltar para Unidades"
                  >
                    <ChevronLeft className="w-4 h-4 stroke-[3]" />
                    <span>UNIDADES</span>
                  </button>
                  <span>{selectedUnit.title}</span>
                  <div className="w-12" /> {/* Balancing spacer */}
                </div>

                {/* Track Listing Grouped by Lesson */}
                <div className="w-full flex flex-col rounded-xl overflow-hidden border-2 border-[#e2e8f0] bg-white shadow-sm mb-2">
                  {selectedUnit.lessons.map((lesson) => (
                    <div key={lesson.name} className="flex flex-col">
                      {/* Lesson Header */}
                      <div className="bg-[#e2e8f0] py-1.5 px-3.5 text-left text-[11px] font-black text-[#1A1A1A] tracking-wider uppercase flex items-center justify-between border-t first:border-t-0 border-[#cbd5e1]">
                        <span>{lesson.name}</span>
                        <span className="text-[10px] text-slate-500 font-bold">
                          {lesson.tracks.length} {lesson.tracks.length === 1 ? 'faixa' : 'faixas'}
                        </span>
                      </div>

                      {/* Lesson Tracks */}
                      {lesson.tracks.map((track, trackIdx) => {
                        const isCurrentTrack = activeTrack?.id === track.id;
                        return (
                          <button
                            key={track.id}
                            onClick={() => handleSelectTrack(track)}
                            className={`w-full py-3 px-3.5 bg-white hover:bg-slate-50 active:bg-[#f47851] active:text-white transition-colors duration-150 flex items-center text-left text-[12.5px] cursor-pointer outline-none border-b last:border-b-0 border-[#f1f5f9] ${
                              isCurrentTrack ? 'bg-orange-50/80 font-black text-[#f47851]' : 'font-bold text-[#174887]'
                            }`}
                          >
                            {/* Visual Badge (Extracted page number or VÍDEO) */}
                            <span
                              className={`text-[9.5px] font-black uppercase px-2 py-0.5 rounded-md mr-2.5 flex-shrink-0 tracking-wide ${
                                track.type === 'video'
                                  ? 'bg-[#f47851] text-white shadow-xs'
                                  : 'bg-[#1A1A1A] text-[#ffcd07]'
                              }`}
                            >
                              {track.badge}
                            </span>

                            {/* Track Name */}
                            <span className="truncate flex-1">{track.title}</span>

                            {/* Playing Indicator or Arrow */}
                            {isCurrentTrack && isPlaying ? (
                              <span className="ml-2 flex items-center gap-0.5">
                                <span className="w-1 h-3 bg-[#f47851] animate-pulse rounded-full" />
                                <span className="w-1 h-4 bg-[#f47851] animate-pulse delay-75 rounded-full" />
                                <span className="w-1 h-2 bg-[#f47851] animate-pulse delay-150 rounded-full" />
                              </span>
                            ) : (
                              <span className="ml-2 text-xs opacity-50">➔</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Quick button to current player if active track exists */}
                {activeTrack && (
                  <button
                    onClick={() => setCurrentView('player')}
                    className="w-full mt-2 py-2 px-3 rounded-lg bg-[#174887]/10 hover:bg-[#174887]/15 text-[#174887] text-xs font-black flex items-center justify-center gap-1.5 transition active:scale-98 cursor-pointer"
                  >
                    <span>Ir para reprodutor ({activeTrack.title})</span>
                    <span>➔</span>
                  </button>
                )}
              </div>
            )}

            {/* -----------------------------------------------------------
                VIEW 3: PLAYER (Now Playing - Audio/Video Hybrid)
               ----------------------------------------------------------- */}
            {currentView === 'player' && (
              <div className="p-3 flex flex-col items-center justify-between flex-1 screen-fade">
                {/* Top Bar with Navigation back to Track List */}
                <div className="w-full flex items-center justify-between mb-2">
                  <button
                    onClick={() => {
                      if (selectedUnit) {
                        setCurrentView('tracks');
                      } else {
                        setCurrentView('units');
                      }
                    }}
                    className="flex items-center gap-0.5 text-[11px] font-black text-[#174887] hover:text-black py-1 px-2 rounded-md hover:bg-slate-100 cursor-pointer active:scale-95 transition"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 stroke-[3]" />
                    <span>FAIXAS</span>
                  </button>

                  <span className="bg-[#bf7060] text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-xs">
                    {activeTrack ? (activeTrack.type === 'video' ? 'VÍDEO XP1' : 'ÁUDIO XP1') : 'A TOCAR'}
                  </span>

                  <button
                    onClick={toggleMute}
                    className="p-1 text-[#174887] hover:text-black rounded-md hover:bg-slate-100 cursor-pointer transition"
                    title={isMuted ? 'Desmutar' : 'Mutar'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Media Center Stage: CD Icon (Spinning) or HTML5 Video */}
                <div className="w-full flex flex-col items-center justify-center my-auto min-h-[140px]">
                  {activeTrack?.type === 'video' ? (
                    <div className="w-full relative rounded-xl overflow-hidden shadow-lg bg-black flex items-center justify-center">
                      <video
                        ref={videoRef}
                        src={activeTrack.url}
                        className="w-full max-h-[165px] object-cover bg-black"
                        playsInline
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={handleEnded}
                        onError={handleMediaError}
                        onClick={togglePlay}
                      />
                    </div>
                  ) : (
                    <div className="relative flex flex-col items-center justify-center py-1">
                      {/* Spinning CD Image */}
                      <img
                        src="https://i.postimg.cc/0N449YJH/Icone-do-cd.png"
                        alt="Disco de áudio"
                        className={`w-28 h-28 sm:w-32 sm:h-32 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)] transition-transform duration-300 ${
                          isPlaying ? 'playing-spin' : 'paused-spin'
                        }`}
                        onClick={togglePlay}
                      />
                      {/* Sub-label under CD */}
                      <div className="mt-1 text-[10px] font-bold text-slate-400">
                        {isPlaying ? 'Reproduzindo...' : 'Pausado'}
                      </div>
                    </div>
                  )}

                  {/* Media Error Message */}
                  {mediaError && (
                    <div className="mt-2 text-xs font-bold text-red-600 bg-red-50 p-1.5 rounded-md border border-red-200">
                      {mediaError}
                    </div>
                  )}

                  {/* Title & Badge */}
                  <div className="mt-2 text-center w-full px-2">
                    <div className="flex items-center justify-center gap-1.5 mb-1">
                      {activeTrack && (
                        <span
                          className={`text-[9.5px] font-black uppercase px-2 py-0.5 rounded-md ${
                            activeTrack.type === 'video'
                              ? 'bg-[#f47851] text-white'
                              : 'bg-[#1A1A1A] text-[#ffcd07]'
                          }`}
                        >
                          {activeTrack.badge}
                        </span>
                      )}
                      <span className="text-[11px] font-extrabold text-[#bf7060]">
                        {activeTrack?.lesson}
                      </span>
                    </div>

                    <h2 className="text-[#1A1A1A] font-black text-sm sm:text-base leading-snug line-clamp-2">
                      {activeTrack ? activeTrack.title : 'Selecione uma faixa'}
                    </h2>
                  </div>
                </div>

                {/* Progress Bar & Time Stamps */}
                <div className="w-full flex flex-col gap-1 mt-1 mb-2">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer outline-none"
                    aria-label="Progresso da mídia"
                  />
                  <div className="flex justify-between items-center text-[11px] font-bold text-[#bf7060] font-mono px-0.5">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* On-Screen Controls: Skip 10s Backward / Forward */}
                <div className="flex items-center justify-center gap-3 w-full mb-2">
                  <button
                    onClick={() => handleSkip(-10)}
                    className="bg-[#e2e8f0] hover:bg-[#cbd5e1] active:bg-[#f47851] active:text-white text-[#174887] font-black text-[11px] py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer transition active:scale-95 shadow-2xs"
                    title="Retroceder 10 segundos"
                  >
                    <RotateCcw className="w-3 h-3 stroke-[2.5]" />
                    <span>-10s</span>
                  </button>

                  <button
                    onClick={() => handleSkip(10)}
                    className="bg-[#e2e8f0] hover:bg-[#cbd5e1] active:bg-[#f47851] active:text-white text-[#174887] font-black text-[11px] py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer transition active:scale-95 shadow-2xs"
                    title="Avançar 10 segundos"
                  >
                    <span>+10s</span>
                    <RotateCcw className="w-3 h-3 stroke-[2.5] scale-x-[-1]" />
                  </button>
                </div>

                {/* Speed Controls (0.5x, 0.75x, 1x, 1.25x) */}
                <div className="flex items-center justify-center gap-1 bg-[#f1f5f9] p-1 rounded-xl">
                  {[0.5, 0.75, 1, 1.25].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackRate(speed)}
                      className={`text-[10px] font-black px-2.5 py-1 rounded-lg transition cursor-pointer ${
                        playbackRate === speed
                          ? 'bg-[#1A1A1A] text-[#ffcd07] shadow-sm'
                          : 'text-[#bf7060] hover:bg-white/80'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ==============================================================
            PHYSICAL HARDWARE CONTROLS (Bottom Section)
           ============================================================== */}
        <section
          className="w-full flex flex-col items-center pt-2 pb-1 gap-3.5 select-none"
          aria-label="Controles físicos do operapod"
        >
          {/* HOME BUTTON: Resets player and returns to units screen */}
          <button
            onClick={handleHome}
            className="w-36 py-2 px-6 rounded-full font-black text-xs uppercase tracking-widest text-white border-2 border-[#2b2b2b] cursor-pointer transition duration-150 active:translate-y-0.5 active:border-[#f47851] active:text-[#ffcd07] shadow-[0_5px_12px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.25)]"
            style={{
              background: 'linear-gradient(150deg, #222222, #0d0d0d)',
            }}
            title="Voltar para tela inicial de unidades"
          >
            HOME
          </button>

          {/* CIRCULAR D-PAD: Circular outer ring with central Play/Pause button */}
          <div
            className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full flex items-center justify-center border-2 border-[#091f3d] shadow-[0_10px_24px_rgba(0,0,0,0.65),inset_0_1px_3px_rgba(255,255,255,0.15)]"
            style={{
              background: 'radial-gradient(circle, #1a1a1a 40%, #0d0d0d 100%)',
            }}
          >
            {/* Subtle outer textured groove */}
            <div className="absolute inset-2.5 rounded-full border border-white/5 pointer-events-none" />

            {/* Central Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-black cursor-pointer transition-transform duration-150 active:scale-90 active:text-[#ffcd07] border-2 border-black/80 shadow-[inset_0_2px_4px_rgba(255,255,255,0.18),0_5px_15px_rgba(0,0,0,0.8)] focus:outline-none"
              style={{
                background: 'linear-gradient(145deg, #1b1b1b, #2a2a2a)',
              }}
              title={isPlaying ? 'Pausar' : 'Reproduzir'}
              aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
              {isPlaying ? (
                <span className="tracking-tighter">⏸</span>
              ) : (
                <span className="ml-1">▶</span>
              )}
            </button>
          </div>
        </section>
      </main>

      {/* Hidden global Audio element */}
      <audio
        ref={audioRef}
        src={activeTrack?.type === 'audio' ? activeTrack.url : undefined}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleMediaError}
      />
    </div>
  );
}
