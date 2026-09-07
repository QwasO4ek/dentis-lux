import React, { useState } from 'react'
import { Star, ChevronDown, CheckCircle2, MessageCircle, HelpCircle } from 'lucide-react'

export const ReviewsAndFaq: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const reviews = [
    {
      name: 'Мария В.',
      date: 'Вчера',
      text: 'Делала комплексную установку 8 виниров E.max у доктора Виктории Лазаревой. Это невероятно! Никакой неестественной «санфаянсовой» белизны, улыбка выглядит натурально и сияет. Очень понравилась интерактивная зубная карта на сайте, сразу понимаешь, что будут делать с каждым зубом.',
      rating: 5,
      service: 'Керамические виниры E.max',
      source: 'Яндекс.Карты'
    },
    {
      name: 'Константин Д.',
      date: '3 дня назад',
      text: 'Всю жизнь боялся стоматологов до дрожи. В DENTIS LUX удалили два сложных зуба мудрости и поставили имплант Straumann под легкой седацией. Я просто поспал 40 минут и проснулся без боли и стресса. Доктор Воронов — хирург от Бога!',
      rating: 5,
      service: 'Имплантация Straumann во сне',
      source: 'ПроДокторов'
    },
    {
      name: 'Екатерина Соколова',
      date: 'Неделю назад',
      text: 'Прохожу лечение на элайнерах Spark у Елены Родионовой. Каппы абсолютно невидимые, коллеги на работе даже не заметили. Удобно, что через личный кабинет на сайте всегда видно следующий визит и прогресс лечения.',
      rating: 5,
      service: 'Элайнеры Spark',
      source: '2ГИС'
    }
  ]

  const faqs = [
    {
      q: 'Действительно ли лечение проходит без боли?',
      a: 'Абсолютно. Мы применяем компьютерную анестезию STA (Single Tooth Anesthesia), которая рассчитывает дозу с микропроцессорной точностью без неприятного распирания десны. Для тревожных пациентов доступна безопасная седация закисью азота или медикаментозный сон.'
    },
    {
      q: 'Какая гарантия предоставляется на импланты и коронки?',
      a: 'На швейцарские импланты Straumann и Nobel Biocare действует официальная пожизненная международная гарантия производителя с выдачей индивидуального паспорта имплантата. На керамические виниры и циркониевые коронки — расширенная гарантия клиники 10 лет.'
    },
    {
      q: 'Можно ли вернуть 13% налогового вычета за лечение?',
      a: 'Да! Наша клиника имеет высшую медицинскую лицензию. Администратор подготовит для вас полный пакет документов (справка об оплате медицинских услуг, копия лицензии, договор) для налоговой инспекции или приложения «Госуслуги» в день обращения.'
    },
    {
      q: 'Работаете ли вы со страховыми компаниями по ДМС?',
      a: 'Мы сотрудничаем со всеми ключевыми страховыми компаниями (СОГАЗ, Ингосстрах, АльфаСтрахование, РЕСО-Гарантия, ВСК). При наличии полиса ДМС ваш прием и лечение могут быть полностью или частично покрыты страховкой.'
    },
    {
      q: 'Как работает беспроцентная рассрочка 0-0-24?',
      a: 'Это прямая рассрочка без переплат: проценты за вас оплачивает клиника. Оформление занимает 2 минуты прямо у нас в клинике или онлайн через калькулятор на сайте. Первый взнос — 0 ₽.'
    }
  ]

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Reviews Sub-section */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold mb-3 border border-cyan-200">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Реальные истории пациентов</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Отзывы о лечении в DENTIS LUX
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3 text-sm text-slate-600">
              <div className="flex text-amber-400">★★★★★</div>
              <span className="font-bold text-slate-900">4.98 из 5</span>
              <span>на основе более 1 400 оценок</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-soft flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 text-sm">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-md">
                      {rev.source}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    «{rev.text}»
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-xs text-slate-900">{rev.name}</h5>
                    <p className="text-[11px] text-slate-500">{rev.service}</p>
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Sub-section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Ответы на главные вопросы</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Часто задаваемые вопросы
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left font-bold text-sm sm:text-base text-slate-900 flex justify-between items-center gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-cyan-600 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
