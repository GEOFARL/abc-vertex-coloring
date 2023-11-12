export default class Logger {
  public static log(message: string) {
    console.log(message);
  }

  public static logMatrix<T>(matrix: T[][]) {
    Logger.log('\n------ LOGGING MATRIX ------');
    matrix.forEach((row) => {
      let rowString = '';
      row.forEach((cell, i) => {
        if (i !== row.length - 1) {
          rowString += cell + ', ';
        } else {
          rowString += cell;
        }
      });

      Logger.log(rowString);
    });
    Logger.log('');
  }

  public static logArray<T>(array: T[]) {
    let string = '';
    array.forEach((el, i) => {
      if (i === array.length - 1) {
        string += el;
      } else {
        string += el + ', ';
      }
    });
    string += '\n';
    Logger.log(string);
  }
}
