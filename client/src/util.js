import { HelloRequest } from "./greet_pb";

//פונקציות מהלקוח ששולחת בקשה לשרת ומחזירות את התשובה

const unary = async (client) => {
    return await new Promise((resolve, reject) => {
        let hello = new HelloRequest();
        hello.setName("User");
        hello.setGreeting("Hello");
        client.unary(hello, {}, (err, res) => {
          if (res == null) {
            reject(err.message)
          } else {
            resolve(res.array[0])
          }
        });
    })   
}

const serverStreaming = async(client) => {
    return await new Promise((resolve, reject) => {
        let hello = new HelloRequest();
        hello.setName("User");
        hello.setGreeting("Hello");
        let stream = client.serverStreaming(hello, {});
        stream.on("data", (res, err) => {
            if (res == null) {
                reject(err.message)
              } else {
                console.log(res.array[0]);
                resolve('nice one')
              }
        })
    })
}

export{
    unary,
    serverStreaming
}