import React from 'react'
import { Shield, Sparkles, CheckCircle, Cpu, Eye, Microscope } from 'lucide-react'

export const SterilizationStandards: React.FC = () => {
  const standards = [
    {
      icon: Shield,
      title: 'Стерилизация Melag Class B (Германия)',
      desc: '5-ступенчатая предстерилизационная очистка и автоклавирование при 134°C с фракционированным вакуумом. Индивидуальный крафт-пакет вскрывается строго при вас.'
    },
    {
      icon: Microscope,
      title: 'Оптика Carl Zeiss (Германия)',
      desc: 'Операционные микроскопы с 30-кратным увеличением позволяют сохранить до 99% здоровых тканей и найти скрытые микроканалы корня, невидимые глазу.'
    },
    {
      icon: Cpu,
      title: 'Цифровой 3D-сканер 3Shape Trios',
      desc: 'Забудьте о неприятных слепочных массах. Цифровой сканер сканирует челюсть за 60 секунд с точностью до 7 микрон и сразу строит 3D модель в цвете.'
    },
    {
      icon: Eye,
      title: '3D Компьютерная томография KaVo',
      desc: 'Сверхнизкая доза облучения (меньше, чем при 2-часовом авиаперелете) и детализация костной ткани в формате Ultra HD для безопасной имплантации.'
    }
  ]

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Цифровая безопасность и европейский протокол</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Стандарты клиники: 100% стерильность и оборудование топ-уровня
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Мы не экономим на безопасности пациентов. Каждый инструмент проходит биологический контроль качества.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/20 transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-soft">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Security Pledge Banner */}
        <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-navy-800 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold">
                Программы «Анти-СПИД» и «Анти-Гепатит» активны в каждом кабинете
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Ежедневный бактериологический смыв и независимый контроль СЭС.
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold text-cyan-300 whitespace-nowrap">
            Сертификат ISO 9001:2015
          </div>
        </div>

      </div>
    </section>
  )
}
