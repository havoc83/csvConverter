const fs = require("fs")
const path = require("path")
const os = require('os')

const convertFile = (fileName = path.join(__dirname, 'customer-data.csv'), outputType = 'JSON') => {
    console.log("File= " + fileName + " Output= " + outputType)
    const readCSV = fs.createReadStream(fileName, 'utf8')

    let rawData = ''
    readCSV.on('data', (chunk) => {
        rawData += chunk
    }).on('end', () => {
        const dataLines = rawData.split(os.EOL)
        if (outputType === "JSON") {
            parseToJson(dataLines)
        } else if (outputType === "XML") {
            parseToXml(dataLines)
        } else {
            console.log("Error filetype not implimented")
        }

    })




}


const parseToJson = (data) => {
    const prepData = data.map(x => x.trim().split(','))

    convertToJson = (x) => {
        var object2json = {}
        for (let i = 0; i < x.length;i++){
            object2json[prepData[0][i]] = x[i];
        }
        return object2json
    }

    const json = JSON.stringify(prepData.slice(1,prepData.length).map(convertToJson),null, 2)
    const stream = fs.createWriteStream('customer.json')
    stream.write(json,()=>{ stream.close() })

    //console.log(json)
}

//Implimentation needed
const parseToXML = (data) => {
    //TO-DO
}



convertFile(process.argv[2], process.argv[3])