import React, { useState } from 'react';
import { StudentInputData, RiskAnalysisReport } from './types';
import { INITIAL_SAMPLE_CASES, INITIAL_PRECOMPUTED_REPORTS } from './data/mockCases';
import { Header } from './components/Header';
import { StudentForm } from './components/StudentForm';
import { ReportCard } from './components/ReportCard';
import { CaseHistoryTable } from './components/CaseHistoryTable';
import { RiskMatrixView } from './components/RiskMatrixView';
import { ProtocolGuidelines } from './components/ProtocolGuidelines';
import { Sparkles, AlertCircle, ArrowLeft, History } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'history' | 'matrix' | 'guide'>('analyzer');
  
  // Historial de reportes guardados (inicializado con casos realistas)
  const [savedReports, setSavedReports] = useState<RiskAnalysisReport[]>(
    Object.values(INITIAL_PRECOMPUTED_REPORTS)
  );

  // Reporte activo en pantalla
  const [currentReport, setCurrentReport] = useState<RiskAnalysisReport | null>(
    INITIAL_PRECOMPUTED_REPORTS['case-001']
  );

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAnalyzeStudent = async (studentData: StudentInputData) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/analyze-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error('Error en el servicio de procesamiento analítico.');
      }

      const report: RiskAnalysisReport = await response.json();
      setCurrentReport(report);
      setActiveTab('analyzer');

      // Scroll suave hacia el reporte generado
      setTimeout(() => {
        const reportElement = document.getElementById('active-report-section');
        if (reportElement) {
          reportElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err: any) {
      console.error('Error al analizar estudiante:', err);
      setErrorMessage('No se pudo conectar con el servidor analítico. Verifique su conexión o intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveReport = (reportToSave: RiskAnalysisReport) => {
    const exists = savedReports.some(r => r.id === reportToSave.id);
    if (!exists) {
      setSavedReports(prev => [reportToSave, ...prev]);
    }
  };

  const handleDeleteReport = (id: string) => {
    setSavedReports(prev => prev.filter(r => r.id !== id));
    if (currentReport?.id === id) {
      setCurrentReport(null);
    }
  };

  const handleSelectFromHistory = (report: RiskAnalysisReport) => {
    setCurrentReport(report);
    setActiveTab('analyzer');
  };

  const highRiskCount = savedReports.filter(r => r.riskLevel === 'ALTO').length;

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] font-sans antialiased flex flex-col">
      
      {/* Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCasesCount={savedReports.length}
        highRiskCount={highRiskCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Error Alert if any */}
        {errorMessage && (
          <div className="p-4 bg-white border-2 border-[#C53030] text-[#C53030] font-mono text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="font-bold underline text-[11px] uppercase tracking-wider"
            >
              Desestimar
            </button>
          </div>
        )}

        {/* TAB 1: ANALIZADOR / INGRESO DE DATOS */}
        {activeTab === 'analyzer' && (
          <div className="space-y-8">
            
            {/* Formulario de Entrada */}
            <StudentForm
              onSubmit={handleAnalyzeStudent}
              isLoading={isLoading}
            />

            {/* Vista del Reporte Generado */}
            {currentReport && (
              <div id="active-report-section" className="space-y-3 pt-4">
                <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                  <h2 className="text-xs font-black text-[#1A1A1A] uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#1A1A1A]" />
                    <span>Reporte Analítico Generado</span>
                  </h2>
                  <span className="text-[11px] font-serif italic text-[#666]">
                    Formato estandarizado de intervención temprana
                  </span>
                </div>

                <ReportCard
                  report={currentReport}
                  onSaveReport={handleSaveReport}
                  isSaved={savedReports.some(r => r.id === currentReport.id)}
                />
              </div>
            )}

          </div>
        )}

        {/* TAB 2: HISTORIAL DE CASOS */}
        {activeTab === 'history' && (
          <CaseHistoryTable
            reports={savedReports}
            onSelectReport={handleSelectFromHistory}
            onDeleteReport={handleDeleteReport}
          />
        )}

        {/* TAB 3: MATRIZ DE RIESGO */}
        {activeTab === 'matrix' && (
          <RiskMatrixView reports={savedReports} />
        )}

        {/* TAB 4: ORIENTACIONES MINEDUC */}
        {activeTab === 'guide' && (
          <ProtocolGuidelines />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white text-xs py-6 px-4 mt-12 border-t-2 border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-serif italic text-sm">
            <strong>Visión Clara SAT Escolar</strong> • Alerta Temprana de Deserción Escolar, creado por YoAprendo
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            Educación Secundaria y Media Colombia • SIMPADE / Acompañamiento Pedagógico MEN
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            YoAprendo www.aprendo.website / rua@aprendo.website riveros@aprendo.website
          </span>
        </div>
      </footer>

    </div>
  );
}
