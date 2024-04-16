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
    const fechas = ['09 de abril', '16 de abril', '15 de abril', '23 de abril', '22 de abril', '15 de abril', '16 de abril', '17 de abril', '18 de abril', '19 de abril', '24 de abril'];
    let indexFecha = 0;
    let indexAuxiliar = 1; // Variable auxiliar para mantener el orden de las fechas
    partidas.forEach((partida, index) => {
        partida.fecha = fechas[indexFecha]; // Cambiar el nombre de la propiedad a "fecha"
        partida.auxiliar = indexAuxiliar; // Agregar la variable auxiliar
        indexFecha = (indexFecha + 1) % fechas.length;
        if (indexFecha === 0) {
            indexAuxiliar++; // Incrementar la variable auxiliar cuando cambia la fecha
        }
    });
}

// Función para mostrar las partidas en la tabla ordenadas por fecha y variable auxiliar
function mostrarPartidas() {
    const tbody = document.querySelector('#partidas tbody');
    tbody.innerHTML = '';

    // Ordenar las partidas por fecha y variable auxiliar
    const partidasOrdenadas = partidas.sort((a, b) => {
        if (a.fecha === b.fecha) {
            return a.auxiliar - b.auxiliar; // Ordenar por la variable auxiliar si las fechas son iguales
        } else {
            return a.fecha.localeCompare(b.fecha); // Ordenar por fecha si son diferentes
        }
    });

    partidasOrdenadas.forEach(partida => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${partida.fecha}</td> <!-- Cambiar "dia" a "fecha" -->
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
    
    // Define el número de partidas jugadas manualmente para cada jugador
    jugadoresInfo['Tomás'].partidasGanadas = 1;
    jugadoresInfo['Tomás'].partidasJugadas = 3; // Añade el número de partidas jugadas manualmente

    jugadoresInfo['Cotu'].partidasGanadas = 1;
    jugadoresInfo['Cotu'].partidasJugadas = 5; // Añade el número de partidas jugadas manualmente

    jugadoresInfo['Mario Herrero'].partidasGanadas = 0;
    jugadoresInfo['Mario Herrero'].partidasJugadas = 5; // Añade el número de partidas jugadas manualmente

    jugadoresInfo['Mario García'].partidasGanadas = 2;
    jugadoresInfo['Mario García'].partidasJugadas = 4; // Añade el número de partidas jugadas manualmente

    jugadoresInfo['Jonh Law'].partidasGanadas = 4;
    jugadoresInfo['Jonh Law'].partidasJugadas = 4; // Añade el número de partidas jugadas manualmente

    jugadoresInfo['Samuel'].partidasGanadas = 4;
    jugadoresInfo['Samuel'].partidasJugadas = 5; // Añade el número de partidas jugadas manualmente

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

    // Ordenar los jugadores por puntos de mayor a menor
    const jugadoresOrdenados = Object.keys(jugadoresInfo).sort((a, b) => {
        return jugadoresInfo[b].puntos - jugadoresInfo[a].puntos; // Cambio en la dirección de ordenamiento
    });

    // Mostrar los puntos y las partidas jugadas en la tabla
    jugadoresOrdenados.forEach((jugador, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${jugador}</td>
                        <td>${jugadoresInfo[jugador].puntos}</td>
                        <td>${jugadoresInfo[jugador].partidasGanadas}</td>
                        <td>${jugadoresInfo[jugador].partidasJugadas}</td>`;
        tbody.appendChild(tr);
        
        // Asignar la posición al jugador (index + 1 para que comience en 1 en lugar de 0)
        const posicion = index + 1;
        tr.dataset.posicion = posicion;

        // Aplicar color especial a los tres primeros jugadores
        if (posicion === 1) {
            tr.style.color = 'gold'; // Oro para el primero
        } else if (posicion === 2) {
            tr.style.color = 'silver'; // Plata para el segundo
        } else if (posicion === 3) {
            tr.style.color = '#cd7f32'; // Bronce para el tercero
        }
    });
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

agregarResultado('09 de abril', 'Tomás vs Cotu', 'Cotu');
agregarResultado('09 de abril', 'Mario Herrero vs Samuel', 'Samuel');

agregarResultado('15 de abril', 'Tomás vs Mario García', '');
agregarResultado('15 de abril', 'Mario García vs Samuel', 'Samuel');
agregarResultado('15 de abril', 'Cotu vs Mario Herrero', 'Mario Herrero');

agregarResultado('16 de abril', 'Cotu vs Mario García', 'Mario García');
agregarResultado('16 de abril', 'John Law vs Mario García', 'John Law');
agregarResultado('16 de abril', 'Tomás vs Mario Herrero', 'Tomás');

agregarResultado('17 de abril', 'Cotu vs John Law', 'John Law');

agregarResultado('18 de abril', 'Cotu vs Samuel', 'Samuel');

agregarResultado('19 de abril', 'Mario García vs Mario Herrero', 'Mario García');

agregarResultado('22 de abril', 'Tomás vs Samuel', 'Samuel');

agregarResultado('23 de abril', 'Samuel vs John', 'John');
agregarResultado('23 de abril', 'Tomás vs John Law', '');

agregarResultado('24 de abril', 'Mario Herrero vs John Law', 'John Law');






// Llamar a la función para generar las partidas al cargar la página
window.onload = function() {
    generarPartidas(); // Generar las partidas
    asignarDias(); // Asignar días a las partidas
    mostrarPartidas(); // Mostrar las partidas
    actualizarPuntos(); // Actualizar puntos al cargar la página
};
