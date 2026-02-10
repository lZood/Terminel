import { supabase } from './supabase';

export interface BoletaOCRData {
    folio: string;
    peso_bruto_kg: number;
    peso_tara_kg: number;
    peso_neto_kg: number;
    producto: string;
    proveedor: string;
    fecha: string;
    hora: string;
    humedad: number | null;
    impurezas: number | null;
    validacion: {
        discrepancia: boolean;
        diferencia_kg: number;
        porcentaje_diferencia: number;
        peso_esperado: number | null;
    };
    imagen_url?: string;
    entrega_id?: string;
}

export const ocrHelpers = {
    /**
     * Guarda el resultado del OCR en la base de datos
     */
    async saveOCRResult(data: BoletaOCRData, userId?: string) {
        const { error } = await supabase.from('auditoria_boletas').insert({
            folio: data.folio,
            peso_bruto_kg: data.peso_bruto_kg,
            peso_tara_kg: data.peso_tara_kg,
            peso_neto_kg: data.peso_neto_kg,
            producto: data.producto,
            proveedor: data.proveedor,
            fecha: data.fecha,
            hora: data.hora,
            humedad: data.humedad,
            impurezas: data.impurezas,
            discrepancia_detectada: data.validacion.discrepancia,
            diferencia_kg: data.validacion.diferencia_kg,
            porcentaje_diferencia: data.validacion.porcentaje_diferencia,
            peso_esperado_kg: data.validacion.peso_esperado,
            imagen_url: data.imagen_url,
            procesado_por: userId,
            entrega_id: data.entrega_id,
        });

        if (error) {
            console.error('Error guardando OCR:', error);
            throw new Error('Error al guardar el resultado del OCR');
        }

        return { success: true };
    },

    /**
     * Obtiene todas las auditorías de boletas
     */
    async getAuditorias(filters?: {
        folio?: string;
        discrepancia?: boolean;
        fechaInicio?: string;
        fechaFin?: string;
        limit?: number;
    }) {
        let query = supabase
            .from('auditoria_boletas')
            .select('*')
            .order('procesado_en', { ascending: false });

        if (filters?.folio) {
            query = query.ilike('folio', `%${filters.folio}%`);
        }

        if (filters?.discrepancia !== undefined) {
            query = query.eq('discrepancia_detectada', filters.discrepancia);
        }

        if (filters?.fechaInicio) {
            query = query.gte('procesado_en', filters.fechaInicio);
        }

        if (filters?.fechaFin) {
            query = query.lte('procesado_en', filters.fechaFin);
        }

        if (filters?.limit) {
            query = query.limit(filters.limit);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error obteniendo auditorías:', error);
            throw new Error('Error al obtener las auditorías');
        }

        return data;
    },

    /**
     * Elimina un registro de auditoría por ID
     */
    async deleteAuditoria(id: string) {
        const { error } = await supabase
            .from('auditoria_boletas')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error eliminando auditoría:', error);
            throw new Error('Error al eliminar el registro');
        }

        return { success: true };
    },

    /**
     * Obtiene estadísticas de OCR
     */
    async getEstadisticas() {
        const { data, error } = await supabase
            .from('auditoria_boletas')
            .select('discrepancia_detectada, peso_neto_kg');

        if (error) {
            console.error('Error obteniendo estadísticas:', error);
            throw new Error('Error al obtener estadísticas');
        }

        const total = data.length;
        const conDiscrepancia = data.filter((d) => d.discrepancia_detectada).length;
        const sinDiscrepancia = total - conDiscrepancia;
        const pesoTotal = data.reduce((acc, curr) => acc + (curr.peso_neto_kg || 0), 0);

        return {
            total,
            conDiscrepancia,
            sinDiscrepancia,
            porcentajeDiscrepancia: total > 0 ? (conDiscrepancia / total) * 100 : 0,
            pesoTotal,
        };
    },

    /**
     * Busca si ya existe una boleta con el mismo folio
     */
    async checkDuplicateFolio(folio: string) {
        const { data, error } = await supabase
            .from('auditoria_boletas')
            .select('id, folio, procesado_en')
            .eq('folio', folio)
            .limit(1);

        if (error) {
            console.error('Error verificando duplicados:', error);
            return { exists: false };
        }

        return {
            exists: data && data.length > 0,
            existing: data?.[0],
        };
    },
};
