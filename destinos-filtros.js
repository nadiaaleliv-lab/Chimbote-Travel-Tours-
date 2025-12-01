// ============================================
// SISTEMA DE FILTROS Y ORDENAMIENTO
// ============================================

// Función para filtrar destinos
function filtrarDestinos() {
  const busqueda = document.getElementById('buscar-destino').value.toLowerCase();
  const filtroPrecio = document.getElementById('filtro-precio').value;
  const filtroDuracion = document.getElementById('filtro-duracion').value;
  const filtroRegion = document.getElementById('filtro-region').value;
  
  const cards = document.querySelectorAll('.destinos-card');
  let contador = 0;
  
  cards.forEach(card => {
    const nombre = card.getAttribute('data-nombre').toLowerCase();
    const precio = parseInt(card.getAttribute('data-precio'));
    const duracion = parseInt(card.getAttribute('data-duracion'));
    const region = card.getAttribute('data-region');
    
    // Filtro de búsqueda
    const coincideBusqueda = nombre.includes(busqueda);
    
    // Filtro de precio
    let coincidePrecio = true;
    if (filtroPrecio) {
      if (filtroPrecio === '0-500') {
        coincidePrecio = precio < 500;
      } else if (filtroPrecio === '500-700') {
        coincidePrecio = precio >= 500 && precio <= 700;
      } else if (filtroPrecio === '700-900') {
        coincidePrecio = precio > 700 && precio <= 900;
      } else if (filtroPrecio === '900+') {
        coincidePrecio = precio > 900;
      }
    }
    
    // Filtro de duración
    let coincideDuracion = true;
    if (filtroDuracion) {
      if (filtroDuracion === '2') {
        coincideDuracion = duracion === 2;
      } else if (filtroDuracion === '3') {
        coincideDuracion = duracion === 3;
      } else if (filtroDuracion === '4') {
        coincideDuracion = duracion >= 4;
      }
    }
    
    // Filtro de región
    const coincideRegion = !filtroRegion || region === filtroRegion;
    
    // Mostrar u ocultar tarjeta
    if (coincideBusqueda && coincidePrecio && coincideDuracion && coincideRegion) {
      card.classList.remove('oculto');
      contador++;
    } else {
      card.classList.add('oculto');
    }
  });
  
  // Actualizar contador
  actualizarContador(contador);
}

// Función para ordenar destinos
function ordenarDestinos() {
  const orden = document.getElementById('ordenar-por').value;
  const grid = document.getElementById('destinos-grid');
  const cards = Array.from(grid.querySelectorAll('.destinos-card:not(.oculto)'));
  
  if (orden === 'default') return;
  
  cards.sort((a, b) => {
    if (orden === 'precio-asc') {
      return parseInt(a.getAttribute('data-precio')) - parseInt(b.getAttribute('data-precio'));
    } else if (orden === 'precio-desc') {
      return parseInt(b.getAttribute('data-precio')) - parseInt(a.getAttribute('data-precio'));
    } else if (orden === 'duracion-asc') {
      return parseInt(a.getAttribute('data-duracion')) - parseInt(b.getAttribute('data-duracion'));
    } else if (orden === 'duracion-desc') {
      return parseInt(b.getAttribute('data-duracion')) - parseInt(a.getAttribute('data-duracion'));
    } else if (orden === 'popularidad') {
      return parseInt(b.getAttribute('data-popularidad')) - parseInt(a.getAttribute('data-popularidad'));
    }
    return 0;
  });
  
  // Reordenar en el DOM
  cards.forEach(card => grid.appendChild(card));
}

// Función para limpiar filtros
function limpiarFiltros() {
  document.getElementById('buscar-destino').value = '';
  document.getElementById('filtro-precio').value = '';
  document.getElementById('filtro-duracion').value = '';
  document.getElementById('filtro-region').value = '';
  document.getElementById('ordenar-por').value = 'default';
  
  const cards = document.querySelectorAll('.destinos-card');
  cards.forEach(card => card.classList.remove('oculto'));
  
  actualizarContador(cards.length);
  
  // Restaurar orden original
  const grid = document.getElementById('destinos-grid');
  const cardsArray = Array.from(cards);
  cardsArray.sort((a, b) => {
    return Array.from(grid.children).indexOf(a) - Array.from(grid.children).indexOf(b);
  });
  cardsArray.forEach(card => grid.appendChild(card));
}

// Función para actualizar contador
function actualizarContador(cantidad) {
  const contador = document.getElementById('contador-resultados');
  if (contador) {
    contador.textContent = `${cantidad} destino${cantidad !== 1 ? 's' : ''} encontrado${cantidad !== 1 ? 's' : ''}`;
  }
}

// Función para reservar destino (mejorada)
function reservarDestino(nombreDestino) {
  const confirmar = confirm(`¿Deseas reservar "${nombreDestino}"?`);
  if (confirmar) {
    // Pasar parámetro adicional para indicar que viene de destinos y debe bloquearse
    window.location.href = `reserva1.html?destino=${encodeURIComponent(nombreDestino)}&bloqueado=true`;
  }
}

// Inicializar contador al cargar
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.destinos-card');
  actualizarContador(cards.length);
});

