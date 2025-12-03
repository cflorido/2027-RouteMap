import React, { useState, useEffect } from 'react';
import { Trophy, Star, Briefcase, BookOpen, Award, Code, Zap, Target, Sparkles, Rocket, Edit3, Save, X, GraduationCap, Lightbulb, Building2, FlaskConical } from 'lucide-react';

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

  const categories = [
    {
      id: 'profesional',
      name: 'Experiencia Profesional',
      icon: Building2,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'academico',
      name: 'Logros Académicos',
      icon: GraduationCap,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'tecnico',
      name: 'Habilidades Técnicas',
      icon: Lightbulb,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'investigacion',
      name: 'Investigación',
      icon: FlaskConical,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  const [quests, setQuests] = useState([
    // PROFESIONAL
    {
      id: 1,
      category: 'profesional',
      title: "Año Completo en Kontent",
      iconName: "Briefcase",
      progress: 0,
      maxProgress: 12,
      unit: "meses",
      points: 150,
      color: "bg-blue-100",
      borderColor: "border-blue-300",
      accentColor: "bg-blue-500",
      textColor: "text-blue-700",
      completed: false,
      description: "Un año trabajando en startup tecnológica",
      illustration: "💼",
      notes: ""
    },
    {
      id: 2,
      category: 'profesional',
      title: "Experiencia en Sezzle",
      iconName: "Zap",
      progress: 0,
      maxProgress: 6,
      unit: "meses",
      points: 100,
      color: "bg-blue-100",
      borderColor: "border-blue-300",
      accentColor: "bg-blue-500",
      textColor: "text-blue-700",
      completed: false,
      description: "6 meses de experiencia profesional",
      illustration: "⚡",
      notes: ""
    },
    // ACADÉMICO
    {
      id: 3,
      category: 'academico',
      title: "Doble Titulación - GPA 4.8",
      iconName: "Star",
      progress: 0,
      maxProgress: 4.8,
      unit: "GPA",
      points: 200,
      color: "bg-purple-100",
      borderColor: "border-purple-300",
      accentColor: "bg-purple-500",
      textColor: "text-purple-700",
      completed: false,
      description: "Ing. Sistemas e Ing. Industrial",
      illustration: "🎓",
      notes: ""
    },
    {
      id: 4,
      category: 'academico',
      title: "Cartas de Recomendación",
      iconName: "BookOpen",
      progress: 0,
      maxProgress: 4,
      unit: "cartas",
      points: 150,
      color: "bg-purple-100",
      borderColor: "border-purple-300",
      accentColor: "bg-purple-500",
      textColor: "text-purple-700",
      completed: false,
      description: "Santiago, Valerie, Juan Fernando, Carlos",
      illustration: "📝",
      notes: ""
    },
    {
      id: 8,
      category: 'academico',
      title: "Summa Cum Laude",
      iconName: "Trophy",
      progress: 0,
      maxProgress: 1,
      unit: "honor",
      points: 500,
      color: "bg-purple-100",
      borderColor: "border-purple-300",
      accentColor: "bg-purple-500",
      textColor: "text-purple-700",
      completed: false,
      description: "Máxima distinción académica",
      illustration: "👑",
      notes: ""
    },
    // TÉCNICO
    {
      id: 6,
      category: 'tecnico',
      title: "AWS Certified Developer",
      iconName: "Code",
      progress: 0,
      maxProgress: 1,
      unit: "cert",
      points: 150,
      color: "bg-orange-100",
      borderColor: "border-orange-300",
      accentColor: "bg-orange-500",
      textColor: "text-orange-700",
      completed: false,
      description: "Certificación Associate",
      illustration: "☁️",
      notes: ""
    },
    {
      id: 7,
      category: 'tecnico',
      title: "Proyectos CodeLab",
      iconName: "Sparkles",
      progress: 0,
      maxProgress: 3,
      unit: "proyectos",
      points: 200,
      color: "bg-orange-100",
      borderColor: "border-orange-300",
      accentColor: "bg-orange-500",
      textColor: "text-orange-700",
      completed: false,
      description: "3 proyectos de alto impacto",
      illustration: "💻",
      notes: ""
    },
    // INVESTIGACIÓN
    {
      id: 5,
      category: 'investigacion',
      title: "Paper Académico Publicado",
      iconName: "Award",
      progress: 0,
      maxProgress: 1,
      unit: "paper",
      points: 300,
      color: "bg-green-100",
      borderColor: "border-green-300",
      accentColor: "bg-green-500",
      textColor: "text-green-700",
      completed: false,
      description: "Privacidad Diferencial",
      illustration: "🔬",
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

  const getCategoryProgress = (categoryId) => {
    const categoryQuests = quests.filter(q => q.category === categoryId);
    const completed = categoryQuests.filter(q => q.completed).length;
    return categoryQuests.length > 0 ? (completed / categoryQuests.length) * 100 : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Target className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Road to UNSW 2027
            </h1>
            <Rocket className="w-12 h-12 text-indigo-600" />
          </div>
          <p className="text-slate-600 text-lg md:text-xl font-medium">Plan estratégico para obtener apoyo gubernamental</p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 font-semibold">Nivel</span>
              <Star className="w-6 h-6 text-yellow-500" fill="currentColor" />
            </div>
            <div className="text-4xl font-bold text-indigo-600">{level}</div>
            <div className="mt-2 text-sm text-slate-500">Próximo nivel: {(level * 200)} XP</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 font-semibold">Puntos XP</span>
              <Sparkles className="w-6 h-6 text-purple-500" />
            </div>
            <div className="text-4xl font-bold text-purple-600">{totalPoints}</div>
            <div className="mt-2 text-sm text-slate-500">Total acumulado</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-600 font-semibold">Progreso</span>
              <Trophy className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-4xl font-bold text-green-600">{completedCount}/{quests.length}</div>
            <div className="mt-2 text-sm text-slate-500">{totalProgress.toFixed(0)}% completado</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-slate-700 text-lg">Progreso General</span>
            <span className="text-2xl font-bold text-indigo-600">{totalProgress.toFixed(0)}%</span>
          </div>
          <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out"
              style={{ width: totalProgress + '%' }}
            />
          </div>
        </div>

        {/* Categories */}
        {categories.map(category => {
          const categoryQuests = quests.filter(q => q.category === category.id);
          const CategoryIcon = category.icon;
          const categoryProgress = getCategoryProgress(category.id);

          return (
            <div key={category.id} className={`${category.bgColor} rounded-3xl p-6 mb-8 border-2 ${category.borderColor}`}>
              {/* Category Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-md`}>
                    <CategoryIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{category.name}</h2>
                    <p className="text-sm text-slate-600">{categoryQuests.filter(q => q.completed).length}/{categoryQuests.length} objetivos completados</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-700">{categoryProgress.toFixed(0)}%</div>
                </div>
              </div>

              {/* Category Progress Bar */}
              <div className="h-3 bg-white rounded-full overflow-hidden mb-6 shadow-inner">
                <div 
                  className={`h-full bg-gradient-to-r ${category.color} transition-all duration-500`}
                  style={{ width: categoryProgress + '%' }}
                />
              </div>

              {/* Quests Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {categoryQuests.map((quest) => {
                  const Icon = questIcons[quest.id];
                  const progressPercent = (quest.progress / quest.maxProgress) * 100;
                  
                  return (
                    <div 
                      key={quest.id}
                      className={`${quest.color} rounded-2xl p-5 shadow-md border-2 ${quest.borderColor} transition-all duration-300 hover:shadow-xl`}
                    >
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`w-12 h-12 ${quest.accentColor} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-bold text-lg ${quest.textColor} mb-1`}>{quest.title}</h3>
                          <p className="text-slate-600 text-sm">{quest.description}</p>
                        </div>
                        {quest.completed && (
                          <Trophy className="w-6 h-6 text-green-600 flex-shrink-0" />
                        )}
                      </div>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-600 font-medium text-sm">Progreso</span>
                          <span className={`font-bold text-sm ${quest.textColor}`}>
                            {quest.progress.toFixed(quest.maxProgress > 10 ? 0 : 1)} / {quest.maxProgress} {quest.unit}
                          </span>
                        </div>
                        <div className="h-2.5 bg-white rounded-full overflow-hidden shadow-inner">
                          <div 
                            className={`h-full ${quest.accentColor} transition-all duration-500 ease-out`}
                            style={{ width: progressPercent + '%' }}
                          />
                        </div>
                      </div>

                      {/* Notes Section */}
                      <div className="mb-4 bg-white rounded-xl p-3 border border-slate-200">
                        {editingNote === quest.id ? (
                          <div>
                            <textarea
                              value={tempNote}
                              onChange={(e) => setTempNote(e.target.value)}
                              placeholder="Añade notas, fechas importantes, recordatorios..."
                              className="w-full p-2 border border-slate-300 rounded-lg text-sm resize-none focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                              rows="3"
                            />
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => saveNote(quest.id)}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 px-3 text-sm font-semibold flex items-center justify-center gap-1 transition-colors"
                              >
                                <Save className="w-4 h-4" />
                                Guardar
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="flex-1 bg-slate-400 hover:bg-slate-500 text-white rounded-lg py-2 px-3 text-sm font-semibold flex items-center justify-center gap-1 transition-colors"
                              >
                                <X className="w-4 h-4" />
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-slate-600 font-medium text-sm">Notas</span>
                              <button
                                onClick={() => startEditingNote(quest)}
                                className={`${quest.accentColor} hover:opacity-80 text-white rounded-lg p-1.5 transition-opacity`}
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            {quest.notes ? (
                              <p className="text-slate-700 text-sm whitespace-pre-wrap">{quest.notes}</p>
                            ) : (
                              <p className="text-slate-400 text-sm italic">Sin notas</p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                          <span className="text-slate-700 font-bold text-sm">{quest.points} XP</span>
                        </div>
                        
                        {!quest.completed ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateProgress(quest.id, Math.max(0, quest.progress - (quest.maxProgress > 10 ? 1 : 0.1)))}
                              className="w-9 h-9 bg-white hover:bg-slate-50 text-slate-700 rounded-lg font-bold shadow border border-slate-300 transition-colors"
                            >
                              −
                            </button>
                            <button
                              onClick={() => updateProgress(quest.id, Math.min(quest.maxProgress, quest.progress + (quest.maxProgress > 10 ? 1 : 0.1)))}
                              className={`w-9 h-9 ${quest.accentColor} hover:opacity-90 text-white rounded-lg font-bold shadow transition-opacity`}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <div className="bg-green-100 px-3 py-1.5 rounded-lg border border-green-300">
                            <span className="text-green-700 font-bold text-sm flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              Completado
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Victory Message */}
        {completedCount === quests.length && (
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            <Trophy className="w-20 h-20 text-white mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ¡Objetivo Cumplido!
            </h2>
            <p className="text-white text-xl md:text-2xl font-medium">
              Has completado todas las metas. Estás listo para solicitar el apoyo gubernamental de UNSW.
            </p>
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
            className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-semibold shadow-md border border-slate-300 transition-colors"
          >
            Reiniciar Progreso
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;