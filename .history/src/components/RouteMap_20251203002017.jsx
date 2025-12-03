import React, { useState, useEffect } from 'react';
import { Trophy, Star, Briefcase, BookOpen, Award, Code, Zap, Target, ChevronRight, Sparkles } from 'lucide-react';

const RouteMap = () => {
  const [quests, setQuests] = useState([
    {
      id: 1,
      title: "Año Completo en Kontent",
      icon: Briefcase,
      progress: 0,
      maxProgress: 12,
      unit: "meses",
      points: 150,
      color: "from-blue-500 to-cyan-500",
      completed: false,
      description: "Trabaja 12 meses en Kontent"
    },
    {
      id: 2,
      title: "Aventura en Sezzle",
      icon: Zap,
      progress: 0,
      maxProgress: 6,
      unit: "meses",
      points: 100,
      color: "from-purple-500 to-pink-500",
      completed: false,
      description: "Completa 6 meses en Sezzle"
    },
    {
      id: 3,
      title: "Maestro Académico",
      icon: Star,
      progress: 0,
      maxProgress: 4.8,
      unit: "GPA",
      points: 200,
      color: "from-yellow-500 to-orange-500",
      completed: false,
      description: "Alcanza un promedio de 4.8"
    },
    {
      id: 4,
      title: "Doble Poder",
      icon: BookOpen,
      progress: 0,
      maxProgress: 100,
      unit: "%",
      points: 250,
      color: "from-green-500 to-emerald-500",
      completed: false,
      description: "Completa la doble carrera"
    },
    {
      id: 5,
      title: "Publicación Científica",
      icon: Award,
      progress: 0,
      maxProgress: 1,
      unit: "paper",
      points: 300,
      color: "from-red-500 to-rose-500",
      completed: false,
      description: "Publica un paper académico"
    },
    {
      id: 6,
      title: "AWS Developer Certified",
      icon: Code,
      progress: 0,
      maxProgress: 1,
      unit: "cert",
      points: 150,
      color: "from-orange-500 to-amber-500",
      completed: false,
      description: "Obtén la certificación AWS"
    },
    {
      id: 7,
      title: "CodeLab Innovador",
      icon: Sparkles,
      progress: 0,
      maxProgress: 3,
      unit: "proyectos",
      points: 200,
      color: "from-indigo-500 to-purple-500",
      completed: false,
      description: "Desarrolla 3 proyectos de alto impacto"
    },
    {
      id: 8,
      title: "Summa Cum Laude",
      icon: Trophy,
      progress: 0,
      maxProgress: 1,
      unit: "honor",
      points: 500,
      color: "from-pink-500 to-purple-500",
      completed: false,
      description: "Gradúate con máximo honor"
    }
  ]);

  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState(1);

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

  const completedCount = quests.filter(q => q.completed).length;
  const totalProgress = (completedCount / quests.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text mb-2">
            <h1 className="text-4xl md:text-6xl font-bold">UNSW QUEST</h1>
          </div>
          <p className="text-slate-300 text-lg md:text-xl">Tu camino hacia el apoyo gubernamental</p>
        </div>

        {/* Stats Panel */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-6 md:p-8 mb-8 border border-purple-500/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text mb-2">
                {level}
              </div>
              <div className="text-slate-400 text-sm">Nivel</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text mb-2">
                {totalPoints}
              </div>
              <div className="text-slate-400 text-sm">Puntos XP</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text mb-2">
                {completedCount}/{quests.length}
              </div>
              <div className="text-slate-400 text-sm">Misiones</div>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-slate-300 mb-2">
              <span>Progreso Total</span>
              <span>{totalProgress.toFixed(0)}%</span>
            </div>
            <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quests.map(quest => {
            const Icon = quest.icon;
            const progressPercent = (quest.progress / quest.maxProgress) * 100;
            
            return (
              <div 
                key={quest.id}
                className={`bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border transition-all duration-300 ${
                  quest.completed 
                    ? 'border-green-500/50 shadow-lg shadow-green-500/20' 
                    : 'border-slate-700/50 hover:border-purple-500/50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${quest.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{quest.title}</h3>
                      <p className="text-slate-400 text-sm">{quest.description}</p>
                    </div>
                  </div>
                  {quest.completed && (
                    <Trophy className="w-8 h-8 text-yellow-400 animate-bounce" />
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Progreso</span>
                    <span>{quest.progress} / {quest.maxProgress} {quest.unit}</span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${quest.color} transition-all duration-500 ease-out`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-bold">{quest.points} XP</span>
                  </div>
                  
                  {!quest.completed && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateProgress(quest.id, Math.max(0, quest.progress - (quest.maxProgress > 10 ? 1 : 0.1)))}
                        className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
                      >
                        -
                      </button>
                      <button
                        onClick={() => updateProgress(quest.id, Math.min(quest.maxProgress, quest.progress + (quest.maxProgress > 10 ? 1 : 0.1)))}
                        className={`px-3 py-1 bg-gradient-to-r ${quest.color} text-white rounded-lg text-sm hover:opacity-90 transition-opacity`}
                      >
                        +
                      </button>
                    </div>
                  )}
                  
                  {quest.completed && (
                    <div className="flex items-center gap-2 text-green-400 font-bold">
                      <Target className="w-5 h-5" />
                      ¡Completado!
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Victory Message */}
        {completedCount === quests.length && (
          <div className="mt-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-center animate-pulse">
            <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              ¡MISIÓN CUMPLIDA!
            </h2>
            <p className="text-white text-lg">
              ¡Has completado todas las metas! Estás listo para solicitar el apoyo gubernamental de UNSW 🎉
            </p>
          </div>
        )}

        {/* Reset Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (window.confirm('¿Estás seguro de que quieres reiniciar todo el progreso?')) {
                setQuests(quests.map(q => ({ ...q, progress: 0, completed: false })));
              }
            }}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
          >
            Reiniciar Progreso
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;