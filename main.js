// ============================================
// CHIMBOTE TRAVEL TOURS - JAVASCRIPT PRINCIPAL
// ============================================

// ========== VARIABLES Y CONSTANTES ==========
// Variables
let menuAbierto = false;
let destinoSeleccionado = null;
let reservas = []; // Arreglo para almacenar reservas

// Constantes
const PRECIOS_DESTINOS = {
  "Machu Picchu": 980,
  "Montaña": 620,
  "Valle Sagrado": 720,
  "Paracas": 420,
  "Máncora": 480,
  "Cañon": 790,
  "Arequipa": 720,
  "Laguna": 650,
  "Tarapoto": 890,
  "Iquitos": 1100,
  "Ayacucho": 580,
  "Cajamarca": 620
};

const DESCUENTOS = {
  minimo: 2,      // Mínimo de personas para descuento
  porcentaje: 0.10  // 10% de descuento
};

// Arreglo de destinos con información completa
const destinosInfo = [
  {
    nombre: "Machu Picchu – Cusco",
    descripcion: "Descubre la majestuosa ciudadela inca de Machu Picchu, uno de los destinos más emblemáticos del mundo. Recorre sus templos, andenes y miradores mientras disfrutas de un paisaje impresionante entre montañas y nubes.",
    precio: 980,
    duracion: "3 días / 2 noches",
    incluye: "Traslados, hospedaje, tren turístico, entrada, guía, alimentación.",
    imagen: "https://cuscoperu.b-cdn.net/wp-content/uploads/2023/09/Visita-machu-picchu-con-ninos.webp"
  },
  {
    nombre: "Montaña de 7 Colores – Cusco",
    descripcion: "Una maravilla natural ubicada a más de 5,000 msnm. Sus tonos rojizos, amarillos y turquesas crean un paisaje único que atrae a viajeros de todo el mundo. Ideal para amantes del trekking y la aventura.",
    precio: 620,
    duracion: "2 días / 1 noche",
    incluye: "Traslados, desayuno, almuerzo, guía, oxígeno.",
    imagen: "https://bananomeridiano.com/wp-content/uploads/2019/11/monta%C3%B1a-de-los-7-colores.jpg"
  },
  {
    nombre: "Valle Sagrado + Pisac – Cusco",
    descripcion: "Explora el histórico Valle Sagrado de los Incas y visita los imponentes restos arqueológicos de Pisac. Un destino lleno de cultura, historia y hermosos paisajes andinos.",
    duracion: "2 días / 1 noche",
    incluye: "Transporte turístico, entradas, guía local, almuerzo buffet, hospedaje.",
    imagen: "https://www.machupicchuterra.com/wp-content/uploads/valle-sagrado-10.jpg"
  },
  {
    nombre: "Paracas + Huacachina – Ica",
    descripcion: "Vive lo mejor del desierto iqueño con un tour que combina la Reserva Nacional de Paracas y el oasis de Huacachina. Dunas gigantes, laguna natural y deportes extremos te esperan.",
    precio: 420,
    duracion: "2 días / 1 noche",
    incluye: "Paseo en bote, tour en buggy, sandboard, guía, hospedaje.",
    imagen: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/11/84/54/68.jpg"
  },
  {
    nombre: "Máncora + Nado con Tortugas - Piura",
    descripcion: "Disfruta del sol norteño en las hermosas playas de Máncora y vive la increíble experiencia de nadar al lado de tortugas marinas en su hábitat natural.",
    precio: 480,
    duracion: "3 días / 2 noche",
    incluye: "Hospedaje frente al mar, tour marino, desayuno.",
    imagen: "https://www.bahiaperutours.com.pe/wp-content/uploads/2025/04/tortugas_eldelostours2.jpg"
  },
  {
    nombre: "Cañón del Colca - Arequipa",
    descripcion: "Conoce uno de los cañones más profundos del mundo y observa el majestuoso vuelo del cóndor. Perfecto para quienes buscan naturaleza, cultura y paisajes de impacto.",
    precio: 790,
    duracion: "3 días / 2 noche",
    incluye: "Transporte interno, hospedaje, guía, entradas, desayuno.",
    imagen: "https://machupicchuwayna.com/wp-content/uploads/2024/10/canon-del-colca-arequipa.webp"
  },
  {
    nombre: "Arequipa Colonial + Santa Catalina",
    descripcion: "Recorre la “Ciudad Blanca” y admira su arquitectura colonial. Visita el Monasterio de Santa Catalina, un impresionante complejo lleno de historia, colores y tradición.",
    precio: 720,
    duracion: "3 días / 2 noche",
    incluye: "City tour, entradas, guía, hospedaje céntrico, almuerzo.",
    imagen: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgxP8_ccP-kW-jJP75pZuRE5AVG6EEu2Ix2fxkg7JggLjzF9ccmD4fI9redjApZbxE_dtdIb-qzCz-ZMdTd1slWj9frP95nqcOHfo7b_PzodTLgmYXGjFtVnnOrys09Cs7F7L92L7haV0Dk/s400/IMG_0055+copy2.jpg"
  },
  {
    nombre: "Laguna Humantay – Cusco",
    descripcion: "Una caminata inolvidable hacia una laguna color turquesa ubicada al pie de los nevados. Ideal para quienes buscan aventura y vistas espectaculares.",
    precio: 650,
    duracion: "2 días / 1 noche",
    incluye: "Transporte, desayuno, almuerzo, guía, oxígeno.",
    imagen: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/e6/4f/72/caption.jpg?w=1200&h=-1&s=1"
  },
  {
    nombre: "Tarapoto + Cataratas de Ahuashiyacu",
    descripcion: "Sumérgete en la selva peruana y disfruta de una refrescante visita a las cataratas de Ahuashiyacu. Naturaleza, biodiversidad y descanso en un solo destino.",
    precio: 890,
    duracion: "4 días / 3 noche",
    incluye: "Traslados, hospedaje, tours guiados, alimentación.",
    imagen: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/fa/be/58/excelente-lugar-para.jpg?w=800&h=400&s=1"
  },
  {
    nombre: "Iquitos + Selva Amazónica",
    descripcion: "Adéntrate en la Amazonía peruana, navega por sus ríos y descubre comunidades, fauna y paisajes únicos. Una experiencia auténtica en plena selva tropical.",
    precio: 1.100,
    duracion: "4 días / 3 noche",
    incluye: "Traslados fluviales, hospedaje en lodge, alimentación completa, tours.",
    imagen: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/13/db/18/caption.jpg?w=500&h=400&s=1"
  },
  {
    nombre: "Ayacucho + Aguas Turquesas de Millpu",
    descripcion: "Conoce los impresionantes pozos naturales de Millpu, famosos por su intenso color turquesa. Un paraíso escondido rodeado de montañas y naturaleza pura.",
    precio: 580,
    duracion: "4 días / 3 noche",
    incluye: "Hospedaje, guía, alimentación, entradas.",
    imagen: "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/99/e1/ee.jpg"
  },
  {
    nombre: "Cajamarca Histórica + Baños del Inca",
    descripcion: "Recorre la histórica ciudad de Cajamarca y relájate en los famosos Baños del Inca, aguas termales utilizadas desde tiempos prehispánicos por sus propiedades curativas.",
    precio: 620,
    duracion: "4 días / 3 noche",
    incluye: "Hospedaje, city tour, entradas, alimentación completa.",
    imagen: "https://www.dosmanosperu.com/fotos/tourfotos/tours/hot-springs-banos-inca.jpg"
  }
];

// Función para toggle del menú móvil
function toggleMenu() {
  const menu = document.querySelector('.menu');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (menu && menuToggle) {
    menuAbierto = !menuAbierto;
    menu.classList.toggle('active');
    
    // Animación del botón hamburguesa
    if (menuAbierto) {
      menuToggle.style.transform = 'rotate(90deg)';
    } else {
      menuToggle.style.transform = 'rotate(0deg)';
    }
  }
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(event) {
  const menu = document.querySelector('.menu');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (menu && menuToggle && menuAbierto) {
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
      menu.classList.remove('active');
      menuAbierto = false;
      menuToggle.style.transform = 'rotate(0deg)';
    }
  }
});

// Crear modal dinámicamente
function crearModal(titulo, contenido, mostrarBoton = true) {
  // Eliminar modal existente si hay
  const modalExistente = document.getElementById('modal-flotante');
  if (modalExistente) {
    modalExistente.remove();
  }

  // Crear estructura del modal
  const modal = document.createElement('div');
  modal.id = 'modal-flotante';
  modal.className = 'modal-overlay';
  
  modal.innerHTML = `
    <div class="modal-contenido">
      <span class="modal-cerrar" onclick="cerrarModal()">&times;</span>
      <h2>${titulo}</h2>
      <div class="modal-body">${contenido}</div>
      ${mostrarBoton ? '<button class="btn-modal" onclick="cerrarModal()">Cerrar</button>' : ''}
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Animación de entrada
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
}

// Cerrar modal
function cerrarModal() {
  const modal = document.getElementById('modal-flotante');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

// Mostrar información de destino en modal
function mostrarInfoDestino(destinoNombre) {
  // Buscar destino en el arreglo
  let destino = destinosInfo.find(d => d.nombre.includes(destinoNombre));
  
  if (!destino) {
    // Si no está en el arreglo, buscar por nombre corto
    const nombreCorto = destinoNombre.split('–')[0].trim();
    destino = destinosInfo.find(d => d.nombre.includes(nombreCorto));
  }
  
  if (destino) {
    const contenido = `
      <img src="${destino.imagen}" alt="${destino.nombre}" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
      <p><strong>Descripcion:</strong> ${destino.descripcion}</p>
      <p><strong>Duración:</strong> ${destino.duracion}</p>
      <p><strong>Precio:</strong> S/ ${destino.precio} por persona</p>
      <p><strong>Incluye:</strong> ${destino.incluye}</p>
    `;
    crearModal(destino.nombre, contenido);
  } else {
    alert(`Información de ${destinoNombre} no disponible.`);
  }
}

//FUNCIONES CON PROMPT, CONFIRM Y ALERT
// Bienvenida interactiva
function mostrarBienvenida() {
  const nombre = prompt("¡Bienvenido a Chimbote Travel Tours! ¿Cuál es tu nombre?");
  
  if (nombre && nombre.trim() !== "") {
    alert(`¡Hola ${nombre}! Estamos encantados de tenerte aquí. Explora nuestros increíbles destinos.`);
    
    // Actualizar DOM con el nombre
    const bienvenidaTexto = document.querySelector('.texto-bienvenida h2');
    if (bienvenidaTexto) {
      const textoOriginal = bienvenidaTexto.textContent;
      bienvenidaTexto.textContent = `Bienvenido ${nombre} a Chimbote Travel Tours`;
      
      // Restaurar después de 5 segundos
      setTimeout(() => {
        bienvenidaTexto.textContent = textoOriginal;
      }, 5000);
    }
  }
}

// Suscripción a newsletter
function suscribirseNewsletter() {
  const email = prompt("Ingresa tu correo electrónico para recibir ofertas exclusivas:");
  
  if (email && email.includes('@')) {
    const confirmar = confirm(`¿Confirmas tu suscripción con el correo: ${email}?`);
    
    if (confirmar) {
      alert("¡Gracias por suscribirte! Te enviaremos las mejores ofertas.");
      // Aquí podrías guardar en un arreglo o enviar a servidor
      console.log("Email suscrito:", email);
    }
  } else if (email) {
    alert("Por favor, ingresa un correo electrónico válido.");
  }
}

// DOM
// Calcular precio total dinámicamente
function calcularPrecioTotal() {
  const selectDestino = document.getElementById('destinos');
  const inputPersonas = document.getElementById('personas');
  const fechaInput = document.getElementById('fecha');
  
  if (selectDestino && inputPersonas) {
    const destino = selectDestino.value;
    const personas = parseInt(inputPersonas.value) || 0;
    
    // Buscar precio en el objeto de precios
    let precioBase = 0;
    for (const key in PRECIOS_DESTINOS) {
      if (destino.includes(key) || destino === key) {
        precioBase = PRECIOS_DESTINOS[key];
        break;
      }
    }
    
    if (precioBase > 0 && personas > 0) {
      let precioTotal = precioBase * personas;
      
      // Aplicar descuento si hay 2 o más personas
      if (personas >= DESCUENTOS.minimo) {
        const descuento = precioTotal * DESCUENTOS.porcentaje;
        precioTotal = precioTotal - descuento;
      }
      
      // Crear o actualizar elemento de precio
      let precioElement = document.getElementById('precio-total');
      if (!precioElement) {
        precioElement = document.createElement('div');
        precioElement.id = 'precio-total';
        precioElement.className = 'precio-total';
        selectDestino.parentElement.appendChild(precioElement);
      }
      
      precioElement.innerHTML = `
        <strong>Precio Base:</strong> S/ ${precioBase} x ${personas} persona(s)<br>
        ${personas >= DESCUENTOS.minimo ? `<strong>Descuento (10%):</strong> S/ ${(precioBase * personas * DESCUENTOS.porcentaje).toFixed(2)}<br>` : ''}
        <strong style="color: #0077b6; font-size: 1.2em;">Total: S/ ${precioTotal.toFixed(2)}</strong>
      `;
    } else if (precioBase === 0 && destino) {
      // Si no se encuentra precio, mostrar mensaje
      let precioElement = document.getElementById('precio-total');
      if (precioElement) {
        precioElement.innerHTML = '<p style="color: orange;">Selecciona un destino válido</p>';
      }
    }
    
    // Validación de fecha removida - permite cualquier fecha
  }
}

// Validar formulario antes de enviar
function validarFormulario(event) {
  // Prevenir envío por defecto para validar primero
  if (event) {
    event.preventDefault();
  }
  
  const nombre = document.getElementById('cliente').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const selectDestino = document.getElementById('destinos');
  const destino = selectDestino ? selectDestino.value : '';
  const fecha = document.getElementById('fecha').value;
  const personas = document.getElementById('personas').value;
  
  // Validaciones
  if (!nombre || nombre.length < 3) {
    alert("⚠️ Por favor, ingresa un nombre válido (mínimo 3 caracteres).");
    document.getElementById('cliente').focus();
    return false;
  }
  
  if (!correo || !correo.includes('@')) {
    alert("⚠️ Por favor, ingresa un correo electrónico válido.");
    document.getElementById('correo').focus();
    return false;
  }
  
  // Validar destino - leer valor incluso si está deshabilitado
  let destinoValido = destino;
  if (!destino || destino === '') {
    // Si está deshabilitado, intentar leer el valor de la opción seleccionada
    if (selectDestino && selectDestino.disabled) {
      const opcionSeleccionada = selectDestino.options[selectDestino.selectedIndex];
      if (opcionSeleccionada && opcionSeleccionada.value) {
        destinoValido = opcionSeleccionada.value;
      }
    } else {
      alert("⚠️ Por favor, selecciona un destino.");
      if (selectDestino && !selectDestino.disabled) {
        selectDestino.focus();
      }
      return false;
    }
  }
  
  if (!fecha) {
    alert("⚠️ Por favor, selecciona una fecha de viaje.");
    document.getElementById('fecha').focus();
    return false;
  }
  
  if (!personas || parseInt(personas) < 1) {
    alert("⚠️ Por favor, ingresa una cantidad válida de personas.");
    document.getElementById('personas').focus();
    return false;
  }
  
  // Usar destino válido (puede ser del select deshabilitado)
  const destinoFinal = destinoValido || destino;
  
  // Confirmar reserva
  const confirmar = confirm(`¿Confirmas tu reserva para ${personas} persona(s) en ${destinoFinal}?`);
  
  if (confirmar) {
    // Si el select está deshabilitado, asegurar que el valor se envíe
    if (selectDestino && selectDestino.disabled) {
      // Crear un input hidden para asegurar que el valor se envíe
      let hiddenInput = document.getElementById('destino-hidden');
      if (!hiddenInput) {
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'destino-hidden';
        hiddenInput.name = 'destinos';
        hiddenInput.value = destinoFinal;
        selectDestino.parentElement.appendChild(hiddenInput);
      } else {
        hiddenInput.value = destinoFinal;
      }
    }
    
    // Guardar en arreglo de reservas
    const reserva = {
      nombre: nombre,
      correo: correo,
      destino: destinoFinal,
      fecha: fecha,
      personas: parseInt(personas),
      fechaReserva: new Date().toLocaleString()
    };
    
    reservas.push(reserva);
    console.log("Reserva guardada:", reserva);
    console.log("Total de reservas:", reservas.length);
    
    // Enviar formulario
    const formulario = document.querySelector('form');
    if (formulario) {
      formulario.submit();
    }
    return true;
  }
  
  return false;
}

// Agregar botones interactivos a las tarjetas de destinos
function agregarBotonDestinos() {
  const destinosCards = document.querySelectorAll('.destinos-card');
  
  destinosCards.forEach((card, index) => {
    // Verificar si ya tiene botón
    if (!card.querySelector('.btn-info-destino')) {
      const titulo = card.querySelector('h3');
      if (titulo) {
        const nombreDestino = titulo.textContent.replace(/[^\w\s–]/g, '').trim();
        
        // Crear botón de información
        const btnInfo = document.createElement('button');
        btnInfo.className = 'btn-info-destino';
        btnInfo.textContent = 'Ver Detalles';
        btnInfo.onclick = function() {
          mostrarInfoDestino(nombreDestino);
        };
        
        // Agregar botones a la tarjeta
        const botonContainer = document.createElement('div');
        botonContainer.className = 'boton-destino';
        botonContainer.appendChild(btnInfo);
        card.appendChild(botonContainer);
      }
    }
  });
}
// Función que se ejecuta cuando el DOM está listo
function inicializar() {
  console.log("🚀 Chimbote Travel Tours - JavaScript inicializado");
  
  // Agregar event listeners
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }
  
  // Agregar onchange al select de destinos
  const selectDestino = document.getElementById('destinos');
  if (selectDestino) {
    selectDestino.addEventListener('change', calcularPrecioTotal);
  }
  
  // Agregar onchange al input de personas
  const inputPersonas = document.getElementById('personas');
  if (inputPersonas) {
    inputPersonas.addEventListener('change', calcularPrecioTotal);
    inputPersonas.addEventListener('input', calcularPrecioTotal);
  }
  
  // Agregar onchange a la fecha
  const fechaInput = document.getElementById('fecha');
  if (fechaInput) {
    fechaInput.addEventListener('change', calcularPrecioTotal);
    // Validación de fecha mínima removida - permite cualquier fecha
  }
  
  // Validar formulario antes de enviar (ya se maneja con onclick en el botón)
  // El onclick en el botón ya maneja la validación
  
  // Agregar botones a destinos si estamos en la página de destinos
  if (document.querySelector('.destinos-card')) {
    agregarBotonesDestinos();
  }
  
  // Cargar destino desde URL si existe
  const urlParams = new URLSearchParams(window.location.search);
  const destinoParam = urlParams.get('destino');
  const bloqueado = urlParams.get('bloqueado') === 'true';
  
  if (destinoParam && selectDestino) {
    // Buscar opción que coincida
    let destinoEncontrado = false;
    let valorDestino = '';
    
    for (let option of selectDestino.options) {
      if (option.text.includes(destinoParam) || destinoParam.includes(option.value) || 
          destinoParam.includes(option.text.split('–')[0].trim())) {
        option.selected = true;
        valorDestino = option.value;
        destinoEncontrado = true;
        // Forzar el cambio del valor
        selectDestino.value = option.value;
        calcularPrecioTotal();
        break;
      }
    }
    
    // Si viene bloqueado desde destinos, deshabilitar el select y mostrar mensaje
    if (bloqueado && destinoEncontrado) {
      // Asegurar que el valor esté establecido antes de deshabilitar
      if (valorDestino) {
        selectDestino.value = valorDestino;
      }
      
      // Crear input hidden para asegurar que el valor se envíe en el formulario
      let hiddenInput = document.getElementById('destino-hidden');
      if (!hiddenInput && valorDestino) {
        hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'destino-hidden';
        hiddenInput.name = 'destinos';
        hiddenInput.value = valorDestino;
        selectDestino.parentElement.appendChild(hiddenInput);
      }
      
      // Deshabilitar el select
      selectDestino.disabled = true;
      selectDestino.style.backgroundColor = '#f0f0f0';
      selectDestino.style.cursor = 'not-allowed';
      
      }
    }
  }
  
  // Mostrar bienvenida después de 1 segundo
  if (window.location.pathname.includes('chimbotes.html') || window.location.pathname.includes('Inicio.html')) {
    setTimeout(() => {
      // Opcional: descomentar para activar bienvenida automática
      // mostrarBienvenida();
    }, 1000);
  }

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializar);
} else {
  inicializar();
}

// Inicializar funciones adicionales después de que todo esté cargado
window.addEventListener('load', function() {
  inicializarScrollToTop();
  animarEstadisticas();
  actualizarAriaMenu();
});
// Contador de visitas (usando localStorage)
function actualizarContadorVisitas() {
  let visitas = localStorage.getItem('visitasChimboteTours');
  visitas = visitas ? parseInt(visitas) + 1 : 1;
  localStorage.setItem('visitasChimboteTours', visitas);
  console.log(`Visitas totales: ${visitas}`);
  return visitas;
}

//BOTÓN SCROLL TO TOP
function inicializarScrollToTop() {
  const btnScrollTop = document.getElementById('btn-scroll-top');
  
  if (btnScrollTop) {
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        btnScrollTop.classList.add('visible');
      } else {
        btnScrollTop.classList.remove('visible');
      }
    });
    
    // Scroll suave al hacer clic
    btnScrollTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

//ANIMACIÓN DE ESTADÍSTICAS
function animarEstadisticas() {
  const numeros = document.querySelectorAll('.numero-estadistica');
  
  if (numeros.length === 0) return;
  
  // Función para animar un número
  function animarNumero(elemento) {
    const target = parseInt(elemento.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        elemento.textContent = target;
        clearInterval(timer);
      } else {
        elemento.textContent = Math.floor(current);
      }
    }, 16);
  }
  
  // Observer para activar animación cuando se vea la sección
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        numeros.forEach(numero => {
          if (numero.textContent === '0') {
            animarNumero(numero);
          }
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });
  
  const estadisticasSection = document.querySelector('.estadisticas');
  if (estadisticasSection) {
    observer.observe(estadisticasSection);
  }
}

//ACTUALIZAR ARIA-EXPANDED DEL MENÚ
function actualizarAriaMenu() {
  const menuToggle = document.getElementById('menu-toggle-btn');
  const menu = document.querySelector('.menu');
  
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function() {
      const isExpanded = menu.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isExpanded);
    });
  }
}


  // leer localStorage
  const destino = localStorage.getItem('destinoSeleccionado');
  if (destino) {
    const option = Array.from(selectDestino.options).find(o => o.value === destino);
    if (option) selectDestino.value = option.value;
    localStorage.removeItem('destinoSeleccionado');
  }


// Llamar al contador
actualizarContadorVisitas();

