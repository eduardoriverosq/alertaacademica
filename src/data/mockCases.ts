import { StudentInputData, RiskAnalysisReport } from '../types';

export const INITIAL_SAMPLE_CASES: StudentInputData[] = [
  {
    id: 'case-001',
    studentAlias: 'Sofía M. (Caso Tipo A)',
    grade: '10° Grado Media A',
    dateRecorded: '2026-07-20',
    monthlyAttendance: 68,
    attendanceTrend: 'CAIDA_DRASTICA',
    gpa: 2.8, // Desempeño Bajo (< 3.0 en Colombia)
    gpaVariation: -1.1,
    failedSubjectsCount: 3,
    participationLevel: 'APATIA_O_AISLAMIENTO',
    convivenciaNotes: 'Permaneció en silencio y reclinada en su puesto durante las clases de Matemáticas y Lenguaje. Refiere agotamiento continuo.',
    familyContextNotes: 'Se identificó en entrevista de Orientación Escolar que cuida a sus dos hermanos menores en jornada escolar por horario laboral de la madre.',
    severityLevel: 'SEVERO',
    triggerFactors: ['Cuidado de familiares/hermanos', 'Inasistencia reiterada en primeras horas', 'Sobrecarga de roles en el hogar']
  },
  {
    id: 'case-002',
    studentAlias: 'Lucas S. (Caso Tipo B)',
    grade: '9° Grado Secundaria C',
    dateRecorded: '2026-07-18',
    monthlyAttendance: 82,
    attendanceTrend: 'BAJA_LEVE',
    gpa: 3.4, // Desempeño Básico
    gpaVariation: -0.5,
    failedSubjectsCount: 1,
    participationLevel: 'PARTICIPACION_IRREGULAR',
    convivenciaNotes: 'Participación discontinua en trabajos en grupo. Respuestas evasivas ante consultas del docente director de grupo.',
    familyContextNotes: 'Cambio reciente de domicilio y dificultades de transporte hacia la institución educativa informadas en ficha de caracterización socioeconómica.',
    severityLevel: 'MODERADO',
    triggerFactors: ['Cambio de residencia / Transporte', 'Baja de rendimiento en Ciencias Naturales', 'Distanciamiento del grupo de pares']
  },
  {
    id: 'case-003',
    studentAlias: 'Mateo V. (Caso Tipo C)',
    grade: '11° Grado Media B',
    dateRecorded: '2026-07-21',
    monthlyAttendance: 54,
    attendanceTrend: 'CAIDA_DRASTICA',
    gpa: 2.1, // Desempeño Bajo severo
    gpaVariation: -1.8,
    failedSubjectsCount: 5,
    participationLevel: 'INASISTENCIA_RECURRENTE_UNJUSTIFIED',
    convivenciaNotes: 'Faltas recurrentes injustificadas acumuladas los días lunes y viernes. Ausencia total de entregas en actividades evaluativas del periodo.',
    familyContextNotes: 'Dificultad en la comunicación con el acudiente; la familia no asiste a citaciones del Comité de Convivencia Escolar.',
    severityLevel: 'CRITICO',
    triggerFactors: ['Desconexión pedagógica severa', 'Ausencia de red de apoyo familiar visible', 'Riesgo inminente de reprobación por inasistencia y notas']
  },
  {
    id: 'case-004',
    studentAlias: 'Camila A. (Caso Tipo D)',
    grade: '8° Grado Secundaria B',
    dateRecorded: '2026-07-22',
    monthlyAttendance: 94,
    attendanceTrend: 'ESTABLE',
    gpa: 4.3, // Desempeño Alto
    gpaVariation: -0.2,
    failedSubjectsCount: 0,
    participationLevel: 'PARTICIPACION_ACTIVA',
    convivenciaNotes: 'Excelente actitud y colaboración en el aula. Manifestó frustración puntual tras no lograr la nota esperada en evaluación de Física.',
    familyContextNotes: 'Entorno familiar participativo en las reuniones de acudientes de la institución.',
    severityLevel: 'BAJO',
    triggerFactors: ['Exigencia personal elevada', 'Frustración puntual ante baja nota en control']
  }
];

export const INITIAL_PRECOMPUTED_REPORTS: Record<string, RiskAnalysisReport> = {
  'case-001': {
    id: 'report-001',
    studentAlias: 'Sofía M. (Caso Tipo A)',
    grade: '10° Grado Media A',
    timestamp: '2026-07-20 10:30',
    inputData: INITIAL_SAMPLE_CASES[0],
    riskLevel: 'ALTO',
    criticalFactorsSynthesis: 'Se detecta un cruce crítico entre la disminución drástica de asistencia mensual (68%), el desempeño bajo en promedio general (2.8/5.0) con 3 asignaturas reprobadas y la apatía/aislamiento observada en aula. Estos factores responden a la sobrecarga de cuidados en el hogar durante la jornada escolar, generando una barrera real de permanencia según los criterios del SIMPADE / MEN Colombia, lo cual exige una ruta de prevención oportuna.',
    actionPlan: [
      'Coordinar con la Orientación Escolar y el Director de Grupo una reunión con la madre/acudiente para acordar un Plan de Permanencia Flexible con flexibilidad en horarios y guías de trabajo asincrónicas, resguardando la escolarización de Sofía sin medidas punitivas.',
      'Activar una tutoría pedagógica entre pares para las 3 asignaturas con Desempeño Bajo (Matemáticas, Lenguaje y Ciencias) con seguimiento semanal del docente Director de Grupo.'
    ],
    riskScore: 88,
    keyIndicatorsHighlight: ['Asistencia 68%', 'Promedio 2.8/5.0 (Desempeño Bajo)', 'Cuidado de hermanos', 'Riesgo SIMPADE'],
    preventiveCategory: 'Estrategia de Permanencia y Apoyo Socioemocional'
  },
  'case-002': {
    id: 'report-002',
    studentAlias: 'Lucas S. (Caso Tipo B)',
    grade: '9° Grado Secundaria C',
    timestamp: '2026-07-18 14:15',
    inputData: INITIAL_SAMPLE_CASES[1],
    riskLevel: 'MEDIO',
    criticalFactorsSynthesis: 'El análisis evidencia una baja progresiva de asistencia (82%) acompañada de un desempeño promedio básico (3.4/5.0) y distanciamiento en trabajos grupales. La coincidencia con cambio de residencia y barreras de transporte hacia la institución escolar genera vulnerabilidad que, de no atenderse a tiempo, podría derivar en abandono escolar.',
    actionPlan: [
      'Realizar un diálogo formativo e individual por parte del Docente Director de Grupo para escuchar al estudiante, explorar sus motivaciones y fijar metas cortas de reincorporación activa.',
      'Gestionar con Orientación Escolar y el Comité de Convivencia el apoyo de transporte o subsidios de alimentación (PAE) si aplican en la entidad territorial certificada.'
    ],
    riskScore: 58,
    keyIndicatorsHighlight: ['Asistencia 82%', 'Desempeño Básico 3.4', 'Barreras de movilidad'],
    preventiveCategory: 'Gestión de Apoyos de Permanencia (PAE / Transporte)'
  }
};
