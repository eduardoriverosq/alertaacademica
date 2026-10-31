export type RiskLevel = 'BAJO' | 'MEDIO' | 'ALTO';

export type AttendanceTrend = 'ESTABLE' | 'BAJA_LEVE' | 'CAIDA_DRASTICA' | 'EN_MEJORA';

export type ParticipationLevel = 
  | 'PARTICIPACION_ACTIVA'
  | 'PARTICIPACION_IRREGULAR'
  | 'APATIA_O_AISLAMIENTO'
  | 'FALTAS_DE_CONVIVENCIA'
  | 'INASISTENCIA_RECURRENTE_UNJUSTIFIED';

export type ImpactSeverity = 'BAJO' | 'MODERADO' | 'SEVERO' | 'CRITICO';

export interface StudentInputData {
  id?: string;
  studentAlias: string; // ej: "Estudiante M.V." o "Sofía M."
  grade: string; // ej: "10° Grado Media A", "8° Grado Secundaria B"
  dateRecorded: string;
  
  // 1. Dimensión Cuantitativa
  monthlyAttendance: number; // Porcentaje 0-100%
  attendanceTrend: AttendanceTrend;
  gpa: number; // Escala colombiana 1.0 - 5.0 (Aprobación: 3.0, Decreto 1290 MEN)
  gpaVariation: number; // ej: -0.8 o +0.4
  failedSubjectsCount: number; // Asignaturas con Desempeño Bajo (< 3.0)

  // 2. Dimensión Cualitativa
  participationLevel: ParticipationLevel;
  convivenciaNotes: string; // Observaciones de convivencia escolar (Ley 1620)
  familyContextNotes: string; // Entorno familiar y factores de riesgo socioafectivo (SIMPADE)

  // 3. Dimensión de Severidad
  severityLevel: ImpactSeverity;
  triggerFactors: string[]; // ej: ["Trabajo infantil/Cuidado", "Barreras de transporte", "Conflicto/Inseguridad"]
}

export interface RiskAnalysisReport {
  id: string;
  studentAlias: string;
  grade: string;
  timestamp: string;
  inputData: StudentInputData;
  
  // Salida Estandarizada
  riskLevel: RiskLevel; // 1. NIVEL DE RIESGO
  criticalFactorsSynthesis: string; // 2. SÍNTESIS DE FACTORES CRÍTICOS
  actionPlan: [string, string]; // 3. PLAN DE ACCIÓN DOCENTE (exactamente 2 acciones concretas)
  
  // Metadatos auxiliares para visualización profesional
  riskScore: number; // 0-100 score para matriz
  keyIndicatorsHighlight: string[];
  preventiveCategory: string; // ej: "Acompañamiento Socioemocional", "Refuerzo Académico Focalizado"
}
