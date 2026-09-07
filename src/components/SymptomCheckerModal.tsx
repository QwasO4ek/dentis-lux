import React, { useState } from 'react'
import { symptomsData } from '../data/dentalData'
import { Symptom } from '../types'
import { X, AlertTriangle, ShieldAlert, CheckCircle2, ArrowRight, HeartPulse, Sparkles, PhoneCall } from 'lucide-react'

interface SymptomCheckerModalProps {
  isOpen: boolean
  onClose: () => void
  onBookUrgent: (serviceName: string, isEmergency: boolean) => void
}

export const SymptomCheckerModal: React.FC<SymptomCheckerModalProps> = ({
  isOpen,
  onClose,
  onBookUrgent
}) => {
  const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(symptomsData[0])
  const [painDuration, setPainDuration] = useState<string>('today')
  const [swellingPresent, setSwellingPresent] = useState<boolean>(false)

  if (!isOpen) return null

  const isEmergency = selectedSymptom?.severity === 'emergency' || swellingPresent

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-800 to-slate-900 text-white p-6 sm:p-8 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-extrabold uppercase tracking-wider mb-2">
              <HeartPulse className="w-4 h-4 animate-pulse" />
              <span>Интеллектуальный клинический триаж симптомов</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Что вас беспокоит? Экспресс-диагностика боли
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Определите срочность обращения и получите рекомендации первой помощи до осмотра врачом.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Step 1: Select Main Symptom */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Шаг 1: Выберите основной симптом
            </label>

            <div className="grid sm:grid-cols-2 gap-3">
              {symptomsData.map((symp) => {
                const isSelected = selectedSymptom?.id === symp.id
                return (
                  <button
                    key={symp.id}
                    onClick={() => setSelectedSymptom(symp)}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-50/70 ring-2 ring-cyan-400 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl flex-shrink-0 ${
                        symp.severity === 'emergency'
                          ? 'bg-rose-100 text-rose-600'
                          : symp.severity === 'urgent'
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-cyan-100 text-cyan-600'
                      }`}>
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900 leading-snug">
                          {symp.title}
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {symp.description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: Clarification Questions */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Шаг 2: Уточняющие клинические вопросы
            </label>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-700 block mb-2">
                  Как давно возникли симптомы?
                </span>
                <div className="flex gap-2">
                  {[
                    { id: 'today', label: 'Сегодня / Остро' },
                    { id: 'few-days', label: '2–3 дня' },
                    { id: 'week', label: 'Давно' }
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setPainDuration(d.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        painDuration === d.id
                          ? 'bg-cyan-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-700 block mb-2">
                  Есть ли припухлость десны или отек щеки?
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSwellingPresent(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      !swellingPresent
                        ? 'bg-slate-800 text-white'
                        : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    Нет отека
                  </button>
                  <button
                    onClick={() => setSwellingPresent(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      swellingPresent
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-white border border-rose-200 text-rose-700 hover:bg-rose-50'
                    }`}
                  >
                    ⚠️ Да, есть отек
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Triage Result & First Aid Guidance */}
          {selectedSymptom && (
            <div className={`p-6 rounded-2xl border-2 space-y-4 ${
              isEmergency
                ? 'bg-rose-50/90 border-rose-300'
                : selectedSymptom.severity === 'urgent'
                ? 'bg-amber-50/90 border-amber-300'
                : 'bg-cyan-50/90 border-cyan-300'
            }`}>
              {/* Urgency Badge */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide text-white ${
                    isEmergency
                      ? 'bg-rose-600 animate-pulse'
                      : selectedSymptom.severity === 'urgent'
                      ? 'bg-amber-600'
                      : 'bg-cyan-600'
                  }`}>
                    {isEmergency
                      ? '🚨 Требуется срочный визит в течение 30–60 минут'
                      : selectedSymptom.severity === 'urgent'
                      ? '⚠️ Рекомендуется прием в течение 24 часов'
                      : '✅ Стандартная плановая запись'}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-700">
                  Ориентировочная стоимость: <span className="text-cyan-700 font-extrabold">{selectedSymptom.estimatedCost}</span>
                </div>
              </div>

              {/* Doctor recommendation */}
              <div className="text-sm font-semibold text-slate-800">
                Рекомендованный специалист: <span className="text-cyan-700 font-bold">{selectedSymptom.recommendedDoctor}</span>
              </div>

              {/* Instructions */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-slate-700" />
                  Памятка первой помощи до прихода в клинику:
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedSymptom.firstAidInstructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 mt-1.5 flex-shrink-0" />
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Footer CTAs */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href="tel:+74951203300"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-cyan-600" />
            <span>Связаться с дежурным врачом</span>
          </a>

          <button
            onClick={() => {
              if (selectedSymptom) {
                onBookUrgent(selectedSymptom.recommendedService, isEmergency)
              }
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-sm shadow-soft hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Записаться на прием прямо сейчас</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  )
}
