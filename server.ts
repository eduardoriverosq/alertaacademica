import express from 'express';
import path from 'path';
import 'dotenv/config';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { StudentInputData, RiskAnalysisReport, RiskLevel } from './src/types.js';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Google GenAI setup
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  }) : null;

  // Endpoint de salud
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', geminiConfigured: !!ai });
  });

  // API Route: Análisis del Núcleo Analítico del Sistema de Alerta Temprana (SAT)
  app.post('/api/analyze-student', async (req, res) => {
    try {
      const studentData: StudentInputData = req.body;

      if (!studentData || !studentData.studentAlias) {
        return res.status(400).json({ error: 'Faltan datos de la/el estudiante.' });
      }

      // Preparar la solicitud estructurada para Gemini
      const promptText = `
Eres el núcleo analítico de un Sistema de Alerta Temprana Escolar (SAT) en educación secundaria y media en Colombia (docentes de aula, directores de grupo, docentes orientadores, comités de convivencia escolar y directivos).

Analiza estrictamente la información provista del estudiante:

- Identificación / Alias: ${studentData.studentAlias} (${studentData.grade})
- DIMENSIÓN CUANTITATIVA:
  * Asistencia Mensual: ${studentData.monthlyAttendance}% (Tendencia: ${studentData.attendanceTrend})
  * Promedio General de Notas: ${studentData.gpa} (Escala colombiana 1.0 - 5.0, aprobación mínima 3.0 según Decreto 1290 MEN)
  * Variación de notas respecto al periodo anterior: ${studentData.gpaVariation > 0 ? '+' : ''}${studentData.gpaVariation} puntos
  * N° de Asignaturas Reprobadas / en Desempeño Bajo (< 3.0): ${studentData.failedSubjectsCount}

- DIMENSIÓN CUALITATIVA:
  * Nivel de Participación / Actitud: ${studentData.participationLevel}
  * Reportes de Convivencia / Observaciones de Aula (Ley 1620): "${studentData.convivenciaNotes || 'Sin observaciones específicas'}"
  * Contexto Socioemocional / Entorno Familiar (SIMPADE): "${studentData.familyContextNotes || 'Sin información adicional'}"

- DIMENSIÓN DE SEVERIDAD:
  * Nivel de Impacto Observado por el docente: ${studentData.severityLevel}
  * Factores Gatillantes / Críticos: ${studentData.triggerFactors.length > 0 ? studentData.triggerFactors.join(', ') : 'Ninguno reportado'}

INSTRUCCIONES Y RESTRICCIONES CRÍTICAS:
1. Sé riguroso, objetivo y estrictamente ceñido a los datos provistos.
2. Está CATEGÓRICAMENTE PROHIBIDO emitir diagnósticos médicos o clínicos, etiquetas definitivas o juicios de valor sobre el estudiante.
3. Mantén un tono técnico pero profundamente constructivo, humano, empático y orientado a la acción educativa temprana y la permanencia.
4. Prioriza la empatía, el diálogo socioafectivo y el acompañamiento institucional por sobre cualquier enfoque punitivo o sancionatorio (en línea con las orientaciones de permanencia y bienestar escolar del MEN y SIMPADE).

FORMATO OBLIGATORIO DE RESPUESTA EN JSON CON LOS SIGUIENTES CAMPOS:
- "riskLevel": Debe ser exactamente una de estas palabras en mayúsculas: "BAJO", "MEDIO" o "ALTO".
- "criticalFactorsSynthesis": Síntesis cualitativa/cuantitativa en un párrafo claro, donde cruces de manera explícita la asistencia, notas y comportamiento. Explicar cómo interactúan estos indicadores sin diagnosticar ni estigmatizar.
- "actionStep1": Primera acción concreta, práctica, realista y realizable por el director de grupo o docente orientador (enfoque formativo/socioafectivo).
- "actionStep2": Segunda acción concreta, práctica, realista y realizable por coordinación académica o articulación con familia/acudiente (enfoque pedagógico o institucional de acompañamiento).
- "riskScore": Número entero entre 0 y 100 que refleja la intensidad del nivel de alerta.
- "keyIndicatorsHighlight": Lista de 3 a 4 frases breves que resumen los factores críticos detectados.
- "preventiveCategory": Frase corta descriptiva de la estrategia recomendada (ej. "Acompañamiento Socioemocional Temprano", "Adaptación Pedagógica y Nivelación", "Seguimiento y Permanencia SIMPADE").
`;

      let generatedResponse;

      if (ai) {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: promptText,
            config: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  riskLevel: { type: Type.STRING, description: "NIVEL DE RIESGO: BAJO, MEDIO o ALTO" },
                  criticalFactorsSynthesis: { type: Type.STRING, description: "SÍNTESIS DE FACTORES CRÍTICOS cruzando asistencia, notas y comportamiento" },
                  actionStep1: { type: Type.STRING, description: "Primera acción concreta para el profesor jefe o dupla psicosocial" },
                  actionStep2: { type: Type.STRING, description: "Segunda acción concreta práctica y realizable" },
                  riskScore: { type: Type.INTEGER, description: "Puntaje de riesgo de 0 a 100" },
                  keyIndicatorsHighlight: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Puntos destacados de indicadores clave"
                  },
                  preventiveCategory: { type: Type.STRING, description: "Categoría de intervención preventiva" }
                },
                required: ["riskLevel", "criticalFactorsSynthesis", "actionStep1", "actionStep2", "riskScore", "keyIndicatorsHighlight", "preventiveCategory"]
              }
            }
          });

          const jsonText = response.text || '{}';
          generatedResponse = JSON.parse(jsonText);
        } catch (geminiError) {
          console.error('Error al invocar Gemini API:', geminiError);
          // Fallback a motor analítico reglamentario en caso de error temporal de API
          generatedResponse = computeFallbackReport(studentData);
        }
      } else {
        // Si no hay GEMINI_API_KEY en local, usamos el motor determinista de alta precisión
        generatedResponse = computeFallbackReport(studentData);
      }

      // Validar nivel de riesgo
      let finalRiskLevel: RiskLevel = 'MEDIO';
      if (['BAJO', 'MEDIO', 'ALTO'].includes(generatedResponse.riskLevel?.toUpperCase())) {
        finalRiskLevel = generatedResponse.riskLevel.toUpperCase() as RiskLevel;
      }

      const report: RiskAnalysisReport = {
        id: `report-${Date.now()}`,
        studentAlias: studentData.studentAlias,
        grade: studentData.grade,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        inputData: studentData,
        riskLevel: finalRiskLevel,
        criticalFactorsSynthesis: generatedResponse.criticalFactorsSynthesis || 'Síntesis analítica completada basada en cruce de datos cuantitativos y cualitativos.',
        actionPlan: [
          generatedResponse.actionStep1 || 'Realizar entrevista socioafectiva individual con la/el estudiante para indagar en sus necesidades directas.',
          generatedResponse.actionStep2 || 'Coordinar con la Dupla Psicosocial o Orientación un acompañamiento de seguimiento continuo.'
        ],
        riskScore: generatedResponse.riskScore ?? calculateScore(studentData),
        keyIndicatorsHighlight: generatedResponse.keyIndicatorsHighlight || [
          `Asistencia: ${studentData.monthlyAttendance}%`,
          `Promedio: ${studentData.gpa}`,
          `Nivel de participación: ${studentData.participationLevel}`
        ],
        preventiveCategory: generatedResponse.preventiveCategory || 'Plan de Acompañamiento Oportuno'
      };

      return res.json(report);
    } catch (err) {
      console.error('Error general en el servidor:', err);
      res.status(500).json({ error: 'Error interno al procesar el análisis de alerta temprana.' });
    }
  });

  // Configuración de Vite (desarrollo) o archivos estáticos (producción / Cloud Run)
  const isDev = process.env.NODE_ENV === 'development' || (!process.env.NODE_ENV && process.argv[1]?.endsWith('server.ts'));
  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: 'Endpoint no encontrado' });
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SAT Escolar] Servidor ejecutándose en http://0.0.0.0:${PORT}`);
  });
}

function calculateScore(data: StudentInputData): number {
  let score = 0;
  // Asistencia (0 - 100%)
  if (data.monthlyAttendance < 70) score += 40;
  else if (data.monthlyAttendance < 85) score += 25;
  else if (data.monthlyAttendance < 90) score += 10;

  // Promedio de notas (escala colombiana 1.0 a 5.0, reprobado < 3.0 según Decreto 1290 MEN)
  if (data.gpa < 3.0) score += 30;
  else if (data.gpa < 3.5) score += 18;
  else if (data.gpa < 3.8) score += 8;

  // Caída de notas
  if (data.gpaVariation < -0.8) score += 15;
  else if (data.gpaVariation < -0.4) score += 8;

  // Asignaturas reprobadas
  if (data.failedSubjectsCount >= 3) score += 15;
  else if (data.failedSubjectsCount >= 1) score += 8;

  // Severidad reportada
  if (data.severityLevel === 'CRITICO') score += 20;
  else if (data.severityLevel === 'SEVERO') score += 15;
  else if (data.severityLevel === 'MODERADO') score += 8;

  return Math.min(100, Math.max(0, score));
}

function computeFallbackReport(data: StudentInputData) {
  const score = calculateScore(data);
  let riskLevel: RiskLevel = 'BAJO';
  if (score >= 65) riskLevel = 'ALTO';
  else if (score >= 35) riskLevel = 'MEDIO';

  return {
    riskLevel,
    riskScore: score,
    criticalFactorsSynthesis: `Se evidencia un cruce significativo entre una asistencia mensual del ${data.monthlyAttendance}% (${data.attendanceTrend.toLowerCase().replace('_', ' ')}), un rendimiento académico con promedio ${data.gpa} (variación de ${data.gpaVariation} puntos, ${data.failedSubjectsCount} áreas en desempeño bajo) y observaciones de convivencia/aula orientadas a ${data.participationLevel.toLowerCase().replace('_', ' ')}. Esta conjunción de indicadores de alerta temprana requiere intervención y acompañamiento oportuno en el marco de permanencia escolar SIMPADE.`,
    actionStep1: 'Sostener un diálogo formativo y de escucha activa entre el Director de Grupo / Docente Orientador y el estudiante para identificar factores de desmotivación o barreras socioafectivas.',
    actionStep2: 'Coordinar con la Coordinación Académica y la familia/acudiente una estrategia de plan de mejoramiento pedagógico y seguimiento periódico a la asistencia.',
    keyIndicatorsHighlight: [
      `Asistencia ${data.monthlyAttendance}%`,
      `Promedio académico ${data.gpa} (escala 1.0-5.0)`,
      `Nivel de impacto ${data.severityLevel}`
    ],
    preventiveCategory: riskLevel === 'ALTO' ? 'Intervención Prioritaria de Permanencia' : 'Acompañamiento Socioemocional Preventivo'
  };
}

startServer();
