import React, { useState, useEffect } from 'react';
import { Trophy, Star, Briefcase, BookOpen, Award, Code, Zap, Target, Heart, Sparkles, Coffee, Rocket, Cloud, Sun, Moon, Smile, Edit3, Save, X } from 'lucide-react';

const RouteMap = () => {
  const questIcons = {
    1: Briefcase,
    2: Zap,
    3: Star,
    4: BookOpen,
    5: Award,
    6: Code,
    7: Sparkles,
    8: Trophy
  };

  const [quests, setQuests] = useState([
    {
      id: 1,
      title: "Año Completo en Kontent",
      iconName: "Briefcase",
      progress: 0,
      maxProgress: 12,
      unit: "meses",
      points: 150,
      color: "bg-blue-200",
      borderColor: "border-blue-300",
      accentColor: "bg-blue-400",
      textColor: "text-blue-600",
      completed: false,
      description: "¡Un año entero brillando!",
      illustration: "☕",
      notes: ""
    },
    {
      id: 2,
      title: "Aventura en Sezzle",
      iconName: "Zap",
      progress: 0,
      maxProgress: 6,
      unit: "meses",
      points: 100,
      color: "bg-purple-200",
      borderColor: "border-purple-300",
      accentColor: "bg-purple-400",
      textColor: "text-purple-600",
      completed: false,
      description: "Media aventura épica",
      illustration: "⚡",
      notes: ""
    },
    {
      id: 3,
      title: "Maestro Académico",
      iconName: "Star",
      progress: 0,
      maxProgress: 4.8,
      unit: "GPA",
      points: 200,
      color: "bg-yellow-200",
      borderColor: "border-yellow-300",
      accentColor: "bg-yellow-400",
      textColor: "text-yellow-600",
      completed: false,
      description: "¡Eres una estrella!",
      illustration: "⭐",
      notes: ""
    },
    {
      id: 4,
      title: "Doble Poder",
      iconName: "BookOpen",
      progress: 0,
      maxProgress: 100,
      unit: "%",
      points: 250,
      color: "bg-green-200",
      borderColor: "border-green-300",
      accentColor: "bg-green-400",
      textColor: "text-green-600",
      completed: false,
      description: "Súper estudiante activado",
      illustration: "📚",
      notes: ""
    },
    {
      id: 5,
      title: "Publicación Científica",
      iconName: "Award",
      progress: 0,
      maxProgress: 1,
      unit: "paper",
      points: 300,
      color: "bg-pink-200",
      borderColor: "border-pink-300",
      accentColor: "bg-pink-400",
      textColor: "text-pink-600",
      completed: false,
      description: "¡Tu investigación al mundo!",
      illustration: "🔬",
      notes: ""
    },
    {
      id: 6,
      title: "AWS Developer Certified",
      iconName: "Code",
      progress: 0,
      maxProgress: 1,
      unit: "cert",
      points: 150,
      color: "bg-orange-200",
      borderColor: "border-orange-300",
      accentColor: "bg-orange-400",
      textColor: "text-orange-600",
      completed: false,
      description: "Nube conquistada",
      illustration: "☁️",
      notes: ""
    },
    {
      id: 7,
      title: "CodeLab Innovador",
      iconName: "Sparkles",
      progress: 0,
      maxProgress: 3,
      unit: "proyectos",
      points: 200,
      color: "bg-indigo-200",
      borderColor: "border-indigo-300",
      accentColor: "bg-indigo-400",
      textColor: "text-indigo-600",
      completed: false,
      description: "Creando el futuro",
      illustration: "💻",
      notes: ""
    },
    {
      id: 8,
      title: "Summa Cum Laude",
      iconName: "Trophy",
      progress: 0,
      maxProgress: 1,
      unit: "honor",
      points: 500,
      color: "bg-rose-200",
      borderColor: "border-rose-300",
      accentColor: "bg-rose-400",
      textColor: "text-rose-600",
      completed: false,
      description: "¡La corona de gloria!",
      illustration: "👑",
      notes: ""
    }
  ]);

  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [editingNote, setEditingNote] = useState(null);
  const [tempNote, setTempNote] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('unsw-quest-data');
    if (saved) {
      const data = JSON.parse(saved);
      setQuests(data.quests);
      setTotalPoints(data.totalPoints);
      setLevel(data.level);
    }
  }, []);

  useEffect(() => {
    const points = quests.reduce((sum, q) => sum + (q.completed ? q.points : 0), 0);
    setTotalPoints(points);
    setLevel(Math.floor(points / 200) + 1);
    
    localStorage.setItem('unsw-quest-data', JSON.stringify({
      quests,
      totalPoints: points,
      level: Math.floor(points / 200) + 1
    }));
  }, [quests]);

  const updateProgress = (id, newProgress) => {
    setQuests(quests.map(q => {
      if (q.id === id) {
        const completed = newProgress >= q.maxProgress;
        return { ...q, progress: newProgress, completed };
      }
      return q;
    }));
  };

  const startEditingNote = (quest) => {
    setEditingNote(quest.id);
    setTempNote(quest.notes);
  };

  const saveNote = (id) => {
    setQuests(quests.map(q => 
      q.id === id ? { ...q, notes: tempNote } : q
    ));
    setEditingNote(null);
    setTempNote("");
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setTempNote("");
  };

  const completedCount = quests.filter(q => q.completed).length;
  const totalProgress = (completedCount / quests.length) * 100;

  const floatingElements = ['☁️', '⭐', '✨', '🌙', '💫'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4 md:p-8 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map((emoji, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-20 animate-pulse"
            style={{
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: (i * 0.5) + 's'
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with cute doodles */}
        <div className="text-center mb-8 md:mb-12 relative">
          <div className="inline-block relative">
            <div className="absolute -top-8 -left-8 text-4xl animate-bounce">🎯</div>
            <div className="absolute -top-8 -right-8 text-4xl animate-bounce" style={{animationDelay: '0.3s'}}>🚀</div>
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-2 pb-2">
              Metas para antes del 2027
            </h1>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-3xl">🌈</div>
          </div>
          <p className="text-gray-600 text-lg md:text-xl mt-8 font-medium">✨ Pagina web para controlar mi ansiedad por el futuro ✨</p>
        </div>

        {/* Stats Panel - Cute Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-pink-200 transform hover:scale-105 transition-transform">
            <div className="text-6xl mb-2 text-center">🎮</div>
            <div className="text-5xl font-bold text-center text-pink-500 mb-1">{level}</div>
            <div className="text-gray-600 text-center font-medium">Nivel</div>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-yellow-200 transform hover:scale-105 transition-transform">
            <div className="text-6xl mb-2 text-center">⭐</div>
            <div className="text-5xl font-bold text-center text-yellow-500 mb-1">{totalPoints}</div>
            <div className="text-gray-600 text-center font-medium">Puntos XP</div>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-green-200 transform hover:scale-105 transition-transform">
            <div className="text-6xl mb-2 text-center">🏆</div>
            <div className="text-5xl font-bold text-center text-green-500 mb-1">{completedCount}/{quests.length}</div>
            <div className="text-gray-600 text-center font-medium">Logros</div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="bg-white rounded-3xl p-6 mb-8 shadow-lg border-4 border-purple-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-purple-500" />
              <span className="font-bold text-gray-700">Progreso de la Misión</span>
            </div>
            <span className="text-2xl font-bold text-purple-500">{totalProgress.toFixed(0)}%</span>
          </div>
          <div className="h-8 bg-purple-100 rounded-full overflow-hidden border-2 border-purple-300">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 transition-all duration-700 ease-out flex items-center justify-end pr-2"
              style={{ width: totalProgress + '%' }}
            >
              {totalProgress > 10 && <span className="text-white font-bold text-sm">🚀</span>}
            </div>
          </div>
        </div>

        {/* Quests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {quests.map((quest, index) => {
            const Icon = questIcons[quest.id];
            const progressPercent = (quest.progress / quest.maxProgress) * 100;
            
            return (
              <div 
                key={quest.id}
                className={`${quest.color} rounded-3xl p-6 shadow-xl border-4 ${quest.borderColor} transition-all duration-300 transform hover:scale-102 hover:shadow-2xl relative overflow-hidden`}
              >
                {/* Illustration Badge */}
                <div className="absolute top-4 right-4 text-6xl opacity-20 transform rotate-12">
                  {quest.illustration}
                </div>

                {/* Header */}
                <div className="flex items-start gap-3 mb-4 relative z-10">
                  <div className={`w-14 h-14 ${quest.accentColor} rounded-2xl flex items-center justify-center shadow-md transform rotate-3`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-xl ${quest.textColor} mb-1`}>{quest.title}</h3>
                    <p className="text-gray-600 text-sm font-medium">{quest.description}</p>
                  </div>
                  {quest.completed && (
                    <div className="text-4xl animate-bounce">
                      🎉
                    </div>
                  )}
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-semibold text-sm">Progreso</span>
                    <span className={`font-bold ${quest.textColor}`}>
                      {quest.progress.toFixed(quest.maxProgress > 10 ? 0 : 1)} / {quest.maxProgress} {quest.unit}
                    </span>
                  </div>
                  <div className="h-6 bg-white rounded-full overflow-hidden border-2 border-gray-300 shadow-inner">
                    <div 
                      className={`h-full ${quest.accentColor} transition-all duration-500 ease-out flex items-center justify-center`}
                      style={{ width: progressPercent + '%' }}
                    >
                      {progressPercent > 20 && (
                        <span className="text-white font-bold text-xs">{progressPercent.toFixed(0)}%</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="mb-4 bg-white bg-opacity-60 rounded-2xl p-3 border-2 border-dashed border-gray-300">
                  {editingNote === quest.id ? (
                    <div>
                      <textarea
                        value={tempNote}
                        onChange={(e) => setTempNote(e.target.value)}
                        placeholder="Escribe tus notas aquí... ✍️"
                        className="w-full p-2 border-2 border-gray-300 rounded-xl text-sm resize-none focus:outline-none focus:border-purple-400"
                        rows="3"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => saveNote(quest.id)}
                          className="flex-1 bg-green-400 hover:bg-green-500 text-white rounded-xl py-2 px-3 text-sm font-semibold flex items-center justify-center gap-1 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          Guardar
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-400 hover:bg-gray-500 text-white rounded-xl py-2 px-3 text-sm font-semibold flex items-center justify-center gap-1 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-600 font-semibold text-sm flex items-center gap-1">
                          📝 Mis Notas
                        </span>
                        <button
                          onClick={() => startEditingNote(quest)}
                          className={`${quest.accentColor} hover:opacity-80 text-white rounded-lg p-1.5 transition-opacity`}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                      {quest.notes ? (
                        <p className="text-gray-700 text-sm whitespace-pre-wrap">{quest.notes}</p>
                      ) : (
                        <p className="text-gray-400 text-sm italic">Añade notas motivacionales...</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                    <span className="text-yellow-600 font-bold">{quest.points} XP</span>
                  </div>
                  
                  {!quest.completed && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateProgress(quest.id, Math.max(0, quest.progress - (quest.maxProgress > 10 ? 1 : 0.1)))}
                        className="w-10 h-10 bg-white hover:bg-gray-100 text-gray-700 rounded-xl font-bold text-lg shadow-md border-2 border-gray-300 transition-colors"
                      >
                        −
                      </button>
                      <button
                        onClick={() => updateProgress(quest.id, Math.min(quest.maxProgress, quest.progress + (quest.maxProgress > 10 ? 1 : 0.1)))}
                        className={`w-10 h-10 ${quest.accentColor} hover:opacity-90 text-white rounded-xl font-bold text-lg shadow-md transition-opacity`}
                      >
                        +
                      </button>
                    </div>
                  )}
                  
                  {quest.completed && (
                    <div className="bg-white px-4 py-2 rounded-xl shadow-md border-2 border-green-400">
                      <span className="text-green-600 font-bold flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        ¡Logrado!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Victory Message */}
        {completedCount === quests.length && (
          <div className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 rounded-3xl p-8 md:p-12 text-center shadow-2xl border-4 border-white transform hover:scale-105 transition-transform">
            <div className="text-8xl mb-4 animate-bounce">🎊</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              ¡MISIÓN CUMPLIDA!
            </h2>
            <p className="text-white text-xl md:text-2xl font-medium mb-4">
              ¡Eres increíble! Has completado todas las metas 🌟
            </p>
            <div className="text-6xl">🏆 🎓 🚀 ✨ 💪</div>
          </div>
        )}

        {/* Reset Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (window.confirm('¿Estás seguro de que quieres reiniciar todo el progreso?')) {
                setQuests(quests.map(q => ({ ...q, progress: 0, completed: false, notes: "" })));
              }
            }}
            className="px-8 py-3 bg-white hover:bg-gray-100 text-gray-700 rounded-2xl font-bold shadow-lg border-3 border-gray-300 transition-colors"
          >
            🔄 Reiniciar Aventura
          </button>
        </div>

        {/* Footer doodles */}
        <div className="mt-12 text-center text-4xl space-x-4 opacity-60">
          <span className="inline-block animate-bounce" style={{animationDelay: '0s'}}>🌟</span>
          <span className="inline-block animate-bounce" style={{animationDelay: '0.1s'}}>💖</span>
          <span className="inline-block animate-bounce" style={{animationDelay: '0.2s'}}>✨</span>
          <span className="inline-block animate-bounce" style={{animationDelay: '0.3s'}}>🎯</span>
          <span className="inline-block animate-bounce" style={{animationDelay: '0.4s'}}>🚀</span>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;