import React, { useState } from 'react'
import { Tooth, ToothStatus, TreatmentOption } from '../types'
import { initialTeethData } from '../data/dentalData'
import { formatCurrency } from '../utils/calendarUtils'
import { CheckCircle, AlertTriangle, Shield, Clock, ArrowRight, Info, Filter, Sparkles } from 'lucide-react'

interface InteractiveOdontogramProps {
  onSelectToothForBooking: (toothId: number, treatmentName?: string) => void
}

export const InteractiveOdontogram: React.FC<InteractiveOdontogramProps> = ({
  onSelectToothForBooking
}) => {
  const [teeth, setTeeth] = useState<Tooth[]>(initialTeethData)
  const [selectedTooth, setSelectedTooth] = useState<Tooth | null>(teeth.find(t => t.id === 16) || null)
  const [activeFilter, setActiveFilter] = useState<'all' | ToothStatus>('all')

  const getStatusColor = (status: ToothStatus) => {
    switch (status) {
      case 'healthy':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          fill: '#10B981',
          label: 'Здоров'
        }
      case 'caries':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-300',
          fill: '#F59E0B',
          label: 'Кариес'
        }
      case 'pulpitis':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-300',
          fill: '#EF4444',
          label: 'Пульпит / Каналы'
        }
      case 'crown':
        return {
          bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          fill: '#6366F1',
          label: 'Коронка / Вкладка'
        }
      case 'implant':
        return {
          bg: 'bg-cyan-50 text-cyan-700 border-cyan-300',
          fill: '#0EA5E9',
          label: 'Имплантат'
        }
      case 'missing':
        return {
          bg: 'bg-slate-100 text-slate-500 border-slate-300',
          fill: '#94A3B8',
          label: 'Отсутствует'
        }
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          fill: '#64748B',
          label: 'Осмотр'
        }
    }
  }

  // Зубные ряды
  const upperRight = teeth.filter(t => t.quadrant === 1).sort((a, b) => b.id - a.id) // 18 -> 11
  const upperLeft = teeth.filter(t => t.quadrant === 2).sort((a, b) => a.id - b.id)  // 21 -> 28
  const lowerRight = teeth.filter(t => t.quadrant === 4).sort((a, b) => b.id - a.id) // 48 -> 41
  const lowerLeft = teeth.filter(t => t.quadrant === 3).sort((a, b) => a.id - b.id)  // 31 -> 38

  const renderToothButton = (tooth: Tooth) => {
    const isSelected = selectedTooth?.id === tooth.id
    const statusMeta = getStatusColor(tooth.status)
    const matchesFilter = activeFilter === 'all' || tooth.status === activeFilter

    return (
      <button
        key={tooth.id}
        onClick={() => setSelectedTooth(tooth)}
        title={`${tooth.id}: ${tooth.name} (${statusMeta.label})`}
        className={`group relative flex flex-col items-center p-1.5 sm:p-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
          isSelected
            ? 'ring-2 ring-cyan-500 bg-cyan-50/80 shadow-md scale-105 z-20'
            : matchesFilter
            ? 'hover:bg-slate-100 hover:scale-105'
            : 'opacity-30 hover:opacity-100'
        }`}
      >
        {/* Tooth SVG shape representation */}
        <div className="relative w-8 h-10 sm:w-10 sm:h-12 flex items-center justify-center">
          <svg
            viewBox="0 0 40 48"
            className="w-full h-full drop-shadow-sm transition-transform group-hover:drop-shadow-md"
          >
            {tooth.type === 'molar' && (
              <path
                d="M8 8 C 8 2, 32 2, 32 8 C 36 14, 38 32, 30 46 C 26 40, 24 28, 20 28 C 16 28, 14 40, 10 46 C 2 32, 4 14, 8 8 Z"
                fill={statusMeta.fill}
                fillOpacity={isSelected ? 1 : 0.85}
                stroke="#0F172A"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            )}
            {tooth.type === 'premolar' && (
              <path
                d="M10 8 C 10 3, 30 3, 30 8 C 34 16, 35 34, 26 46 C 22 36, 20 28, 20 28 C 20 28, 18 36, 14 46 C 5 34, 6 16, 10 8 Z"
                fill={statusMeta.fill}
                fillOpacity={isSelected ? 1 : 0.85}
                stroke="#0F172A"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            )}
            {tooth.type === 'canine' && (
              <path
                d="M12 10 C 14 2, 26 2, 28 10 C 32 18, 33 36, 20 46 C 7 36, 8 18, 12 10 Z"
                fill={statusMeta.fill}
                fillOpacity={isSelected ? 1 : 0.85}
                stroke="#0F172A"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            )}
            {tooth.type === 'incisor' && (
              <path
                d="M10 6 C 10 2, 30 2, 30 6 C 33 18, 31 34, 20 46 C 9 34, 7 18, 10 6 Z"
                fill={statusMeta.fill}
                fillOpacity={isSelected ? 1 : 0.85}
                stroke="#0F172A"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            )}
            {/* Status dot overlay */}
            <circle cx="20" cy="18" r="3.5" fill="#FFFFFF" opacity="0.9" />
          </svg>

          {/* Active selection ping */}
          {isSelected && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          )}
        </div>

        {/* Tooth Number */}
        <span className={`text-[11px] sm:text-xs font-bold mt-1 ${isSelected ? 'text-cyan-700' : 'text-slate-600'}`}>
          {tooth.id}
        </span>
      </button>
    )
  }

  return (
    <section id="odontogram" className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold mb-3 border border-cyan-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Инновация DENTIS LUX: Цифровая диагностика</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Интерактивная зубная карта (FDI Odontogram)
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Кликните на любой зуб, чтобы узнать его анатомическое состояние, рекомендуемое лечение и прозрачную стоимость без скрытых доплат.
          </p>
        </div>

        {/* Filter Bar & Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <Filter className="w-4 h-4 text-cyan-600" />
            <span>Фильтр состояния:</span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Все 32 зуба
            </button>
            <button
              onClick={() => setActiveFilter('caries')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'caries'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Кариес
            </button>
            <button
              onClick={() => setActiveFilter('pulpitis')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'pulpitis'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              Пульпит / Каналы
            </button>
            <button
              onClick={() => setActiveFilter('implant')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'implant'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100 border border-cyan-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              Имплантат
            </button>
            <button
              onClick={() => setActiveFilter('crown')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'crown'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              Коронка
            </button>
            <button
              onClick={() => setActiveFilter('healthy')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeFilter === 'healthy'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Здоров
            </button>
          </div>
        </div>

        {/* Main Grid: Odontogram Chart (Left) + Detailed Diagnosis Card (Right) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Odontogram Interactive Arch */}
          <div className="lg:col-span-7 bg-slate-50/70 p-4 sm:p-8 rounded-3xl border border-slate-200/80 shadow-soft">
            
            {/* Upper Jaw Heading */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Верхняя челюсть (Правая сторона)
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Верхняя челюсть (Левая сторона)
              </span>
            </div>

            {/* Upper Jaw Arch */}
            <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-6">
              <div className="grid grid-cols-8 gap-1 sm:gap-2 pb-2 border-r border-slate-100 pr-1">
                <div className="col-span-4 flex justify-end gap-1 sm:gap-2 border-r-2 border-dashed border-slate-200 pr-2 sm:pr-4">
                  {upperRight.map(renderToothButton)}
                </div>
                <div className="col-span-4 flex justify-start gap-1 sm:gap-2 pl-2 sm:pl-4">
                  {upperLeft.map(renderToothButton)}
                </div>
              </div>
            </div>

            {/* Center Divider: Smile Line */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="w-full border-t-2 border-dashed border-slate-200"></div>
              <span className="absolute bg-slate-100 px-3 py-1 rounded-full text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Линия смыкания прикуса
              </span>
            </div>

            {/* Lower Jaw Arch */}
            <div className="bg-white p-3 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mt-6">
              <div className="grid grid-cols-8 gap-1 sm:gap-2 pt-2">
                <div className="col-span-4 flex justify-end gap-1 sm:gap-2 border-r-2 border-dashed border-slate-200 pr-2 sm:pr-4">
                  {lowerRight.map(renderToothButton)}
                </div>
                <div className="col-span-4 flex justify-start gap-1 sm:gap-2 pl-2 sm:pl-4">
                  {lowerLeft.map(renderToothButton)}
                </div>
              </div>
            </div>

            {/* Lower Jaw Heading */}
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Нижняя челюсть (Правая сторона)
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Нижняя челюсть (Левая сторона)
              </span>
            </div>

            {/* Micro Instruction */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
              <Info className="w-4 h-4 text-cyan-600 flex-shrink-0" />
              <span>Нажмите на любой зуб для загрузки персонального плана лечения и стоимости</span>
            </div>

          </div>

          {/* Right Card: Diagnosis & Treatment Blueprint for Selected Tooth */}
          <div className="lg:col-span-5 sticky top-28">
            {selectedTooth ? (
              <div className="bg-white rounded-3xl border-2 border-cyan-500/30 p-6 sm:p-7 shadow-card space-y-6">
                
                {/* Tooth Card Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900">
                        Зуб #{selectedTooth.id}
                      </span>
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${getStatusColor(selectedTooth.status).bg}`}>
                        {getStatusColor(selectedTooth.status).label}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-700 mt-1">
                      {selectedTooth.name} ({selectedTooth.jaw === 'upper' ? 'Верхняя' : 'Нижняя'} челюсть, квадрант {selectedTooth.quadrant})
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-lg border border-cyan-100">
                    #{selectedTooth.id}
                  </div>
                </div>

                {/* Condition Diagnostic Note */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-600" />
                    Клиническая картина:
                  </div>
                  <p className="text-sm text-slate-800 leading-snug font-medium">
                    {selectedTooth.conditionDescription}
                  </p>
                </div>

                {/* Available Treatments for this Tooth */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Рекомендуемые процедуры и решения:
                  </h4>

                  <div className="space-y-3">
                    {selectedTooth.treatments.map((treatment: TreatmentOption, idx: number) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/30 transition-all group"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <h5 className="text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                            {treatment.name}
                          </h5>
                          <span className="text-base font-extrabold text-cyan-600 flex-shrink-0">
                            {treatment.price === 0 ? 'Бесплатно' : formatCurrency(treatment.price)}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          {treatment.description}
                        </p>

                        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                          <span className="flex items-center gap-1 font-medium">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {treatment.duration}
                          </span>

                          {treatment.warranty && (
                            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                              <Shield className="w-3 h-3" />
                              {treatment.warranty}
                            </span>
                          )}

                          <button
                            onClick={() => onSelectToothForBooking(selectedTooth.id, treatment.name)}
                            className="text-xs font-bold text-cyan-600 group-hover:text-cyan-700 flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            Выбрать <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary CTA for Selected Tooth */}
                <button
                  onClick={() => onSelectToothForBooking(selectedTooth.id, selectedTooth.treatments[0]?.name)}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold text-sm shadow-soft hover:shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Записаться на лечение зуба #{selectedTooth.id}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-400 font-medium">
                  Точный протокол утверждается врачом после бесплатного 3D КТ снимка на первичном осмотре
                </p>

              </div>
            ) : (
              <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
                <Info className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                <p className="text-sm font-semibold">Выберите зуб на интерактивной формуле слева</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}
