module.exports = (client) => {
    client.on("error", (err) => {
        console.log(`[ANTICRASH] ERROR:`)
        console.log(err)
    })
    process.on("unhandledRejection", (reason, promise) => {
        console.log(`[ANTICRASH] ERROR:`)
        console.log(reason, promise)
    })
    process.on("uncaughtException", (err, origin) => {
        console.log(`[ANTICRASH] ERROR:`)
        console.log(err, origin)
    })
    process.on("uncaughtExceptionMonitor", (err, origin) => {
        console.log(`[ANTICRASH] ERROR:`)
        console.log(err, origin)
    })
    process.on("warning", (warn) => {
        console.log(`[ANTICRASH] ERROR:`)
        console.log(warn)
    })
}