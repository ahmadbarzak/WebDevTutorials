async function getDataWithinRange(paramName, data, minimum, maximum){
    let filteredData = data.filter((entry) => {
        return entry[paramName] >= minimum && entry[paramName] <= maximum;
    });
    return filteredData;
}

async function getDataByParam(res, collection, paramName, paramVal) { 
    const count = await collection.countDocuments();
    console.log(count);
    if (count === 0) {
        res.status(404).send("No data in database");
        return
    }
    const film = await collection.findOne();
    const newVal = typeof film[paramName] === "number" ? parseInt(paramVal) : paramVal;
    const query = {};
    query[paramName] = newVal;
    const filteredData = await collection.find(query);
    console.log(filteredData);
    if (filteredData.length < 1){
        res.status(404).send("Data not found");
    } else {
        res.json(filteredData);
    }
}

async function filterByParam(res, collection, paramName, minLength, maxLength){
    const minDef = (minLength === undefined);
    const maxDef = (maxLength === undefined);
    
    let filteredFilms = await collection.find();
    if ( minDef && maxDef ) {
        res.json(filteredFilms);
        return
    }
    if ((!maxDef && isNaN(Number(maxLength))) || (!minDef && isNaN(Number(minLength)))) {
        res.status(404).send("Need numbers as parameters");
        return
    }
    filteredFilms = !maxDef ? await getDataWithinRange(paramName, filteredFilms, 0, maxLength) : filteredFilms;
    filteredFilms = !minDef ? await getDataWithinRange(paramName, filteredFilms, minLength, 9999) : filteredFilms;
    res.json(filteredFilms);
}

//export functions and data
module.exports = { getDataByParam, filterByParam };
