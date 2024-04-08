// Datos de ejemplo para los jugadores
const jugadores = ['Tomás', 'Cotu', 'Mario Herrera', 'Mario García', 'Jonh Law', 'Samuel'];

// Array para almacenar las partidas
const partidas = [];

// Función para generar las partidas
function generarPartidas() {
    // Reiniciar el array de partidas
    partidas.length = 0;

    // Número máximo de partidas por día
    const maxPartidasPorDia = 2;
    let partidasEnDia = 0;

    // Iterar sobre los jugadores
    for (let i = 0; i < jugadores.length; i++) {
        for (let j = i + 1; j < jugadores.length; j++) {
            // Verificar si ya se enfrentaron
            const yaSeEnfrentaron = partidas.some(partida => {
                return (partida.jugadores.includes(jugadores[i]) && partida.jugadores.includes(jugadores[j]));
            });

            if (!yaSeEnfrentaron && partidasEnDia < maxPartidasPorDia) {
                partidas.push({ dia: '', jugadores: [jugadores[i], jugadores[j]] });
                partidasEnDia++;

                if (partidasEnDia >= maxPartidasPorDia) {
                    partidasEnDia = 0; // Reiniciar el contador de partidas para el próximo día
                }
            }
        }
    }
}

// Función para asignar días a las partidas
function asignarDias() {
    const fechas = ['9 de abril', '11 de abril', '12 de abril', '23 de abril', '22 de abril', '15 de abril', '16 de abril', '17 de abril', '18 de abril', '19 de abril', ' 24 de abril'];
    let indexFecha = 0;
    partidas.forEach((partida, index) => {
        partida.dia = fechas[indexFecha];
        indexFecha = (indexFecha + 1) % fechas.length;
    });
}

// Función para mostrar las partidas en la tabla ordenadas por fecha
function mostrarPartidas() {
    const tbody = document.querySelector('#partidas tbody');
    tbody.innerHTML = '';

    // Ordenar las partidas por fecha de manera ascendente
    const partidasOrdenadas = partidas.sort((a, b) => {
        const dateA = new Date(a.dia);
        const dateB = new Date(b.dia);
        return dateA - dateB;
    });

    partidasOrdenadas.forEach(partida => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${partida.dia}</td>
                        <td>${partida.jugadores.join(' vs ')}</td>`;
        tbody.appendChild(tr);
    });
}

// Objeto para almacenar partidas ganadas y puntos por cada jugador
let jugadoresInfo = {};

// Función para inicializar la información de los jugadores
function inicializarJugadoresInfo() {
    jugadores.forEach(jugador => {
        jugadoresInfo[jugador] = {
            partidasGanadas: 0,
            puntos: 0
        };
    });
}

// Función para actualizar los puntos y las partidas ganadas de los jugadores
function actualizarPuntos() {
    inicializarJugadoresInfo();
    // Añade aquí tus valores manualmente
    jugadoresInfo['Tomás'].partidasGanadas = 0;
    jugadoresInfo['Cotu'].partidasGanadas = 0;
    jugadoresInfo['Mario Herrera'].partidasGanadas = 0;
    jugadoresInfo['Mario García'].partidasGanadas = 0;
    jugadoresInfo['Jonh Law'].partidasGanadas = 0;
    jugadoresInfo['Samuel'].partidasGanadas = 0;

    // Calcula los puntos
    for (const jugador in jugadoresInfo) {
        jugadoresInfo[jugador].puntos = jugadoresInfo[jugador].partidasGanadas * 3; // Cada partida ganada suma 3 puntos
    }
    mostrarPuntos();
}

// Función para mostrar los puntos en la tabla
function mostrarPuntos() {
    const tbody = document.querySelector('#puntos tbody');
    tbody.innerHTML = '';
    for (const jugador in jugadoresInfo) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${jugador}</td>
                        <td>${jugadoresInfo[jugador].puntos}</td>
                        <td>${jugadoresInfo[jugador].partidasGanadas}</td>`;
        tbody.appendChild(tr);
    }
}

// Llamar a la función para generar las partidas al cargar la página
window.onload = function() {
    generarPartidas(); // Generar las partidas
    asignarDias(); // Asignar días a las partidas
    mostrarPartidas(); // Mostrar las partidas
    actualizarPuntos(); // Actualizar puntos al cargar la página
};
