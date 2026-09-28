/* ==========================================================================
   RENOVÉ · HOME DE LA TIENDA
   Archivo: renove-home.js  ·  vive en GitHub, lo sirve jsDelivr y lo carga
   Google Tag Manager SOLO en la página de inicio.

   LA ESTRUCTURA (la misma que la home de referencia, con lo de RENOVÉ)
     0. CINTA ................ cuotas · envío gratis · garantía (arriba del header)
     1. HERO ................. foto a pantalla completa, calificación, título,
                               dos tildes, bajada y botón
     2. YA SON PARTE ......... carrusel automático de fotos de clientes, botón
                               y franja de envío, cuotas y garantía
     3. LA FRASE ............. lo que cree la marca, en letra grande (las
                               palabras se encienden al scrollear)
     4. NUESTROS CLIENTES ♥ .. testimonios en carrusel infinito (avanza solo)
     5. POR QUÉ ELEGIR ....... texto + tabla RENOVÉ vs. otras cremas
     6. APRENDÉ SOBRE TU PIEL ♥ notas tipo blog que se abren en la página
     7. RESULTADOS ........... imagen + porcentajes de la encuesta + botón
   Los textos, las fotos y los números son de RENOVÉ: se copió la
   estructura, no el contenido de otra marca.
   COLORES: tonos borgoña de la marca, en CFG.colores (bloque 01).
   TIPOGRAFÍA: la misma de la landing. Títulos en Jost, MAYÚSCULAS, peso
   liviano y tracking amplio; textos en Inter; botones en Jost con
   tracking .2em. La palabra destacada va en borgoña, sin cursiva.

   CONVIVE CON EL CÓDIGO DE LA FICHA
   Usa otro prefijo (rnv-) y otro objeto global (RENOVE_HOME) que la landing
   del producto (vnx- / VNX_CONFIG): no se pisan. El carrito VCART sigue
   funcionando igual en toda la tienda.

   ANTES DE PUBLICAR · 4 cosas
   1. productoURL (bloque 01): ya está cargado con renove-1g76m. Si le
      cambiás el nombre al producto, Tiendanube cambia el slug: actualizalo.
   2. FOTOS DE CLIENTES, TESTIMONIOS, RATING Y ENCUESTA (bloques 01 y 02)
      son VALORES DE EJEMPLO. Reemplazalos por los reales antes de pautar y
      pasá datosDeEjemplo a false. En Argentina, una reseña, una foto o un
      porcentaje inventado es publicidad engañosa.
   3. FÓRMULA (tabla y notas): cada ingrediente tiene que coincidir con el
      envase real.
   4. GARANTÍA: se escribe una sola vez (garantiaDias). Si tu política no
      es de 60 días, cambiala acá y también en la ficha.

   CÓMO SE ACTUALIZA
   Editá este archivo en GitHub y guardá (Commit changes). Después abrí en
   el navegador https://purge.jsdelivr.net/gh/TU-USUARIO/renove-home@main/renove-home.js
   para que jsDelivr suelte la versión vieja (si no, puede tardar hasta
   12 horas). No hace falta tocar Google Tag Manager.

   EVENTOS PARA MEDIR (dataLayer, por si querés armar activadores en GTM)
   event: 'renove_home' con accion = home_visto · cta (y ubicacion) ·
   clientes_flecha · nota_abrir

   DIAGNÓSTICO (consola del navegador, parado en el home):
     RENOVE_HOME.debug()    qué encontró del tema y dónde se montó
     RENOVE_HOME.quitar()   saca el home nuevo y devuelve el nativo
   ========================================================================== */
(function () {
  'use strict';
  if (window.RENOVE_HOME && window.RENOVE_HOME.version) return;


  /* ---------- bloque 01 · PANEL DE CONFIGURACIÓN ----------
     Todo lo que se edita seguido está acá. El resto del archivo se alimenta
     de este bloque. Si querés cambiar algo desde GTM sin tocar GitHub,
     definí window.RENOVE_HOME_CONFIG = { ... } en la etiqueta, ANTES de
     cargar el archivo: lo que pongas ahí pisa lo de acá. */
  var CFG = Object.assign({

    /* OBLIGATORIO. La ficha del producto. Relativo a propósito: funciona
       igual en ebond.mitiendanube.com y en tu dominio propio. */
    productoURL: '/productos/renove-1g76m/',

    marca: 'RENOVÉ',

    /* LOGO DEL HEADER. En el home se reemplaza el logo de la tienda por el
       de RENOVÉ (el link al inicio sigue siendo el mismo).
       · logoImagen vacío = se dibuja la palabra RENOVÉ en Jost.
       · Si tenés el logo en archivo (PNG sin fondo o SVG, en negro), subilo
         a Cloudinary y pegá el link en logoImagen.
       · logoMarca: false = queda el logo de la tienda. */
    logoMarca: true,
    logoTexto: 'RENOVÉ',
    logoImagen: '',

    /* COLORES DE LA HOME · tonos borgoña de la marca.
       vino: botones, cinta, tabla, números y detalles.
       vinoOscuro: fondo del hero y sombras.
       rosado / rosadoMedio: fondos claros de sección, tarjetas e imágenes.
       Si tenés el código exacto del borgoña de tu logo (lo sacás con
       cualquier "cuentagotas" de color, por ejemplo en Canva), pegalo en
       vino y ajustá vinoOscuro para que sea el mismo tono, más oscuro. */
    colores: {
      vino: '#6B1D34',
      vinoOscuro: '#3D0F1D',
      rosado: '#F8F0F1',
      rosadoMedio: '#EDDDE1'
    },

    /* Calificación del hero ("EXCELENTE | 1.247 OPINIONES").
       VALOR DE EJEMPLO: tiene que ser EL MISMO que el de la ficha
       (VNX_CONFIG.rating), o la tienda se contradice sola. */
    rating: { puntuacion: 4.8, cantidad: 1247 },

    /* true mientras fotos, testimonios, rating y encuesta sean de ejemplo:
       la consola te lo recuerda en cada carga. Pasalo a false cuando
       cargues los reales. */
    datosDeEjemplo: false,

    garantiaDias: 60,
    cuotas: '3 cuotas sin interés',
    envio: 'Envío gratis a todo el país',

    /* Home nativo de Tiendanube (carrusel, destacados, banners...).
       true = se esconde y queda solo este home. */
    ocultarHomeNativo: true,
    /* Secciones nativas que querés CONSERVAR debajo del home nuevo, por su
       data-store. Ejemplo: ['home-products-featured', 'home-newsletter'] */
    mantenerNativas: [],

    /* Cinta negra que corre arriba del header */
    topbar: true,
    topbarTextos: ['3 cuotas sin interés', 'Envío gratis', 'Garantía ' + 60 + ' días', 'Devolución 100%',
                   '100% origen vegetal', 'Unisex · 50 ml'],

    /* Header blanco y carrito en pastilla negra, igual que en la ficha. */
    headerMarca: true,

    /* Barra "Empezar mi tratamiento" fija abajo al scrollear. La home de
       referencia no la tiene: arranca apagada. true = se prende. */
    barraFija: false,

    /* Secciones que NO querés mostrar, por nombre:
       'ugc','frase','clientes','porque','notas','resultados' */
    apagar: [],

    /* --- IMÁGENES (en Cloudinary) --- */
    /* HERO a pantalla completa. Lo ideal son DOS fotos:
       · imgHero: horizontal para compu (1920 x 1080 aprox.)
       · imgHeroMovil: vertical para celular (1080 x 1350 o 1080 x 1920).
         Vacía = en el celular se usa la de compu, recortada.
       Fondo oscuro o con espacio libre a la izquierda (compu) y abajo
       (celular), que es donde va el texto. */
    imgHero: 'https://i.ibb.co/Jjwf0WwR/Facial-balm-on-marble-slab-20260927225121-1.jpg',
    imgHeroMovil: 'https://i.ibb.co/Zz9M4ZHT/Facial-balm-on-marble-slab-20260928011001.jpg',
    /* Qué parte de la foto del hero queda siempre a la vista al recortarla.
       Si el frasco está a la derecha de la foto, probá '75% 50%'. */
    imgHeroEnfoque: '80% 50%',
    /* Lo mismo pero para celular (solo se usa si NO hay imgHeroMovil). */
    imgHeroEnfoqueMovil: '72% 50%',

    /* Frasco PNG sin fondo (tabla comparativa y barra fija) */
    imgPack: 'https://res.cloudinary.com/kbekt7pq/image/upload/v1790467426/Product_packshot_on_white_backgr__20260926202729-removebg-preview_1.png',
    /* Imagen arriba de los porcentajes (sección Resultados). Vacía = sin imagen. */
    imgResultados: 'https://i.ibb.co/jkvyPmLv/Product-with-botanical-ingredien-20260927231302-2.jpg',
    /* Imágenes de las notas (sección Aprendé sobre tu piel) */
    imgNota1: 'https://i.ibb.co/hF4JfLXn/Cut-apple-illustrating-oxidative-20260927230933-1.jpg',
    imgNota2: 'https://i.ibb.co/yBYg3JZm/Woman-reading-cosmetic-jar-label-20260927231152-1.jpg',
    imgNota3: 'https://i.ibb.co/9kGTqZr9/Man-holding-smartphone-taking-photo-20260927231230-1.jpg',

    /* CARRUSEL DE SELFIES (sección 2). Pegá acá los links de las fotos
       verticales 3:4, en el orden en que quieras que pasen (ideal: 10).
       Vacío = usa fotosResenas.
       TEXTOS DE LA SECCIÓN: si las fotos son generadas con IA o de modelos,
       no se presentan como clientes. Por eso de fábrica dice "RENOVÉ,
       todos los días" y aclara "Imágenes ilustrativas". Cuando tengas
       selfies REALES de clientes (con permiso), cambiá a:
         ugcEtiqueta: 'Hombres y mujeres que ya lo usan',
         ugcTitulo: 'Ya son parte de {marca}',  ugcAviso: ''
       ({marca} se reemplaza por RENOVÉ, resaltado en borgoña) */
    fotosCarrusel: [
      'https://i.ibb.co/FLMjck7G/Woman-holding-product-for-selfie-20260927225439-1.jpg',
      'https://i.ibb.co/jkzrYwvx/Man-holding-product-in-car-20260927225451-1.jpg',
      'https://i.ibb.co/n8mMhMjK/Woman-holding-cosmetic-product-o-20260927225648-1.jpg',
      'https://i.ibb.co/wFM0zTdv/Man-holding-product-in-gym-20260927225700-1.jpg',
      'https://i.ibb.co/vxRGBgkp/Woman-holding-product-indoors-20260927225713-1.jpg',
      'https://i.ibb.co/yByMgVJB/Man-holding-product-for-selfie-20260927225727-1.jpg',
      'https://i.ibb.co/7dmkP2PD/Woman-holding-product-at-cafe-20260927225746-1.jpg',
      'https://i.ibb.co/hx1S0KkK/Man-holding-product-on-balcony-20260927230013-1.jpg',
      'https://i.ibb.co/Kxc89Ztw/Woman-holding-cosmetic-product-20260927230045-1.jpg',
      'https://i.ibb.co/LDsQdpnc/Man-holding-product-outdoors-20260927230114-1.jpg'
    ],
    ugcEtiqueta: 'Para él y para ella',
    ugcTitulo: '{marca}, todos los días',
    ugcAviso: '',

    /* FOTOS DE CLIENTES. Alimentan el carrusel "Ya son parte" y los
       testimonios (en el mismo orden que DATOS.testimonios).
       Tienen que ser clientes REALES, con permiso para publicarlas. Cuantas
       más cargues, mejor se ve el carrusel (ideal: 8 a 12, verticales). */
    fotosResenas: [
      'https://res.cloudinary.com/kbekt7pq/image/upload/v1790467394/Woman_holding_product_selfie_20260926202205_1.jpg',
      'https://res.cloudinary.com/kbekt7pq/image/upload/v1790467397/Man_holding_product_selfie_20260926202240_1.jpg',
      'https://res.cloudinary.com/kbekt7pq/image/upload/v1790467404/Woman_holding_product_selfie_20260926202259_1.jpg',
      'https://res.cloudinary.com/kbekt7pq/image/upload/v1790467407/Woman_holding_product_selfie_20260926202322_1.jpg',
      'https://res.cloudinary.com/kbekt7pq/image/upload/v1790467410/Man_holding_product_selfie_20260926202343_1.jpg'
    ],

    /* true = se dibuja en cualquier página. SOLO para la vista previa. */
    forzar: false

  }, window.RENOVE_HOME_CONFIG || {});
  /* la cinta usa los días de garantía reales aunque los cambies desde GTM */
  CFG.topbarTextos = (CFG.topbarTextos || []).map(function (t) { return String(t).replace(/Garantía \d+ días/, 'Garantía ' + (CFG.garantiaDias || 60) + ' días'); });


  /* ---------- bloque 02 · PRUEBA SOCIAL · VALORES DE EJEMPLO ----------
     Reemplazalos por los reales antes de pautar.
     Reglas que ya usa la ficha y valen acá:
     · Cosmético, no procedimiento: nadie dice que borró arrugas, que
       reemplaza el bótox o que el resultado es permanente.
     · Nadie lo ve en la primera semana: 2 semanas lo que se siente,
       4 a 8 lo que se ve. Al menos uno cuenta un límite real. */
  var DATOS = {

    /* TESTIMONIOS (sección Nuestros clientes) · RESEÑAS DE EJEMPLO.
       Son NUEVAS: ningún nombre ni historia se repite con las reseñas de la
       ficha. Mientras datosDeEjemplo esté en true, cada tarjeta muestra la
       etiqueta "Reseña de ejemplo". Cuando cargues las reales (con permiso
       del cliente), pasalo a false y la etiqueta desaparece.
       foto: el link de la foto de ESE cliente, o null si no tiene (se
             dibuja una tarjeta de texto). No uses las fotos de la ficha:
             son de las personas que opinan allá, con otro nombre.
       r: estrellas · t: título corto · q: lo que cuenta · n: nombre. */
    testimonios: [
      { foto: null, r: 5, n: 'Camila V.', t: 'El maquillaje ya no se marca',
        q: 'Me maquillo todos los días para trabajar y al mediodía la base se me marcaba en la frente. Hace tres semanas que me pongo RENOVÉ antes del protector y la base se asienta distinto: aguanta bien hasta la tarde.' },
      { foto: null, r: 5, n: 'Federico A.', t: 'Entreno al aire libre',
        q: 'Corro tres veces por semana y el viento me dejaba la cara roja y reseca. Lo uso a la noche, después de la ducha. A las dos semanas ya no sentía la cara áspera. De día, el protector no me lo salteo.' },
      { foto: null, r: 5, n: 'Josefina R.', t: 'Se lo regalé a mi mamá',
        q: 'Se lo compré para su cumpleaños un poco a ciegas. A las seis semanas me llamó para pedirme otro: dice que se ve la cara más descansada y que es la única crema que no le deja olor a perfume.' },
      { foto: null, r: 5, n: 'Ramiro S.', t: 'De tres productos a uno',
        q: 'Usaba sérum, crema de día y crema de noche, y no sabía cuál hacía qué. Hace dos meses que uso solo esto, mañana y noche, más el protector cuando salgo. La piel se ve más pareja y el estante del baño quedó despejado.' },
      { foto: null, r: 4, n: 'Victoria L.', t: 'La lavanda no es lo mío',
        q: 'Le pongo cuatro estrellas porque el aroma a lavanda no me encanta, aunque a los pocos minutos ya no se siente. Todo lo demás, bien: se absorbe rápido y al mes noté la cara más luminosa.' },
      { foto: null, r: 5, n: 'Mauricio G.', t: 'Chau paspaduras de invierno',
        q: 'Todos los inviernos se me paspaban los pómulos con el frío. Este año lo empecé en mayo y por primera vez llegué a julio sin la cara ardida. Rinde mucho: con muy poquito alcanza para toda la cara.' },
      { foto: null, r: 5, n: 'Lucía F.', t: 'Las manchas siguen, la luz volvió',
        q: 'Tengo manchas de sol de muchos veranos y esas no cambiaron, lo aclaro. Pero el resto de la cara tiene más luz y el tono, más uniforme. Pasados dos meses se nota en las fotos, sobre todo con luz natural.' },
      { foto: null, r: 5, n: 'Esteban P.', t: 'Trabajo de noche',
        q: 'Hago guardias nocturnas y tenía la cara gris de cansancio acumulado. Me lo pongo al llegar a casa, antes de dormir. A las cinco semanas mis compañeros me preguntaron si me había tomado vacaciones.' }
    ],

    /* ENCUESTA (sección Resultados). EJEMPLO: hacé la encuesta real (un
       Google Forms a las 8 semanas alcanza) y reemplazá base y números. */
    encuesta: {
      base: 1012,
      items: [
        { p: 87, t: 'sintió la piel más cómoda y menos tirante a las 2 semanas.' },
        { p: 79, t: 'vio la piel más luminosa y pareja a las 8 semanas.' },
        { p: 91, t: 'se lo recomendaría a un amigo o una amiga.' }
      ]
    }
  };


  /* ---------- bloque 03 · UTILIDADES ---------- */
  var R = '#rnv-home';
  var PROD = CFG.productoURL || '/';
  var MARCA = CFG.marca || 'RENOVÉ';
  var DIAS = CFG.garantiaDias || 60;
  var REDUCIR = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function miles(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function coma(n) { return String(n).replace('.', ','); }
  function apagada(nombre) { return (CFG.apagar || []).indexOf(nombre) !== -1; }
  /* Si la foto está en Cloudinary, pide una versión del ancho justo y en el
     formato más liviano que acepte el navegador (webp/avif). Una selfie de
     1 MB pasa a pesar 60 KB. Si la foto está en otro lado, queda igual. */
  function cld(url, ancho) {
    url = String(url || '');
    if (!/res\.cloudinary\.com\/[^/]+\/image\/upload\/v\d+\//.test(url)) return url;
    return url.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_' + ancho + '/');
  }
  function iniciales(nombre) { return String(nombre).trim().charAt(0).toUpperCase(); }

  /* Eventos para GTM / GA4: evento "renove_home" con el campo "accion". */
  function track(accion, extra) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: 'renove_home', accion: accion }, extra || {}));
    } catch (e) {}
  }

  /* Ejecuta fn UNA vez cuando el elemento entra en pantalla. */
  function alVer(el, fn, umbral) {
    if (!el) return;
    if (!('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { io.disconnect(); fn(); }
      });
    }, { threshold: umbral || 0.3 });
    io.observe(el);
  }

  /* Mezcla dos colores hex. t de 0 a 1. */
  /* Paleta borgoña (CFG.colores) y derivados */
  var COL = Object.assign({ vino: '#6B1D34', vinoOscuro: '#3D0F1D', rosado: '#F8F0F1', rosadoMedio: '#EDDDE1' }, CFG.colores || {});
  function rgba(hex, a) {
    var x = parseInt(String(hex).replace('#', ''), 16);
    return 'rgba(' + ((x >> 16) & 255) + ',' + ((x >> 8) & 255) + ',' + (x & 255) + ',' + a + ')';
  }

  function mezclar(a, b, t) {
    var x = parseInt(a.slice(1), 16), y = parseInt(b.slice(1), 16);
    var r = Math.round(((x >> 16) & 255) + ((((y >> 16) & 255) - ((x >> 16) & 255)) * t));
    var g = Math.round(((x >> 8) & 255) + ((((y >> 8) & 255) - ((x >> 8) & 255)) * t));
    var bl = Math.round((x & 255) + (((y & 255) - (x & 255)) * t));
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | bl).toString(16).slice(1);
  }

  /* Header del tema si está fijo: se usa para no tapar los títulos al
     saltar a una sección. */
  function header() {
    return $('[data-store="head"]') || $('.js-head-main') || $('header') || $('#header');
  }
  function altoHeaderFijo() {
    var h = header(); if (!h) return 0;
    var pos = getComputedStyle(h).position;
    return (pos === 'fixed' || pos === 'sticky') ? h.getBoundingClientRect().height : 0;
  }
  function irA(sel) {
    var t = $(sel); if (!t) return;
    var y = t.getBoundingClientRect().top + window.pageYOffset - altoHeaderFijo() - 8;
    window.scrollTo({ top: y, behavior: REDUCIR ? 'auto' : 'smooth' });
  }

  /* Íconos de línea, todos en 24x24 y en currentColor. */
  var SV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">';
  var ICON = {
    envio: SV + '<path d="M2.5 6.5h11v9.5h-11z"/><path d="M13.5 9.5h4.2l3.3 3.4v3.1h-7.5"/><circle cx="6.5" cy="17.5" r="1.7"/><circle cx="17" cy="17.5" r="1.7"/></svg>',
    cuotas: SV + '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/></svg>',
    garantia: SV + '<path d="M12 3l7 3v5.5c0 4.3-3 7.4-7 9.5-4-2.1-7-5.2-7-9.5V6z"/><path d="M8.8 12l2.2 2.2 4.2-4.4"/></svg>',
    check: SV.replace('stroke-width="1.5"', 'stroke-width="2.6"') + '<polyline points="20 6 9 17 4 12"/></svg>',
    cruz: SV.replace('stroke-width="1.5"', 'stroke-width="2.4"') + '<path d="M17 7L7 17M7 7l10 10"/></svg>',
    izq: SV.replace('stroke-width="1.5"', 'stroke-width="2"') + '<path d="M15 18l-6-6 6-6"/></svg>',
    der: SV.replace('stroke-width="1.5"', 'stroke-width="2"') + '<path d="M9 6l6 6-6 6"/></svg>',
    girar: SV + '<path d="M20 12a8 8 0 1 1-2.34-5.66"/><path d="M20 4v4.5h-4.5"/></svg>',
    flecha: SV.replace('stroke-width="1.5"', 'stroke-width="2"') + '<path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8.5 5.8v12.4L19 12z" fill="currentColor"/></svg>',
    ver: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 1.5l2.4 2 3.1-.5 1.1 2.9 2.9 1.1-.5 3.1 2 2.4-2 2.4.5 3.1-2.9 1.1-1.1 2.9-3.1-.5-2.4 2-2.4-2-3.1.5-1.1-2.9L2.5 17l.5-3.1-2-2.4 2-2.4-.5-3.1L5.4 5l1.1-2.9 3.1.5z"/><path d="M8.2 12.4l2.6 2.6 5-5.2" stroke="#F6F5F2" stroke-width="2.1" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  var CORAZON = '<svg class="rnv-corazon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 20.4l-1.3-1.2C6 15 3 12.3 3 8.9 3 6.2 5.1 4.1 7.8 4.1c1.6 0 3.1.7 4.2 1.9 1.1-1.2 2.6-1.9 4.2-1.9 2.7 0 4.8 2.1 4.8 4.8 0 3.4-3 6.1-7.7 10.3z"/></svg>';

  /* Estrellas: 5 grises de fondo + 5 negras recortadas al porcentaje.
     Así 4,8 se ve como 4,8 y no como 5. */
  var ESTRELLA = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z"/></svg>';
  function estrellas(valor, tam) {
    var fila = ESTRELLA + ESTRELLA + ESTRELLA + ESTRELLA + ESTRELLA;
    var pct = Math.max(0, Math.min(100, (valor / 5) * 100));
    return '<span class="rnv-stars" style="--s:' + (tam || 14) + 'px" role="img" aria-label="' + coma(valor) + ' de 5 estrellas">'
      + '<span class="rnv-stars-bg">' + fila + '</span>'
      + '<span class="rnv-stars-fg" style="width:' + pct.toFixed(1) + '%">' + fila + '</span></span>';
  }
  function verificada(v) {
    return v === false ? '' : '<span class="rnv-ver">' + ICON.ver + 'Compra verificada</span>';
  }


  /* ---------- bloque 04 · ESTILOS BASE ----------
     Todo va colgado de #rnv-home, así el CSS del tema no lo pisa y este
     CSS no toca nada del resto de la tienda. Los botones, títulos y tablas
     se resetean acá adentro porque el tema Lima les pone estilos propios. */
  var CSS_BASE = [
    R + '{--ink:#1C1316;--negro:' + COL.vinoOscuro + ';--vino:' + COL.vino + ';--vino-osc:' + COL.vinoOscuro + ';--vino-hover:' + mezclar(COL.vino, COL.vinoOscuro, .6) + ';'
      + '--marca:' + COL.vino + ';--hueso:#FBF7F6;--piedra:' + COL.rosadoMedio + ';--arena:' + COL.rosado + ';--grafito:#7A6A6F;--gris:#5E5357;--gris2:#9D8F94;--claro:#E7D6DB;--linea:' + rgba(COL.vino, .14) + ';'
      + '--display:"Jost","Helvetica Neue",Arial,sans-serif;--sans:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;'
      + 'display:block;width:100%;clear:both;position:relative;background:#fff;color:var(--ink);font-family:var(--sans);font-size:15px;font-weight:400;line-height:1.6;letter-spacing:0;text-transform:none;text-align:left;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;overflow-x:clip}',
    R + ' *,' + R + ' *:before,' + R + ' *:after{box-sizing:border-box}',
    R + ' h1,' + R + ' h2,' + R + ' h3,' + R + ' h4,' + R + ' p,' + R + ' ul,' + R + ' ol,' + R + ' li,' + R + ' dl,' + R + ' dt,' + R + ' dd,' + R + ' figure,' + R + ' figcaption,' + R + ' blockquote,' + R + ' section,' + R + ' article,' + R + ' aside,' + R + ' table,' + R + ' th,' + R + ' td'
      + '{margin:0;padding:0;border:0;background:none;font:inherit;color:inherit;letter-spacing:inherit;text-transform:none;text-align:inherit;box-shadow:none;min-height:0;float:none}',
    R + ' ul,' + R + ' ol{list-style:none}',
    R + ' b,' + R + ' strong{font-weight:600}',
    R + ' img,' + R + ' video,' + R + ' svg{display:block;max-width:100%}',
    R + ' img{height:auto;border:0}',
    R + ' a{color:inherit;text-decoration:none;background:none}',
    R + ' mark{background:transparent;color:inherit}',
    R + ' button{-webkit-appearance:none;appearance:none;font:inherit;color:inherit;background:none;border:0;border-radius:0;margin:0;padding:0;width:auto;height:auto;min-width:0;min-height:0;max-height:none;line-height:inherit;letter-spacing:inherit;text-transform:none;text-align:inherit;box-shadow:none;cursor:pointer;-webkit-tap-highlight-color:transparent;outline-offset:3px}',
    R + ' input[type=range]{-webkit-appearance:none;appearance:none;background:transparent;border:0;border-radius:0;box-shadow:none;margin:0;padding:0;width:100%;height:30px;cursor:pointer}',
    R + ' table{border-collapse:separate;border-spacing:0;width:100%}',
    R + ' textarea{-webkit-appearance:none;appearance:none;display:block;width:100%;height:auto;min-height:0;max-width:none;margin:0;padding:14px 16px;border:0;border-radius:6px;background:#fff;box-shadow:inset 0 0 0 1px rgba(17,17,17,.25);font:inherit;font-size:16px;line-height:1.5;letter-spacing:0;text-transform:none;color:var(--ink);resize:vertical;outline:0}',
    R + ' textarea:focus{box-shadow:inset 0 0 0 2px var(--vino)}',
    R + ' textarea::placeholder{color:var(--gris2);opacity:1}',
    R + ' fieldset{min-width:0;margin:0;padding:0;border:0}',
    R + ' legend{float:none;width:auto;margin:0;padding:0;font:inherit;color:inherit;letter-spacing:inherit;text-transform:none}',
    R + ' label{display:block;margin:0;font:inherit;color:inherit;letter-spacing:inherit;text-transform:none;cursor:default}',
    R + ' [hidden]{display:none!important}',
    '@keyframes rnv-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}',
    R + ' :focus-visible{outline:2px solid currentColor;outline-offset:3px}',
    R + ' .rnv-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}',

    /* estructura */
    R + ' .rnv-sec{position:relative;padding:64px 0}',
    R + ' .rnv-wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 20px}',
    R + ' .bg-arena{background:var(--arena)}',
    R + ' .bg-piedra{background:var(--piedra)}',
    R + ' .bg-negro{background:var(--negro);color:var(--hueso)}',
    R + ' .bg-ink{background:var(--ink);color:var(--hueso)}',

    /* tipografía: títulos en Jost mayúscula con tracking, como la ficha */
    R + ' .rnv-sechead{margin:0 0 32px;max-width:720px}',
    /* Tipografía igual a la landing (su capa editorial, bloque 40):
       títulos en Jost, MAYÚSCULAS, peso liviano y tracking amplio; la palabra
       destacada sin cursiva, en color (acá, borgoña). */
    R + ' .rnv-eyebrow{margin-bottom:12px;font-family:var(--display);font-size:12px;font-weight:500;line-height:1.4;letter-spacing:.14em;text-transform:uppercase;color:var(--gris)}',
    R + ' .rnv-h2{font-family:var(--display);font-weight:400;font-size:clamp(21px,5.6vw,32px);line-height:1.28;letter-spacing:.13em;text-transform:uppercase}',
    R + ' .rnv-h2 em{font-style:normal;color:var(--vino)}',
    R + ' .rnv-corazon{display:inline-block;width:.74em;height:.74em;margin-left:.2em;vertical-align:-.02em;color:var(--vino)}',
    R + ' .rnv-center{text-align:center}',
    R + ' .rnv-center .rnv-sechead,' + R + ' .rnv-center .rnv-lead{margin-left:auto;margin-right:auto}',
    R + ' .rnv-lead{margin-top:14px;font-size:15.5px;line-height:1.6;color:var(--gris);max-width:580px}',
    R + ' .bg-negro .rnv-lead,' + R + ' .bg-ink .rnv-lead{color:var(--claro)}',
    R + ' .rnv-lead b{color:var(--vino);font-weight:600}',
    R + ' .bg-negro .rnv-lead b,' + R + ' .bg-ink .rnv-lead b{color:var(--hueso)}',

    /* botones */
    R + ' .rnv-btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:54px;padding:0 32px;border-radius:999px;background:var(--marca);color:var(--hueso);font-family:var(--display);font-weight:600;font-size:13px;letter-spacing:.2em;text-transform:uppercase;line-height:1.15;text-align:center;text-decoration:none;transition:background .2s ease,color .2s ease,transform .15s ease,box-shadow .2s ease}',
    R + ' .rnv-btn:hover{background:var(--vino-hover);color:#fff}',
    R + ' .rnv-btn:active{transform:scale(.98)}',
    R + ' .rnv-btn svg{width:18px;height:18px;flex:0 0 auto}',
    R + ' .rnv-btn--claro{background:#fff;color:var(--vino)}',
    R + ' .rnv-btn--claro:hover{background:var(--arena);color:var(--vino-osc)}',
    R + ' .rnv-btn--linea{background:transparent;color:var(--vino);box-shadow:inset 0 0 0 1px var(--vino)}',
    R + ' .rnv-btn--linea:hover{background:var(--vino);color:#fff}',
    R + ' .rnv-link{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:600;color:var(--vino);text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:5px;cursor:pointer}',
    R + ' .rnv-link:hover{color:var(--vino-osc);text-decoration-thickness:2px}',
    R + ' .bg-negro .rnv-link,' + R + ' .bg-ink .rnv-link{color:var(--hueso)}',

    /* estrellas */
    R + ' .rnv-stars{position:relative;display:inline-block;line-height:0;vertical-align:middle;color:var(--vino)}',
    R + ' .rnv-stars-bg,' + R + ' .rnv-stars-fg{display:flex;gap:2px}',
    R + ' .rnv-stars-fg{position:absolute;top:0;left:0;bottom:0;overflow:hidden}',
    R + ' .rnv-stars svg{width:var(--s);height:var(--s);flex:0 0 auto}',
    R + ' .rnv-stars-bg svg{fill:' + rgba(COL.vino, .18) + '}',
    R + ' .rnv-stars-fg svg{fill:currentColor}',
    R + ' .bg-negro .rnv-stars,' + R + ' .bg-ink .rnv-stars{color:var(--hueso)}',
    R + ' .bg-negro .rnv-stars-bg svg,' + R + ' .bg-ink .rnv-stars-bg svg{fill:rgba(246,245,242,.22)}',

    /* sello de compra verificada */
    R + ' .rnv-ver{display:inline-flex;align-items:center;gap:4px;font-size:11.5px;font-weight:600;color:var(--ink);white-space:nowrap}',
    R + ' .rnv-ver svg{width:14px;height:14px;color:var(--ink)}',

    '@media(min-width:768px){'
      + R + ' .rnv-sec{padding:96px 0}'
      + R + ' .rnv-wrap{padding:0 40px}'
      + R + ' .rnv-sechead{margin-bottom:48px}'
      + R + ' .rnv-lead{font-size:17px}'
    + '}',
    '@media(prefers-reduced-motion:reduce){' + R + ' *{transition-duration:.01ms!important;animation-duration:.01ms!important;animation-iteration-count:1!important}}'
  ].join('');


  /* ---------- bloque 05 · SECCIONES ----------
     Cada sección tiene su CSS, su HTML y su comportamiento juntos, así se
     edita en un solo lugar. Se dibujan en el orden en que aparecen acá.
     Para apagar una sin borrarla, sumá su nombre a CFG.apagar. */
  var SECCIONES = [];
  function seccion(def) { SECCIONES.push(def); }


  /* ============ 1 · HERO ============
     Foto a pantalla completa con el texto encima: calificación, título,
     dos tildes, bajada y botón. En compu el texto va a la izquierda; en el
     celular, abajo. La palabra "oxidando" se apaga letra por letra al
     cargar: es el único movimiento que arranca solo en toda la página. */
  seccion({
    nombre: 'hero',
    css: [
      R + ' .rnv-hero{position:relative;display:flex;align-items:flex-end;min-height:600px;min-height:min(88svh,720px);padding:0;overflow:hidden;background:var(--vino-osc)}',
      R + ' .rnv-hero-bg{position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(120% 90% at 70% 35%,' + mezclar(COL.vinoOscuro, '#FFFFFF', .12) + ' 0%,' + COL.vinoOscuro + ' 70%)}',
      R + ' .rnv-hero-bg picture,' + R + ' .rnv-hero-bg img{display:block;width:100%;height:100%}',
      R + ' .rnv-hero-bg img{object-fit:cover}',
      (CFG.imgHeroMovil ? '@media(max-width:899px){'
        /* Celular con foto vertical 9:16: la foto se ve entera arriba y el
           texto arranca debajo de la mesa (72% de la foto). */
        + R + ' .rnv-hero{display:block!important;min-height:0!important}'
        + R + ' .rnv-hero-bg{top:-40vw!important;bottom:auto!important;height:179.2vw!important;background:var(--vino-osc)}'
        + R + ' .rnv-hero-bg img{object-position:50% 0!important}'
        + R + ' .rnv-hero-bg:after{background:linear-gradient(to top,' + rgba(COL.vinoOscuro, 1) + ' 0%,' + rgba(COL.vinoOscuro, .6) + ' 18%,' + rgba(COL.vinoOscuro, 0) + ' 32%)!important}'
        + R + ' .rnv-hero-in{padding-top:92vw!important}}' : ''),
      '@media(max-width:899px){' + R + ' .rnv-hero-bg img{object-position:' + (CFG.imgHeroMovil ? '50% 0' : (CFG.imgHeroEnfoqueMovil || CFG.imgHeroEnfoque || '50% 50%')) + '!important}}',
      R + ' .rnv-hero-bg:after{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(to top,' + rgba(COL.vinoOscuro, .92) + ' 0%,' + rgba(COL.vinoOscuro, .68) + ' 36%,' + rgba(COL.vinoOscuro, .16) + ' 66%,' + rgba(COL.vinoOscuro, 0) + ' 100%)}',
      R + ' .rnv-hero-in{position:relative;z-index:1;width:100%;padding:120px 20px 40px}',
      R + ' .rnv-hero-rate{display:flex;flex-wrap:wrap;align-items:center;gap:6px 10px;font-size:12px;font-weight:600;line-height:1.3;letter-spacing:.08em;text-transform:uppercase;color:#fff}',
      R + ' .rnv-hero-rate .rnv-sep{opacity:.45}',
      R + ' .rnv-h1{margin-top:14px;max-width:640px;font-family:var(--display);font-weight:300;font-size:clamp(28px,8vw,54px);line-height:1.1;letter-spacing:.06em;text-transform:uppercase;color:#fff}',
      R + ' .rnv-ox .rnv-lt{color:#fff;animation:rnv-ox 1.3s ease forwards;animation-delay:calc(var(--i) * 110ms + 450ms)}',
      '@keyframes rnv-ox{to{color:var(--c)}}',
      R + ' .rnv-hero-checks{display:flex;flex-direction:column;gap:7px;margin-top:18px}',
      R + ' .rnv-hero-checks li{display:flex;align-items:flex-start;gap:9px;font-size:15px;line-height:1.4;color:#EFEDE8}',
      R + ' .rnv-hero-checks svg{flex:0 0 16px;width:16px;height:16px;margin-top:2px;color:#fff}',
      R + ' .rnv-hero-sub{margin-top:14px;font-size:13.5px;line-height:1.5;color:var(--claro)}',
      R + ' .rnv-hero .rnv-btn{width:100%;margin-top:24px}',
      '@media(min-width:900px){'
        + R + ' .rnv-hero{align-items:center;min-height:min(86vh,760px)}'
        + R + ' .rnv-hero-bg:after{background:linear-gradient(to right,' + rgba(COL.vinoOscuro, .88) + ' 0%,' + rgba(COL.vinoOscuro, .62) + ' 34%,' + rgba(COL.vinoOscuro, .1) + ' 66%,' + rgba(COL.vinoOscuro, 0) + ' 100%)}'
        + R + ' .rnv-hero-in{max-width:1120px;margin:0 auto;padding:96px 40px}'
        + R + ' .rnv-h1{font-size:clamp(36px,3.4vw,50px);max-width:640px}'
        + R + ' .rnv-hero-checks{flex-direction:row;flex-wrap:wrap;gap:8px 26px}'
        + R + ' .rnv-hero .rnv-btn{width:auto}'
      + '}',
      '@media(prefers-reduced-motion:reduce){' + R + ' .rnv-ox .rnv-lt{animation:none;color:var(--c)}}'
    ].join(''),
    html: function () {
      var palabra = 'oxidando.', letras = '';
      for (var i = 0; i < palabra.length; i++) {
        var c = mezclar('#FFFFFF', mezclar(COL.vino, '#FFFFFF', .55), i / (palabra.length - 1));
        letras += '<span class="rnv-lt" style="--i:' + i + ';--c:' + c + '">' + palabra.charAt(i) + '</span>';
      }
      var img = '';
      if (CFG.imgHero || CFG.imgHeroMovil) {
        img = '<picture>'
          + '<source media="(max-width:899px)" srcset="' + esc(cld(CFG.imgHeroMovil || CFG.imgHero, 1080)) + '">'
          + '<img src="' + esc(cld(CFG.imgHero || CFG.imgHeroMovil, 1920)) + '" alt="" fetchpriority="high" decoding="async" style="object-position:' + esc(CFG.imgHeroEnfoque || '50% 50%') + '">'
          + '</picture>';
      }
      var r = CFG.rating || {};
      return ''
        + '<section class="rnv-hero bg-negro" id="rnv-hero" aria-label="' + esc(MARCA) + '">'
        +   '<div class="rnv-hero-bg">' + img + '</div>'
        +   '<div class="rnv-hero-in">'
        +     '<p class="rnv-hero-rate">' + estrellas(r.puntuacion || 5, 15) + '<b>Excelente</b><span class="rnv-sep" aria-hidden="true">|</span><span>' + miles(r.cantidad || 0) + ' opiniones</span></p>'
        +     '<h1 class="rnv-h1">Tu piel no está cansada. Se está <span class="rnv-ox">' + letras + '</span></h1>'
        +     '<ul class="rnv-hero-checks">'
        +       '<li>' + ICON.check + '<span>Se siente a las 2 semanas y se ve a las 8</span></li>'
        +       '<li>' + ICON.check + '<span>Sin alcohol ni perfume sintético</span></li>'
        +     '</ul>'
        +     '<p class="rnv-hero-sub">Bálsamo facial antioxidante, 100% de origen vegetal, para él y para ella</p>'
        +     '<a class="rnv-btn rnv-btn--claro" href="' + esc(PROD) + '" data-cta="hero">Empezar mi tratamiento</a>'
        +   '</div>'
        + '</section>';
    }
  });


  /* ============ 2 · YA SON PARTE DE RENOVÉ ============
     Carrusel automático e infinito de fotos de clientes (se frena con el
     mouse encima), botón a la ficha y la franja de envío, cuotas y
     garantía. Las fotos salen de CFG.fotosResenas: tienen que ser de
     clientes reales, con permiso. */
  seccion({
    nombre: 'ugc',
    activa: function () { return (CFG.fotosCarrusel || []).length > 0 || (CFG.fotosResenas || []).length > 0; },
    css: [
      R + ' .rnv-ugc{padding-bottom:52px}',
      R + ' .rnv-ugc .rnv-sechead{margin-bottom:26px}',
      R + ' .rnv-ugc-mq{position:relative;overflow:hidden;-webkit-mask-image:linear-gradient(to right,transparent,#000 5%,#000 95%,transparent);mask-image:linear-gradient(to right,transparent,#000 5%,#000 95%,transparent)}',
      R + ' .rnv-ugc-track{display:flex;width:max-content;will-change:transform;animation:none!important;transition:none!important}',
      R + ' .rnv-ugc-mitad{display:flex;gap:10px;padding-right:10px}',
      R + ' .rnv-ugc-it{flex:0 0 auto;width:150px;height:200px;overflow:hidden;border-radius:14px;background:var(--piedra)}',
      R + ' .rnv-ugc-it img{width:100%;height:100%;object-fit:cover}',
      R + ' .rnv-ugc-aviso{margin-top:10px;font-size:11px;color:var(--gris2);text-align:center}',
      R + ' .rnv-ugc-cta{display:flex;justify-content:center;margin-top:24px}',
      R + ' .rnv-trust{display:flex;flex-wrap:wrap;justify-content:center;gap:10px 24px;margin-top:22px;font-size:13px;line-height:1.3;color:var(--gris)}',
      R + ' .rnv-trust li{display:flex;align-items:center;gap:7px}',
      R + ' .rnv-trust svg{width:18px;height:18px;flex:0 0 auto;color:var(--vino)}',
      '@media(min-width:768px){' + R + ' .rnv-ugc-it{width:210px;height:280px}' + R + ' .rnv-ugc-mitad{gap:14px;padding-right:14px}}',
      R + ' .rnv-ugc-mitad img{max-width:none!important}'
    ].join(''),
    /* Cinta infinita movida con JavaScript (no depende del CSS del tema
       ni del ajuste "reducir movimiento" del teléfono). */
    init: function (el) {
      var track = el.querySelector('.rnv-ugc-track');
      var mitad = el.querySelector('.rnv-ugc-mitad');
      var mq = el.querySelector('.rnv-ugc-mq');
      if (!track || !mitad || !window.requestAnimationFrame) return;
      var x = 0, ancho = 0, ultimo = 0, pausa = false;
      function medir() { ancho = mitad.getBoundingClientRect().width; }
      function vel() { return window.innerWidth < 768 ? 35 : 50; } /* px por segundo */
      function paso(t) {
        if (!ultimo) ultimo = t;
        var dt = Math.min((t - ultimo) / 1000, 0.1); ultimo = t;
        if (!ancho) medir();
        if (!pausa && ancho > 0) {
          x -= vel() * dt;
          if (-x >= ancho) x += ancho;
          track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
        }
        requestAnimationFrame(paso);
      }
      medir();
      Array.prototype.forEach.call(mitad.querySelectorAll('img'), function (im) {
        if (!im.complete) im.addEventListener('load', medir);
      });
      window.addEventListener('resize', medir);
      window.addEventListener('load', medir);
      mq.addEventListener('mouseenter', function () { pausa = true; });
      mq.addEventListener('mouseleave', function () { pausa = false; });
      requestAnimationFrame(paso);
    },
    html: function () {
      var fotos = (CFG.fotosCarrusel && CFG.fotosCarrusel.length) ? CFG.fotosCarrusel : CFG.fotosResenas, items = [];
      while (items.length < 10) items = items.concat(fotos);
      var mitad = items.map(function (f) {
        return '<figure class="rnv-ugc-it"><img src="' + esc(cld(f, 440)) + '" alt="" decoding="async"></figure>';
      }).join('');
      return ''
        + '<section class="rnv-sec rnv-ugc" id="rnv-ugc">'
        +   '<div class="rnv-wrap rnv-center"><div class="rnv-sechead">'
        +     (CFG.ugcEtiqueta ? '<p class="rnv-eyebrow">' + esc(CFG.ugcEtiqueta) + '</p>' : '')
        +     '<h2 class="rnv-h2">' + esc(CFG.ugcTitulo || '{marca}').replace('{marca}', '<em>' + esc(MARCA) + '</em>') + '</h2>'
        +   '</div></div>'
        +   '<div class="rnv-ugc-mq" role="img" aria-label="Fotos de personas usando ' + esc(MARCA) + '">'
        +     '<div class="rnv-ugc-track"><div class="rnv-ugc-mitad">' + mitad + '</div><div class="rnv-ugc-mitad" aria-hidden="true">' + mitad + '</div></div>'
        +   '</div>'
        +   '<div class="rnv-wrap">'
        +     (CFG.ugcAviso ? '<p class="rnv-ugc-aviso">' + esc(CFG.ugcAviso) + '</p>' : '')
        +     '<div class="rnv-ugc-cta"><a class="rnv-btn" href="' + esc(PROD) + '" data-cta="ugc">Ver el tratamiento' + ICON.flecha + '</a></div>'
        +     '<ul class="rnv-trust">'
        +       '<li>' + ICON.envio + '<span>' + esc(CFG.envio) + '</span></li>'
        +       '<li>' + ICON.cuotas + '<span>' + esc(CFG.cuotas) + '</span></li>'
        +       '<li>' + ICON.garantia + '<span>Garantía de ' + DIAS + ' días</span></li>'
        +     '</ul>'
        +   '</div>'
        + '</section>';
    }
  });


  /* ============ 3 · LA FRASE ============
     Lo que cree la marca, en letra grande. Las palabras se van encendiendo
     a medida que el cliente scrollea (con "reducir movimiento" activado en
     el teléfono, aparecen todas encendidas). */
  var FRASE = [
    'En ' + MARCA + ' creemos que la piel no se tapa: se cuida todos los días.',
    'La edad va a llegar igual, pero el desgaste de cada día lo podés cuidar desde hoy.',
    'Por eso hicimos una fórmula honesta, para él y para ella, que trabaja sobre la causa y no sobre la promesa.'
  ];
  seccion({
    nombre: 'frase',
    css: [
      R + ' .rnv-frase{padding:76px 0}',
      R + ' .rnv-frase-t{max-width:900px;margin:0 auto;text-align:center}',
      R + ' .rnv-frase-t p{font-family:var(--display);font-weight:300;font-size:clamp(19px,5.2vw,32px);line-height:1.45;letter-spacing:.08em;text-transform:uppercase;color:var(--ink)}',
      R + ' .rnv-frase-t p+p{margin-top:.55em}',
      R + ' .rnv-frase .rnv-w{color:' + mezclar(COL.rosadoMedio, '#FFFFFF', .1) + ';transition:color .3s ease}',
      R + ' .rnv-frase .rnv-w.on{color:var(--vino-osc)}',
      '@media(min-width:768px){' + R + ' .rnv-frase{padding:128px 0}}'
    ].join(''),
    html: function () {
      var ps = FRASE.map(function (f) {
        return '<p>' + f.split(' ').map(function (w) { return '<span class="rnv-w">' + esc(w) + '</span>'; }).join(' ') + '</p>';
      }).join('');
      return ''
        + '<section class="rnv-sec rnv-frase" id="rnv-frase">'
        +   '<div class="rnv-wrap"><div class="rnv-frase-t">' + ps + '</div></div>'
        + '</section>';
    },
    init: function (el) {
      var ws = $$('.rnv-w', el), caja = $('.rnv-frase-t', el);
      if (REDUCIR || !('IntersectionObserver' in window)) { ws.forEach(function (w) { w.classList.add('on'); }); return; }
      var pendiente = false, escuchando = false;
      function pintar() {
        pendiente = false;
        var r = caja.getBoundingClientRect(), vh = window.innerHeight || 800;
        /* empieza cuando el texto asoma por abajo y termina cuando su final
           llega a la mitad de la pantalla */
        var t = (vh * 0.85 - r.top) / (vh * 0.35 + r.height);
        var n = Math.round(Math.max(0, Math.min(1, t)) * ws.length);
        for (var i = 0; i < ws.length; i++) ws[i].classList.toggle('on', i < n);
      }
      function alScrollear() { if (!pendiente) { pendiente = true; requestAnimationFrame(pintar); } }
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !escuchando) { escuchando = true; window.addEventListener('scroll', alScrollear, { passive: true }); }
          else if (!e.isIntersecting && escuchando) { escuchando = false; window.removeEventListener('scroll', alScrollear); }
          pintar();
        });
      }).observe(el);
    }
  });


  /* ============ 4 · NUESTROS CLIENTES ♥ ============
     Testimonios con foto grande, título corto, lo que cuenta y el nombre.
     Datos en DATOS.testimonios (bloque 02); fotos en CFG.fotosResenas. */
  seccion({
    nombre: 'clientes',
    activa: function () { return DATOS.testimonios.length > 0; },
    css: [
      R + ' .rnv-cl-track{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding:4px 20px 8px;scroll-padding:0 20px}',
      R + ' .rnv-cl-track::-webkit-scrollbar{display:none}',
      R + ' .rnv-cl{position:relative;flex:0 0 80%;max-width:340px;scroll-snap-align:start;display:flex;flex-direction:column;overflow:hidden;border-radius:16px;background:#fff;box-shadow:0 0 0 1px var(--linea)}',
      R + ' .rnv-cl-ej{position:absolute;top:12px;right:12px;z-index:2;padding:5px 9px;border-radius:99px;background:rgba(255,255,255,.94);box-shadow:0 0 0 1px var(--linea);font-family:var(--display);font-size:10px;font-weight:600;line-height:1;letter-spacing:.12em;text-transform:uppercase;color:var(--vino)}',
      /* reseña sin foto: la cita va más grande, con comillas en borgoña */
      /* reseña sin foto: tarjeta borgoña con la cita grande (el espacio de
         la foto queda como bloque de color, no como hueco) */
      R + ' .rnv-cl--txt{background:var(--vino);box-shadow:none}',
      R + ' .rnv-cl--txt .rnv-cl-body{gap:10px;padding:26px 22px 22px}',
      R + ' .rnv-cl-comilla{display:block;height:40px;font-family:var(--display);font-weight:300;font-size:76px;line-height:.9;color:var(--claro)}',
      R + ' .rnv-cl--txt .rnv-stars{color:#fff}',
      R + ' .rnv-cl--txt .rnv-stars-bg svg{fill:rgba(255,255,255,.28)}',
      R + ' .rnv-cl--txt .rnv-cl-t{color:#fff}',
      R + ' .rnv-cl--txt .rnv-cl-q{font-size:17px;line-height:1.6;color:#fff}',
      R + ' .rnv-cl--txt .rnv-cl-n{color:var(--claro)}',
      /* una sí, una no: tarjeta de texto blanca con comillas borgoña */
      R + ' .rnv-cl--txt.rnv-cl--claro{background:#fff;box-shadow:0 0 0 1px var(--linea)}',
      R + ' .rnv-cl--claro .rnv-cl-comilla{color:var(--vino)}',
      R + ' .rnv-cl--claro .rnv-stars{color:var(--vino)}',
      R + ' .rnv-cl--claro .rnv-stars-bg svg{fill:' + rgba(COL.vino, .18) + '}',
      R + ' .rnv-cl--claro .rnv-cl-t{color:var(--ink)}',
      R + ' .rnv-cl--claro .rnv-cl-q{color:var(--ink)}',
      R + ' .rnv-cl--claro .rnv-cl-n{color:var(--vino)}',
      R + ' .rnv-cl-img{position:relative;height:0;padding-top:112%;overflow:hidden;background:var(--piedra)}',
      R + ' .rnv-cl-img img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover}',
      R + ' .rnv-cl-body{flex:1 1 auto;display:flex;flex-direction:column;gap:8px;padding:16px 18px 20px}',
      R + ' .rnv-cl-t{font-family:var(--display);font-weight:500;font-size:15px;line-height:1.35;letter-spacing:.1em;text-transform:uppercase;color:var(--ink)}',
      R + ' .rnv-cl-q{font-size:14.5px;line-height:1.55;color:var(--gris)}',
      R + ' .rnv-cl-n{margin-top:auto;padding-top:6px;font-size:14px;font-weight:700;font-style:italic;color:var(--vino)}',
      R + ' .rnv-cl-nav{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:20px}',
      R + ' .rnv-cl-flecha{width:44px;height:44px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 1px ' + rgba(COL.vino, .3) + ';color:var(--vino);display:flex;align-items:center;justify-content:center}',
      R + ' .rnv-cl-flecha svg{width:17px;height:17px}',
      R + ' .rnv-cl-dots{display:flex;gap:6px}',
      R + ' .rnv-cl-dots button{width:7px;height:7px;border-radius:4px;background:' + rgba(COL.vino, .22) + ';transition:width .25s ease,background .25s ease}',
      R + ' .rnv-cl-dots button.on{width:22px;background:var(--vino)}',
      '@media(min-width:640px){' + R + ' .rnv-cl{flex-basis:44%}}',
      '@media(min-width:1000px){'
        + R + ' .rnv-cl-track{padding:4px 40px 8px max(40px,calc((100vw - 1120px) / 2 + 40px));scroll-padding:0 40px 0 max(40px,calc((100vw - 1120px) / 2 + 40px))}'
        + R + ' .rnv-cl{flex-basis:calc((min(100vw,1120px) - 108px) / 3);max-width:none}'
      + '}'
    ].join(''),
    html: function () {
      var fotos = CFG.fotosResenas || [], cards = '';
      var ejemplo = CFG.datosDeEjemplo ? '<span class="rnv-cl-ej">Reseña de ejemplo</span>' : '';
      function copia(html) { return html.replace(/<article class="rnv-cl/g, '<article aria-hidden="true" class="rnv-cl'); }
      var textos = 0;
      DATOS.testimonios.forEach(function (t) {
        /* foto: link de la foto de ese cliente (o un número de fotosResenas);
           null o vacío = tarjeta de texto */
        var foto = typeof t.foto === 'string' ? t.foto : (typeof t.foto === 'number' ? (fotos[t.foto] || '') : '');
        var clase = foto ? '' : ' rnv-cl--txt' + (textos++ % 2 ? ' rnv-cl--claro' : '');
        cards += '<article class="rnv-cl' + clase + '">' + ejemplo
          + (foto ? '<div class="rnv-cl-img"><img src="' + esc(cld(foto, 720)) + '" alt="' + esc(t.n) + ', cliente de ' + esc(MARCA) + '" loading="lazy" decoding="async"></div>' : '')
          + '<div class="rnv-cl-body">'
          + (foto ? '' : '<span class="rnv-cl-comilla" aria-hidden="true">“</span>')
          + estrellas(t.r || 5, 13)
          + '<h3 class="rnv-cl-t">' + esc(t.t) + '</h3>'
          + '<p class="rnv-cl-q">' + esc(t.q) + '</p>'
          + '<p class="rnv-cl-n">' + esc(t.n) + '</p></div></article>';
      });
      return ''
        + '<section class="rnv-sec bg-arena" id="rnv-clientes">'
        +   '<div class="rnv-wrap"><div class="rnv-sechead"><h2 class="rnv-h2">Nuestros clientes' + CORAZON + '</h2></div></div>'
        +   '<div class="rnv-cl-track">' + (DATOS.testimonios.length > 1 ? copia(cards) + cards + copia(cards) : cards) + '</div>'
        +   '<div class="rnv-wrap"><div class="rnv-cl-nav">'
        +     '<button type="button" class="rnv-cl-flecha" data-dir="-1" aria-label="Testimonio anterior">' + ICON.izq + '</button>'
        +     '<div class="rnv-cl-dots"></div>'
        +     '<button type="button" class="rnv-cl-flecha" data-dir="1" aria-label="Testimonio siguiente">' + ICON.der + '</button>'
        +   '</div></div>'
        + '</section>';
    },
    /* CARRUSEL INFINITO: arranca en la copia del medio y, cuando el cliente
       llega a una copia de los costados, salta sin que se note a la misma
       tarjeta de la copia del medio. Avanza solo cada 4,5 s y se frena
       mientras el cliente lo toca, pasa el mouse o lee; con "reducir
       movimiento" activado en el teléfono no avanza solo. */
    init: function (el) {
      var pista = $('.rnv-cl-track', el), dots = $('.rnv-cl-dots', el);
      var todas = $$('.rnv-cl', el), N = DATOS.testimonios.length;
      if (N < 2) { el.querySelector('.rnv-cl-nav').style.display = 'none'; return; }
      var GAP = 14, actual = N, espera = 0, raf = 0;
      function paso() { return todas[N].getBoundingClientRect().width + GAP; }
      function indice() { return Math.round(pista.scrollLeft / (paso() || 1)); }
      function ir(k, suave) { pista.scrollTo({ left: k * paso(), behavior: suave ? 'smooth' : 'auto' }); }
      function pintarPuntos() {
        var k = ((indice() % N) + N) % N;
        $$('button', dots).forEach(function (d, j) { d.classList.toggle('on', j === k); });
      }
      function normalizar() {
        var k = indice();
        if (k < N) ir(k + N, false);
        else if (k >= 2 * N) ir(k - N, false);
        actual = indice();
      }
      for (var i = 0; i < N; i++) {
        (function (i) {
          var b = document.createElement('button');
          b.type = 'button'; b.setAttribute('aria-label', 'Ir al testimonio ' + (i + 1));
          b.addEventListener('click', function () { pausar(); ir(N + i, true); });
          dots.appendChild(b);
        })(i);
      }
      ir(N, false);
      pintarPuntos();
      pista.addEventListener('scroll', function () {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(pintarPuntos);
        clearTimeout(espera);
        espera = setTimeout(normalizar, 160);
      }, { passive: true });
      var t = 0;
      window.addEventListener('resize', function () {
        clearTimeout(t);
        t = setTimeout(function () { ir(N + (((actual % N) + N) % N), false); pintarPuntos(); }, 150);
      });
      $$('.rnv-cl-flecha', el).forEach(function (b) {
        b.addEventListener('click', function () {
          pausar();
          pista.scrollBy({ left: paso() * parseInt(b.getAttribute('data-dir'), 10), behavior: 'smooth' });
          track('clientes_flecha');
        });
      });

      /* avance automático */
      var hastaCuando = 0, encima = false, visible = false;
      function pausar() { hastaCuando = Date.now() + 7000; }
      ['pointerdown', 'touchstart', 'wheel', 'keydown'].forEach(function (ev) { el.addEventListener(ev, pausar, { passive: true }); });
      el.addEventListener('mouseenter', function () { encima = true; });
      el.addEventListener('mouseleave', function () { encima = false; pausar(); });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es) { es.forEach(function (e) { visible = e.isIntersecting; }); }, { threshold: 0.35 }).observe(pista);
      } else { visible = true; }
      if (!REDUCIR) {
        setInterval(function () {
          if (!visible || encima || document.hidden || Date.now() < hastaCuando) return;
          pista.scrollBy({ left: paso(), behavior: 'smooth' });
        }, 4500);
      }
    }
  });


  /* ============ 5 · POR QUÉ ELEGIR RENOVÉ ============
     Texto corto + tabla RENOVÉ vs. otras cremas. OJO: cada fila tiene que
     ser verdad para tu producto (verificá la fórmula contra el envase). */
  var PORQUE = [
    'Antioxidantes reales: té verde, yerba mate y uva',
    'Sin Alcohol Denat. ni perfume sintético',
    '100% de origen vegetal',
    'Una sola fórmula para él y para ella',
    'Garantía de ' + DIAS + ' días',
    'Envío gratis a todo el país'
  ];
  seccion({
    nombre: 'porque',
    css: [
      R + ' .rnv-vs{max-width:700px;margin:0 auto;text-align:left}',
      R + ' .rnv-vs table{table-layout:fixed;overflow:hidden;border-radius:16px;background:#fff;box-shadow:0 0 0 1px var(--linea)}',
      R + ' .rnv-vs th,' + R + ' .rnv-vs td{vertical-align:middle}',
      R + ' .rnv-vs thead th{padding:16px 6px 14px;font-family:var(--display);font-weight:500;font-size:12px;line-height:1.2;letter-spacing:.12em;text-transform:uppercase;text-align:center;color:var(--gris)}',
      R + ' .rnv-vs thead th:first-child{width:54%}',
      R + ' .rnv-vs .rnv-vs-nos{background:var(--vino);color:#fff}',
      R + ' .rnv-vs thead .rnv-vs-nos img{width:auto;max-width:70%;max-height:58px;margin:0 auto 8px;object-fit:contain;filter:drop-shadow(0 0 12px rgba(246,245,242,.3))}',
      R + ' .rnv-vs tbody th{padding:15px 10px 15px 18px;font-size:14px;font-weight:600;line-height:1.4;text-align:left;border-top:1px solid var(--linea)}',
      R + ' .rnv-vs tbody td{padding:12px 6px;text-align:center;border-top:1px solid var(--linea)}',
      R + ' .rnv-vs tbody td.rnv-vs-nos{border-top-color:rgba(255,255,255,.14)}',
      R + ' .rnv-vs-si,' + R + ' .rnv-vs-no{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%}',
      R + ' .rnv-vs-si{background:#fff;color:var(--vino)}',
      R + ' .rnv-vs-no{background:' + rgba(COL.vino, .07) + ';color:var(--gris2)}',
      R + ' .rnv-vs-si svg,' + R + ' .rnv-vs-no svg{width:13px;height:13px}',
      '@media(min-width:768px){' + R + ' .rnv-vs tbody th{font-size:15px;padding-left:24px}' + R + ' .rnv-vs thead th{font-size:12.5px}}'
    ].join(''),
    html: function () {
      var filas = PORQUE.map(function (t) {
        return '<tr><th scope="row">' + esc(t) + '</th>'
          + '<td class="rnv-vs-nos"><span class="rnv-vs-si">' + ICON.check + '<span class="rnv-sr">Sí</span></span></td>'
          + '<td><span class="rnv-vs-no">' + ICON.cruz + '<span class="rnv-sr">No</span></span></td></tr>';
      }).join('');
      return ''
        + '<section class="rnv-sec" id="rnv-porque">'
        +   '<div class="rnv-wrap rnv-center">'
        +     '<div class="rnv-sechead">'
        +       '<h2 class="rnv-h2">Por qué elegir <em>' + esc(MARCA) + '</em></h2>'
        +       '<p class="rnv-lead">Hicimos un bálsamo con <b>antioxidantes reales</b> y una base <b>100% de origen vegetal</b>, sin nada que esté ahí solo por la sensación. Porque la piel de todos merece <b>verse y sentirse mejor</b>, sin promesas que no se pueden cumplir.</p>'
        +     '</div>'
        +     '<div class="rnv-vs"><table>'
        +       '<thead><tr><th scope="col"><span class="rnv-sr">Qué comparamos</span></th>'
        +       '<th scope="col" class="rnv-vs-nos">' + (CFG.imgPack ? '<img src="' + esc(cld(CFG.imgPack, 240)) + '" alt="" loading="lazy">' : '') + esc(MARCA) + '</th>'
        +       '<th scope="col">Otras cremas</th></tr></thead>'
        +       '<tbody>' + filas + '</tbody>'
        +     '</table></div>'
        +   '</div>'
        + '</section>';
    }
  });


  /* ============ 6 · APRENDÉ SOBRE TU PIEL ♥ (las notas) ============
     Tres notas cortas que se abren ahí mismo. Si más adelante publicás
     estas notas en el blog de Tiendanube, pegá el link en "link" y el
     botón lleva a la nota en vez de abrirla en la página. */
  var NOTAS = [
    { img: 'imgNota1', min: 2, link: '',
      t: 'Qué es el estrés oxidativo y por qué te apaga la piel',
      r: 'El sol, las pantallas y el estrés desgastan la piel todos los días. Te contamos cómo funciona, sin vueltas.',
      c: 'Todos los días tu piel recibe sol, luz de pantallas, contaminación y estrés. Eso genera radicales libres: moléculas inestables que desgastan el colágeno, apagan el tono y debilitan la barrera de la piel. Se llama estrés oxidativo, y es una de las causas de fondo del envejecimiento visible: la arruga es la consecuencia. Por eso de día el protector solar es clave, y por eso sumar antioxidantes a tu rutina ayuda a proteger la piel de ese desgaste. Ningún cosmético frena el tiempo, pero sí podés cuidar lo que le pasa a tu piel cada día.' },
    { img: 'imgNota2', min: 2, link: '',
      t: 'Cómo leer el dorso de tu crema en 30 segundos',
      r: 'Dos palabras en la lista de ingredientes explican por qué a la tarde la cara te tira. Te enseñamos a encontrarlas.',
      c: 'Los ingredientes van de mayor a menor cantidad (al menos los que superan el 1%), así que lo que aparece arriba es lo que más hay. Buscá dos palabras: Alcohol Denat. y Parfum. El primero hace que la crema se sienta fresca porque se evapora, y al evaporarse se lleva agua de la piel. El segundo es perfume sintético, una de las causas más comunes de irritación en cosmética. Ojo: Cetearyl Alcohol o Cetyl Alcohol no son el problema; son alcoholes grasos que suavizan. ' + MARCA + ' no lleva Alcohol Denat. ni perfume sintético: su único aroma es aceite esencial de lavanda.' },
    { img: 'imgNota3', min: 1, link: '',
      t: 'La foto del día 1: cómo sacarla para comparar de verdad',
      r: 'La memoria engaña. Una foto bien sacada el primer día es la única forma de ver el cambio real a las 8 semanas.',
      c: 'Sacala a la mañana, con la cara lavada, sin maquillaje y sin filtro. Parate frente a una ventana, con luz de día y sin flash, y mirá de frente a la cámara con gesto neutro. Anotá dónde te paraste: las fotos de la semana 4 y de la semana 8 tienen que tener la misma luz, el mismo encuadre y la misma distancia. Si te afeitás, que sea del mismo día en todas. Después comparalas una al lado de la otra en el celular: lo que cambia en el tono y en la luz de la piel no se ve de memoria.' }
  ];
  seccion({
    nombre: 'notas',
    css: [
      /* celular: las notas se deslizan de costado, como en un blog; compu: 3 columnas */
      R + ' .rnv-notas{display:flex;align-items:flex-start;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;margin:0 -20px;padding:4px 20px 8px;scroll-padding:0 20px}',
      R + ' .rnv-notas::-webkit-scrollbar{display:none}',
      R + ' .rnv-nota{flex:0 0 84%;max-width:360px;scroll-snap-align:start;display:flex;flex-direction:column;overflow:hidden;border-radius:16px;background:#fff;box-shadow:0 0 0 1px var(--linea)}',
      R + ' .rnv-nota-img{position:relative;height:0;padding-top:75%;overflow:hidden;background:radial-gradient(circle at 50% 42%,#fff 0%,' + COL.rosado + ' 58%,' + COL.rosadoMedio + ' 100%)}',
      R + ' .rnv-nota-img img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover}',
      R + ' .rnv-nota-body{flex:1 1 auto;display:flex;flex-direction:column;padding:18px 20px 20px}',
      R + ' .rnv-nota-meta{font-size:12px;font-weight:500;color:var(--gris2)}',
      R + ' .rnv-nota-t{margin-top:6px;font-family:var(--display);font-weight:500;font-size:15px;line-height:1.4;letter-spacing:.1em;text-transform:uppercase;color:var(--ink)}',
      R + ' .rnv-nota-r{margin-top:8px;font-size:14.5px;line-height:1.55;color:var(--gris)}',
      R + ' .rnv-nota-full{margin-top:10px;font-size:14.5px;line-height:1.65;color:var(--gris);animation:rnv-in .35s ease both}',
      R + ' .rnv-nota .rnv-link{align-self:flex-start;margin-top:14px}',
      '@media(min-width:768px) and (max-width:899px){' + R + ' .rnv-notas{margin:0 -40px;padding:4px 40px 8px;scroll-padding:0 40px}' + R + ' .rnv-nota{flex-basis:46%}}',
      '@media(min-width:900px){' + R + ' .rnv-notas{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin:0;padding:0;overflow:visible}' + R + ' .rnv-nota{max-width:none}}'
    ].join(''),
    html: function () {
      var cards = NOTAS.map(function (n, i) {
        var img = CFG[n.img];
        var boton = n.link
          ? '<a class="rnv-link" href="' + esc(n.link) + '">Leer nota</a>'
          : '<button type="button" class="rnv-link rnv-nota-btn" aria-expanded="false" aria-controls="rnv-nota-' + i + '">Leer nota</button>';
        return '<article class="rnv-nota">'
          + (img ? '<div class="rnv-nota-img"><img src="' + esc(cld(img, 800)) + '" alt="" loading="lazy" decoding="async"></div>' : '')
          + '<div class="rnv-nota-body">'
          + '<p class="rnv-nota-meta">' + n.min + ' min de lectura</p>'
          + '<h3 class="rnv-nota-t">' + esc(n.t) + '</h3>'
          + '<p class="rnv-nota-r">' + esc(n.r) + '</p>'
          + (n.link ? '' : '<div class="rnv-nota-full" id="rnv-nota-' + i + '" hidden><p>' + esc(n.c) + '</p></div>')
          + boton
          + '</div></article>';
      }).join('');
      return ''
        + '<section class="rnv-sec bg-arena" id="rnv-notas">'
        +   '<div class="rnv-wrap">'
        +     '<div class="rnv-sechead"><h2 class="rnv-h2">Aprendé sobre tu piel' + CORAZON + '</h2></div>'
        +     '<div class="rnv-notas">' + cards + '</div>'
        +   '</div>'
        + '</section>';
    },
    init: function (el) {
      $$('.rnv-nota-btn', el).forEach(function (b) {
        b.addEventListener('click', function () {
          var full = document.getElementById(b.getAttribute('aria-controls'));
          var abrir = full.hidden;
          full.hidden = !abrir;
          b.setAttribute('aria-expanded', abrir ? 'true' : 'false');
          b.textContent = abrir ? 'Cerrar nota' : 'Leer nota';
          if (abrir) track('nota_abrir', { nota: $('.rnv-nota-t', b.closest('.rnv-nota')).textContent });
        });
      });
    }
  });


  /* ============ 7 · RESULTADOS ============
     Imagen + porcentajes grandes de la encuesta + botón. Los números suben
     solos una vez, cuando la sección aparece. EJEMPLO: bloque 02. */
  seccion({
    nombre: 'resultados',
    css: [
      R + ' .rnv-res-img{position:relative;max-width:1040px;height:0;padding-top:56.25%;margin:0 auto 40px;overflow:hidden;border-radius:18px;background:radial-gradient(circle at 50% 45%,#fff 0%,' + COL.rosado + ' 55%,' + COL.rosadoMedio + ' 100%)}',
      R + ' .rnv-res-img img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover}',
      R + ' .rnv-res-grid{display:grid;gap:28px;max-width:1040px;margin:0 auto}',
      R + ' .rnv-res-n{font-family:var(--display);font-weight:300;font-size:clamp(54px,15vw,80px);line-height:1;letter-spacing:.02em;color:var(--vino);font-variant-numeric:tabular-nums}',
      R + ' .rnv-res-t{max-width:300px;margin:10px auto 0;font-size:15px;line-height:1.5;color:var(--gris)}',
      R + ' .rnv-res-nota{max-width:560px;margin:32px auto 0;font-size:12.5px;line-height:1.5;color:var(--gris2)}',
      R + ' .rnv-res-cta{margin-top:28px}',
      '@media(min-width:768px){' + R + ' .rnv-res-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:32px}}'
    ].join(''),
    html: function () {
      var enc = DATOS.encuesta, items = enc.items.map(function (s) {
        return '<div class="rnv-res-it"><p class="rnv-res-n" data-p="' + s.p + '">' + (REDUCIR ? s.p : 0) + '%</p><p class="rnv-res-t">El ' + s.p + '% ' + esc(s.t) + '</p></div>';
      }).join('');
      return ''
        + '<section class="rnv-sec" id="rnv-resultados">'
        +   '<div class="rnv-wrap rnv-center">'
        +     (CFG.imgResultados ? '<div class="rnv-res-img"><img src="' + esc(cld(CFG.imgResultados, 1200)) + '" alt="Ingredientes de ' + esc(MARCA) + ': té verde, yerba mate, uva y rosa mosqueta" loading="lazy" decoding="async"></div>' : '')
        +     '<div class="rnv-sechead"><h2 class="rnv-h2">Lo que notaron nuestros clientes</h2></div>'
        +     '<div class="rnv-res-grid">' + items + '</div>'
        +     '<p class="rnv-res-nota">En base a una encuesta a ' + miles(enc.base) + ' clientes a las 8 semanas. Es lo que cada uno ve y siente en su piel: percepción, no un estudio clínico.</p>'
        +     '<div class="rnv-res-cta"><a class="rnv-btn" href="' + esc(PROD) + '" data-cta="resultados">Empezar mi tratamiento</a></div>'
        +   '</div>'
        + '</section>';
    },
    init: function (el) {
      if (REDUCIR) return;
      alVer($('.rnv-res-grid', el), function () {
        $$('.rnv-res-n', el).forEach(function (n, k) {
          var meta = parseInt(n.getAttribute('data-p'), 10), ini = null;
          setTimeout(function () {
            requestAnimationFrame(function tick(ts) {
              if (!ini) ini = ts;
              var x = Math.min(1, (ts - ini) / 1500);
              n.textContent = Math.round(meta * (1 - Math.pow(1 - x, 3))) + '%';
              if (x < 1) requestAnimationFrame(tick);
            });
          }, k * 150);
        });
      }, 0.35);
    }
  });

  /* ============ BARRA FIJA (apagada de fábrica: CFG.barraFija) ============
     Aparece cuando el hero sale de pantalla y se esconde en Resultados,
     que ya tiene su propio botón. Vive adentro de #rnv-home (position:fixed). */
  var CSS_BARRA = [
    R + ' .rnv-barra{position:fixed;left:0;right:0;bottom:0;z-index:9990;padding:10px 16px;padding-bottom:calc(10px + env(safe-area-inset-bottom,0px));background:rgba(255,255,255,.96);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:0 -8px 30px rgba(14,14,14,.09);transform:translateY(110%);visibility:hidden;transition:transform .35s cubic-bezier(.4,0,.2,1),visibility 0s linear .35s}',
    R + ' .rnv-barra.is-on{transform:none;visibility:visible;transition:transform .35s cubic-bezier(.4,0,.2,1),visibility 0s}',
    R + ' .rnv-barra-in{display:flex;align-items:center;justify-content:space-between;gap:12px;max-width:1120px;margin:0 auto}',
    R + ' .rnv-barra-info{display:flex;align-items:center;gap:10px;min-width:0;overflow:hidden}',
    R + ' .rnv-barra-info img{width:40px;height:40px;object-fit:contain;flex:0 0 auto}',
    R + ' .rnv-barra-n{font-family:var(--display);font-weight:500;font-size:14px;line-height:1.2;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap}',
    R + ' .rnv-barra-r{display:flex;align-items:center;gap:5px;margin-top:3px;font-size:12px;line-height:1;color:var(--gris);white-space:nowrap}',
    R + ' .rnv-barra .rnv-btn{flex:0 0 auto;min-height:48px;padding:0 20px;font-size:12px;letter-spacing:.16em;white-space:nowrap}',
    '@media(max-width:400px){' + R + ' .rnv-barra-info img{display:none}' + R + ' .rnv-barra .rnv-btn{padding:0 14px;letter-spacing:.12em;font-size:11.5px}}',
    '@media(max-width:360px){' + R + ' .rnv-barra-info{display:none}' + R + ' .rnv-barra .rnv-btn{flex:1 1 auto}}'
  ].join('');
  function htmlBarra() {
    var r = CFG.rating || {};
    return '<div class="rnv-barra" role="region" aria-label="Comprar ' + esc(MARCA) + '"><div class="rnv-barra-in">'
      + '<div class="rnv-barra-info">' + (CFG.imgPack ? '<img src="' + esc(CFG.imgPack) + '" alt="" decoding="async">' : '')
      + '<div><p class="rnv-barra-n">' + esc(MARCA) + '</p><p class="rnv-barra-r">' + estrellas(r.puntuacion || 5, 11) + '<span>' + coma(r.puntuacion || 5) + ' · ' + miles(r.cantidad || 0) + '</span></p></div></div>'
      + '<a class="rnv-btn" href="' + esc(PROD) + '" data-cta="barra">Empezar mi tratamiento</a>'
      + '</div></div>';
  }
  function iniciarBarra(root) {
    var barra = $('.rnv-barra', root), hero = $('#rnv-hero', root), fin = $('#rnv-resultados', root);
    if (!barra || !('IntersectionObserver' in window)) return;
    var heroVisible = true, finVisible = false;
    function pintar() {
      var on = !heroVisible && !finVisible;
      barra.classList.toggle('is-on', on);
      document.documentElement.classList.toggle('rnv-barra-on', on);
      ubicarWhatsApp();
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.target === hero) heroVisible = e.isIntersecting;
        if (e.target === fin) finVisible = e.isIntersecting;
      });
      pintar();
    }, { threshold: 0 });
    if (hero) io.observe(hero); else heroVisible = false;
    if (fin) io.observe(fin);
  }


  /* ---------- bloque 06 · CINTA DE BENEFICIOS (arriba del header) ----------
     Misma cinta que la ficha. Va AFUERA de #rnv-home, por eso sus estilos
     llevan !important: el CSS del tema le gana a una hoja externa. */
  var CSS_TOPBAR = [
    '#rnv-topbar{display:block!important;position:relative!important;z-index:50!important;width:100%!important;max-width:100%!important;margin:0!important;padding:10px 0!important;background:' + COL.vino + '!important;overflow:hidden!important}',
    '#rnv-topbar .rnv-tk-track{display:flex!important;flex-wrap:nowrap!important;width:max-content!important;margin:0!important;padding:0!important;animation:rnv-tk 60s linear infinite;will-change:transform}',
    '#rnv-topbar .rnv-tk-list{display:flex!important;flex:0 0 auto!important;align-items:center!important;gap:22px!important;margin:0!important;padding:0 22px 0 0!important;list-style:none!important}',
    '#rnv-topbar .rnv-tk-item{display:inline-block!important;margin:0!important;padding:0!important;font-family:"Jost","Inter",Arial,sans-serif!important;font-weight:500!important;font-size:12px!important;line-height:1!important;letter-spacing:.2em!important;text-transform:uppercase!important;color:#fff!important;white-space:nowrap!important}',
    '#rnv-topbar svg{display:block!important;flex:0 0 auto!important;width:9px!important;height:9px!important}',
    '@keyframes rnv-tk{from{transform:translateX(0)}to{transform:translateX(-50%)}}',
    '#rnv-topbar:hover .rnv-tk-track{animation-play-state:paused}',
    '@media(max-width:480px){#rnv-topbar{padding:9px 0!important}#rnv-topbar .rnv-tk-item{font-size:11px!important;letter-spacing:.16em!important}#rnv-topbar .rnv-tk-list{gap:16px!important;padding-right:16px!important}}',
    '@media(prefers-reduced-motion:reduce){#rnv-topbar .rnv-tk-track{animation:none}}'
  ].join('');
  function montarTopbar() {
    if (!CFG.topbar || document.getElementById('rnv-topbar') || document.getElementById('vnx-topbar')) return;
    var h = header();
    if (!h || !h.parentNode) return;
    /* Si el header del tema está fijo arriba, la cinta quedaría tapada: no se pone. */
    if (getComputedStyle(h).position === 'fixed') return;
    var sep = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6l6 6-6 6-6-6z" fill="#F6F5F2"/></svg>';
    var uno = '';
    for (var r = 0; r < 4; r++) CFG.topbarTextos.forEach(function (t) { uno += '<span class="rnv-tk-item">' + esc(t) + '</span>' + sep; });
    var el = document.createElement('div');
    el.id = 'rnv-topbar';
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', 'Beneficios');
    el.innerHTML = '<div class="rnv-tk-track"><div class="rnv-tk-list">' + uno + '</div><div class="rnv-tk-list" aria-hidden="true">' + uno + '</div></div>';
    h.parentNode.insertBefore(el, h);
  }


  /* ---------- bloque 07 · HEADER DE MARCA ----------
     Mismo look que en la ficha: fondo blanco, logo en negro (brightness(0)
     pinta de negro el logo sin subir otro archivo) y el carrito como
     pastilla negra. No toca menú, buscador ni carrito: solo el aspecto.
     Si el header del tema es transparente (por ejemplo, sobre el carrusel),
     no se toca: se vería blanco sobre blanco. */
  var CSS_HEADER = [
    '.rnv-storehead{background:#fff!important;border-bottom:1px solid ' + rgba(COL.vino, .18) + '!important;box-shadow:0 4px 18px ' + rgba(COL.vinoOscuro, .05) + '!important}',
    '.rnv-storehead .logo-text,.rnv-storehead #logo a{color:' + COL.vino + '!important}',
    '.rnv-storehead .utilities-item{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:38px!important;height:38px!important;padding:0!important;border-radius:50%!important;background:' + COL.rosado + '!important;border:1px solid ' + rgba(COL.vino, .35) + '!important;color:' + COL.vino + '!important;box-shadow:none!important}',
    '.rnv-storehead .utilities-icon{width:16px!important;height:16px!important;margin:0!important;fill:currentColor!important}',
    '.rnv-storehead #ajax-cart>a{display:inline-flex!important;align-items:center!important;gap:7px!important;padding:9px 15px!important;border:0!important;border-radius:99px!important;background:' + COL.vino + '!important;color:#fff!important;font-size:12.5px!important;font-weight:700!important;line-height:1!important;text-decoration:none!important;box-shadow:none!important}',
    '.rnv-storehead .cart-icon{width:16px!important;height:16px!important;margin:0!important;fill:currentColor!important}',
    '.rnv-storehead .cart-widget-total{margin:0!important;color:#fff!important}',
    '.rnv-storehead #ajax-cart .badge{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:20px!important;height:20px!important;padding:0 6px!important;border-radius:99px!important;background:#fff!important;color:' + COL.vino + '!important;font-size:10.5px!important;font-weight:800!important;line-height:1!important}',
    '@media(max-width:480px){.rnv-storehead .logo-img{max-height:30px!important}.rnv-storehead .utilities-item{width:36px!important;height:36px!important}.rnv-storehead .cart-widget-total{display:none!important}.rnv-storehead #ajax-cart>a{padding:9px 12px!important}}'
  ].join('');
  function headerMarca() {
    if (!CFG.headerMarca) return;
    var carrito = document.getElementById('ajax-cart');
    var h = $('[data-store="head"]') || (carrito && carrito.closest && (carrito.closest('header') || carrito.closest('.js-head-main'))) || $('header');
    if (!h) return;
    var bg = getComputedStyle(h).backgroundColor;
    if (/rgba\(\s*0,\s*0,\s*0,\s*0\s*\)|transparent/.test(bg)) return;
    h.classList.add('rnv-storehead');
  }


  /* ---------- bloque 07b · LOGO DE RENOVÉ ----------
     En el home, el logo de la tienda se reemplaza por el de RENOVÉ: la
     palabra en Jost (como en la ficha) o la imagen de logoImagen. El link
     sigue llevando al inicio. El logo original queda escondido, no
     borrado: RENOVE_HOME.quitar() lo devuelve. */
  var CSS_LOGO = [
    '.rnv-logo-link{display:inline-flex!important;align-items:center!important;text-decoration:none!important;line-height:1!important}',
    '.rnv-logo-link>*:not(.rnv-logo){display:none!important}',
    '.rnv-logo{display:inline-block!important;margin:0 -.3em 0 0!important;padding:0!important;font-family:"Jost","Helvetica Neue",Arial,sans-serif!important;font-weight:400!important;font-size:21px!important;line-height:1!important;letter-spacing:.3em!important;text-transform:uppercase!important;color:inherit;white-space:nowrap!important}',
    '.rnv-storehead .rnv-logo{color:' + COL.vino + '!important}',
    '.rnv-logo--img{margin:0!important}',
    '.rnv-logo img{display:block!important;width:auto!important;height:34px!important;max-width:190px!important;object-fit:contain!important;filter:none!important}',
    '@media(max-width:480px){.rnv-logo{font-size:18px!important;letter-spacing:.26em!important;margin-right:-.26em!important}.rnv-logo--img{margin:0!important}.rnv-logo img{height:28px!important}}'
  ].join('');
  function cambiarLogo() {
    if (!CFG.logoMarca) return;
    var h = header(); if (!h) return;
    var links = [];
    $$('.logo-img, #logo img, .js-logo img, .logo-img-container img, .logo-text', h).forEach(function (n) {
      var a = n.closest && n.closest('a');
      if (a && links.indexOf(a) === -1) links.push(a);
    });
    if (!links.length) {
      var a2 = $('#logo a, .logo-img-container a, .js-logo a, .logo-text-container a, a.logo', h);
      if (a2) links.push(a2);
    }
    var nombre = CFG.logoTexto || MARCA;
    links.forEach(function (a) {
      if (a.querySelector('.rnv-logo')) return;
      /* si el logo es texto suelto adentro del link, se envuelve para poder esconderlo */
      Array.prototype.slice.call(a.childNodes).forEach(function (nodo) {
        if (nodo.nodeType === 3 && nodo.textContent.trim()) {
          var w = document.createElement('span');
          w.className = 'rnv-logo-orig';
          a.insertBefore(w, nodo); w.appendChild(nodo);
        }
      });
      var logo = document.createElement('span');
      if (CFG.logoImagen) {
        logo.className = 'rnv-logo rnv-logo--img';
        logo.innerHTML = '<img src="' + esc(CFG.logoImagen) + '" alt="' + esc(nombre) + '">';
      } else {
        logo.className = 'rnv-logo';
        logo.textContent = nombre;
      }
      a.appendChild(logo);
      a.setAttribute('data-rnv-label', a.getAttribute('aria-label') || '');
      a.setAttribute('aria-label', nombre);
      a.classList.add('rnv-logo-link');
    });
  }


  /* ---------- bloque 08 · BOTÓN DE WHATSAPP ----------
     Lo dibuja el tema abajo a la derecha. Cuando aparece la barra fija,
     lo sube para que no tape el botón de compra, y después lo devuelve. */
  var WA_SEL = "a[href*='wa.me'],a[href*='api.whatsapp'],a[href*='whatsapp'],.js-btn-fixed-bottom,[class*='whatsapp'],[class*='WhatsApp'],[id*='whatsapp']";
  var waNodo = null;
  function fijoDe(el) {
    for (var n = 0; el && el.nodeType === 1 && n < 6; n++) {
      if (el.id === 'rnv-home') return null;
      try { if (getComputedStyle(el).position === 'fixed') return el; } catch (e) {}
      el = el.parentElement;
    }
    return null;
  }
  function buscarWhatsApp() {
    if (waNodo && document.body.contains(waNodo)) return waNodo;
    var c = $$(WA_SEL);
    for (var i = 0; i < c.length; i++) {
      if (c[i].closest && c[i].closest('#rnv-home')) continue;
      var f = fijoDe(c[i]);
      if (!f) continue;
      var r = f.getBoundingClientRect();
      if (r.width > 20 && r.width <= 140 && r.height > 20 && r.height <= 140) {
        waNodo = f;
        waNodo.__rnvBottom = f.style.getPropertyValue('bottom');
        waNodo.__rnvPrio = f.style.getPropertyPriority('bottom');
        f.style.setProperty('transition', 'bottom .3s ease', 'important');
        return f;
      }
    }
    return null;
  }
  function ubicarWhatsApp() {
    var w = buscarWhatsApp(); if (!w) return;
    var barra = $('#rnv-home .rnv-barra');
    if (barra && barra.classList.contains('is-on')) {
      var base = parseFloat(getComputedStyle(w).bottom) || 16;
      if (!w.__rnvSubido) w.__rnvBase = base;
      w.__rnvSubido = true;
      w.style.setProperty('bottom', (barra.offsetHeight + 12) + 'px', 'important');
    } else if (w.__rnvSubido) {
      w.__rnvSubido = false;
      if (w.__rnvBottom) w.style.setProperty('bottom', w.__rnvBottom, w.__rnvPrio);
      else w.style.removeProperty('bottom');
    }
  }


  /* ---------- bloque 09 · MONTAJE EN EL TEMA ----------
     Tiendanube marca cada bloque del home con data-store="home-..." (es su
     punto de anclaje oficial para apps). El home nuevo se inserta justo
     antes del primero, subiendo hasta un contenedor que ocupe todo el ancho
     para que las secciones vayan de borde a borde. Si no encuentra ninguno,
     cae debajo del header, y si tampoco hay header, arriba del footer. */
  var NATIVOS = '[data-store^="home-"],[data-store="banner-services"]';
  function anchoContenido(el) {
    var cs = getComputedStyle(el);
    return el.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
  }
  function subirHastaAnchoCompleto(hijo) {
    var vw = document.documentElement.clientWidth || window.innerWidth;
    var padre = hijo.parentElement;
    while (padre && padre !== document.body && anchoContenido(padre) < vw - 4) {
      hijo = padre;
      padre = padre.parentElement;
    }
    return { padre: padre || document.body, hijo: hijo };
  }
  function puntoDeMontaje() {
    var nativos = $$(NATIVOS).filter(function (n) { return !(n.closest && n.closest('#rnv-home')); });
    if (nativos.length) {
      var a = subirHastaAnchoCompleto(nativos[0]);
      return { padre: a.padre, antes: a.hijo, via: 'data-store="' + nativos[0].getAttribute('data-store') + '"' };
    }
    var h = header();
    if (h) {
      var b = subirHastaAnchoCompleto(h);
      return { padre: b.padre, antes: b.hijo.nextSibling, via: 'debajo del header' };
    }
    var f = $('[data-store="footer"]') || $('footer');
    if (f) {
      var c = subirHastaAnchoCompleto(f);
      return { padre: c.padre, antes: c.hijo, via: 'arriba del footer' };
    }
    return { padre: document.body, antes: document.body.firstChild, via: 'body' };
  }
  function cssOcultarNativos() {
    if (!CFG.ocultarHomeNativo) return '';
    var no = (CFG.mantenerNativas || []).map(function (k) { return ':not([data-store="' + String(k).replace(/"/g, '') + '"])'; }).join('');
    return '[data-store^="home-"]' + no + ',[data-store="banner-services"]' + no + '{display:none!important}.rnv-oculto{display:none!important}';
  }
  /* Contenedores del tema que quedaron vacíos (con márgenes o fondos) al
     esconder sus secciones: se esconden también, hasta 3 niveles. */
  function limpiarEnvoltorios(root) {
    if (!CFG.ocultarHomeNativo) return;
    $$(NATIVOS).forEach(function (n) {
      var p = n.parentElement;
      for (var k = 0; p && p !== document.body && k < 3; k++) {
        if (p.contains(root) || p === root.parentElement) break;
        var vivos = Array.prototype.filter.call(p.children, function (c) {
          if (/^(SCRIPT|STYLE|LINK|TEMPLATE|NOSCRIPT)$/.test(c.tagName)) return false;
          return getComputedStyle(c).display !== 'none';
        });
        if (vivos.length) break;
        p.classList.add('rnv-oculto');
        p = p.parentElement;
      }
    });
  }
  /* Si el header del tema flota ENCIMA del contenido (absoluto o fijo sin
     espacio reservado), el hero baja lo justo para no quedar tapado. */
  function compensarHeader(root) {
    var h = header(); if (!h || !root) return;
    var pos = getComputedStyle(h).position;
    var destino = $('#rnv-hero', root) || root;
    destino.style.paddingTop = '';
    if (pos !== 'absolute' && pos !== 'fixed') return;
    var hr = h.getBoundingClientRect();
    var fondoHeader = pos === 'fixed' ? hr.bottom : hr.bottom + window.pageYOffset;
    var topeRoot = root.getBoundingClientRect().top + window.pageYOffset;
    var solape = fondoHeader - topeRoot;
    if (solape > 0 && solape < 320) destino.style.paddingTop = Math.ceil(solape) + 'px';
  }

  function estilos() {
    if (document.getElementById('rnv-home-css')) return;
    var activas = SECCIONES.filter(function (s) { return !apagada(s.nombre) && (!s.activa || s.activa()); });
    var css = CSS_BASE
      + activas.map(function (s) { return s.css || ''; }).join('')
      + (CFG.barraFija ? CSS_BARRA : '')
      + (CFG.topbar ? CSS_TOPBAR : '')
      + (CFG.headerMarca ? CSS_HEADER : '')
      + (CFG.logoMarca ? CSS_LOGO : '')
      + cssOcultarNativos();
    var st = document.createElement('style');
    st.id = 'rnv-home-css';
    st.appendChild(document.createTextNode(css));
    (document.head || document.documentElement).appendChild(st);
  }
  function fuentes() {
    if (document.getElementById('rnv-fonts') || document.getElementById('vnx-fonts')) return;
    var pc = document.createElement('link');
    pc.rel = 'preconnect'; pc.href = 'https://fonts.gstatic.com'; pc.crossOrigin = 'anonymous';
    var l = document.createElement('link');
    l.id = 'rnv-fonts'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&family=Inter:wght@400;500;600;700;800&display=swap';
    var head = document.head || document.documentElement;
    head.appendChild(pc); head.appendChild(l);
  }
  /* Apaga el "anti-parpadeo" que pone la etiqueta de GTM (si está). */
  function soltarAntiparpadeo() {
    try { if (typeof window.__RNV_ANTIFLICKER_OFF__ === 'function') window.__RNV_ANTIFLICKER_OFF__(); } catch (e) {}
  }

  var montaje = null;
  function montar() {
    if (document.getElementById('rnv-home')) { soltarAntiparpadeo(); return; }
    try {
      var activas = SECCIONES.filter(function (s) { return !apagada(s.nombre) && (!s.activa || s.activa()); });
      var root = document.createElement('div');
      root.id = 'rnv-home';
      root.setAttribute('data-version', VERSION);
      root.innerHTML = activas.map(function (s) { return s.html(); }).join('') + (CFG.barraFija ? htmlBarra() : '');
      montaje = puntoDeMontaje();
      montaje.padre.insertBefore(root, montaje.antes);

      activas.forEach(function (s) {
        if (!s.init) return;
        var el = document.getElementById('rnv-' + s.nombre);
        if (!el) return;
        try { s.init(el); } catch (e) { if (window.console) console.error('[RENOVÉ HOME] falló la sección ' + s.nombre, e); }
      });

      /* anclas internas y clics en los botones de compra */
      root.addEventListener('click', function (e) {
        var ancla = e.target.closest && e.target.closest('[data-scroll]');
        if (ancla) { e.preventDefault(); irA(ancla.getAttribute('data-scroll')); return; }
        var cta = e.target.closest && e.target.closest('[data-cta]');
        if (cta) track('cta', { ubicacion: cta.getAttribute('data-cta') });
      });

      /* un link interno a una sección apagada no lleva a ningún lado: se esconde */
      $$('[data-scroll]', root).forEach(function (a) {
        if (!document.querySelector(a.getAttribute('data-scroll'))) a.style.display = 'none';
      });

      limpiarEnvoltorios(root);
      montarTopbar();
      headerMarca();
      cambiarLogo();
      compensarHeader(root);
      if (CFG.barraFija) iniciarBarra(root);

      var t = 0;
      window.addEventListener('resize', function () {
        clearTimeout(t);
        t = setTimeout(function () { compensarHeader(root); ubicarWhatsApp(); }, 200);
      });
      window.addEventListener('load', function () { compensarHeader(root); });

      /* Vigilancia: si el tema vuelve a dibujar el home y se lleva el
         nuestro, se vuelve a poner (mismo nodo, no pierde nada). */
      var n = 0, vig = setInterval(function () {
        n++;
        if (!document.body.contains(root)) {
          var m = puntoDeMontaje();
          m.padre.insertBefore(root, m.antes);
          limpiarEnvoltorios(root);
        }
        ubicarWhatsApp();
        cambiarLogo();
        if (n >= 15) clearInterval(vig);
      }, 1000);

      soltarAntiparpadeo();
      track('home_visto');
      if (CFG.datosDeEjemplo && window.console) {
        console.warn('[RENOVÉ HOME] Las reseñas, el rating y la encuesta son VALORES DE EJEMPLO. '
          + 'Reemplazalos por los reales en el bloque 02 y poné datosDeEjemplo: false antes de pautar.');
      }
    } catch (err) {
      /* Si algo sale mal, se devuelve el home nativo: nunca queda en blanco. */
      var st = document.getElementById('rnv-home-css');
      if (st) st.parentNode.removeChild(st);
      var r = document.getElementById('rnv-home');
      if (r) r.parentNode.removeChild(r);
      soltarAntiparpadeo();
      if (window.console) console.error('[RENOVÉ HOME] No se pudo montar el home. Queda el nativo.', err);
    }
  }


  /* ---------- bloque 10 · ARRANQUE ---------- */
  var VERSION = '1.0.0';

  function rutaEsHome() {
    if (CFG.forzar) return true;
    var p = (location.pathname || '/').replace(/\/+$/, '');
    return p === '' || /^\/(es|pt|en)$/.test(p);
  }
  function esHome() {
    return rutaEsHome() || !!(document.body && document.body.classList.contains('template-home'));
  }
  function cuandoListo(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  window.RENOVE_HOME = {
    version: VERSION,
    config: CFG,
    datos: DATOS,
    debug: function () {
      var h = header();
      var c = window.console; if (!c) return;
      c.group('[RENOVÉ HOME] diagnóstico · v' + VERSION);
      c.log('¿Es el home?', esHome(), '· ruta:', location.pathname);
      c.log('¿Montado?', !!document.getElementById('rnv-home'), montaje ? '· vía ' + montaje.via : '');
      c.log('Header del tema:', h || 'no encontrado', h ? '· position: ' + getComputedStyle(h).position : '');
      c.log('Secciones nativas:', $$(NATIVOS).map(function (n) { return n.getAttribute('data-store'); }));
      c.log('Logo reemplazado:', $$('.rnv-logo').length ? 'sí' : 'no (revisá logoMarca o el HTML del header)');
      c.log('Botón de WhatsApp:', buscarWhatsApp() || 'no encontrado');
      c.log('Link del producto:', PROD);
      c.log('Datos de ejemplo:', CFG.datosDeEjemplo ? 'SÍ (reemplazalos antes de pautar)' : 'no');
      c.groupEnd();
    },
    quitar: function () {
      ['rnv-home', 'rnv-topbar', 'rnv-home-css', 'rnv-fonts'].forEach(function (id) {
        var e = document.getElementById(id); if (e && e.parentNode) e.parentNode.removeChild(e);
      });
      $$('.rnv-oculto').forEach(function (e) { e.classList.remove('rnv-oculto'); });
      $$('.rnv-storehead').forEach(function (e) { e.classList.remove('rnv-storehead'); });
      $$('.rnv-logo').forEach(function (e) { if (e.parentNode) e.parentNode.removeChild(e); });
      $$('.rnv-logo-orig').forEach(function (w) {
        while (w.firstChild) w.parentNode.insertBefore(w.firstChild, w);
        w.parentNode.removeChild(w);
      });
      $$('.rnv-logo-link').forEach(function (a) {
        var l = a.getAttribute('data-rnv-label');
        if (l) a.setAttribute('aria-label', l); else a.removeAttribute('aria-label');
        a.removeAttribute('data-rnv-label');
        a.classList.remove('rnv-logo-link');
      });
      document.documentElement.classList.remove('rnv-barra-on');
      if (waNodo) { waNodo.__rnvSubido = true; ubicarWhatsApp(); }
    }
  };

  function arrancar() {
    if (rutaEsHome()) {
      /* Se esconde el home nativo lo antes posible (antes de que el DOM
         termine de cargar) para que no se vea el viejo y después el nuevo. */
      fuentes();
      estilos();
      cuandoListo(montar);
      return;
    }
    /* Por si la ruta no es "/" pero el tema dice que es el home. */
    cuandoListo(function () {
      if (esHome()) { fuentes(); estilos(); montar(); }
      else soltarAntiparpadeo();
    });
  }
  arrancar();
})();
