import React from 'react';
import { BookOpenCheck } from 'lucide-react';

export const ProtocolGuidelines: React.FC = () => {
  return (
    <div className="bg-white border-2 border-[#1A1A1A] p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#1A1A1A] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#1A1A1A] text-white">
            <BookOpenCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-serif italic text-[#1A1A1A]">
              Marco de Permanencia y Estrategia de Alerta Temprana (MEN Colombia)
            </h2>
            <p className="text-xs text-[#666] font-medium mt-0.5">
              Lineamientos del Ministerio de Educación Nacional, SIMPADE, Decreto 1290 de 2009 y Ley 1620 de Convivencia Escolar.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Core Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Principle 1 */}
        <div className="p-5 bg-[#F9F8F6] border border-[#1A1A1A]/30 space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">
            01. Decreto 1290 de 2009
          </span>
          <h3 className="text-sm font-serif italic font-bold text-[#1A1A1A]">
            Evaluación Formativa No Punitiva
          </h3>
          <p className="text-xs text-[#444] leading-relaxed">
            Las bajas calificaciones (Desempeño Bajo &lt; 3.0) o inasistencias deben abordarse mediante planes de apoyo pedagógico continuo, garantizando el derecho fundamental a la educación sin medidas discriminatorias.
          </p>
        </div>

        {/* Principle 2 */}
        <div className="p-5 bg-[#F9F8F6] border border-[#1A1A1A]/30 space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">
            02. Ley 1620 de Convivencia
          </span>
          <h3 className="text-sm font-serif italic font-bold text-[#1A1A1A]">
            Comité y Orientación Escolar
          </h3>
          <p className="text-xs text-[#444] leading-relaxed">
            Activación del Orientador Escolar y el Comité de Convivencia para hacer seguimiento a situaciones socioafectivas, acoso, ambiente escolar y entornos familiares de vulnerabilidad (Ruta de Atención Integral).
          </p>
        </div>

        {/* Principle 3 */}
        <div className="p-5 bg-[#F9F8F6] border border-[#1A1A1A]/30 space-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">
            03. Estrategia SIMPADE (MEN)
          </span>
          <h3 className="text-sm font-serif italic font-bold text-[#1A1A1A]">
            Estrategia de Permanencia Escolar
          </h3>
          <p className="text-xs text-[#444] leading-relaxed">
            Identificación temprana de variables de deserción (distancia, transporte, trabajo infantil, embarazo adolescente) articuladas con el Programa de Alimentación Escolar (PAE) y búsqueda activa.
          </p>
        </div>

      </div>

      {/* Protocol Step-by-Step for Docentes en Colombia */}
      <div className="p-6 bg-[#1A1A1A] text-white space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#F9F8F6] border-b border-white/20 pb-2">
          Pasos de Actuación Sugeridos para Docentes y Directores de Grupo (Colombia):
        </h3>

        <ol className="space-y-3 text-xs font-sans">
          <li className="flex items-start gap-3">
            <span className="font-mono text-sm font-bold opacity-60">01</span>
            <span><strong>Detección Factual en Registro Académico:</strong> Registre en la herramienta los datos cualitativos y cuantitativos al identificar 3 o más inasistencias continuas sin justificar o promedio en Desempeño Bajo (&lt; 3.0).</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-mono text-sm font-bold opacity-60">02</span>
            <span><strong>Diálogo Pedagógico y Caracterización:</strong> Entreviste al estudiante en espacio seguro para indagar motivos (transporte, salud, labores del hogar) e informar a Orientación Escolar.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-mono text-sm font-bold opacity-60">03</span>
            <span><strong>Plan de Permanencia con Acudiente:</strong> Notifique al acudiente o padre de familia para concertar un acuerdo formativo de apoyo pedagógico y articulación con subsidios/PAE si aplica.</span>
          </li>
        </ol>
      </div>

    </div>
  );
};

