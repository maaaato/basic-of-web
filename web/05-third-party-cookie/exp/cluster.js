const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
    console.log(`master ${process.pid} is running`);

    // clusterをforkしてCPUコアの数だけworkerを生成する
    for (let i = 0; i < numCPUs; i++){
        cluster.fork();
    }

    console.log("aaaa");
    // workerの終了の受信（検知）する
    cluster.on("exit", (worker, code, signal) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`worker ${worker.process.pid} died`);
            cluster.fork();
        }
    });
    console.log("bbbb");

}else{
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(8000);


    console.log(`worker ${process.pid} started`);
}