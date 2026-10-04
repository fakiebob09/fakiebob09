import React, { useState, useEffect } from 'react';
import { ClientInquiry } from '../types/portfolio';
import { X, Send, CheckCircle2, Coffee } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
  onSubmitInquiry: (inquiry: Omit<ClientInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  projectName,
  onSubmitInquiry
}) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [contactMethod, setContactMethod] = useState<'telegram' | 'email' | 'phone'>('telegram');
  const [projectType, setProjectType] = useState(
    projectName ? `Проект похожий на "${projectName}"` : 'Веб-дизайн & Разработка'
  );
  const [budget, setBudget] = useState('150 000 — 300 000 ₽');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (projectName) {
      setProjectType(`Проект похожий на "${projectName}"`);
      setMessage(`Здравствуйте! Хотели бы обсудить разработку проекта, похожего на кейс "${projectName}". `);
    }
  }, [projectName]);

  if (!isOpen) return null;

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
      message: message.trim(),
      projectName
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#1b1316] border border-[#3d262b] rounded-3xl shadow-[0_20px_60px_rgba(20,10,12,0.7)] overflow-hidden z-10 p-5 sm:p-8 space-y-5 my-auto backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-[#2d1e21] pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#24171a] text-[#ffd166] font-mono text-[10px] rounded-full border border-[#ffb703]/30 mb-1">
              <Coffee className="w-3 h-3 text-[#ffb703]" />
              <span>ОБСУЖДЕНИЕ ЗАДАЧИ</span>
            </div>
            <h3 className="text-xl font-bold text-[#fbf8f5] font-display uppercase tracking-tight">
              {projectName ? 'Обсудить похожий кейс' : 'Обсудить проект'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#24171a] hover:bg-[#c14a38] text-[#ffd166] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-14 h-14 bg-gradient-to-br from-[#ffb703] to-[#c14a38] rounded-2xl text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white font-display uppercase">
              Заявка отправлена!
            </h4>
            <p className="text-xs text-[#d8c8bc] font-sans">
              Я свяжусь с вами в указанный контакт в течение пары часов.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-mono font-medium text-[#ffd166]/80">
                Ваше имя *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван или Анна"
                className="w-full px-3.5 py-2.5 text-xs bg-[#140f11] border border-[#3d262b] focus:border-[#c14a38] rounded-xl text-white placeholder:text-[#8a7266] outline-none transition-colors"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-mono font-medium text-[#ffd166]/80">
                  Контакт для связи *
                </label>
                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => setContactMethod('telegram')}
                    className={`hover:text-white ${contactMethod === 'telegram' ? 'text-[#ffb703] font-bold' : 'text-[#8a7266]'}`}
                  >
                    Telegram
                  </button>
                  <span className="text-[#3d262b]">•</span>
                  <button
                    type="button"
                    onClick={() => setContactMethod('email')}
                    className={`hover:text-white ${contactMethod === 'email' ? 'text-[#ffb703] font-bold' : 'text-[#8a7266]'}`}
                  >
                    Email
                  </button>
                </div>
              </div>
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={
                  contactMethod === 'telegram' ? '@username или ссылка' : 'name@company.com'
                }
                className="w-full px-3.5 py-2.5 text-xs bg-[#140f11] border border-[#3d262b] focus:border-[#c14a38] rounded-xl text-white placeholder:text-[#8a7266] outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-mono font-medium text-[#ffd166]/80">
                  Тип задачи
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-[#140f11] border border-[#3d262b] focus:border-[#c14a38] rounded-xl text-white outline-none cursor-pointer"
                >
                  <option value="Веб-дизайн & Разработка">Веб-дизайн & Разработка</option>
                  <option value="UI/UX мобильного сервиса">UI/UX мобильного сервиса</option>
                  <option value="Брендинг и айдентика">Брендинг и айдентика</option>
                  <option value="3D рендеры & Арт">3D рендеры & Арт</option>
                  <option value="Другое">Другое</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-mono font-medium text-[#ffd166]/80">
                  Бюджет
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-[#140f11] border border-[#3d262b] focus:border-[#c14a38] rounded-xl text-white outline-none cursor-pointer"
                >
                  <option value="до 150 000 ₽">до 150 000 ₽</option>
                  <option value="150 000 — 300 000 ₽">150 000 — 300 000 ₽</option>
                  <option value="300 000 — 600 000 ₽">300 000 — 600 000 ₽</option>
                  <option value="от 600 000 ₽">от 600 000 ₽</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono font-medium text-[#ffd166]/80">
                Комментарий к задаче *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Опишите задачу или пришлите ссылки на материалы..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#140f11] border border-[#3d262b] focus:border-[#c14a38] rounded-xl text-white placeholder:text-[#8a7266] outline-none resize-none transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-6 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#c14a38] to-[#9e3424] hover:from-[#d45d47] hover:to-[#c14a38] rounded-xl shadow-[0_4px_16px_rgba(193,74,56,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Отправить бриф</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
