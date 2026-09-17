/* Reparación LG Valladolid — app.js (JS puro, sin dependencias, sin peticiones externas) */
(function () {
  'use strict';
  var CONFIG = {
    TEL: '641 153 922', TEL_HREF: 'tel:+34641153922',
    WA: '641 153 922', WA_BASE: 'https://wa.me/34641153922?text=',
    MARCA: 'LG', MARCA_RE: /\b(LG)\b/g, SAT_TXT: '<a href="https://www.lg.com/es/soporte/" rel="nofollow noopener" target="_blank">lg.com/es</a> · 963 05 05 00', ETIQUETA: 'número de modelo', F_ES_E: false,
    FORM_ENDPOINT: '' /* vacío = envío por WhatsApp (canal citado en Privacidad); si se activa un proveedor, actualizar Privacidad */
  };
  var CODIGOS=[{"id":"oe-lavadora","cod":"OE","ap":"lavadora","keys":["OE"],"titulo":"No desagua","sig":"La lavadora no consigue vaciar el agua: filtro de la bomba, manguera de desagüe o la propia bomba.","pasos":["Limpiar el filtro de la bomba (abajo, delante), con un trapo para el agua que sale","Comprobar que la manguera de desagüe no está doblada ni elevada más de 1 m","Comprobar el sifón de casa vertiendo 2 litros de agua"],"sem":"verde","llamar":"Filtro limpio, manguera bien y sigue igual → bomba de desagüe."},{"id":"ie-lavadora","cod":"IE","ap":"lavadora","keys":["IE"],"titulo":"No entra agua","sig":"La lavadora no recibe agua o llega con poca presión.","pasos":["Abrir el grifo del todo","Comprobar que la manguera de entrada no está doblada","Limpiar el filtro de la entrada de agua (en la rosca de la manguera)"],"sem":"verde","llamar":"Con presión normal y filtro limpio, y sigue → electroválvula."},{"id":"ue-lavadora","cod":"UE","ap":"lavadora","keys":["UE"],"titulo":"Carga desequilibrada","sig":"La lavadora detecta la ropa mal repartida y no centrifuga para proteger el tambor.","pasos":["Redistribuir la ropa; no lavar una sola prenda pesada","Nivelar las patas de la lavadora"],"sem":"verde","llamar":"Si ocurre con carga normal y máquina nivelada → amortiguadores o rodamientos."},{"id":"de-lavadora","cod":"dE / dE1 / dE2 / dE4","ap":"lavadora","keys":["DE","DE1","DE2","DE4"],"titulo":"Puerta no cerrada","sig":"La lavadora no detecta la puerta cerrada: cierre, ropa atrapada o sensor de puerta.","pasos":["Cerrar bien la puerta","Retirar ropa atrapada en la goma"],"sem":"verde","llamar":"Persiste con la puerta bien cerrada → cierre o sensor de puerta."},{"id":"le-lavadora","cod":"LE / LE1 / E6","ap":"lavadora","keys":["LE","LE1","E6","E06"],"titulo":"Motor bloqueado o sobrecalentado","sig":"El motor Direct Drive no gira como espera la placa: sensor Hall, rotor o sobrecarga.","pasos":["Desenchufar 30 minutos y volver a probar","Comprobar que nada bloquea el tambor (girarlo a mano con la lavadora parada)"],"sem":"ambar","llamar":"Si repite → sensor Hall, rotor o placa; casi nunca el motor entero."},{"id":"ae-lavadora","cod":"AE / E04","ap":"lavadora","keys":["AE","E04","E4"],"titulo":"Fuga de agua detectada","sig":"El sensor de la base ha detectado agua dentro de la lavadora.","pasos":["Desenchufar 60 segundos y reintentar","Revisar las mangueras de entrada y desagüe","Si repite, cerrar el grifo"],"sem":"ambar","llamar":"Siempre que reaparezca: hay una fuga interna."},{"id":"pe-lavadora","cod":"PE","ap":"lavadora","keys":["PE"],"titulo":"Sensor de nivel (presostato)","sig":"La placa no recibe una lectura válida del nivel de agua.","pasos":["Desenchufar 60 segundos y reintentar"],"sem":"ambar","llamar":"Siempre."},{"id":"fe-lavadora","cod":"FE","ap":"lavadora","keys":["FE"],"titulo":"Sobrellenado","sig":"Ha entrado más agua de la debida: electroválvula que no cierra o presostato.","pasos":["Cerrar el grifo","Desenchufar 60 segundos"],"sem":"ambar","llamar":"Siempre: electroválvula o presostato."},{"id":"te-lavadora","cod":"tE / tE1–tE4 / E05","ap":"lavadora","keys":["TE","TE1","TE2","TE3","TE4","E05","E5"],"titulo":"Sensor de temperatura","sig":"Fallo del sensor de temperatura del agua o, en lavasecadoras, del sistema de secado.","pasos":["Desenchufar 60 segundos y reintentar"],"sem":"ambar","llamar":"Siempre."},{"id":"pf-lavadora","cod":"PF","ap":"lavadora","keys":["PF"],"titulo":"Corte de corriente","sig":"La lavadora se quedó sin luz durante el programa; no es una avería si hubo un corte.","pasos":["Desenchufar 60 segundos","Reiniciar el programa"],"sem":"verde","llamar":"Si repite sin cortes de luz → placa de potencia."},{"id":"cl-lavadora","cod":"CL","ap":"lavadora","keys":["CL"],"titulo":"Bloqueo infantil (no es avería)","sig":"El panel está bloqueado para niños; la lavadora funciona, pero no responde a las teclas.","pasos":["Mantener pulsadas 3 segundos las teclas del bloqueo infantil que indica el panel"],"sem":"verde","llamar":"Solo si no se desbloquea tras varios intentos."},{"id":"ed-lavadora","cod":"Ed1 / Ed2 / Ed3 / Ed4","ap":"lavadora","keys":["ED","ED1","ED2","ED3","ED4"],"titulo":"Depósito ezDispense","sig":"Aviso del depósito de autodosificación de detergente (series 900 y 950): no es de la lavadora en sí.","pasos":["Limpiar los compartimentos del depósito ezDispense según el manual","Comprobar que el depósito está bien encajado"],"sem":"verde","llamar":"Persiste tras la limpieza → bomba dosificadora."},{"id":"oe-lavasecadora","cod":"OE","ap":"lavasecadora","keys":["OE"],"titulo":"No desagua","sig":"La lavasecadora no vacía el agua: filtro de la bomba, manguera o bomba, igual que en la lavadora.","pasos":["Limpiar el filtro de la bomba (abajo, delante)","Comprobar la manguera de desagüe, sin dobleces ni elevada más de 1 m"],"sem":"verde","llamar":"Filtro limpio y sigue → bomba de desagüe."},{"id":"ie-lavasecadora","cod":"IE","ap":"lavasecadora","keys":["IE"],"titulo":"No entra agua","sig":"No llega agua o llega con poca presión.","pasos":["Abrir el grifo del todo","Manguera sin dobleces y filtro de entrada limpio"],"sem":"verde","llamar":"Con presión normal y sigue → electroválvula."},{"id":"ue-lavasecadora","cod":"UE","ap":"lavasecadora","keys":["UE"],"titulo":"Carga desequilibrada","sig":"La ropa está mal repartida y no centrifuga.","pasos":["Redistribuir la ropa","Nivelar las patas"],"sem":"verde","llamar":"Con carga normal y nivelada → amortiguadores o rodamientos."},{"id":"de-lavasecadora","cod":"dE / dE1 / dE2 / dE4","ap":"lavasecadora","keys":["DE","DE1","DE2","DE4"],"titulo":"Puerta no cerrada","sig":"No detecta la puerta cerrada: cierre, ropa atrapada o sensor.","pasos":["Cerrar bien la puerta","Retirar ropa atrapada en la goma"],"sem":"verde","llamar":"Persiste → cierre o sensor de puerta."},{"id":"le-lavasecadora","cod":"LE / LE1 / E6","ap":"lavasecadora","keys":["LE","LE1","E6","E06"],"titulo":"Motor bloqueado o sobrecalentado","sig":"El motor Direct Drive no gira como espera la placa: sensor Hall, rotor o sobrecarga.","pasos":["Desenchufar 30 minutos","Comprobar que nada bloquea el tambor"],"sem":"ambar","llamar":"Si repite → sensor Hall, rotor o placa."},{"id":"ae-lavasecadora","cod":"AE / E04","ap":"lavasecadora","keys":["AE","E04","E4"],"titulo":"Fuga de agua detectada","sig":"Agua detectada en la base del aparato.","pasos":["Desenchufar 60 segundos y reintentar","Si repite, cerrar el grifo"],"sem":"ambar","llamar":"Siempre que reaparezca: fuga interna."},{"id":"te-lavasecadora","cod":"tE / tE1–tE4 / E05","ap":"lavasecadora","keys":["TE","TE1","TE2","TE3","TE4","E05","E5"],"titulo":"Sistema de secado / sensor de temperatura","sig":"Fallo del sensor de temperatura o del sistema de secado: la lavasecadora lava, pero no seca.","pasos":["Desenchufar 60 segundos y reintentar"],"sem":"ambar","llamar":"Siempre."},{"id":"fe-lavasecadora","cod":"FE","ap":"lavasecadora","keys":["FE"],"titulo":"Sobrellenado","sig":"Ha entrado más agua de la debida.","pasos":["Cerrar el grifo","Desenchufar 60 segundos"],"sem":"ambar","llamar":"Siempre: electroválvula o presostato."},{"id":"pf-lavasecadora","cod":"PF","ap":"lavasecadora","keys":["PF"],"titulo":"Corte de corriente","sig":"Se fue la luz durante el programa.","pasos":["Desenchufar 60 segundos","Reiniciar el programa"],"sem":"verde","llamar":"Si repite sin cortes → placa."},{"id":"de-secadora","cod":"dE","ap":"secadora","keys":["DE"],"titulo":"Puerta abierta o filtro mal puesto","sig":"La secadora no arranca porque la puerta no está bien cerrada o el filtro de pelusas no está en su sitio.","pasos":["Cerrar bien la puerta","Colocar bien el filtro de pelusas"],"sem":"verde","llamar":"Persiste → cierre o sensor de puerta."},{"id":"oe-secadora","cod":"OE","ap":"secadora","keys":["OE"],"titulo":"No evacua el agua de condensación","sig":"La secadora no puede vaciar el agua condensada: depósito lleno, filtro de desagüe con pelusa o bomba.","pasos":["Vaciar el depósito de agua","Limpiar el filtro de desagüe (pelusa, monedas)","Si desagua por manguera, comprobar que no está doblada"],"sem":"verde","llamar":"Persiste → bomba de condensados."},{"id":"te-secadora","cod":"tE1 / tE2 / tE3 / tE4","ap":"secadora","keys":["TE","TE1","TE2","TE3","TE4"],"titulo":"Sensor de temperatura (termistor)","sig":"Lectura anómala del termistor; tE2 puede deberse a aire frío entrando por el conducto.","pasos":["Desenchufar 60 segundos y reintentar"],"sem":"ambar","llamar":"Si repite → termistor o placa."},{"id":"pf-secadora","cod":"PF","ap":"secadora","keys":["PF"],"titulo":"Corte de corriente","sig":"Se fue la luz durante el ciclo; no es avería si hubo corte.","pasos":["Reiniciar el programa"],"sem":"verde","llamar":"Si repite sin cortes → placa."},{"id":"cl-secadora","cod":"CL","ap":"secadora","keys":["CL"],"titulo":"Bloqueo infantil (no es avería)","sig":"Panel bloqueado para niños; no responde a las teclas.","pasos":["Mantener 3 segundos la tecla de bloqueo que indica el panel"],"sem":"verde","llamar":"Solo si no se desbloquea."},{"id":"cd-secadora","cod":"Cd","ap":"secadora","keys":["CD"],"titulo":"Fin de ciclo antiarrugas (no es error)","sig":"La secadora ha terminado y gira de vez en cuando para que la ropa no se arrugue.","pasos":["Sacar la ropa; el aviso desaparece al abrir la puerta"],"sem":"verde","llamar":"Nunca por este aviso."},{"id":"oe-lavavajillas","cod":"OE / F11","ap":"lavavajillas","keys":["OE","F11"],"titulo":"No desagua","sig":"El lavavajillas no vacía el agua: filtros, manguera, sifón o bomba de desagüe.","pasos":["Limpiar el filtro interno y el de acero inoxidable con un cepillo suave","Comprobar la manguera de desagüe y el sifón"],"sem":"verde","llamar":"Persiste → bomba de desagüe."},{"id":"ie-lavavajillas","cod":"IE / F12 / F40","ap":"lavavajillas","keys":["IE","F12","F40"],"titulo":"No entra agua","sig":"No llega agua al lavavajillas.","pasos":["Abrir el grifo del todo","Limpiar el filtro de la entrada de agua"],"sem":"verde","llamar":"Persiste → electroválvula."},{"id":"ae-lavavajillas","cod":"AE / F54","ap":"lavavajillas","keys":["AE","F54"],"titulo":"Fuga de agua","sig":"El sensor ha detectado agua fuera de la cuba.","pasos":["Desenchufar 60 segundos y reintentar","Si repite, cerrar el grifo"],"sem":"ambar","llamar":"Siempre que reaparezca."},{"id":"e1-lavavajillas","cod":"E1","ap":"lavavajillas","keys":["E1","E01"],"titulo":"Aquastop: agua en la base","sig":"El sistema antifugas ha detectado agua en la bandeja inferior.","pasos":["Revisar desagüe, filtros y manguera de entrada","Si repite, cerrar el grifo"],"sem":"ambar","llamar":"Siempre."},{"id":"fe-lavavajillas","cod":"FE / F13","ap":"lavavajillas","keys":["FE","F13"],"titulo":"Sobrellenado","sig":"Ha entrado más agua de la debida en la cuba.","pasos":["Reducir el caudal de entrada en el grifo","Reintentar el programa"],"sem":"ambar","llamar":"Si repite → electroválvula o sensor de nivel."},{"id":"te-lavavajillas","cod":"tE / F42","ap":"lavavajillas","keys":["TE","F42"],"titulo":"Sistema de secado / sensor de temperatura","sig":"Fallo del sensor de temperatura o del calentamiento: no calienta ni seca.","pasos":["Desenchufar 60 segundos y reintentar"],"sem":"ambar","llamar":"Si repite → resistencia o sonda."},{"id":"le-lavavajillas","cod":"LE","ap":"lavavajillas","keys":["LE"],"titulo":"Motor de lavado bloqueado","sig":"El motor Direct Drive de lavado no gira: bloqueo o sensor.","pasos":["Dejar 30 minutos sin corriente y reiniciar"],"sem":"ambar","llamar":"Si repite → motor o placa."},{"id":"de-lavavajillas","cod":"dE / dE1 / dE2 / dE4","ap":"lavavajillas","keys":["DE","DE1","DE2","DE4"],"titulo":"Puerta no cerrada","sig":"El lavavajillas no detecta la puerta cerrada.","pasos":["Cerrar bien la puerta, sin cestas ni cubiertos que estorben"],"sem":"verde","llamar":"Persiste → cierre o sensor."},{"id":"ne-lavavajillas","cod":"nE","ap":"lavavajillas","keys":["NE"],"titulo":"Brazo aspersor desalineado u obstruido","sig":"Un brazo QuadWash no gira o no se posiciona bien.","pasos":["Recolocar las cestas para que no toquen el brazo","Limpiar los orificios del brazo aspersor"],"sem":"verde","llamar":"Persiste → motor de posición del brazo."},{"id":"be-lavavajillas","cod":"bE","ap":"lavavajillas","keys":["BE"],"titulo":"Exceso de espuma","sig":"Demasiada espuma en la cuba, normalmente por detergente inadecuado.","pasos":["Usar solo detergente de lavavajillas","Ciclo Auto con un bol de leche en la cesta superior (indicación de LG)"],"sem":"verde","llamar":"Si repite con detergente correcto → llama y lo vemos."},{"id":"pf-lavavajillas","cod":"PF","ap":"lavavajillas","keys":["PF"],"titulo":"Corte de corriente","sig":"Se fue la luz durante el programa.","pasos":["Reiniciar el programa"],"sem":"verde","llamar":"Si repite sin cortes → placa."},{"id":"cl-lavavajillas","cod":"CL","ap":"lavavajillas","keys":["CL"],"titulo":"Bloqueo infantil (no es avería)","sig":"Panel bloqueado; no responde a las teclas.","pasos":["Mantener 3 segundos la tecla de bloqueo que indica el panel"],"sem":"verde","llamar":"Solo si no se desbloquea."},{"id":"erff-frigorifico","cod":"Er FF","ap":"frigorifico","keys":["ERFF","EFF","FF"],"titulo":"Ventilador del congelador no gira","sig":"El motor del ventilador del congelador está bloqueado por hielo o averiado.","pasos":["Desenchufar 5 minutos y reconectar","Si repite, desenchufar con las puertas abiertas 1 día (verano) o hasta 3 (invierno)"],"sem":"verde","llamar":"Reaparece tras el deshielo → motor del ventilador o fallo de desescarche."},{"id":"errf-frigorifico","cod":"Er rF","ap":"frigorifico","keys":["ERRF","ERF","RF"],"titulo":"Ventilador del frigorífico no gira","sig":"El ventilador que reparte el frío en el compartimento frigorífico está bloqueado por hielo o averiado: el congelador enfría y el frigorífico no.","pasos":["Desenchufar 5 minutos y reconectar","Si repite, deshielo manual con las puertas abiertas 1 a 3 días"],"sem":"verde","llamar":"Reaparece tras el deshielo → motor del ventilador o desescarche."},{"id":"erif-frigorifico","cod":"Er IF","ap":"frigorifico","keys":["ERIF","EIF","IF"],"titulo":"Ventilador de la fábrica de hielo","sig":"El ventilador del compartimento de la fábrica de hielo (americanos) no gira.","pasos":["Desenchufar 5 minutos","Retirar el hielo visible del compartimento de la fábrica de hielo"],"sem":"ambar","llamar":"Persiste → motor del ventilador o fábrica de hielo."},{"id":"erdh-frigorifico","cod":"Er dH","ap":"frigorifico","keys":["ERDH","EDH","DH"],"titulo":"Fallo de desescarche","sig":"El sistema de desescarche no ha funcionado: resistencia, fusible térmico o placa. Se acumula hielo en el evaporador.","pasos":["Deshielo manual: desenchufar con las puertas abiertas 1 día (verano) o hasta 3 (invierno)"],"sem":"ambar","llamar":"Si reaparece → siempre: resistencia, fusible térmico o placa."},{"id":"erds-frigorifico","cod":"Er dS","ap":"frigorifico","keys":["ERDS","EDS","DS"],"titulo":"Sensor de desescarche","sig":"La sonda que controla el desescarche da una lectura anómala.","pasos":["Desenchufar 5 minutos y reconectar"],"sem":"ambar","llamar":"Siempre."},{"id":"erco-frigorifico","cod":"Er CO","ap":"frigorifico","keys":["ERCO","ECO","CO"],"titulo":"Comunicación placa ↔ display","sig":"La placa principal y el panel (o la ventana InstaView) no se comunican.","pasos":["Desenchufar 5 minutos y reconectar"],"sem":"ambar","llamar":"Persiste → cableado, display o placa."},{"id":"erch-frigorifico","cod":"Er CH / Er CL","ap":"frigorifico","keys":["ERCH","ERCL","ECH","ECL","CH","CL"],"titulo":"No alcanza la temperatura en un día","sig":"El frigorífico (CH) o el congelador (CL) no han llegado a su temperatura tras un día entero: puerta abierta mucho tiempo, o fuga de refrigerante, compresor o válvula.","pasos":["Comprobar que las puertas cierran bien","Desenchufar 5 minutos y reconectar"],"sem":"ambar","llamar":"Recién instalado o persiste → siempre (circuito sellado o compresor)."},{"id":"ercf-frigorifico","cod":"Er CF","ap":"frigorifico","keys":["ERCF","ECF","CF"],"titulo":"Ventilador del condensador","sig":"El ventilador que refrigera el compresor y el condensador (parte trasera o inferior) no gira.","pasos":["Desenchufar 5 minutos y reconectar","Con el aparato desenchufado, limpiar la rejilla trasera de polvo"],"sem":"ambar","llamar":"Persiste → motor del ventilador del condensador."},{"id":"off-frigorifico","cod":"OF F / OF OF","ap":"frigorifico","keys":["OFF","OFOF","OF"],"titulo":"Modo exposición (no es avería)","sig":"El frigorífico está en modo tienda: luces y panel funcionan, pero no enfría.","pasos":["Mantener pulsadas 5 segundos las teclas Refrigerador e Ice Plus (o las que indique el manual)"],"sem":"verde","llamar":"Solo si no sale del modo exposición."},{"id":"ch01-aire-acondicionado","cod":"CH01","ap":"aire-acondicionado","keys":["CH01","CH1"],"titulo":"Termistor de aire (unidad interior)","sig":"El sensor de temperatura del aire de la unidad interior está abierto o en corto.","pasos":["Apagar 5 minutos en el diferencial y volver a encender"],"sem":"ambar","llamar":"Si repite → siempre (sensor o placa)."},{"id":"ch02-aire-acondicionado","cod":"CH02","ap":"aire-acondicionado","keys":["CH02","CH2"],"titulo":"Termistor de tubería de entrada","sig":"El sensor de la tubería de entrada de la unidad interior está abierto o en corto.","pasos":["Apagar 5 minutos en el diferencial y volver a encender"],"sem":"ambar","llamar":"Siempre."},{"id":"ch03-aire-acondicionado","cod":"CH03","ap":"aire-acondicionado","keys":["CH03","CH3"],"titulo":"Comunicación con el mando por cable","sig":"La unidad interior no se comunica con el mando de pared.","pasos":["Apagar 5 minutos en el diferencial y volver a encender"],"sem":"ambar","llamar":"Siempre."},{"id":"ch04-aire-acondicionado","cod":"CH04","ap":"aire-acondicionado","keys":["CH04","CH4"],"titulo":"Bomba de drenaje / boya","sig":"Hay agua en la bandeja de condensados: bomba de drenaje averiada o desagüe obstruido.","pasos":["Apagar 5 minutos en el diferencial y volver a encender","Mirar si la unidad interior gotea"],"sem":"ambar","llamar":"Siempre (desagüe obstruido o bomba)."},{"id":"ch05-aire-acondicionado","cod":"CH05 / CH53","ap":"aire-acondicionado","keys":["CH05","CH5","CH53"],"titulo":"Comunicación interior ↔ exterior","sig":"Las unidades interior y exterior no se comunican: cableado de interconexión o placa.","pasos":["Apagar 5 minutos en el diferencial y volver a encender"],"sem":"ambar","llamar":"Siempre."},{"id":"ch06-aire-acondicionado","cod":"CH06","ap":"aire-acondicionado","keys":["CH06","CH6"],"titulo":"Termistor de tubería de salida / sobrecorriente","sig":"Sensor de la tubería de salida de la unidad interior; en algunos 1x1, error de corriente máxima.","pasos":["Apagar 5 minutos en el diferencial y volver a encender"],"sem":"ambar","llamar":"Siempre."},{"id":"ch09-aire-acondicionado","cod":"CH09","ap":"aire-acondicionado","keys":["CH09","CH9"],"titulo":"Motor del ventilador interior bloqueado","sig":"El ventilador BLDC de la unidad interior no gira.","pasos":["Apagar 5 minutos en el diferencial y volver a encender","Comprobar que las lamas no están bloqueadas"],"sem":"ambar","llamar":"Siempre."},{"id":"ch10-aire-acondicionado","cod":"CH10","ap":"aire-acondicionado","keys":["CH10"],"titulo":"Termistor de drenaje / ventilador interior","sig":"Sensor de la tubería de drenaje o fallo del ventilador de la unidad interior.","pasos":["Apagar 5 minutos en el diferencial y volver a encender"],"sem":"ambar","llamar":"Siempre."},{"id":"ch21-aire-acondicionado","cod":"CH21","ap":"aire-acondicionado","keys":["CH21"],"titulo":"Fallo IPM: sobrecorriente del compresor","sig":"La placa inverter ha detectado sobrecorriente en el compresor.","pasos":["Apagar 5 minutos en el diferencial y volver a encender una sola vez"],"sem":"ambar","llamar":"Siempre; si repite, deja de usarlo hasta la visita."},{"id":"ch22-aire-acondicionado","cod":"CH22","ap":"aire-acondicionado","keys":["CH22"],"titulo":"Corriente máxima superada","sig":"El equipo consume más de lo permitido (más de 14 A): sobrecarga térmica o eléctrica.","pasos":["Comprobar que los filtros están limpios","Comprobar que nada tapa la unidad exterior","Apagar 5 minutos en el diferencial y volver a encender"],"sem":"ambar","llamar":"Si repite → siempre."},{"id":"ch23-aire-acondicionado","cod":"CH23","ap":"aire-acondicionado","keys":["CH23"],"titulo":"Bajo voltaje de continua","sig":"La tensión de continua de la placa ha bajado de 140 V.","pasos":["Apagar 5 minutos en el diferencial y volver a encender","Comprobar que la tensión de casa es normal (otros aparatos funcionan bien)"],"sem":"ambar","llamar":"Siempre."},{"id":"ch26-aire-acondicionado","cod":"CH26","ap":"aire-acondicionado","keys":["CH26"],"titulo":"Compresor DC no arranca","sig":"Fallo de posición del compresor de continua: no consigue arrancar.","pasos":["Apagar 5 minutos en el diferencial y volver a encender"],"sem":"ambar","llamar":"Siempre."},{"id":"ch27-aire-acondicionado","cod":"CH27","ap":"aire-acondicionado","keys":["CH27"],"titulo":"Defecto PSC (placa)","sig":"Fallo en el circuito de alimentación de la placa exterior.","pasos":["Apagar 5 minutos en el diferencial y volver a encender"],"sem":"ambar","llamar":"Siempre."},{"id":"ch41-aire-acondicionado","cod":"CH41","ap":"aire-acondicionado","keys":["CH41"],"titulo":"Sensor de descarga del compresor","sig":"El sensor de temperatura de descarga del compresor inverter está abierto o en corto.","pasos":["Apagar 5 minutos en el diferencial y volver a encender"],"sem":"ambar","llamar":"Siempre."},{"id":"ch44-aire-acondicionado","cod":"CH44 / CH45 / CH46","ap":"aire-acondicionado","keys":["CH44","CH45","CH46"],"titulo":"Sensores de la unidad exterior","sig":"Sensor de aire exterior (CH44), del condensador (CH45) o del tubo de succión (CH46) abierto o en corto.","pasos":["Apagar 5 minutos en el diferencial y volver a encender"],"sem":"ambar","llamar":"Siempre."},{"id":"ch51-aire-acondicionado","cod":"CH51","ap":"aire-acondicionado","keys":["CH51"],"titulo":"Sobrecapacidad (multisplit)","sig":"La suma de unidades interiores encendidas supera la capacidad de la exterior.","pasos":["Apagar las unidades interiores que sobren"],"sem":"ambar","llamar":"Si repite con menos unidades → instalador o técnico."},{"id":"ch60-aire-acondicionado","cod":"CH60","ap":"aire-acondicionado","keys":["CH60"],"titulo":"EEPROM de la unidad exterior","sig":"Error de suma de comprobación de la memoria de la placa exterior.","pasos":["Apagar 5 minutos en el diferencial y volver a encender"],"sem":"ambar","llamar":"Siempre."},{"id":"ch61-aire-acondicionado","cod":"CH61 / CH62","ap":"aire-acondicionado","keys":["CH61","CH62"],"titulo":"Alta temperatura del condensador / disipador","sig":"La unidad exterior se calienta más de la cuenta: falta de ventilación, suciedad o exceso de carga.","pasos":["Limpiar los filtros de la unidad interior","Despejar la unidad exterior y no tapar su salida de aire","Apagar 5 minutos en el diferencial y volver a encender"],"sem":"ambar","llamar":"Si repite → siempre."},{"id":"ch67-aire-acondicionado","cod":"CH67","ap":"aire-acondicionado","keys":["CH67"],"titulo":"Ventilador exterior bloqueado","sig":"El ventilador de la unidad exterior no gira: hojas, objetos o motor.","pasos":["Mirar, sin tocar, si hay hojas u objetos en la unidad exterior","Apagar 5 minutos en el diferencial y volver a encender"],"sem":"ambar","llamar":"Siempre."}];
var APARATOS={"lavadora":{"id":"lavadora","nombre":"Lavadora","art":"una lavadora","slug":"lavadora"},"frigorifico":{"id":"frigorifico","nombre":"Frigorífico","art":"un frigorífico","slug":"frigorifico"},"lavavajillas":{"id":"lavavajillas","nombre":"Lavavajillas","art":"un lavavajillas","slug":"lavavajillas"},"secadora":{"id":"secadora","nombre":"Secadora","art":"una secadora","slug":"secadora"},"lavasecadora":{"id":"lavasecadora","nombre":"Lavasecadora","art":"una lavasecadora","slug":"lavasecadora"},"aire-acondicionado":{"id":"aire-acondicionado","nombre":"Aire acondicionado","art":"un aire acondicionado","slug":"aire-acondicionado"},"congelador":{"id":"congelador","nombre":"Congelador","art":"un congelador","slug":"congelador"},"horno":{"id":"horno","nombre":"Horno","art":"un horno","slug":"horno"},"placa":{"id":"placa","nombre":"Placa de inducción","art":"una placa","slug":"placa"},"campana":{"id":"campana","nombre":"Campana extractora","art":"una campana","slug":"campana"}};
  var REL = document.documentElement.getAttribute('data-rel') || '';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var wa = function (t) { return CONFIG.WA_BASE + encodeURIComponent(t); };
  var ico = function (id, cls) { return '<svg class="' + (cls || '') + '" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- zona (memoria de sesión) */
  var Z = {
    get: function () { try { return sessionStorage.getItem('zona') || ''; } catch (e) { return ''; } },
    set: function (v) { try { v ? sessionStorage.setItem('zona', v) : sessionStorage.removeItem('zona'); } catch (e) { } }
  };
  if (document.body.getAttribute('data-zona')) Z.set(document.body.getAttribute('data-zona'));
  var zonaTxt = function () { return Z.get() || '[tu barrio o municipio]'; };

  /* ---------- horario */
  function abierto() {
    var d = new Date(), h = d.getHours() + d.getMinutes() / 60, w = d.getDay();
    if (w >= 1 && w <= 5) return h >= 8 && h < 20;
    if (w === 6) return h >= 9 && h < 14;
    return false;
  }
  if (!abierto()) $$('[data-chip-hora]').forEach(function (el) { el.textContent = 'Te llamamos a primera hora (L–V desde las 8)'; });

  /* ---------- barra inferior: solo cuando los CTA del hero no se ven */
  var barra = $('.barra');
  if (barra) {
    var heroCta = $('[data-hero-cta]');
    var setBarra = function (on) { barra.classList.toggle('on', on); document.body.classList.toggle('barra-on', on); };
    if (heroCta && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { setBarra(!es[0].isIntersecting && es[0].boundingClientRect.top < 0 || (!es[0].isIntersecting && window.scrollY > 300)); }, { threshold: 0.2 }).observe(heroCta);
    } else setBarra(true);
  }

  /* ---------- modal de llamada en escritorio */
  var esEscritorio = window.matchMedia('(hover:hover) and (pointer:fine)').matches && window.innerWidth >= 1024;
  var modal = $('#modal-tel');
  if (modal && esEscritorio) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="tel:"]');
      if (!a) return;
      e.preventDefault(); modal.classList.add('on'); $('.cerrar', modal).focus();
    });
    $('.cerrar', modal).addEventListener('click', function () { modal.classList.remove('on'); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('on'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') modal.classList.remove('on'); });
    var cp = $('[data-copiar]', modal);
    if (cp) cp.addEventListener('click', function () {
      if (navigator.clipboard) navigator.clipboard.writeText('641153922').then(function () { cp.textContent = 'Copiado: 641 153 922'; });
    });
  }

  /* ---------- vídeo del hero: solo 4G, en viewport, sin reduced-motion ni ahorro de datos */
  var v = $('video[data-src]');
  if (v) {
    var c = navigator.connection || {};
    var okRed = !c.saveData && (!c.effectiveType || c.effectiveType === '4g');
    if (window.innerWidth < 900 && v.getAttribute('data-src-m')) v.setAttribute('data-src', v.getAttribute('data-src-m'));
    if (okRed && !reduced && 'IntersectionObserver' in window) {
      var cargado = false;
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) {
          if (!cargado) { cargado = true; v.src = v.getAttribute('data-src'); v.load(); v.addEventListener('playing', function () { v.classList.add('on'); }, { once: true }); }
          v.play().catch(function () { });
        } else if (cargado) v.pause();
      }, { threshold: 0.1 }).observe(v);
    }
  }

  /* ---------- reveals */
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(function (el) { io.observe(el); });
  } else $$('.rv').forEach(function (el) { el.classList.add('in'); });

  /* ---------- síntomas (subpáginas) */
  $$('.sint-b').forEach(function (b) {
    b.addEventListener('click', function () {
      var p = b.nextElementSibling, on = b.getAttribute('aria-expanded') === 'true';
      $$('.sint-b', b.closest('.sint')).forEach(function (o) { o.setAttribute('aria-expanded', 'false'); o.nextElementSibling.classList.remove('on'); });
      if (!on) { b.setAttribute('aria-expanded', 'true'); p.classList.add('on'); }
    });
  });
  /* WhatsApp con zona en enlaces marcados */
  $$('a[data-wa]').forEach(function (a) {
    a.addEventListener('click', function () { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); });
    a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt()));
  });

  /* ================================================================ BUSCADOR */
  var APW = { lavasecadora: ['LAVASECADORA', 'LAVASECADORAS'], lavadora: ['LAVADORA', 'LAVADORAS'], lavavajillas: ['LAVAVAJILLAS', 'LAVAPLATOS'], congelador: ['CONGELADOR', 'CONGELADORES', 'ARCON'], frigorifico: ['FRIGORIFICO', 'FRIGO', 'NEVERA', 'COMBI', 'AMERICANO', 'FRIGORIFICOS'], secadora: ['SECADORA', 'SECADORAS'], horno: ['HORNO', 'HORNOS'], campana: ['CAMPANA', 'EXTRACTORA'], caldera: ['CALDERA', 'CONDENS', 'CALEFACCION'], calentador: ['CALENTADOR', 'TERMO', 'THERM'], 'aire-acondicionado': ['AIRE', 'ACONDICIONADO', 'SPLIT', 'CLIMA', 'CLIMATIZACION', 'CLIMATE'], placa: ['PLACA', 'INDUCCION', 'VITRO', 'VITROCERAMICA', 'ENCIMERA'] };
  function sinAcentos(s) { return s.normalize ? s.normalize('NFD').replace(/[̀-ͯ]/g, '') : s; }
  function parse(q) {
    var up = sinAcentos(q).toUpperCase(), ap = null;
    Object.keys(APW).forEach(function (k) { APW[k].forEach(function (w) { var re = new RegExp('\\b' + w + '\\b'); if (re.test(up)) { ap = ap || k; up = up.replace(re, ' '); } }); });
    var sinRelleno = up.replace(/\b(ERROR|CODIGO|CODE|DE|MI|LA|EL|MARCA|UN|UNA)\b/g, ' ');
    if (sinRelleno.trim()) up = sinRelleno; /* si la consulta es solo «dE» (código de puerta en LG), no se vacía */
    if (CONFIG.MARCA_RE) up = up.replace(CONFIG.MARCA_RE, ' ');
    var k = up.replace(/[\s\-\._:\/]/g, '');
    k = k.replace(/^O(?=\d)/, 'E').replace(/O(?=\d)/g, '0').replace(/(\d)O/g, '$10');
    if (/^\d+$/.test(k)) k = 'E' + k;
    var alt = CONFIG.F_ES_E && /^F\d/.test(k) ? k.replace(/^F/, 'E') : null;
    return { key: k, alt: alt, ap: ap, fIn: !!alt };
  }
  function buscar1(key, ap, prefijo) {
    return CODIGOS.filter(function (c) {
      if (ap && c.ap !== ap) return false;
      return c.keys.some(function (k) { return prefijo ? k.indexOf(key) === 0 : k === key; });
    });
  }
  function buscar(key, ap, prefijo, alt) {
    var r = buscar1(key, ap, prefijo);
    if (!r.length && alt) r = buscar1(alt, ap, prefijo);
    return r;
  }
  function semTxt(c) { return c.sem === 'verde' ? 'Puedes comprobarlo tú en 2 minutos' : 'Mejor llamar directamente'; }
  function textoWA(c, pasos) {
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var t = 'Hola, tengo ' + a.art + ' ' + CONFIG.MARCA + ' que marca ' + codigo + '. ';
    if (pasos && pasos.length) t += 'He probado: ' + pasos.join(', ').toLowerCase() + ' y sigue igual. ';
    return t + 'Estoy en ' + zonaTxt();
  }
  function renderFicha(c, opts) {
    opts = opts || {};
    var a = APARATOS[c.ap], codigo = c.cod.split('/')[0].trim();
    var h = '<article class="ficha' + (c.sem === 'ambar' ? ' hot' : '') + '" data-id="' + c.id + '">';
    h += '<div class="ficha-h"><span class="ficha-cod">' + esc(c.cod) + '</span><span class="ficha-ap">' + ico(a.id) + esc(a.nombre) + ' <span class="marca">' + esc(CONFIG.MARCA) + '</span></span></div>';
    h += '<p class="ficha-t">' + esc(c.titulo) + '</p><p class="ficha-s">' + esc(c.sig) + '</p>';
    h += '<span class="sem sem-' + c.sem + '">' + semTxt(c) + '</span>';
    if (c.pasos.length) {
      h += '<ul class="chk" aria-label="Autocomprobación">' + c.pasos.map(function (p, i) { return '<li><label><input type="checkbox" data-paso="' + i + '"><span>' + esc(p) + '</span></label></li>'; }).join('') + '</ul>';
      h += '<div class="sigue" role="group" aria-label="Resultado"><p>¿Sigue marcando ' + esc(codigo) + '?</p><div class="g"><button type="button" class="si">Sí, sigue igual</button><button type="button" class="no">Se ha arreglado</button></div></div>';
    }
    h += '<div class="llamar-c' + (c.pasos.length ? '' : ' on') + '"><b>Cuándo llamar</b>' + esc(c.llamar) + '</div>';
    h += '<div class="ok-c">Nos alegramos. Si vuelve a marcarlo, aquí estamos. <a class="link" href="' + REL + a.slug + '/">Cómo cuidar tu ' + esc(a.nombre.toLowerCase()) + ' →</a></div>';
    h += '<div class="ficha-cta"><a class="btn btn-wa" data-cta-wa href="' + wa(textoWA(c, [])) + '" target="_blank" rel="noopener">' + ico('wa') + 'WhatsApp con el código</a>';
    h += '<a class="btn btn-amber" data-cta-tel href="' + CONFIG.TEL_HREF + '">' + ico('tel') + 'Llamar · ' + CONFIG.TEL + '</a></div>';
    h += '<div class="ficha-links"><a class="link" href="' + REL + a.slug + '/">Ver todo sobre ' + esc(a.art) + ' ' + esc(CONFIG.MARCA) + ' →</a><button type="button" data-copy="' + c.id + '">Copiar enlace a este código</button></div>';
    h += '<p class="ficha-fin">Presupuesto por escrito en casa antes de tocar nada. Si tu aparato tiene menos de 3 años, tiene garantía legal del fabricante: ' + CONFIG.SAT_TXT + '</p>';
    return h + '</article>';
  }
  function bindFicha(el) {
    var id = el.getAttribute('data-id'), c = CODIGOS.filter(function (x) { return x.id === id; })[0];
    if (!c || el.__b) return; el.__b = true;
    var chk = $$('input[type=checkbox]', el), sigue = $('.sigue', el), llamar = $('.llamar-c', el), ok = $('.ok-c', el);
    var bWa = $('[data-cta-wa]', el), bTel = $('[data-cta-tel]', el);
    var codigo = c.cod.split('/')[0].trim();
    var pasos = function () { return chk.filter(function (i) { return i.checked; }).map(function (i) { return i.nextElementSibling.textContent; }); };
    var refresca = function () { bWa.href = wa(textoWA(c, pasos())); };
    chk.forEach(function (i) {
      i.addEventListener('change', function () {
        refresca();
        if (chk.every(function (x) { return x.checked; })) { sigue.classList.add('on'); } else { sigue.classList.remove('on'); }
      });
    });
    if (sigue) {
      $('.si', sigue).addEventListener('click', function () {
        llamar.classList.add('on'); ok.classList.remove('on'); el.classList.add('hot'); refresca();
        bTel.innerHTML = ico('tel') + 'Que me llame un técnico · 60,50 € IVA incl., se descuenta';
        bTel.setAttribute('href', '#contacto'); bTel.removeAttribute('data-cta-tel');
        bTel.addEventListener('click', function (e) { e.preventDefault(); prefill(c.ap, codigo); });
        $('.si', sigue).setAttribute('aria-pressed', 'true'); $('.no', sigue).removeAttribute('aria-pressed');
      });
      $('.no', sigue).addEventListener('click', function () {
        ok.classList.add('on'); llamar.classList.remove('on'); el.classList.remove('hot');
        $('.no', sigue).setAttribute('aria-pressed', 'true'); $('.si', sigue).removeAttribute('aria-pressed');
      });
    }
    var cp = $('[data-copy]', el);
    if (cp) cp.addEventListener('click', function () {
      var url = new URL(REL + 'codigos-error/#' + c.id, location.href).href;
      var done = function () { cp.textContent = 'Enlace copiado'; setTimeout(function () { cp.textContent = 'Copiar enlace a este código'; }, 2500); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt('Copia el enlace:', url); });
      else prompt('Copia el enlace:', url);
    });
    refresca();
  }
  $$('.ficha[data-id]').forEach(bindFicha);

  function initBus(root) {
    var input = $('input', root), sug = $('.bus-sug', root), res = $('.bus-res', root), x = $('.bus-x', root);
    var apFijo = root.getAttribute('data-ap') || null, ap = apFijo, sel = -1, items = [];
    var chips = $$('.chip-btn[data-ap]', root);
    /* atajos «más buscados»: al elegir un aparato solo se ofrecen SUS códigos (nunca los de otro aparato) */
    var top = $('.bus-top', root), topHTML = top ? top.innerHTML : '';
    function bindAtajos() {
      $$('[data-cod]', root).forEach(function (b) { if (b._ok) return; b._ok = 1; b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-cod'); })[0]; if (!c) return; if (ap && c.ap !== ap) { setAp(c.ap); } input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    function pintaAtajos(k) {
      if (!top || apFijo) return;
      /* defensa: cualquier atajo de código que haya quedado fuera de .bus-top se elimina al elegir aparato */
      $$('[data-cod]', root).forEach(function (b) { if (!b.closest('.bus-top') && !b.closest('.bus-res')) { var li = b.closest('li'); (li || b).remove(); } });
      if (!k) { top.innerHTML = topHTML; bindAtajos(); return; }
      var a = APARATOS[k], mios = CODIGOS.filter(function (c) { return c.ap === k && !c.aviso; }).slice(0, 8), av = CODIGOS.filter(function (c) { return c.ap === k && c.aviso; });
      if (!mios.length && !av.length) { top.innerHTML = '<span class="bus-top-nota">' + esc(a.nombre) + ': sin códigos verificados de ' + esc(CONFIG.MARCA) + '. Dinos el síntoma y te decimos qué puede ser.</span>'; return; }
      top.innerHTML = 'Códigos de ' + esc(a.nombre.toLowerCase()) + ': <ul class="chips">' + mios.concat(av).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-cod="' + c.id + '">' + esc(c.cod.split('/')[0]) + '</button></li>'; }).join('') + '</ul>';
      bindAtajos();
    }
    var setAp = function (k) {
      ap = k; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === k ? 'true' : 'false'); });
      pintaAtajos(k);
      if (input.value.trim()) go(input.value); else if (res) { res.innerHTML = ''; }
    };
    chips.forEach(function (b) { b.addEventListener('click', function () { setAp(ap === b.getAttribute('data-ap') ? null : b.getAttribute('data-ap')); if (b.getAttribute('data-ap') === 'placa' && placaSinCodigos()) placa(); }); });
    bindAtajos();
    function limpia() { sug.classList.remove('on'); sug.innerHTML = ''; sel = -1; items = []; input.setAttribute('aria-expanded', 'false'); }
    function muestra(c) {
      if (ap && c.ap !== ap && !apFijo) { ap = c.ap; chips.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-ap') === c.ap ? 'true' : 'false'); }); pintaAtajos(c.ap); }
      limpia(); res.innerHTML = renderFicha(c); bindFicha($('.ficha', res));
      if (!reduced && root.getAttribute('data-scroll') !== 'no') setTimeout(function () { res.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 50);
    }
    function ambiguo(list, key) {
      res.innerHTML = '<div class="bus-amb"><p>' + esc(key) + ' existe en varios aparatos. ¿En cuál?</p><div class="g">' +
        list.map(function (c) { return '<button type="button" data-id="' + c.id + '">' + ico(c.ap) + esc(APARATOS[c.ap].nombre) + '</button>'; }).join('') + '</div></div>';
      $$('button', res).forEach(function (b) { b.addEventListener('click', function () { muestra(CODIGOS.filter(function (c) { return c.id === b.getAttribute('data-id'); })[0]); }); });
    }
    function nada(raw, key, apq, pre) {
      var a = apq ? APARATOS[apq] : null, art = a ? a.art : 'mi aparato';
      var quiza = (pre && pre.length) ? '<p>¿Querías decir…?</p><ul class="chips" style="margin-bottom:14px">' + pre.slice(0, 5).map(function (c) { return '<li><button type="button" class="chip chip-btn" data-id="' + c.id + '">' + ico(c.ap) + c.cod.split('/')[0] + ' · ' + esc(APARATOS[c.ap].nombre) + '</button></li>'; }).join('') + '</ul>' : '';
      var t = 'Hola, ' + (a ? 'tengo ' + art + ' ' + CONFIG.MARCA + ' que marca ' : 'mi aparato ' + CONFIG.MARCA + ' marca ') + key + '. ¿Me decís qué puede ser? Estoy en ' + zonaTxt();
      res.innerHTML = '<div class="bus-no"><p>No tenemos <strong class="mono">' + esc(key) + '</strong>' + (a ? ' en ' + esc(a.nombre.toLowerCase()) : '') + ' verificado con documentación de <span class="marca">' + esc(CONFIG.MARCA) + '</span> y preferimos no inventarlo. Escríbenoslo igual y te decimos qué puede ser.</p>' + quiza +
        '<a class="btn btn-wa" href="' + wa(t) + '" target="_blank" rel="noopener">' + ico('wa') + 'Preguntar por WhatsApp</a>' +
        '<p class="ficha-fin">Manda también una foto de la etiqueta ' + esc(CONFIG.ETIQUETA) + ' (en la puerta o el marco del aparato): así te contestamos con el modelo exacto. <a class="link" href="' + REL + 'codigos-error/#enr">Dónde está el ' + esc(CONFIG.ETIQUETA) + ' →</a></p></div>';
      $$('button[data-id]', res).forEach(function (b) { b.addEventListener('click', function () { var c = CODIGOS.filter(function (y) { return y.id === b.getAttribute('data-id'); })[0]; input.value = c.cod.split('/')[0]; muestra(c); }); });
    }
    /* la placa solo va «por síntomas» si la marca no publica códigos verificados para ella (Siemens sí los tiene) */
    function placaSinCodigos() { return !!APARATOS.placa && !CODIGOS.some(function (c) { return c.ap === 'placa'; }); }
    function placa() {
      limpia();
      var ss = ['no detecta la olla', 'parpadea', 'se apaga por temperatura'];
      res.innerHTML = '<div class="bus-no"><p>Las placas <span class="marca">' + esc(CONFIG.MARCA) + '</span> avisan por símbolos y parpadeos, no por códigos verificables: dinos el síntoma.</p><ul class="chips">' +
        ss.map(function (s) { return '<li><a class="chip chip-btn" target="_blank" rel="noopener" href="' + wa('Hola, tengo una placa ' + CONFIG.MARCA + ' que ' + s + '. Estoy en ' + zonaTxt()) + '">' + ico('wa') + esc(s) + '</a></li>'; }).join('') +
        '</ul><p class="ficha-fin mt16"><a class="link" href="' + REL + 'placa/">Placa de inducción: por síntomas, no por códigos →</a></p></div>';
    }
    function go(raw) {
      var p = parse(raw), apq = ap || p.ap;
      if (apq === 'placa' && placaSinCodigos()) { placa(); return; }
      if (!p.key && apq) { var av = CODIGOS.filter(function (c) { return c.ap === apq && c.aviso; }); if (av.length === 1) return muestra(av[0]); }
      if (!p.key) { res.innerHTML = ''; limpia(); return; }
      var ex = buscar(p.key, apq, false, p.alt);
      if (ex.length === 1) return muestra(ex[0]);
      if (ex.length > 1) { limpia(); return ambiguo(ex, p.key); }
      var pre = buscar(p.key, apq, true, p.alt);
      if (pre.length === 1 && p.key.length < 3) return muestra(pre[0]);
      limpia(); nada(raw, p.key, apq, pre);
    }
    function sugiere() {
      var raw = input.value, p = parse(raw), apq = ap || p.ap;
      x.classList.toggle('on', !!raw);
      if (!p.key || p.key.length < 2 || (apq === 'placa' && placaSinCodigos())) { limpia(); return; }
      var seen = {}, list = buscar(p.key, apq, true, p.alt).filter(function (c) { return !seen[c.id] && (seen[c.id] = 1); }).slice(0, 5);
      var ex = buscar(p.key, apq, false, p.alt); if (ex.length) list = ex.concat(list.filter(function (c) { return ex.indexOf(c) < 0; })).slice(0, 5);
      if (!list.length) { limpia(); return; }
      items = list; sel = -1;
      sug.innerHTML = list.map(function (c, i) {
        var k = c.keys.filter(function (y) { return y.indexOf(p.key) === 0 || (p.alt && y.indexOf(p.alt) === 0); })[0] || c.cod;
        var disp = c.cod; if (c.cod.indexOf(k) < 0 && c.cod.indexOf(k.replace(/^E/, 'F')) < 0) disp = k + ' (' + c.cod + ')';
        var m = disp.indexOf(p.key) >= 0 ? disp.replace(p.key, '<mark>' + p.key + '</mark>') : (p.alt ? disp.replace(p.alt, '<mark>' + p.alt + '</mark>') : disp);
        return '<li role="option" id="' + root.id + '-o' + i + '" data-id="' + c.id + '"><span class="mono">' + m + '</span><span class="ap">' + esc(APARATOS[c.ap].nombre) + '</span><span>' + esc(c.titulo) + '</span></li>';
      }).join('');
      if (p.fIn && !buscar1(p.key, apq, true).length) sug.innerHTML += '<li style="cursor:default;color:#55636F;font-size:12px">En ' + esc(CONFIG.MARCA) + ', F y E son el mismo código (F18 = E18)</li>';
      sug.classList.add('on'); input.setAttribute('aria-expanded', 'true');
      $$('li[data-id]', sug).forEach(function (li) { li.addEventListener('mousedown', function (e) { e.preventDefault(); input.value = li.querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === li.getAttribute('data-id'); })[0]); }); });
    }
    input.addEventListener('input', sugiere);
    input.addEventListener('keydown', function (e) {
      var lis = $$('li[data-id]', sug);
      if (e.key === 'ArrowDown' && lis.length) { e.preventDefault(); sel = (sel + 1) % lis.length; }
      else if (e.key === 'ArrowUp' && lis.length) { e.preventDefault(); sel = (sel - 1 + lis.length) % lis.length; }
      else if (e.key === 'Enter') { e.preventDefault(); if (sel >= 0 && lis[sel]) { input.value = lis[sel].querySelector('.mono').textContent.split(' ')[0]; muestra(CODIGOS.filter(function (c) { return c.id === lis[sel].getAttribute('data-id'); })[0]); } else go(input.value); return; }
      else if (e.key === 'Escape') { limpia(); return; }
      else return;
      lis.forEach(function (li, i) { li.setAttribute('aria-selected', i === sel ? 'true' : 'false'); });
      input.setAttribute('aria-activedescendant', sel >= 0 ? lis[sel].id : '');
    });
    input.addEventListener('blur', function () { setTimeout(limpia, 150); });
    x.addEventListener('click', function () { input.value = ''; res.innerHTML = ''; limpia(); x.classList.remove('on'); input.focus(); });
    var f = $('form', root); if (f) f.addEventListener('submit', function (e) { e.preventDefault(); go(input.value); });
    root.__go = function (q) { input.value = q; go(q); };
  }
  $$('.bus').forEach(initBus);

  /* ---------- hub: abrir ancla y hacer scroll */
  function abreAncla() {
    var h = location.hash.replace('#', ''); if (!h) return;
    var d = document.getElementById(h);
    if (d && d.tagName === 'DETAILS') { d.open = true; setTimeout(function () { d.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }); }, 60); }
  }
  abreAncla(); window.addEventListener('hashchange', abreAncla);

  /* ================================================================ FORMULARIO */
  var form = $('#form-llamada');
  function prefill(apId, codigo) {
    if (!form) return;
    if (apId) $$('[name=aparato]', form).forEach(function (r) { r.checked = r.value === APARATOS[apId].nombre; });
    if (codigo) { $('[name=codigo]', form).value = codigo; var s = $$('[name=sintoma]', form).filter(function (r) { return r.value === 'Error en pantalla'; })[0]; if (s) s.checked = true; }
    form.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    setTimeout(function () { $('[name=telefono]', form).focus({ preventScroll: true }); }, 500);
  }
  window.RBV = { prefill: prefill, zona: Z };
  function abreWA(t) { var w = window.open(wa(t), '_blank'); if (w) w.opener = null; else location.href = wa(t); }
  if (form) {
    var zsel = $('[name=zona]', form);
    if (zsel) { if (Z.get()) zsel.value = Z.get(); zsel.addEventListener('change', function () { Z.set(zsel.value); $$('a[data-wa]').forEach(function (a) { a.href = wa(a.getAttribute('data-wa').replace('[zona]', zonaTxt())); }); }); }
    var dl = $('#lista-codigos'); if (dl) { var ks = {}; CODIGOS.forEach(function (c) { c.keys.forEach(function (k) { if (k.length > 2) ks[k] = APARATOS[c.ap].nombre; }); }); dl.innerHTML = Object.keys(ks).sort().map(function (k) { return '<option value="' + k + '">' + ks[k] + '</option>'; }).join(''); }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('[name=web]', form).value) return; /* honeypot */
      var tel = $('[name=telefono]', form), g = tel.closest('.f-g'), num = tel.value.replace(/[\s\-\.]/g, '');
      var okTel = /^(\+34|0034)?[6789]\d{8}$/.test(num); g.classList.toggle('bad', !okTel);
      var rg = $('[name=rgpd]', form), gr = rg.closest('.f-g'); gr.classList.toggle('bad', !rg.checked);
      if (!okTel) { tel.focus(); return; } if (!rg.checked) { rg.focus(); return; }
      var ap = ($$('[name=aparato]:checked', form)[0] || {}).value || '', si = ($$('[name=sintoma]:checked', form)[0] || {}).value || '';
      var cod = $('[name=codigo]', form).value.trim().toUpperCase(), zona = zsel ? zsel.value : '';
      var t = 'Hola, quiero que me llaméis.';
      if (ap) t += ' Aparato: ' + ap + ' ' + CONFIG.MARCA + '.'; if (si) t += ' Le pasa: ' + si.toLowerCase() + '.'; if (cod) t += ' Código: ' + cod + '.';
      if (zona) t += ' Zona: ' + zona + '.'; t += ' Teléfono: ' + tel.value.trim() + '.';
      var fin = function () { form.hidden = true; var ok = $('.f-ok', form.parentNode); ok.classList.add('on'); ok.setAttribute('tabindex', '-1'); ok.focus(); };
      if (CONFIG.FORM_ENDPOINT) {
        fetch(CONFIG.FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ aparato: ap, sintoma: si, codigo: cod, telefono: tel.value, zona: zona, mensaje: t }) })
          .then(function (r) { if (!r.ok) throw 0; fin(); }).catch(function () { abreWA(t); fin(); });
      } else { abreWA(t); fin(); }
    });
  }

  /* ---------- mini formulario del hero (landings de aparato) */
  function validaTel(tel) { var g = tel.closest('.f-g'), num = tel.value.replace(/[\s\-\.]/g, ''); var ok = /^(\+34|0034)?[6789]\d{8}$/.test(num); g.classList.toggle('bad', !ok); return ok; }
  $$('.form-mini').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if ($('[name=web]', f).value) return;
      var tel = $('[name=telefono]', f), rg = $('[name=rgpd]', f), gr = rg.closest('.f-g');
      var okTel = validaTel(tel); gr.classList.toggle('bad', !rg.checked);
      if (!okTel) { tel.focus(); return; } if (!rg.checked) { rg.focus(); return; }
      var ap = $('[name=aparato]', f).value, si = $('[name=sintoma]', f).value;
      var t = 'Hola, quiero que me llaméis. Aparato: ' + ap + ' ' + CONFIG.MARCA + '.' + (si ? ' Le pasa: ' + si.toLowerCase() + '.' : '') + (Z.get() ? ' Zona: ' + Z.get() + '.' : '') + ' Teléfono: ' + tel.value.trim() + '.';
      abreWA(t); f.hidden = true; var ok = $('.f-ok', f.parentNode); ok.classList.add('on'); ok.setAttribute('tabindex', '-1'); ok.focus();
    });
  });
  var hfb = $('.hero-form-b');
  if (hfb) hfb.addEventListener('click', function () { var on = hfb.getAttribute('aria-expanded') === 'true'; hfb.setAttribute('aria-expanded', on ? 'false' : 'true'); hfb.parentNode.classList.toggle('on', !on); if (!on) setTimeout(function () { $('.form-mini [name=telefono]').focus({ preventScroll: false }); }, 50); });
  /* ---------- desplegable de aparatos (cabecera) */
  var dd = $('.dd');
  if (dd) {
    var ddb = $('.dd-b', dd);
    ddb.addEventListener('click', function () { var on = dd.classList.toggle('on'); ddb.setAttribute('aria-expanded', on ? 'true' : 'false'); });
    document.addEventListener('click', function (e) { if (!dd.contains(e.target)) { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { dd.classList.remove('on'); ddb.setAttribute('aria-expanded', 'false'); } });
  }

  /* ================================================================ MAPA de zonas */
  var mapa = $('.mapa');
  if (mapa) {
    var info = $('.mapa-info', mapa), zs = $$('.z', mapa);
    var pinta = function (z) {
      zs.forEach(function (o) { o.classList.toggle('on', o === z); });
      var n = z.getAttribute('data-nombre'), href = z.getAttribute('data-href'); Z.set(n);
      info.innerHTML = '<p class="kicker">Cubrimos ' + esc(n) + '</p><h3>Llama al <a class="link" href="' + CONFIG.TEL_HREF + '">' + CONFIG.TEL + '</a></h3><p>' + esc(z.getAttribute('data-txt') || '') + '</p>' +
        '<div class="grid grid-2"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa('Hola, tengo un ' + CONFIG.MARCA + ' que… Estoy en ' + n) + '">' + ico('wa') + 'WhatsApp desde ' + esc(n) + '</a>' +
        (href ? '<a class="btn btn-ghost btn-sm" href="' + href + '">Ver ' + esc(n) + ' →</a>' : '<a class="btn btn-ghost btn-sm" href="#contacto">Te llamamos en &lt; 1 h</a>') + '</div>';
      if (zsel) zsel.value = n;
    };
    zs.forEach(function (z) { z.addEventListener('click', function () { pinta(z); }); z.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pinta(z); } }); });
  }
})();
