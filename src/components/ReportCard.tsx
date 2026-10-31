import React, { useState } from 'react';
import { RiskAnalysisReport, RiskLevel } from '../types';
import { 
  Copy, 
  Check, 
  Printer, 
  Calendar, 
  UserCheck
} from 'lucide-react';

interface ReportCardProps {
  report: RiskAnalysisReport;
  onSaveReport?: (report: RiskAnalysisReport) => void;
  isSaved?: boolean;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, onSaveReport, isSaved = false }) => {
  const [copied, setCopied] = useState(false);

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'ALTO':
        return 'text-[#C53030]';
      case 'MEDIO':
        return 'text-amber-700';
      case 'BAJO':
      default:
        return 'text-emerald-700';
    }
  };

  const riskTextColor = getRiskColor(report.riskLevel);

  // Text for quick copy
  const formattedStandardText = `=================================================
REPORTE SAT ESCOLAR - VISIÓN CLARA
Estudiante: ${report.studentAlias} (${report.grade})
Fecha: ${report.timestamp}
=================================================

01. NIVEL DE RIESGO: ${report.riskLevel} (Índice: ${report.riskScore}/100)

02. SÍNTESIS DE FACTORES CRÍTICOS:
${report.criticalFactorsSynthesis}

03. PLAN DE ACCIÓN DOCENTE:
• ACCIÓN I: ${report.actionPlan[0]}
• ACCIÓN II: ${report.actionPlan[1]}

-------------------------------------------------
Indicadores clave: ${report.keyIndicatorsHighlight.join(' | ')}
Estrategia preventiva: ${report.preventiveCategory}
=================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedStandardText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#F9F8F6] text-[#1A1A1A] font-sans border-2 border-[#1A1A1A] p-6 sm:p-8 my-4 shadow-none">
      
      {/* Top Controls Bar (Hidden during print) */}
      <div className="flex items-center justify-between gap-3 pb-4 mb-6 border-b border-[#1A1A1A]/30 print:hidden">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold tracking-widest text-[#1A1A1A] uppercase bg-[#1A1A1A]/10 px-2 py-0.5 border border-[#1A1A1A]/20">
            EXPEDIENTE ANALÍTICO
          </span>
          <span className="text-xs text-[#555] flex items-center gap-1 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            {report.timestamp}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleCopy}
            id="btn-copy-report"
            className="px-3 py-1.5 bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white border border-[#1A1A1A] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
            title="Copiar informe"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Ficha</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            id="btn-print-report"
            className="px-3 py-1.5 bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white border border-[#1A1A1A] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>

          {onSaveReport && (
            <button
              onClick={() => onSaveReport(report)}
              id="btn-save-report"
              disabled={isSaved}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all border ${
                isSaved
                  ? 'bg-[#1A1A1A]/10 text-[#666] border-[#1A1A1A]/30 cursor-default'
                  : 'bg-[#1A1A1A] text-white border-[#1A1A1A] hover:bg-[#333]'
              }`}
            >
              {isSaved ? 'Registrado en Historial' : 'Guardar en Historial'}
            </button>
          )}
        </div>
      </div>

      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-baseline border-b border-[#1A1A1A] pb-4 mb-6 gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif italic font-light tracking-tight uppercase text-[#1A1A1A]">
            V — Visión Clara
          </h1>
          <p className="text-[11px] font-bold tracking-[0.2em] text-[#666] uppercase mt-1">
            Núcleo Analítico de Alerta Temprana Escolar
          </p>
        </div>
        <div className="text-left md:text-right font-mono">
          <p className="text-[13px] font-bold uppercase">
            ESTADO DEL REPORTE: <span className={riskTextColor}>{report.riskLevel}</span>
          </p>
          <p className="text-[11px] opacity-70 mt-0.5">
            ID: {report.id} | FECHA: {report.timestamp}
          </p>
        </div>
      </header>

      {/* Main Grid Section */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Expediente del Estudiante */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <section className="border-l-2 border-[#1A1A1A] pl-4 space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">
              Expediente del Estudiante
            </h2>
            <div>
              <p className="text-3xl font-serif leading-tight mb-1 text-[#1A1A1A]">
                {report.studentAlias}
              </p>
              <p className="text-sm italic text-[#555]">
                {report.grade} — Establecimiento Educacional
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Dimensión Cuantitativa */}
              <div className="bg-white p-4 border border-[#1A1A1A]/20">
                <h3 className="text-[9px] font-bold uppercase mb-2 text-[#666] italic tracking-wider">
                  Dimensión Cuantitativa
                </h3>
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <p className="text-xs text-[#555]">Asistencia Mensual</p>
                    <p className="text-2xl font-serif font-bold">{report.inputData.monthlyAttendance}%</p>
                  </div>
                  <div className="text-right text-[#C53030]">
                    <p className="text-[10px] font-bold uppercase tracking-tight">
                      {report.inputData.attendanceTrend.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[#555]">Promedio Académico</p>
                  <p className="text-2xl font-serif font-bold">
                    {report.inputData.gpa.toFixed(1)} <span className="text-xs opacity-60 font-sans italic font-normal">({report.inputData.failedSubjectsCount} reprobadas)</span>
                  </p>
                </div>
              </div>

              {/* Dimensión Cualitativa */}
              <div className="bg-white p-4 border border-[#1A1A1A]/20">
                <h3 className="text-[9px] font-bold uppercase mb-2 text-[#666] italic tracking-wider">
                  Dimensión Cualitativa
                </h3>
                <p className="text-xs leading-relaxed text-[#333]">
                  {report.inputData.convivenciaNotes || 'Participación registrada según niveles observados por el cuerpo docente.'}
                </p>
                {report.inputData.familyContextNotes && (
                  <p className="text-xs leading-relaxed text-[#555] italic mt-2 border-t border-[#EEE] pt-2">
                    {report.inputData.familyContextNotes}
                  </p>
                )}
              </div>

              {/* Dimensión de Severidad */}
              <div className="bg-[#1A1A1A] text-white p-4">
                <h3 className="text-[9px] font-bold uppercase mb-1 opacity-70 italic tracking-wider">
                  Dimensión de Severidad
                </h3>
                <p className="text-lg font-serif">{report.inputData.severityLevel}</p>
                <p className="text-[10px] opacity-80 mt-1 font-sans">
                  {report.preventiveCategory}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Results & Action Plan */}
        <div className="lg:col-span-8 bg-white border border-[#1A1A1A] flex flex-col justify-between">
          <div className="p-6 sm:p-10 space-y-8">
            
            {/* 01. Nivel de Riesgo */}
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#1A1A1A] mb-2">
                01. Nivel de Riesgo Escolar
              </p>
              <div className="flex items-baseline gap-4">
                <div className={`text-6xl sm:text-7xl font-serif italic ${riskTextColor}`}>
                  {report.riskLevel}
                </div>
                <div className="h-[1px] flex-1 bg-[#1A1A1A] opacity-20 hidden sm:block"></div>
                <div className="font-mono text-xs font-bold text-[#1A1A1A] border border-[#1A1A1A] px-3 py-1">
                  ÍNDICE: {report.riskScore}/100
                </div>
              </div>
            </div>

            {/* 02. Síntesis de Factores Críticos */}
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#1A1A1A] mb-3">
                02. Síntesis de Factores Críticos
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-[#222] font-serif">
                {report.criticalFactorsSynthesis}
              </p>
              
              {/* Key Indicators Chips */}
              {report.keyIndicatorsHighlight && report.keyIndicatorsHighlight.length > 0 && (
                <div className="mt-4 pt-4 border-t border-[#1A1A1A]/10 flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#666]">Cruces Detectados:</span>
                  {report.keyIndicatorsHighlight.map((hk, i) => (
                    <span key={i} className="text-[11px] bg-[#F9F8F6] px-2.5 py-1 border border-[#1A1A1A]/30 text-[#1A1A1A] font-medium">
                      • {hk}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 03. Plan de Acción Docente */}
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#1A1A1A] mb-5">
                03. Plan de Acción Docente Sugerido
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Acción I */}
                <div className="border-t-2 border-[#1A1A1A] pt-4 space-y-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#F5F5F5] border border-[#1A1A1A]/20">
                    ACCIÓN I
                  </span>
                  <p className="text-xs font-bold uppercase tracking-tight text-[#1A1A1A] mt-2">
                    Director de Grupo / Orientación Escolar
                  </p>
                  <p className="text-xs text-[#444] leading-relaxed italic font-serif">
                    {report.actionPlan[0]}
                  </p>
                </div>

                {/* Acción II */}
                <div className="border-t-2 border-[#1A1A1A] pt-4 space-y-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#F5F5F5] border border-[#1A1A1A]/20">
                    ACCIÓN II
                  </span>
                  <p className="text-xs font-bold uppercase tracking-tight text-[#1A1A1A] mt-2">
                    Comité de Convivencia Escolar / Equipo Directivo
                  </p>
                  <p className="text-xs text-[#444] leading-relaxed italic font-serif">
                    {report.actionPlan[1]}
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* Footer Branding */}
          <div className="bg-[#F9F8F6] p-4 border-t border-[#1A1A1A] flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[10px] font-medium italic opacity-70 text-center sm:text-left">
              Intervención pedagógica oportuna para la justicia educativa.
            </p>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 border border-[#1A1A1A] rounded-full flex items-center justify-center font-serif text-[11px] font-bold">
                V
              </div>
              <div className="h-6 w-12 bg-[#1A1A1A]"></div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer Meta */}
      <footer className="mt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] font-bold tracking-tighter opacity-40 uppercase gap-2">
        <span>Ministerio de Educación Nacional — Colombia</span>
        <span>Sistema Visión Clara • SIMPADE Alerta Temprana</span>
        <span className="flex items-center gap-1">
          <UserCheck className="w-3 h-3" /> Confidencial: Uso Exclusivo Orientación y Docentes
        </span>
      </footer>

    </div>
  );
};

