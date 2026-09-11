import React, { useState } from 'react'
import { Tooth, ToothStatus, TreatmentOption } from '../types'
import { initialTeethData } from '../data/dentalData'
import { formatCurrency } from '../utils/calendarUtils'
import { CheckCircle, Shield, Clock, ArrowRight, Info, Sparkles, Layers, Grid, Compass } from 'lucide-react'

interface InteractiveOdontogramProps {
  onSelectToothForBooking: (toothId: number, treatmentName?: string) => void
}

export const InteractiveOdontogram: React.FC<InteractiveOdontogramProps> = ({
  onSelectToothForBooking
}) => {
  const [teeth] = useState<Tooth[]>(initialTeethData)
  const [selectedTooth, setSelectedTooth] = useState<Tooth>(teeth.find(t => t.id === 16) || teeth[0])
  const [activeFilter, setActiveFilter] = useState<'all' | ToothStatus>('all')
  
  // Режимы отображения: 'full' (все 32 зуба дугой) или 'quadrant' (крупный пошаговый по четвертям)
  const [viewMode, setViewMode] = useState<'full' | 'quadrant'>('full')
  // Активный квадрант для режима 'quadrant'
  const [activeQuadrant, setActiveQuadrant] = useState<1 | 2 | 3 | 4>(1)

  const getStatusMeta = (status: ToothStatus) => {
    switch (status) {
      case 'healthy':
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-300',
          dot: 'bg-emerald-500',
          gradient: 'from-emerald-400 to-teal-500',
          border: 'border-emerald-200',
          label: 'Здоров'
        }
      case 'caries':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-300',
          dot: 'bg-amber-500',
          gradient: 'from-amber-400 to-orange-500',
          border: 'border-amber-300',
          label: 'Кариес'
        }
      case 'pulpitis':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-300',
          dot: 'bg-rose-500',
          gradient: 'from-rose-500 to-red-600',
          border: 'border-rose-300',
          label: 'Пульпит'
        }
      case 'crown':
        return {
          bg: 'bg-indigo-50 text-indigo-800 border-indigo-300',
          dot: 'bg-indigo-500',
          gradient: 'from-indigo-400 to-blue-600',
          border: 'border-indigo-300',
          label: 'Коронка'
        }
      case 'implant':
        return {
          bg: 'bg-cyan-50 text-cyan-800 border-cyan-300',
          dot: 'bg-cyan-500',
          gradient: 'from-cyan-400 to-teal-600',
          border: 'border-cyan-300',
          label: 'Имплант'
        }
      case 'missing':
        return {
          bg: 'bg-slate-100 text-slate-600 border-slate-300',
          dot: 'bg-slate-400',
          gradient: 'from-slate-300 to-slate-400',
          border: 'border-slate-200',
          label: 'Отсутствует'
        }
      default:
        return {
          bg: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400',
          gradient: 'from-slate-400 to-slate-500',
          border: 'border-slate-200',
          label: 'Осмотр'
        }
    }
  }

  // ЗУБЫ ПО КВАДРАНТАМ
  const upperRight = teeth.filter(t => t.quadrant === 1).sort((a, b) => b.id - a.id) // 18 -> 11
  const upperLeft = teeth.filter(t => t.quadrant === 2).sort((a, b) => a.id - b.id)  // 21 -> 28
  const lowerRight = teeth.filter(t => t.quadrant === 4).sort((a, b) => b.id - a.id) // 48 -> 41
  const lowerLeft = teeth.filter(t => t.quadrant === 3).sort((a, b) => a.id - b.id)  // 31 -> 38

  // Рендер кнопки зуба в компактном адаптивном виде (100% без выхода за границы)
  const renderToothCardCompact = (tooth: Tooth) => {
    const isSelected = selectedTooth.id === tooth.id
    const meta = getStatusMeta(tooth.status)
    const matchesFilter = activeFilter === 'all' || tooth.status === activeFilter

    return (
      <button
        key={tooth.id}
        type="button"
        onClick={() => setSelectedTooth(tooth)}
        title={`${tooth.id}: ${tooth.name} (${meta.label})`}
        className={`group relative flex flex-col items-center justify-between p-1 sm:p-2 rounded-xl transition-all duration-150 cursor-pointer w-full min-w-0 border ${
          isSelected
            ? 'ring-2 ring-cyan-500 bg-cyan-50/95 border-cyan-400 shadow-md scale-105 z-20'
            : matchesFilter
            ? 'bg-white hover:bg-slate-50 border-slate-200 hover:border-cyan-300 shadow-xs'
            : 'bg-slate-50 border-slate-100 opacity-35'
        }`}
      >
        {/* Top: Tooth Number + Dot */}
        <div className="flex items-center justify-between w-full px-0.5">
          <span className={`text-[10px] sm:text-[11px] font-black tracking-tight ${isSelected ? 'text-cyan-700' : 'text-slate-800'}`}>
            {tooth.id}
          </span>
          <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${meta.dot}`} />
        </div>

        {/* Center: Anatomical SVG */}
        <div className="my-0.5 sm:my-1 relative w-6 h-8 sm:w-8 sm:h-10 flex items-center justify-center">
          <svg viewBox="0 0 36 44" className="w-full h-full drop-shadow-xs">
            <path
              d={
                tooth.type === 'molar'
                  ? 'M6 8 C6 3, 30 3, 30 8 C34 16, 33 28, 28 42 C24 36, 21 24, 18 24 C15 24, 12 36, 8 42 C3 28, 2 16, 6 8 Z'
                  : tooth.type === 'premolar'
                  ? 'M8 8 C8 3, 28 3, 28 8 C32 16, 31 30, 24 42 C20 34, 18 26, 18 26 C18 26, 16 34, 12 42 C5 30, 4 16, 8 8 Z'
                  : tooth.type === 'canine'
                  ? 'M10 8 C12 2, 24 2, 26 8 C30 18, 28 34, 18 42 C8 34, 6 18, 10 8 Z'
                  : 'M8 6 C8 2, 28 2, 28 6 C31 16, 29 32, 18 42 C7 32, 5 16, 8 6 Z'
              }
              fill={isSelected ? '#0EA5E9' : tooth.status === 'missing' ? '#E2E8F0' : '#FFFFFF'}
              stroke={isSelected ? '#0284C7' : '#94A3B8'}
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
            
            {tooth.status !== 'missing' && (
              <path
                d="M10 10 C12 6, 24 6, 26 10 C27 13, 27 16, 25 18 C20 16, 16 16, 11 18 C9 16, 9 13, 10 10 Z"
                fill={isSelected ? '#38BDF8' : '#F8FAFC'}
                opacity={0.85}
              />
            )}

            {tooth.status === 'caries' && (
              <circle cx="18" cy="14" r="3.5" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            )}
            {tooth.status === 'pulpitis' && (
              <circle cx="18" cy="15" r="4" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
            )}
            {tooth.status === 'implant' && (
              <path d="M14 26 L22 26 M15 30 L21 30 M16 34 L20 34 M17 38 L19 38" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" />
            )}
            {tooth.status === 'crown' && (
              <path d="M11 10 L14 16 L18 10 L22 16 L25 10" stroke="#6366F1" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            )}
          </svg>
        </div>

        {/* Bottom indicator */}
        <span className={`text-[9px] font-bold truncate w-full text-center leading-none ${
          isSelected ? 'text-cyan-800' : 'text-slate-500'
        }`}>
          {tooth.type === 'molar' ? 'Мол.' : tooth.type === 'premolar' ? 'Прем.' : tooth.type === 'canine' ? 'Клык' : 'Рез.'}
        </span>
      </button>
    )
  }

  // Рендер зуба в крупном плиточном виде для режима квадрантов (4x2 на телефон)
  const renderToothCardLarge = (tooth: Tooth) => {
    const isSelected = selectedTooth.id === tooth.id
    const meta = getStatusMeta(tooth.status)

    return (
      <button
        key={tooth.id}
        type="button"
        onClick={() => setSelectedTooth(tooth)}
        className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
          isSelected
            ? 'border-cyan-500 bg-cyan-50 ring-2 ring-cyan-400 shadow-sm'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          <span className="text-base font-black text-slate-900">#{tooth.id}</span>
          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${meta.bg}`}>
            {meta.label}
          </span>
        </div>

        <div className="my-2 flex items-center gap-2">
          <div className="w-8 h-10 flex-shrink-0">
            <svg viewBox="0 0 36 44" className="w-full h-full">
              <path
                d={
                  tooth.type === 'molar'
                    ? 'M6 8 C6 3, 30 3, 30 8 C34 16, 33 28, 28 42 C24 36, 21 24, 18 24 C15 24, 12 36, 8 42 C3 28, 2 16, 6 8 Z'
                    : tooth.type === 'premolar'
                    ? 'M8 8 C8 3, 28 3, 28 8 C32 16, 31 30, 24 42 C20 34, 18 26, 18 26 C18 26, 16 34, 12 42 C5 30, 4 16, 8 8 Z'
                    : tooth.type === 'canine'
                    ? 'M10 8 C12 2, 24 2, 26 8 C30 18, 28 34, 18 42 C8 34, 6 18, 10 8 Z'
                    : 'M8 6 C8 2, 28 2, 28 6 C31 16, 29 32, 18 42 C7 32, 5 16, 8 6 Z'
                }
                fill={isSelected ? '#0EA5E9' : '#FFFFFF'}
                stroke={isSelected ? '#0284C7' : '#64748B'}
                strokeWidth="1.75"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">{tooth.name}</p>
            <p className="text-[11px] text-cyan-600 font-semibold truncate">
              {tooth.treatments[0]?.price ? formatCurrency(tooth.treatments[0].price) : 'Осмотр'}
            </p>
          </div>
        </div>
      </button>
    )
  }

  const getQuadrantTeeth = (q: 1 | 2 | 3 | 4) => {
    switch (q) {
      case 1: return upperRight
      case 2: return upperLeft
      case 3: return lowerLeft
      case 4: return lowerRight
    }
  }

  return (
    <section id="odontogram" className="py-14 sm:py-20 bg-slate-50/70 border-y border-slate-200 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full max-w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Цифровая одонтограмма взрослого прикуса (FDI)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Интерактивная карта 32 зубов
          </h2>
          <p className="mt-2 text-xs sm:text-base text-slate-600">
            Нажмите на любой зуб для просмотра клинического состояния, плана лечения и точной стоимости.
          </p>
        </div>

        {/* View Mode & Filter Controls */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-soft mb-6 space-y-3 w-full max-w-full overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
            {/* View Switcher: Full Arch vs Large Quadrant */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => setViewMode('full')}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex-1 sm:flex-initial ${
                  viewMode === 'full'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-cyan-600" />
                <span>Анатомическая дуга</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('quadrant')}
                className={`flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex-1 sm:flex-initial ${
                  viewMode === 'quadrant'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5 text-cyan-600" />
                <span>По квадрантам (Крупно)</span>
              </button>
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 w-full sm:w-auto justify-start sm:justify-end text-xs">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap text-[11px] sm:text-xs ${
                  activeFilter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Все
              </button>
              {[
                { id: 'healthy', label: 'Здоровые', color: 'bg-emerald-500' },
                { id: 'caries', label: 'Кариес', color: 'bg-amber-500' },
                { id: 'pulpitis', label: 'Пульпит', color: 'bg-rose-500' },
                { id: 'crown', label: 'Коронки', color: 'bg-indigo-500' },
                { id: 'implant', label: 'Импланты', color: 'bg-cyan-500' }
              ].map(f => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFilter(f.id as ToothStatus)}
                  className={`px-2 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap text-[11px] sm:text-xs ${
                    activeFilter === f.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${f.color}`} />
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sub-tabs if quadrant view is active */}
          {viewMode === 'quadrant' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-2 border-t border-slate-100">
              {[
                { q: 1 as const, name: 'Верх Право (18–11)' },
                { q: 2 as const, name: 'Верх Лево (21–28)' },
                { q: 4 as const, name: 'Низ Право (48–41)' },
                { q: 3 as const, name: 'Низ Лево (31–38)' }
              ].map(item => (
                <button
                  key={item.q}
                  type="button"
                  onClick={() => setActiveQuadrant(item.q)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                    activeQuadrant === item.q
                      ? 'bg-cyan-600 text-white shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Main Grid: Odontogram Chart (Left) + Detailed Diagnostic Blueprint (Right) */}
        <div className="grid lg:grid-cols-12 gap-6 items-start w-full max-w-full overflow-hidden">
          
          {/* Odontogram Interactive Container */}
          <div className="lg:col-span-7 bg-white p-3.5 sm:p-6 rounded-3xl border border-slate-200 shadow-soft w-full max-w-full overflow-hidden">
            
            {viewMode === 'full' ? (
              /* Full Jaw View: 100% responsive, zero horizontal overflow */
              <div className="space-y-4 w-full max-w-full overflow-hidden">
                
                {/* UPPER JAW */}
                <div className="space-y-2 w-full max-w-full overflow-hidden">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-600 pb-1 border-b border-slate-100">
                    <span className="flex items-center gap-1 text-cyan-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                      Верхняя челюсть (Правая)
                    </span>
                    <span className="flex items-center gap-1 text-cyan-800">
                      (Левая)
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                    </span>
                  </div>

                  {/* Desktop view (16 columns across) */}
                  <div className="hidden md:grid grid-cols-16 gap-1 w-full max-w-full">
                    {/* Quadrant 1: 18 -> 11 */}
                    <div className="col-span-8 grid grid-cols-8 gap-1 pr-1 border-r border-dashed border-slate-300">
                      {upperRight.map(renderToothCardCompact)}
                    </div>
                    {/* Quadrant 2: 21 -> 28 */}
                    <div className="col-span-8 grid grid-cols-8 gap-1 pl-1">
                      {upperLeft.map(renderToothCardCompact)}
                    </div>
                  </div>

                  {/* Mobile view (2 separate 8-column rows fitting 100% in screen width) */}
                  <div className="md:hidden space-y-2 w-full max-w-full">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold mb-1">Зубы 18–11 (Правый сектор):</div>
                      <div className="grid grid-cols-8 gap-1 w-full max-w-full">
                        {upperRight.map(renderToothCardCompact)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold mb-1">Зубы 21–28 (Левый сектор):</div>
                      <div className="grid grid-cols-8 gap-1 w-full max-w-full">
                        {upperLeft.map(renderToothCardCompact)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* DIVIDER: OCCLUSION SMILE LINE */}
                <div className="relative my-3 flex items-center justify-center w-full">
                  <div className="w-full border-t border-slate-200"></div>
                  <span className="absolute bg-slate-100 px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider border border-slate-200 whitespace-nowrap">
                    Линия смыкания прикуса
                  </span>
                </div>

                {/* LOWER JAW */}
                <div className="space-y-2 w-full max-w-full overflow-hidden">
                  <div className="flex items-center justify-between text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-600 pb-1 border-b border-slate-100">
                    <span className="flex items-center gap-1 text-teal-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                      Нижняя челюсть (Правая)
                    </span>
                    <span className="flex items-center gap-1 text-teal-800">
                      (Левая)
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                    </span>
                  </div>

                  {/* Desktop view (16 columns across) */}
                  <div className="hidden md:grid grid-cols-16 gap-1 w-full max-w-full">
                    {/* Quadrant 4: 48 -> 41 */}
                    <div className="col-span-8 grid grid-cols-8 gap-1 pr-1 border-r border-dashed border-slate-300">
                      {lowerRight.map(renderToothCardCompact)}
                    </div>
                    {/* Quadrant 3: 31 -> 38 */}
                    <div className="col-span-8 grid grid-cols-8 gap-1 pl-1">
                      {lowerLeft.map(renderToothCardCompact)}
                    </div>
                  </div>

                  {/* Mobile view (2 separate 8-column rows fitting 100% in screen width) */}
                  <div className="md:hidden space-y-2 w-full max-w-full">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold mb-1">Зубы 48–41 (Правый сектор):</div>
                      <div className="grid grid-cols-8 gap-1 w-full max-w-full">
                        {lowerRight.map(renderToothCardCompact)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold mb-1">Зубы 31–38 (Левый сектор):</div>
                      <div className="grid grid-cols-8 gap-1 w-full max-w-full">
                        {lowerLeft.map(renderToothCardCompact)}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* Large Quadrant View (4 columns x 2 rows, perfectly thumb-friendly) */
              <div className="space-y-4 w-full max-w-full overflow-hidden">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-700">
                    Квадрант #{activeQuadrant} ({getQuadrantTeeth(activeQuadrant)[0]?.name} и прилежащие)
                  </span>
                  <span className="text-[11px] text-cyan-600 font-bold">8 зубов сектора</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-full">
                  {getQuadrantTeeth(activeQuadrant).map(renderToothCardLarge)}
                </div>
              </div>
            )}

            {/* Helper Hint */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100 mt-4">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
                <span>Нажмите на зуб для загрузки плана лечения</span>
              </span>
              <span className="font-semibold text-slate-400 hidden sm:inline">
                Стандарт FDI World Dental
              </span>
            </div>

          </div>

          {/* Right Card: Diagnosis & Treatment Blueprint for Selected Tooth */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 w-full max-w-full overflow-hidden">
            <div className="bg-white rounded-3xl border-2 border-cyan-500/40 p-5 sm:p-7 shadow-card space-y-5 w-full max-w-full overflow-hidden">
              
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Зуб #{selectedTooth.id}
                    </span>
                    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${getStatusMeta(selectedTooth.status).bg}`}>
                      {getStatusMeta(selectedTooth.status).label}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-800 mt-1">
                    {selectedTooth.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {selectedTooth.jaw === 'upper' ? 'Верхняя челюсть' : 'Нижняя челюсть'} • Квадрант {selectedTooth.quadrant}
                  </p>
                </div>

                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-cyan-50 to-teal-50 text-cyan-700 flex items-center justify-center font-black text-lg sm:text-xl border border-cyan-200/80 shadow-xs flex-shrink-0">
                  #{selectedTooth.id}
                </div>
              </div>

              {/* Condition Diagnostic Note */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-600" />
                  Клиническая картина:
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-snug font-semibold">
                  {selectedTooth.conditionDescription}
                </p>
              </div>

              {/* Available Treatments */}
              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-600" />
                  Рекомендуемые процедуры:
                </h4>

                <div className="space-y-2.5">
                  {selectedTooth.treatments.map((treatment: TreatmentOption, idx: number) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/40 transition-all group"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                          {treatment.name}
                        </h5>
                        <span className="text-sm sm:text-base font-black text-cyan-600 flex-shrink-0">
                          {treatment.price === 0 ? 'Бесплатно' : formatCurrency(treatment.price)}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {treatment.description}
                      </p>

                      <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                        <span className="flex items-center gap-1 font-medium text-[11px]">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {treatment.duration}
                        </span>

                        {treatment.warranty && (
                          <span className="flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                            <Shield className="w-3 h-3" />
                            {treatment.warranty}
                          </span>
                        )}

                        <button
                          type="button"
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

              {/* Primary CTA */}
              <button
                type="button"
                onClick={() => onSelectToothForBooking(selectedTooth.id, selectedTooth.treatments[0]?.name)}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-extrabold text-sm shadow-soft hover:shadow-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Записаться на зуб #{selectedTooth.id}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
