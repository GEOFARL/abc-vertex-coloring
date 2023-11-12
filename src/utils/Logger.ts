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
    console.log('');
  }
}
