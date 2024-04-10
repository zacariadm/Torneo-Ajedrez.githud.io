// Datos de ejemplo para los jugadores
const jugadores = ['Tomás', 'Cotu', 'Mario Herrero', 'Mario García', 'Jonh Law', 'Samuel'];

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
    const fechas = ['9 de abril', '11 de abril', '10 de abril', '23 de abril', '22 de abril', '15 de abril', '16 de abril', '17 de abril', '18 de abril', '19 de abril', ' 24 de abril'];
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
    jugadoresInfo['Cotu'].partidasGanadas = 1;
    jugadoresInfo['Mario Herrero'].partidasGanadas = 0;
    jugadoresInfo['Mario García'].partidasGanadas = 2;
    jugadoresInfo['Jonh Law'].partidasGanadas = 0;
    jugadoresInfo['Samuel'].partidasGanadas = 1;

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
    let maxPartidasGanadas = -1; // Inicializar el máximo de partidas ganadas
    let jugadorMaxPartidas = ''; // Inicializar el jugador con más partidas ganadas

    // Calcular el máximo de partidas ganadas
    for (const jugador in jugadoresInfo) {
        if (jugadoresInfo[jugador].partidasGanadas > maxPartidasGanadas) {
            maxPartidasGanadas = jugadoresInfo[jugador].partidasGanadas;
            jugadorMaxPartidas = jugador;
        }
    }

    // Mostrar los puntos en la tabla
    for (const jugador in jugadoresInfo) {
        const tr = document.createElement('tr');
        if (maxPartidasGanadas > 0 && jugadoresInfo[jugador].partidasGanadas === maxPartidasGanadas) {
            // Resaltar el nombre del jugador con más partidas ganadas en color oro
            tr.innerHTML = `<td style="color: gold">${jugador}</td>
                            <td>${jugadoresInfo[jugador].puntos}</td>
                            <td>${jugadoresInfo[jugador].partidasGanadas}</td>`;
        } else {
            // Mostrar el nombre del jugador en color normal
            tr.innerHTML = `<td>${jugador}</td>
                            <td>${jugadoresInfo[jugador].puntos}</td>
                            <td>${jugadoresInfo[jugador].partidasGanadas}</td>`;
        }
        tbody.appendChild(tr);
    }
}
// Función para mostrar los resultados de las partidas en la tabla de resultados
function agregarResultado(dia, enfrentamiento, ganador) {
    const tbody = document.querySelector('#resultados tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${dia}</td>
                    <td>${enfrentamiento}</td>
                    <td>${ganador}</td>`;
    tbody.appendChild(tr);
}  
// Resultados 

agregarResultado('9 de abril', 'Tomás vs Cotu', 'Cotu');
agregarResultado('9 de abril', 'Mario Herrero vs Samuel', 'Samuel');
agregarResultado('16 de abril', 'Cotu vs Mario García', 'Mario García');
agregarResultado('19 de abril', 'Mario García vs Mario Herrero', 'Mario García');
agregarResultado('23 de abril', 'Samuel vs Jonh Law', 'Jonh Law');




// Llamar a la función para generar las partidas al cargar la página
window.onload = function() {
    generarPartidas(); // Generar las partidas
    asignarDias(); // Asignar días a las partidas
    mostrarPartidas(); // Mostrar las partidas
    actualizarPuntos(); // Actualizar puntos al cargar la página
};
