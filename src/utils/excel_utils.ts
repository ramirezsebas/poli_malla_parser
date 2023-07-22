import * as xlsx from "xlsx";

export function extraerMallaGeneral(workbook: xlsx.WorkBook) {
  const mallaGeneral: any = [];

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    let data = xlsx.utils.sheet_to_json(sheet);

    const arregloSemestres: any = [];

    let semestre: any = [];

    let semestreActual = 0;

    data.forEach((row: any, index: number) => {
      //Cada fileMateria contiene:
      //Nombre de la materia
      //Ejemplo: "Algoritmos y Estructuras de Datos 2"
      //Lista de materias que son prerequisitos entre coma
      //Ejemplo: "Algoritmos y Estructuras de Datos 1,Matemática Discreta"
      let nombreMateria = row["Semestre 1"];
      let materiasPrerequisitos = row["__EMPTY"];

      //En caso que la fila no tenga el string Semestre
      //Indica que tiene una materia
      let materia: any = {};
      if (!nombreMateria.includes("Semestre")) {
        materia["nombre"] = nombreMateria;
        let preRequisitos = getPreRequisitos(materiasPrerequisitos);
        materia["prerequisitos"] = preRequisitos;
        semestre.push(materia);
      } else {
        semestreActual++;
        arregloSemestres.push({
          semestre: semestreActual,
          materias: semestre,
        });
        semestre = [];
      }

      if (index === data.length - 1) {
        semestreActual++;
        arregloSemestres.push({
          semestre: semestreActual,
          materias: semestre,
        });
      }
    });
    mallaGeneral.push({
      carrera: sheetName,
      malla: arregloSemestres,
    });
  }
  return mallaGeneral;
}

/**
 *
 * @param {string || null} filaPrerequisito Informacion de los prerequisitos de la materia obtenido del excel.
 * @returns null en caso que no tengo prerequisitos osino un arreglo con los prerequisitos.
 */
function getPreRequisitos(filaPrerequisito: any) {
  let preRequisitos;
  if (filaPrerequisito === "null" || !filaPrerequisito) {
    preRequisitos = [];
  } else {
    preRequisitos = filaPrerequisito.split(",");
  }
  return preRequisitos;
}

export const isFileExcel = (file: File) => {
  return (
    file.type ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
};