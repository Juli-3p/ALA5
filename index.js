const { and, eq, lvar, or, run } = require('logicjs');

// las variables lógicas representan valores que se completan al hacer consultas
const heroe = lvar('heroe');
const aliado = lvar('aliado');
const enemigo = lvar('enemigo');

// cada opción une con and las dos partes de una relación
// or permite definir varias relaciones posibles
function esAliado(x, y) {
  return or(
    and(eq(x, 'Batman'), eq(y, 'Robin')),
    and(eq(x, 'Iron Man'), eq(y, 'Spider-Man')),
    and(eq(x, 'Wonder Woman'), eq(y, 'Superman'))
  );
}

// define las relaciones entre cada héroe y su enemigo
function esEnemigo(x, y) {
  return or(
    and(eq(x, 'Batman'), eq(y, 'Joker')),
    and(eq(x, 'Spider-Man'), eq(y, 'Green Goblin')),
    and(eq(x, 'Superman'), eq(y, 'Lex Luthor'))
  );
}

// el primer argumento es el mentor y el segundo es su aprendiz
function esMentor(x, y) {
  return or(
    and(eq(x, 'Batman'), eq(y, 'Robin')),
    and(eq(x, 'Iron Man'), eq(y, 'Spider-Man'))
  );
}

// run ejecuta cada relación y devuelve los valores que coinciden
function consultar() {
  return {
    aliadosDeBatman: run(esAliado('Batman', aliado), aliado),
    enemigosDeSuperman: run(esEnemigo('Superman', enemigo), enemigo),
    mentorDeSpiderMan: run(esMentor(heroe, 'Spider-Man'), heroe),
    paresHeroeAliado: run(esAliado(heroe, aliado), [heroe, aliado])
  };
}

// muestra los resultados cuando este archivo se ejecuta directamente
if (require.main === module) {
  const resultados = consultar();

  console.log('Aliados de Batman:', resultados.aliadosDeBatman);
  console.log('Enemigos de Superman:', resultados.enemigosDeSuperman);
  console.log('Mentor de Spider-Man:', resultados.mentorDeSpiderMan);
  console.log('Pares héroe-aliado:', resultados.paresHeroeAliado);
}

module.exports = { esAliado, esEnemigo, esMentor, consultar };
