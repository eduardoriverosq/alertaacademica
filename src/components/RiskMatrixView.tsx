import React from 'react';
import { RiskAnalysisReport } from '../types';

interface RiskMatrixViewProps {
  reports: RiskAnalysisReport[];
}

export const RiskMatrixView: React.FC<RiskMatrixViewProps> = ({ reports }) => {
  const totalCases = reports.length;
  
  const highRiskCases = reports.filter(r => r.riskLevel === 'ALTO');
  const mediumRiskCases = reports.filter(r => r.riskLevel === 'MEDIO');
  const lowRiskCases = reports.filter(r => r.riskLevel === 'BAJO');

  const highPct = totalCases > 0 ? Math.round((highRiskCases.length / totalCases) * 100) : 0;
  const medPct = totalCases > 0 ? Math.round((mediumRiskCases.length / totalCases) * 100) : 0;
  const lowPct = totalCases > 0 ? Math.round((lowRiskCases.length / totalCases) * 100) : 0;

  // Agrupar por curso
  const gradeDistribution: Record<string, { ALTO: number; MEDIO: number; BAJO: number }> = {};
  
  reports.forEach(r => {
    if (!gradeDistribution[r.grade]) {
      gradeDistribution[r.grade] = { ALTO: 0, MEDIO: 0, BAJO: 0 };
    }
    gradeDistribution[r.grade][r.riskLevel]++;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        {/* Alto Riesgo */}
        <div className="bg-white p-6 border-2 border-[#1A1A1A] relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
            <span className="text-[10px] font-black text-[#C53030] uppercase tracking-widest">
              Riesgo ALTO (Prioritario)
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#C53030]" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-serif italic text-[#C53030]">{highRiskCases.length}</span>
            <span className="text-xs font-bold font-mono text-[#C53030]">({highPct}% del total)</span>
          </div>
          <p className="text-xs text-[#555] mt-2 leading-relaxed">
            Intervención urgente mediante protocolo de contención y activación de Dupla Psicosocial.
          </p>
          <div className="w-full bg-[#EEE] h-2 mt-4 overflow-hidden border border-[#1A1A1A]/30">
            <div className="bg-[#C53030] h-full" style={{ width: `${highPct}%` }} />
          </div>
        </div>

        {/* Medio Riesgo */}
        <div className="bg-white p-6 border-2 border-[#1A1A1A] relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
            <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest">
              Riesgo MEDIO (Preventivo)
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-serif italic text-amber-900">{mediumRiskCases.length}</span>
            <span className="text-xs font-bold font-mono text-amber-700">({medPct}% del total)</span>
          </div>
          <p className="text-xs text-[#555] mt-2 leading-relaxed">
            Monitoreo quincenal por Profesor Jefe y reforzamiento de asistencia.
          </p>
          <div className="w-full bg-[#EEE] h-2 mt-4 overflow-hidden border border-[#1A1A1A]/30">
            <div className="bg-amber-600 h-full" style={{ width: `${medPct}%` }} />
          </div>
        </div>

        {/* Bajo Riesgo */}
        <div className="bg-white p-6 border-2 border-[#1A1A1A] relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
            <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">
              Riesgo BAJO (Regular)
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-serif italic text-emerald-900">{lowRiskCases.length}</span>
            <span className="text-xs font-bold font-mono text-emerald-700">({lowPct}% del total)</span>
          </div>
          <p className="text-xs text-[#555] mt-2 leading-relaxed">
            Mantener canales de comunicación regulares y apoyo formativo habitual.
          </p>
          <div className="w-full bg-[#EEE] h-2 mt-4 overflow-hidden border border-[#1A1A1A]/30">
            <div className="bg-emerald-700 h-full" style={{ width: `${lowPct}%` }} />
          </div>
        </div>

      </div>

      {/* Distribution By Grade */}
      <div className="bg-white p-6 border-2 border-[#1A1A1A]">
        <div className="flex items-center justify-between mb-4 border-b border-[#1A1A1A] pb-3">
          <div>
            <h3 className="text-lg font-serif italic text-[#1A1A1A]">
              Distribución de Riesgo de Deserción por Curso / Nivel
            </h3>
            <p className="text-xs text-[#666]">
              Cruce de casos evaluados por los Profesores Jefes en cada nivel educativo.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.keys(gradeDistribution).length === 0 ? (
            <p className="text-xs text-[#666] py-6 text-center italic font-serif">
              No hay datos suficientes para proyectar la matriz por nivel.
            </p>
          ) : (
            Object.entries(gradeDistribution).map(([grade, counts]) => {
              const totalGrade = counts.ALTO + counts.MEDIO + counts.BAJO;
              return (
                <div key={grade} className="p-4 bg-[#F9F8F6] border border-[#1A1A1A]/30">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-bold text-[#1A1A1A] uppercase tracking-wider">{grade}</span>
                    <span className="text-[#666] font-mono text-[11px]">Total evaluados: {totalGrade} estudiantes</span>
                  </div>

                  {/* Stacked Bar */}
                  <div className="w-full h-3 bg-white border border-[#1A1A1A]/40 overflow-hidden flex">
                    {counts.ALTO > 0 && (
                      <div 
                        className="bg-[#C53030] h-full" 
                        style={{ width: `${(counts.ALTO / totalGrade) * 100}%` }}
                        title={`${counts.ALTO} Riesgo Alto`}
                      />
                    )}
                    {counts.MEDIO > 0 && (
                      <div 
                        className="bg-amber-600 h-full" 
                        style={{ width: `${(counts.MEDIO / totalGrade) * 100}%` }}
                        title={`${counts.MEDIO} Riesgo Medio`}
                      />
                    )}
                    {counts.BAJO > 0 && (
                      <div 
                        className="bg-emerald-700 h-full" 
                        style={{ width: `${(counts.BAJO / totalGrade) * 100}%` }}
                        title={`${counts.BAJO} Riesgo Bajo`}
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-[11px] mt-2 font-mono">
                    <span className="text-[#C53030] font-bold">
                      Alto: {counts.ALTO}
                    </span>
                    <span className="text-amber-800 font-bold">
                      Medio: {counts.MEDIO}
                    </span>
                    <span className="text-emerald-800 font-bold">
                      Bajo: {counts.BAJO}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
};

