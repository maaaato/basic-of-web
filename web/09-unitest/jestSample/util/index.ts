const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

export interface IDatabase {
  save(_:number[]):void
}

export class Database implements IDatabase {
  public save(_: number[]): void{
    console.log("hoge");
  }
}
export class DatabaseMock extends Database{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public save(_: number[]): void {
    // memo: 課題のために、あえて時々saveが失敗するようにしている
    if (getRandomInt(10) < 2) {
      throw new Error("fail!");
    }
  }
}

export class DammyDatabase extends Database{
  public save(_:number[]): void {
    console.log("save");
  }
}