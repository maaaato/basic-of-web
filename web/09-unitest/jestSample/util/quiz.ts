// Quiz用に追加
import fs from "fs";

const filename:string = "website_result_hash.txt";
export class FileManager{
    // ファイルの保存
    static async saveInLocal(hashData:string){
        await fs.writeFile(filename, hashData, (err)=>{
            if (err) throw err;
        });
    }
}

const jsyaml = require('js-yaml');
export class Config {
  Cluster!: string;
  Service!: string;
  TaskCount!: number;

  load(path: string): void {
    try {
      const yml = jsyaml.load(fs.readFileSync(path));
      this.Cluster = yml["Cluster"];
      this.Service = yml["Service"];
      this.TaskCount = yml["TaskCount"];
    }catch (error){
      throw error
    }
  }
}