import React from 'react';
import { BookOpenCheck, Users, Sparkles, FileText, Activity } from 'lucide-react';

interface HeaderProps {
  activeTab: 'analyzer' | 'history' | 'matrix' | 'guide';
  setActiveTab: (tab: 'analyzer' | 'history' | 'matrix' | 'guide') => void;
  savedCasesCount: number;
  highRiskCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCasesCount,
  highRiskCount,
}) => {
  return (
    <header className="bg-[#F9F8F6] border-b-2 border-[#1A1A1A] sticky top-0 z-30 pt-5 pb-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          
          {/* Logo & Editorial Brand Header */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-extrabold tracking-[0.25em] text-[#1A1A1A] bg-[#1A1A1A]/5 px-2.5 py-1 uppercase border border-[#1A1A1A]/20">
                Colombia • MEN Alerta Temprana (SIMPADE)
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif italic font-light tracking-tight uppercase text-[#1A1A1A] mt-2">
              V — Visión Clara
            </h1>
            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#666] uppercase mt-1">
              Núcleo Analítico de Alerta Temprana Escolar
            </p>
          </div>

          {/* Quick Metrics Bar & Editorial Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            
            {/* Quick Metrics */}
            <div className="flex items-center gap-3 text-xs bg-white px-3.5 py-1.5 border border-[#1A1A1A]/30">
              <div className="flex items-center gap-1.5 text-[#1A1A1A]">
                <Activity className="w-3.5 h-3.5 text-[#1A1A1A]" />
                <span className="text-[11px] font-medium uppercase tracking-wider">Casos: <strong className="font-bold">{savedCasesCount}</strong></span>
              </div>
              <div className="h-3 w-px bg-[#1A1A1A]/30" />
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C53030]" />
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#C53030]">Riesgo Alto: <strong className="font-bold">{highRiskCount}</strong></span>
              </div>
            </div>

            {/* Editorial Navigation Tabs */}
            <nav className="flex items-center flex-wrap gap-1.5">
              <button
                id="tab-analyzer-btn"
                onClick={() => setActiveTab('analyzer')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeTab === 'analyzer'
                    ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/40 hover:border-[#1A1A1A]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nuevo Análisis</span>
              </button>

              <button
                id="tab-history-btn"
                onClick={() => setActiveTab('history')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeTab === 'history'
                    ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/40 hover:border-[#1A1A1A]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Historial ({savedCasesCount})</span>
              </button>

              <button
                id="tab-matrix-btn"
                onClick={() => setActiveTab('matrix')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeTab === 'matrix'
                    ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/40 hover:border-[#1A1A1A]'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Matriz de Riesgo</span>
              </button>

              <button
                id="tab-guide-btn"
                onClick={() => setActiveTab('guide')}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeTab === 'guide'
                    ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#1A1A1A]'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/40 hover:border-[#1A1A1A]'
                }`}
              >
                <BookOpenCheck className="w-3.5 h-3.5" />
                <span>Orientaciones</span>
              </button>
            </nav>

          </div>

        </div>
      </div>
    </header>
  );
};

