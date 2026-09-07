import React, { useState, useEffect } from 'react'
import { mockPatientRecord } from '../data/dentalData'
import { BookingFormData } from '../types'
import { formatCurrency } from '../utils/calendarUtils'
import { X, User, FileText, Image as ImageIcon, Pill, Calendar, Award, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

interface PatientPortalModalProps {
  isOpen: boolean
  onClose: () => void
  onBookNext: () => void
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({
  isOpen,
  onClose,
  onBookNext
}) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'xrays' | 'prescriptions' | 'bookings'>('plan')
  const [localBookings, setLocalBookings] = useState<BookingFormData[]>([])

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = JSON.parse(localStorage.getItem('dentis_bookings') || '[]')
        setLocalBookings(stored)
      } catch (e) {
        console.error(e)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const patient = mockPatientRecord

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header: Patient Info Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-800 to-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-white text-xl font-black shadow-glow">
              АС
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight">{patient.patientName}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  {patient.patientId}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {patient.phone} • Статус карты: <span className="text-amber-400 font-semibold">{patient.discountLevel}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Бонусный баланс
              </span>
              <span className="text-base font-extrabold text-cyan-300">
                {patient.bonusPoints.toLocaleString()} баллов
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Next Visit Alert Banner */}
        {patient.nextAppointment && (
          <div className="bg-cyan-50 border-b border-cyan-100 p-4 sm:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
            <div className="flex items-center gap-2 text-cyan-900 font-medium">
              <Calendar className="w-4 h-4 text-cyan-600 flex-shrink-0" />
              <span>
                Ближайший запланированный визит:{' '}
                <b>{patient.nextAppointment.date} в {patient.nextAppointment.time}</b> —{' '}
                {patient.nextAppointment.doctor} ({patient.nextAppointment.procedure})
              </span>
            </div>
            <span className="text-cyan-700 font-bold sm:text-right">
              {patient.nextAppointment.branch}
            </span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 sm:px-8 gap-2 sm:gap-6 bg-slate-50/70 overflow-x-auto">
          <button
            onClick={() => setActiveTab('plan')}
            className={`py-3.5 px-2 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'plan'
                ? 'border-cyan-600 text-cyan-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Комплексный план лечения</span>
          </button>

          <button
            onClick={() => setActiveTab('xrays')}
            className={`py-3.5 px-2 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'xrays'
                ? 'border-cyan-600 text-cyan-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>3D Снимки и КТ</span>
          </button>

          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`py-3.5 px-2 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'prescriptions'
                ? 'border-cyan-600 text-cyan-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Pill className="w-4 h-4" />
            <span>Назначения и рецепты</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3.5 px-2 font-bold text-xs sm:text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'border-cyan-600 text-cyan-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>История записей ({localBookings.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          
          {/* 1. Treatment Plan */}
          {activeTab === 'plan' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                <span>Этапы утвержденного плана лечения:</span>
                <span>Статус выполнения</span>
              </div>

              <div className="space-y-3">
                {patient.treatmentPlan.map((stage, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{stage.stage}</span>
                        <span className="text-xs text-slate-500">({stage.tooth})</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium">
                        {stage.procedure} • Дата: {stage.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-sm font-black text-slate-800">
                        {formatCurrency(stage.cost)}
                      </span>

                      {stage.status === 'completed' && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Выполнено
                        </span>
                      )}
                      {stage.status === 'in_progress' && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 animate-spin" />
                          В процессе
                        </span>
                      )}
                      {stage.status === 'scheduled' && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                          Запланировано
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. 3D X-Rays & CBCT */}
          {activeTab === 'xrays' && (
            <div className="grid sm:grid-cols-2 gap-4">
              {patient.xrays.map((xr) => (
                <div key={xr.id} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 group">
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={xr.previewUrl}
                      alt={xr.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-3 text-xs font-bold text-white">
                      {xr.type}
                    </span>
                  </div>
                  <div className="p-4 bg-white">
                    <h5 className="font-bold text-sm text-slate-900">{xr.title}</h5>
                    <p className="text-xs text-slate-500 mt-0.5">Дата снимка: {xr.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 3. Prescriptions */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-3">
              {patient.prescriptions.map((rx, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-slate-900">{rx.medication}</h5>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {rx.dosage} • {rx.timing}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    rx.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {rx.active ? 'Принимать сейчас' : 'Курс завершен'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* 4. Local Bookings History */}
          {activeTab === 'bookings' && (
            <div className="space-y-3">
              {localBookings.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm">
                  В этой сессии записей еще не создавалось. Воспользуйтесь кнопкой «Записаться онлайн».
                </div>
              ) : (
                localBookings.map((b, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900">{b.service}</div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Врач: {b.doctor} • {b.date} в {b.time} {b.toothId ? `(Зуб #${b.toothId})` : ''}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800">
                      Подтверждено клиникой
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <span className="text-xs text-slate-500 font-medium">
            Демонстрационный режим личной медкарты DENTIS LUX
          </span>

          <button
            onClick={() => {
              onClose()
              onBookNext()
            }}
            className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-soft transition-colors cursor-pointer"
          >
            Записаться на следующий этап
          </button>
        </div>

      </div>
    </div>
  )
}
