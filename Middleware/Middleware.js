
export const getlog = function (req, res, next) {
    console.log('timestamp :', new Date().toISOString(),
        "path :", req.url,
        "method :", req.method);
    next();
}

export const StartTime = function (req, res, next) {
    res["X-Server-Start-Time"]
    next()
}

