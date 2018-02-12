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
        return x.map((a,i) => `${prepData[0][i]}:${a}`)
    }
    const json = prepData.slice(1,prepData.length).map(convertToJson).toString('\n')
    console.log(json)
}
const parseToXML = (data) => {

}



convertFile(process.argv[2], process.argv[3])