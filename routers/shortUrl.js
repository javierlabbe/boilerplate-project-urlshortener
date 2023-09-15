const express = require('express');

const routerUrl = express.Router();

//middleware
const bodyParser = require('body-parser'); //para procesar el cuerpo que no viene en JSON
routerUrl.use(bodyParser.urlencoded({ extended: true }));; //para procesar el cuerpo de la solicitud

const fs = require('fs').promises; //para trabajar con el file system del servidor. En este caso para acceder al JSON que tiene la data


/*
* funcion readJson leer readme.txt para entender detalles
*/
const readJson = async () => {
  try {
    const data = await fs.readFile(__dirname + '/../data.json', 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    throw error; // throw error para propagar el error o manejarlo de otra manera
  }
};

routerUrl.post('/', function(req, res) {
  let url = req.body.url;

  try {
    if (!/^(https:\/\/(www\.)?)\w[\w\.-]+\w(\..+\w)$/i.test(url)) {
      throw new Error("invalid url");
    }
    let dataObj;

    readJson().then(data => {
      dataObj = data;

      //consulta si existe la url en data.json
      if(!(dataObj.hasOwnProperty(url))) {
        let index = dataObj['index'];
        dataObj[url] = index;
        dataObj.index = index + 1;

        //para añadir url al JSON
        fs.writeFile(__dirname + '/../data.json', JSON.stringify(dataObj, null, 2), (error) => {
          if (error) {
            console.error('Error al escribir en el archivo JSON:', error);
          } else {
            console.log('Archivo JSON actualizado correctamente.');
          }
        });
        res.json({original_url: url, short_url: index});
      } else {
        res.json({original_url: url, short_url: dataObj[url]});
      }
    });

  } catch (error) {
    console.error(error.message);
    resObj = { error: error.message };
    res.json(resObj); //si el url no cumple las condiciones
  }
});

routerUrl.get('/:index', (req, res) => {
  let index = parseInt(req.params.index);
  let dataObj;
  let url;
  
  readJson().then(data => {
    dataObj = data;
    for (let urlProp in dataObj) { //lógica para traer el url consultado
      if (dataObj[urlProp] === index) {
        url = urlProp;
        console.log(urlProp)
        break;       
      }
    }
    res.redirect(url);
  });
})

module.exports = routerUrl;

