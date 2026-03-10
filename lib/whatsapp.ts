import type { CartItem } from './types';

export function generarMensajeCarrito(items: CartItem[]): string {
  let mensaje = '*PEDIDO - Soluciones Tecnologicas El Inge*\n\n';
  let total = 0;

  items.forEach((item, i) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    mensaje += `${i + 1}. *${item.nombre}*\n`;
    mensaje += `   Cantidad: ${item.cantidad}\n`;
    mensaje += `   Precio: $${item.precio.toFixed(2)}\n`;
    mensaje += `   Subtotal: $${subtotal.toFixed(2)}\n\n`;
  });

  mensaje += `------------------\n`;
  mensaje += `*TOTAL: $${total.toFixed(2)}*\n\n`;
  mensaje += `Espero confirmacion y detalles de pago. Gracias!`;

  return mensaje;
}

export function generarMensajeSolicitud(data: {
  nombre: string;
  whatsapp: string;
  programa: string;
  version?: string;
  sistemaOperativo: string;
  comentario?: string;
}): string {
  let mensaje = '*SOLICITUD DE SOFTWARE - El Inge*\n\n';
  mensaje += `*Nombre:* ${data.nombre}\n`;
  mensaje += `*WhatsApp:* ${data.whatsapp}\n`;
  mensaje += `*Programa:* ${data.programa}\n`;
  if (data.version) mensaje += `*Version:* ${data.version}\n`;
  mensaje += `*Sistema Operativo:* ${data.sistemaOperativo}\n`;
  if (data.comentario) mensaje += `*Comentario:* ${data.comentario}\n`;

  return mensaje;
}

export function generarMensajeCita(data: {
  nombre: string;
  whatsapp: string;
  tipoEquipo: string;
  marca: string;
  problema: string;
  fecha: string;
  hora: string;
}): string {
  let mensaje = '*CITA DE REPARACION - El Inge*\n\n';
  mensaje += `*Nombre:* ${data.nombre}\n`;
  mensaje += `*WhatsApp:* ${data.whatsapp}\n`;
  mensaje += `*Tipo de equipo:* ${data.tipoEquipo}\n`;
  mensaje += `*Marca:* ${data.marca}\n`;
  mensaje += `*Problema:* ${data.problema}\n`;
  mensaje += `*Fecha:* ${data.fecha}\n`;
  mensaje += `*Hora:* ${data.hora}\n`;

  return mensaje;
}

export function abrirWhatsApp(numero: string, mensaje: string) {
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}
