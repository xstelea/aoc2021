import fs from 'fs';
import path from 'path';

const data = fs.readFileSync(path.join(__dirname, 'data'), 'utf-8').split('\n');

class BingoCard {
  private rows: number[][] = [];
  constructor(public card: number[][]) {
    this.rows = this.createRows(card);
  }

  private createRows(card: number[][]) {
    const rows: number[][] = [];
    card.forEach((row, index, array) => {
      rows.push(row);
      const numOfRows = array.length;
      const column: number[] = [];

      for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
        const item = array[rowIndex][index];
        column.push(item);
      }
      rows.push(column);
    });
    return rows;
  }

  play(nextNumber: number) {
    const updatedRows = this.rows.map((row) =>
      row.filter((item) => item !== nextNumber)
    );
    this.rows = updatedRows;
    return this;
  }

  hasWon() {
    return this.rows.some((row) => row.length === 0);
  }
}

const parseRow = (row: string, deliminator: string) =>
  row
    .split(deliminator)
    .filter((item) => item !== '')
    .map((item) => parseInt(item, 10));

const sequence = parseRow(data[0], ',');
const bingoCards = data
  .slice(2)
  .filter((row) => row !== '')
  .reduce<number[][][]>((acc, row, index) => {
    const parsedRow = parseRow(row, ' ');
    if (index % 5 === 0) {
      return [...acc, [parsedRow]];
    } else {
      acc[acc.length - 1].push(parsedRow);
      return acc;
    }
  }, [])
  .map((card) => new BingoCard(card));

const getResult = ({ card }: BingoCard, sequence: Set<number>) => {
  const sum = card
    .map((row) => row.flatMap((item) => item))
    .flatMap((item) => item)
    .filter((item) => !sequence.has(item))
    .reduce((acc, curr) => acc + curr, 0);
  const lastNumber = [...sequence].slice(-1)[0];
  return sum * lastNumber;
};

const result1 = () => {
  while (true) {
    for (const [index, nextNumber] of sequence.entries()) {
      const [winningCard] = bingoCards.filter((card) =>
        card.play(nextNumber).hasWon()
      );

      if (winningCard) {
        return getResult(
          winningCard,
          new Set<number>(sequence.slice(0, index + 1))
        );
      }
    }
  }
};

const result2 = () => {
  let loosingBingoCards = bingoCards;

  while (true) {
    for (const [index, nextNumber] of sequence.entries()) {
      loosingBingoCards = loosingBingoCards
        .map((card) => card.play(nextNumber))
        .filter((card, _, array) => (array.length > 1 ? !card.hasWon() : true));

      if (loosingBingoCards.length === 1 && loosingBingoCards[0].hasWon()) {
        return getResult(
          loosingBingoCards[0],
          new Set<number>(sequence.slice(0, index + 1))
        );
      }
    }
  }
};

console.log(result1());
console.log(result2());
