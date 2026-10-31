import React, { useState } from 'react';
import { 
  StudentInputData, 
  AttendanceTrend, 
  ParticipationLevel, 
  ImpactSeverity 
} from '../types';
import { INITIAL_SAMPLE_CASES } from '../data/mockCases';
import { 
  Send, 
  RotateCcw, 
  User, 
  GraduationCap,
  Info,
  Check
} from 'lucide-react';

interface StudentFormProps {
  onSubmit: (data: StudentInputData) => void;
  isLoading: boolean;
}

const COMMON_TRIGGER_FACTORS = [
  'Cuidado de familiares o hermanos',
  'Vulnerabilidad socioeconómica',
  'Trabajo o actividad remunerada',
  'Desmotivación o apatía severa',
  'Aislamiento de grupo de pares',
  'Conflicto familiar / duelo reciente',
  'Acoso o problemas de convivencia',
  'Salud física o afección temporal',
  'Traslado domiciliario reciente',
  'Inasistencias no justificadas recurrentes'
];

export const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<StudentInputData>({
    studentAlias: 'Estudiante A.M.',
    grade: '10° Grado Media A',
    dateRecorded: new Date().toISOString().split('T')[0],
    monthlyAttendance: 72,
    attendanceTrend: 'CAIDA_DRASTICA',
    gpa: 2.8,
    gpaVariation: -0.8,
    failedSubjectsCount: 2,
    participationLevel: 'APATIA_O_AISLAMIENTO',
    convivenciaNotes: 'Disminución drástica en la participación en clase. Se observa desmotivación y cansancio manifiesto en las primeras horas.',
    familyContextNotes: 'Reporte de responsabilidades de cuidado familiar en jornada escolar por horario de trabajo del acudiente.',
    severityLevel: 'SEVERO',
    triggerFactors: ['Cuidado de familiares o hermanos', 'Desmotivación o apatía severa']
  });

  const handleSelectSampleCase = (sample: StudentInputData) => {
    setFormData({
      ...sample,
      dateRecorded: new Date().toISOString().split('T')[0]
    });
  };

  const toggleTriggerFactor = (factor: string) => {
    setFormData(prev => {
      const exists = prev.triggerFactors.includes(factor);
      if (exists) {
        return {
          ...prev,
          triggerFactors: prev.triggerFactors.filter(f => f !== factor)
        };
      } else {
        return {
          ...prev,
          triggerFactors: [...prev.triggerFactors, factor]
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      studentAlias: '',
      grade: '10° Grado Media A',
      dateRecorded: new Date().toISOString().split('T')[0],
      monthlyAttendance: 85,
      attendanceTrend: 'ESTABLE',
      gpa: 3.8,
      gpaVariation: 0,
      failedSubjectsCount: 0,
      participationLevel: 'PARTICIPACION_ACTIVA',
      convivenciaNotes: '',
      familyContextNotes: '',
      severityLevel: 'BAJO',
      triggerFactors: []
    });
  };

  return (
    <div className="bg-white border-2 border-[#1A1A1A] shadow-none overflow-hidden">
      
      {/* Header Form Banner */}
      <div className="bg-[#1A1A1A] text-white p-5 border-b-2 border-[#1A1A1A]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black tracking-widest text-[#F9F8F6] uppercase opacity-70">
                FORMULARIO ESTRUCTURADO SAT
              </span>
            </div>
            <h2 className="text-xl font-serif italic font-light text-[#F9F8F6] mt-0.5">
              Expediente de Ingreso e Indicadores
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Complete las tres dimensiones analíticas para procesar el nivel de riesgo de deserción escolar.
            </p>
          </div>

          {/* Preset Case Loaders */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden lg:inline">Caso Tipo:</span>
            {INITIAL_SAMPLE_CASES.slice(0, 3).map((sc, i) => (
              <button
                key={sc.id || i}
                type="button"
                id={`btn-load-sample-${i}`}
                onClick={() => handleSelectSampleCase(sc)}
                className="px-2.5 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-white font-mono uppercase tracking-wider border border-slate-600 transition-colors flex items-center gap-1.5"
                title={`Cargar ${sc.studentAlias}`}
              >
                <span>{sc.studentAlias.split(' ')[0]}</span>
                <span className={`w-2 h-2 rounded-full ${
                  sc.severityLevel === 'CRITICO' || sc.severityLevel === 'SEVERO' 
                    ? 'bg-[#C53030]' 
                    : sc.severityLevel === 'MODERADO' 
                    ? 'bg-amber-500' 
                    : 'bg-emerald-500'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        
        {/* Identificación de la/el estudiante */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pb-6 border-b border-[#1A1A1A]/20">
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-[#1A1A1A] mb-1.5 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#1A1A1A]" />
              Identificación / Alias del Estudiante *
            </label>
            <input
              type="text"
              id="input-student-alias"
              required
              placeholder="ej: Estudiante M.V. o Carlos G."
              value={formData.studentAlias}
              onChange={e => setFormData({ ...formData, studentAlias: e.target.value })}
              className="w-full text-xs px-3 py-2 bg-[#F9F8F6] border border-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] font-semibold text-[#1A1A1A]"
            />
            <p className="text-[10px] text-[#666] italic mt-1">
              Mantener resguardo de identidad según protocolo escolar.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-[#1A1A1A] mb-1.5 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-[#1A1A1A]" />
              Grado / Nivel Educativo (Colombia) *
            </label>
            <select
              id="select-student-grade"
              value={formData.grade}
              onChange={e => setFormData({ ...formData, grade: e.target.value })}
              className="w-full text-xs px-3 py-2 bg-[#F9F8F6] border border-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] font-semibold text-[#1A1A1A]"
            >
              <option value="6° Grado Secundaria A">6° Grado Secundaria A</option>
              <option value="6° Grado Secundaria B">6° Grado Secundaria B</option>
              <option value="7° Grado Secundaria A">7° Grado Secundaria A</option>
              <option value="7° Grado Secundaria B">7° Grado Secundaria B</option>
              <option value="8° Grado Secundaria A">8° Grado Secundaria A</option>
              <option value="8° Grado Secundaria B">8° Grado Secundaria B</option>
              <option value="9° Grado Secundaria A">9° Grado Secundaria A</option>
              <option value="9° Grado Secundaria B">9° Grado Secundaria B</option>
              <option value="10° Grado Media A">10° Grado Media A</option>
              <option value="10° Grado Media B">10° Grado Media B</option>
              <option value="11° Grado Media A">11° Grado Media A</option>
              <option value="11° Grado Media B">11° Grado Media B</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-[#1A1A1A] mb-1.5">
              Fecha de Registro
            </label>
            <input
              type="date"
              id="input-date-recorded"
              value={formData.dateRecorded}
              onChange={e => setFormData({ ...formData, dateRecorded: e.target.value })}
              className="w-full text-xs px-3 py-2 bg-[#F9F8F6] border border-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] font-semibold text-[#1A1A1A]"
            />
          </div>
        </div>

        {/* DIMENSIÓN 1: CUANTITATIVA */}
        <div className="space-y-4">
          <div className="border-l-2 border-[#1A1A1A] pl-3 py-0.5">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]">
              01. Dimensión Cuantitativa (Asistencia y Rendimiento Académico)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#F9F8F6] p-4 border border-[#1A1A1A]/30">
            
            {/* Asistencia Mensual % */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#1A1A1A]">Asistencia Mensual</span>
                <span className={`font-serif font-bold text-sm px-2 py-0.5 border ${
                  formData.monthlyAttendance < 75 
                    ? 'bg-[#C53030] text-white border-[#C53030]' 
                    : formData.monthlyAttendance < 85 
                    ? 'bg-amber-100 text-amber-900 border-amber-300' 
                    : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                }`}>
                  {formData.monthlyAttendance}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                id="range-attendance"
                value={formData.monthlyAttendance}
                onChange={e => setFormData({ ...formData, monthlyAttendance: Number(e.target.value) })}
                className="w-full accent-[#1A1A1A] cursor-pointer h-2 bg-slate-200"
              />
              <p className="text-[10px] text-[#666] italic">
                Mineduc exige mínimo 85% para promoción escolar.
              </p>
            </div>

            {/* Tendencia de Asistencia */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1A1A1A]">
                Tendencia de Asistencia
              </label>
              <select
                id="select-attendance-trend"
                value={formData.attendanceTrend}
                onChange={e => setFormData({ ...formData, attendanceTrend: e.target.value as AttendanceTrend })}
                className="w-full text-xs px-2.5 py-2 bg-white border border-[#1A1A1A]/40 font-medium text-[#1A1A1A]"
              >
                <option value="ESTABLE">Estable (Sin cambios drásticos)</option>
                <option value="BAJA_LEVE">Baja Leve (Disminución del 5-10%)</option>
                <option value="CAIDA_DRASTICA">Caída Drástica (&gt;15% de baja acumulada)</option>
                <option value="EN_MEJORA">En Mejora (Recuperación reciente)</option>
              </select>
            </div>

            {/* Promedio General (GPA Escala Colombiana) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#1A1A1A]">Promedio (Escala 1.0 - 5.0)</span>
                <span className={`font-serif font-bold text-sm px-2 py-0.5 border ${
                  formData.gpa < 3.0 
                    ? 'bg-[#C53030] text-white border-[#C53030]' 
                    : formData.gpa < 3.8 
                    ? 'bg-amber-100 text-amber-900 border-amber-300' 
                    : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                }`}>
                  {formData.gpa.toFixed(1)}
                </span>
              </div>
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="5.0"
                id="input-gpa"
                value={formData.gpa}
                onChange={e => setFormData({ ...formData, gpa: parseFloat(e.target.value) || 3.0 })}
                className="w-full text-xs px-2.5 py-1.5 bg-white border border-[#1A1A1A]/40 font-bold text-[#1A1A1A]"
              />
              <p className="text-[10px] text-[#666] italic">
                Aprobación: &ge; 3.0 (Desempeño Básico, Decreto 1290 MEN).
              </p>
            </div>

            {/* Variación de Notas y Reprobación */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1A1A1A]">
                Variación y Reprobadas
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  id="select-gpa-variation"
                  value={formData.gpaVariation.toString()}
                  onChange={e => setFormData({ ...formData, gpaVariation: parseFloat(e.target.value) })}
                  className="w-full text-xs px-2 py-1.5 bg-white border border-[#1A1A1A]/40 font-medium text-[#1A1A1A]"
                >
                  <option value="-2.0">Caída fuerte (-2.0 pts)</option>
                  <option value="-1.2">Caída alta (-1.2 pts)</option>
                  <option value="-0.6">Baja moderada (-0.6 pts)</option>
                  <option value="0">Estable (0.0 pts)</option>
                  <option value="0.5">Mejora (+0.5 pts)</option>
                </select>

                <div className="flex flex-col">
                  <span className="text-[10px] text-[#666] font-bold uppercase">Reprobadas:</span>
                  <input
                    type="number"
                    min="0"
                    max="12"
                    id="input-failed-subjects"
                    value={formData.failedSubjectsCount}
                    onChange={e => setFormData({ ...formData, failedSubjectsCount: parseInt(e.target.value) || 0 })}
                    className="w-full text-xs px-2 py-1 bg-white border border-[#1A1A1A]/40 font-bold text-center text-[#1A1A1A]"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* DIMENSIÓN 2: CUALITATIVA */}
        <div className="space-y-4">
          <div className="border-l-2 border-[#1A1A1A] pl-3 py-0.5">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]">
              02. Dimensión Cualitativa (Participación, Convivencia y Entorno)
            </h3>
          </div>

          <div className="space-y-4 bg-[#F9F8F6] p-4 border border-[#1A1A1A]/30">
            
            {/* Nivel de Participación */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                Participación en Aula y Dinámica Escolar
              </label>
              <select
                id="select-participation-level"
                value={formData.participationLevel}
                onChange={e => setFormData({ ...formData, participationLevel: e.target.value as ParticipationLevel })}
                className="w-full text-xs px-3 py-2 bg-white border border-[#1A1A1A]/40 font-medium text-[#1A1A1A]"
              >
                <option value="PARTICIPACION_ACTIVA">Participación Activa e Integrada</option>
                <option value="PARTICIPACION_IRREGULAR">Participación Irregular / Intermitente</option>
                <option value="APATIA_O_AISLAMIENTO">Apatía, Aislamiento o Desconexión Manifiesta en Clase</option>
                <option value="FALTAS_DE_CONVIVENCIA">Disrupción / Incidentes de Convivencia Escolar</option>
                <option value="INASISTENCIA_RECURRENTE_UNJUSTIFIED">Inasistencia Injustificada Recurrente en Días Clave</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Observaciones de Convivencia */}
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                  Reportes de Convivencia / Observaciones Docentes
                </label>
                <textarea
                  id="textarea-convivencia-notes"
                  rows={3}
                  placeholder="Describa conductas observadas en aula, nivel de respuesta a actividades o apatía..."
                  value={formData.convivenciaNotes}
                  onChange={e => setFormData({ ...formData, convivenciaNotes: e.target.value })}
                  className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/40 focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                />
              </div>

              {/* Contexto Familiar / Socioemocional */}
              <div>
                <label className="block text-xs font-bold text-[#1A1A1A] mb-1">
                  Contexto Socioemocional / Información Entorno Familiar
                </label>
                <textarea
                  id="textarea-family-notes"
                  rows={3}
                  placeholder="Información relevante sobre contexto del hogar, situaciones de vulnerabilidad o red de apoyo..."
                  value={formData.familyContextNotes}
                  onChange={e => setFormData({ ...formData, familyContextNotes: e.target.value })}
                  className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/40 focus:outline-none focus:border-[#1A1A1A] text-[#1A1A1A]"
                />
              </div>
            </div>

          </div>
        </div>

        {/* DIMENSIÓN 3: SEVERIDAD Y FACTORES GATILLANTES */}
        <div className="space-y-4">
          <div className="border-l-2 border-[#1A1A1A] pl-3 py-0.5">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]">
              03. Dimensión de Severidad y Factores Gatillantes
            </h3>
          </div>

          <div className="space-y-4 bg-[#F9F8F6] p-4 border border-[#1A1A1A]/30">
            
            {/* Nivel de Severidad */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-2 uppercase tracking-wide">
                Nivel de Severidad / Urgencia Percibida por el Equipo Docente *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['BAJO', 'MODERADO', 'SEVERO', 'CRITICO'] as ImpactSeverity[]).map((sev) => {
                  const active = formData.severityLevel === sev;
                  let colorClass = 'border-[#1A1A1A]/40 bg-white text-[#1A1A1A] hover:border-[#1A1A1A]';
                  if (active) {
                    if (sev === 'CRITICO') colorClass = 'border-[#C53030] bg-[#C53030] text-white font-bold';
                    else if (sev === 'SEVERO') colorClass = 'border-[#1A1A1A] bg-[#1A1A1A] text-white font-bold';
                    else if (sev === 'MODERADO') colorClass = 'border-amber-600 bg-amber-600 text-white font-bold';
                    else colorClass = 'border-emerald-700 bg-emerald-700 text-white font-bold';
                  }

                  return (
                    <button
                      key={sev}
                      type="button"
                      id={`btn-severity-${sev.toLowerCase()}`}
                      onClick={() => setFormData({ ...formData, severityLevel: sev })}
                      className={`py-2 px-3 text-xs transition-all border text-center font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 ${colorClass}`}
                    >
                      {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      <span>{sev}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Factores Gatillantes */}
            <div>
              <label className="block text-xs font-bold text-[#1A1A1A] mb-2 flex items-center justify-between">
                <span>Factores Gatillantes o Situaciones de Especial Protección</span>
                <span className="text-[10px] text-[#666] font-mono">
                  {formData.triggerFactors.length} seleccionados
                </span>
              </label>

              <div className="flex flex-wrap gap-1.5">
                {COMMON_TRIGGER_FACTORS.map((factor) => {
                  const selected = formData.triggerFactors.includes(factor);
                  return (
                    <button
                      key={factor}
                      type="button"
                      onClick={() => toggleTriggerFactor(factor)}
                      className={`text-[11px] px-2.5 py-1 transition-all border font-medium ${
                        selected
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/30 hover:border-[#1A1A1A]'
                      }`}
                    >
                      {selected ? '✓ ' : '+ '}
                      {factor}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* Ethical Warning Banner */}
        <div className="p-3.5 bg-white border border-[#1A1A1A] flex items-start gap-3 text-xs text-[#1A1A1A]">
          <Info className="w-4 h-4 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed font-sans text-[11px]">
            <strong className="font-bold uppercase tracking-wider">Garantía Ética MEN Colombia (SIMPADE):</strong> El reporte generado es estrictamente preventivo, confidencial y pedagógico. Queda prohibido emitir juicios punitivos o estigmatizaciones sobre la/el estudiante.
          </div>
        </div>

        {/* Form Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-[#1A1A1A]/20">
          <button
            type="button"
            id="btn-reset-form"
            onClick={handleReset}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#666] hover:text-[#1A1A1A] hover:underline flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer</span>
          </button>

          <button
            type="submit"
            id="btn-submit-analysis"
            disabled={isLoading || !formData.studentAlias}
            className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#333] active:bg-black text-white font-bold text-xs uppercase tracking-[0.15em] border border-[#1A1A1A] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Procesando Alerta...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Procesar Análisis y Generar Reporte</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

