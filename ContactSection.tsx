import React, { useState } from 'react';
import { AuthorProfile, ClientInquiry } from '../types/portfolio';
import { Send, CheckCircle2, MessageCircle, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { TelegramIcon } from './TelegramIcon';

interface ContactSectionProps {
  profile: AuthorProfile;
  onSubmitInquiry: (inquiry: Omit<ClientInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  onSubmitInquiry
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [contactMethod, setContactMethod] = useState<'telegram' | 'email' | 'phone'>('telegram');
  const [projectType, setProjectType] = useState('Веб-сайт под ключ');
  const [budget, setBudget] = useState('150 000 — 300 000 ₽');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !message.trim()) {
      alert('Пожалуйста, заполните имя, контакт для связи и текст сообщения');
      return;
    }

    onSubmitInquiry({
      name: name.trim(),
      contact: contact.trim(),
      contactMethod,
      projectType,
      budget,
      message: message.trim()
    });

    setIsSubmitted(true);
    setName('');
    setContact('');
    setMessage('');
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contacts" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left Column: Direct Links & Warm Brick Studio Atmosphere */}
        <div className="lg:col-span-5 space-y-6 p-6 sm:p-8 rounded-3xl bg-[#161013]/85 backdrop-blur-xl border border-[#ffb703]/20 shadow-[0_16px_50px_rgba(0,0,0,0.4)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#24171b] border border-[#ffb703]/40 rounded-full text-xs font-mono font-medium text-[#ffd166]">
            <TelegramIcon className="w-3.5 h-3.5 text-[#ffb703]" />
            <span>ОБЩЕНИЕ И СВЯЗЬ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display uppercase tracking-tight leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Давайте создадим что-то живое и настоящее
          </h2>

          <p className="text-sm text-[#f0e6df] font-sans leading-relaxed">
            Напишите напрямую в Telegram или заполните форму. Я всегда рад новым знакомствам, спокойным и интересным проектам.
          </p>

          {/* Quick Direct Links */}
          <div className="space-y-3 pt-2">
            <a
              href={`https://t.me/${profile.telegram.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              className="p-4 bg-[#1b1316] hover:bg-[#24171a] border border-[#3d262b] hover:border-[#ffb703]/50 rounded-2xl flex items-center justify-between transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#23171a] flex items-center justify-center text-[#ffb703]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#ffd166]/70 uppercase">Telegram (Быстрый ответ)</div>
                  <div className="text-sm font-bold text-white group-hover:text-[#ffd166] transition-colors">
                    {profile.telegram}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#ffb703]/60 group-hover:text-white transition-colors" />
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="p-4 bg-[#1b1316] hover:bg-[#24171a] border border-[#3d262b] hover:border-[#ffb703]/50 rounded-2xl flex items-center justify-between transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#23171a] flex items-center justify-center text-[#ea7a65]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#ffd166]/70 uppercase">Электронная почта</div>
                  <div className="text-sm font-bold text-white group-hover:text-[#ffd166] transition-colors">
                    {profile.email}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#ffb703]/60 group-hover:text-white transition-colors" />
            </a>

            <a
              href={`tel:${profile.phone}`}
              className="p-4 bg-[#1b1316] hover:bg-[#24171a] border border-[#3d262b] hover:border-[#ffb703]/50 rounded-2xl flex items-center justify-between transition-all group shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#23171a] flex items-center justify-center text-[#ffd166]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#ffd166]/70 uppercase">Телефон для связи</div>
                  <div className="text-sm font-bold text-white group-hover:text-[#ffd166] transition-colors">
                    {profile.phone}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#ffb703]/60 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        {/* Right Column: Warm Brick Brief Form */}
        <div className="lg:col-span-7 bg-[#1b1316]/95 border border-[#3d262b] rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_16px_50px_rgba(20,10,12,0.5)]">
          <h3 className="text-xl font-bold text-[#fbf8f5] font-display mb-1">
            Отправить бриф или вопрос
          </h3>
          <p className="text-xs text-[#c8b7a6] mb-6 font-normal">
            Расскажите в паре предложений о вашей задумке — я изучу детали и отвечу вам без лишних проволочек.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium text-[#ffd166]/80 mb-1.5">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Иван или Анна"
                  className="w-full bg-[#140f11] border border-[#3d262b] focus:border-[#c14a38] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-[#8a7266] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#ffd166]/80 mb-1.5">
                  Контакт для связи *
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="@username или email"
                  className="w-full bg-[#140f11] border border-[#3d262b] focus:border-[#c14a38] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-[#8a7266] outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-medium text-[#ffd166]/80 mb-1.5">
                  Тип задачи
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-[#140f11] border border-[#3d262b] focus:border-[#c14a38] rounded-xl px-3 py-2.5 text-xs text-white outline-none transition-colors cursor-pointer"
                >
                  <option value="Веб-сайт под ключ">Веб-сайт под ключ</option>
                  <option value="UI/UX дизайн сервиса / SaaS">UI/UX дизайн сервиса / SaaS</option>
                  <option value="Редизайн существующего продукта">Редизайн существующего продукта</option>
                  <option value="Брендинг и фирменный стиль">Брендинг и фирменный стиль</option>
                  <option value="Консультация / Аудит">Консультация / Аудит</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#ffd166]/80 mb-1.5">
                  Ориентировочный бюджет
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-[#140f11] border border-[#3d262b] focus:border-[#c14a38] rounded-xl px-3 py-2.5 text-xs text-white outline-none transition-colors cursor-pointer"
                >
                  <option value="до 150 000 ₽">до 150 000 ₽</option>
                  <option value="150 000 — 300 000 ₽">150 000 — 300 000 ₽</option>
                  <option value="300 000 — 600 000 ₽">300 000 — 600 000 ₽</option>
                  <option value="от 600 000 ₽">от 600 000 ₽</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-[#ffd166]/80 mb-1.5">
                Суть проекта и пожелания *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Опишите задачу или пришлите ссылки на материалы..."
                className="w-full bg-[#140f11] border border-[#3d262b] focus:border-[#c14a38] rounded-xl p-3.5 text-xs text-white placeholder:text-[#8a7266] outline-none transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-[#c14a38] to-[#9e3424] hover:from-[#d45d47] hover:to-[#c14a38] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-[0_4px_16px_rgba(193,74,56,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Отправить заявку в студию</span>
              </button>
            </div>

            {isSubmitted && (
              <div className="p-3 bg-[#23171a] border border-[#ffb703]/50 rounded-xl text-[#ffd166] text-xs font-sans flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-[#ffb703] shrink-0" />
                <span>Спасибо! Заявка успешно отправлена. Отвечу вам в течение пары часов.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
