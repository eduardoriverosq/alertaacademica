import React, { useState } from 'react';
import { RiskAnalysisReport, RiskLevel } from '../types';
import { 
  Search, 
  FileText, 
  Trash2, 
  Eye, 
  Calendar
} from 'lucide-react';

interface CaseHistoryTableProps {
  reports: RiskAnalysisReport[];
  onSelectReport: (report: RiskAnalysisReport) => void;
  onDeleteReport: (id: string) => void;
}

export const CaseHistoryTable: React.FC<CaseHistoryTableProps> = ({
  reports,
  onSelectReport,
  onDeleteReport,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.studentAlias.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.criticalFactorsSynthesis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRisk = filterRisk === 'ALL' || r.riskLevel === filterRisk;

    return matchesSearch && matchesRisk;
  });

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'ALTO':
        return (
          <span className="inline-block px-2.5 py-0.5 text-xs font-bold bg-[#C53030] text-white uppercase tracking-wider">
            ALTO
          </span>
        );
      case 'MEDIO':
        return (
          <span className="inline-block px-2.5 py-0.5 text-xs font-bold bg-amber-600 text-white uppercase tracking-wider">
            MEDIO
          </span>
        );
      case 'BAJO':
      default:
        return (
          <span className="inline-block px-2.5 py-0.5 text-xs font-bold bg-emerald-700 text-white uppercase tracking-wider">
            BAJO
          </span>
        );
    }
  };

  return (
    <div className="bg-white border-2 border-[#1A1A1A] overflow-hidden">
      
      {/* Table Controls */}
      <div className="p-5 bg-[#1A1A1A] text-white border-b-2 border-[#1A1A1A] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-serif italic font-light text-[#F9F8F6] flex items-center gap-2">
            <FileText className="w-5 h-5 text-white" />
            <span>Historial de Evaluaciones de Alerta Temprana</span>
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Registro consolidado de expedientes procesados por el equipo docente.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="input-search-history"
              placeholder="Buscar estudiante o curso..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 bg-slate-800 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-white w-44 sm:w-56 font-sans"
            />
          </div>

          <select
            id="select-filter-risk"
            value={filterRisk}
            onChange={e => setFilterRisk(e.target.value)}
            className="text-xs px-2.5 py-1.5 bg-slate-800 border border-slate-600 text-white focus:outline-none focus:ring-1 focus:ring-white font-bold uppercase tracking-wider"
          >
            <option value="ALL">Todos los Riesgos</option>
            <option value="ALTO">Riesgo ALTO</option>
            <option value="MEDIO">Riesgo MEDIO</option>
            <option value="BAJO">Riesgo BAJO</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9F8F6] border-b-2 border-[#1A1A1A] text-[10px] font-black text-[#1A1A1A] uppercase tracking-widest">
              <th className="py-3.5 px-4">Estudiante / Curso</th>
              <th className="py-3.5 px-4">Nivel de Riesgo</th>
              <th className="py-3.5 px-4">Asistencia & Promedio</th>
              <th className="py-3.5 px-4">Sintesis</th>
              <th className="py-3.5 px-4">Fecha</th>
              <th className="py-3.5 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]/10 text-xs">
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-[#666]">
                  <p className="font-serif italic text-base text-[#1A1A1A]">No se encontraron registros de alerta temprana.</p>
                  <p className="text-xs text-[#666] mt-1">
                    Inicie una nueva evaluación o ajuste los filtros de búsqueda.
                  </p>
                </td>
              </tr>
            ) : (
              filteredReports.map((report) => (
                <tr 
                  key={report.id}
                  className="hover:bg-[#F9F8F6] transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <span className="font-serif font-bold text-[#1A1A1A] block text-sm">
                      {report.studentAlias}
                    </span>
                    <span className="text-[11px] text-[#555] font-medium">
                      {report.grade}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    {getRiskBadge(report.riskLevel)}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1A1A1A]">
                        Asistencia: {report.inputData.monthlyAttendance}%
                      </span>
                      <span className="text-[#666]">
                        Promedio: {report.inputData.gpa} ({report.inputData.failedSubjectsCount} reprobadas)
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="text-xs text-[#333] line-clamp-2 leading-relaxed font-serif italic">
                      {report.criticalFactorsSynthesis}
                    </p>
                  </td>

                  <td className="py-3.5 px-4 text-[11px] text-[#555] whitespace-nowrap font-mono">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#1A1A1A]" />
                      <span>{report.timestamp.split(' ')[0]}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onSelectReport(report)}
                        id={`btn-view-${report.id}`}
                        className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#1A1A1A] text-white hover:bg-[#333]"
                        title="Ver Expediente"
                      >
                        <Eye className="w-3.5 h-3.5 inline mr-1" />
                        Ver
                      </button>

                      <button
                        onClick={() => onDeleteReport(report.id)}
                        id={`btn-delete-${report.id}`}
                        className="p-1 text-[#666] hover:text-[#C53030]"
                        title="Eliminar registro"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

